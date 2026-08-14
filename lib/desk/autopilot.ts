import { draftOnState, enrichLeadOnState, queueIfClean, verifyLeadOnState } from "./pipeline";
import { detectReplies, dueReminders, markMeetingReminders, processDueSends } from "./process";
import { nowIso, uid } from "./ids";
import type { DeskState } from "./types";

const MAX_API = 8;

export async function runAutopilot(state: DeskState, origin?: string) {
  const log: string[] = [];
  if (!state.settings.autopilot) {
    markMeetingReminders(state);
    const sent = await processDueSends(state, origin);
    if (sent.sent) log.push(sent.reason);
    return { log, awaiting: state.messages.filter((m) => m.status === "pending_approval").length };
  }

  try {
    const replies = await detectReplies(state);
    if (replies) log.push(`Found ${replies} repl${replies === 1 ? "y" : "ies"} in Gmail.`);
  } catch (err) {
    log.push(err instanceof Error ? err.message : "Reply scan failed.");
  }

  let api = 0;
  for (const lead of state.leads) {
    if (api >= MAX_API) break;
    if (["suppressed", "unsubscribed", "bounced", "lost", "won", "replied", "meeting"].includes(lead.status)) continue;
    if (!lead.email && lead.domain) {
      const enrich = await enrichLeadOnState(state, lead);
      api += 1;
      log.push(`${lead.company}: ${enrich.detail}`);
    }
  }

  for (const lead of state.leads) {
    if (api >= MAX_API) break;
    if (!lead.email) continue;
    if (lead.verification?.verdict === "deliverable" || lead.verification?.verdict === "undeliverable") continue;
    const v = await verifyLeadOnState(state, lead);
    api += 1;
    log.push(`${lead.company}: ${v.detail}`);
  }

  if (!state.settings.meetUrl) {
    log.push("Add a meeting link so drafts can be written.");
  } else {
    for (const lead of state.leads) {
      if (["suppressed", "unsubscribed", "bounced", "lost", "won", "replied", "meeting", "awaiting_approval", "approved"].includes(lead.status)) {
        continue;
      }
      if (!lead.email) continue;
      if (lead.verification?.verdict === "undeliverable") continue;
      if (!lead.verification) continue;
      const drafted = draftOnState(state, lead, 0);
      if (!drafted.ok) continue;
      const message = state.messages.find((m) => m.id === drafted.messageId);
      if (!message || message.status === "pending_approval") continue;
      const queued = queueIfClean(state, message);
      if (queued.ok) log.push(`${lead.company}: draft is waiting for your approval.`);
      else log.push(`${lead.company}: draft needs a look (${queued.error}).`);
    }

    for (const rem of dueReminders(state).filter((r) => r.type === "followup")) {
      const lead = state.leads.find((l) => l.id === rem.leadId);
      if (!lead || ["replied", "meeting", "won", "lost", "suppressed", "unsubscribed"].includes(lead.status)) {
        rem.doneAt = nowIso();
        continue;
      }
      const nextStep = Math.min(
        2,
        state.messages.filter((m) => m.leadId === lead.id).reduce((max, m) => Math.max(max, m.sequenceStep), 0) + 1,
      ) as 0 | 1 | 2;
      if (nextStep === 0) continue;
      const drafted = draftOnState(state, lead, nextStep);
      rem.doneAt = nowIso();
      if (!drafted.ok) continue;
      const message = state.messages.find((m) => m.id === drafted.messageId);
      if (message) queueIfClean(state, message);
      log.push(`${lead.company}: follow-up queued for approval.`);
    }
  }

  markMeetingReminders(state);
  const sent = await processDueSends(state, origin);
  if (sent.sent || sent.reason !== "Nothing due right now.") log.push(sent.reason);

  if (!log.length) log.push("Nothing new. Add a hiring signal or a lead, then run again.");

  state.events.unshift({
    id: uid("evt"),
    at: nowIso(),
    type: "autopilot",
    leadId: null,
    messageId: null,
    detail: log[0] || "Autopilot ran",
  });

  return {
    log,
    awaiting: state.messages.filter((m) => m.status === "pending_approval").length,
  };
}
