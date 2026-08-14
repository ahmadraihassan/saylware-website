import { addDaysIso, nowIso, todayKey, uid } from "./ids";
import { inSendWindow, remainingToday, sentToday } from "./rules";
import { deliverMail, trackingUrls } from "./send";
import { withFooter } from "./compose";
import { gmailReplied, freshAccessToken } from "./gmail";
import type { DeskState, Lead, Message } from "./types";

function bumpSendLog(state: DeskState) {
  const key = todayKey(state.settings.timezone);
  const row = state.sendLog.find((d) => d.date === key);
  if (row) row.count += 1;
  else state.sendLog.push({ date: key, count: 1 });
}

function applyClickUrl(body: string, meetUrl: string, clickUrl: string) {
  if (!meetUrl) return body;
  return body.split(meetUrl).join(clickUrl);
}

export async function processDueSends(state: DeskState, origin?: string) {
  if (origin) process.env.DESK_PUBLIC_URL = process.env.DESK_PUBLIC_URL || origin;
  if (state.settings.pauseSending) return { sent: 0, reason: "Sending is paused." };
  if (!inSendWindow(state) && process.env.DESK_IGNORE_WINDOW !== "1") {
    return { sent: 0, reason: "Outside the send window." };
  }
  const left = remainingToday(state);
  if (left <= 0) return { sent: 0, reason: "Daily cap reached." };

  const due = state.messages
    .filter((m) => m.status === "scheduled" || m.status === "approved")
    .filter((m) => !m.scheduledFor || new Date(m.scheduledFor).getTime() <= Date.now())
    .sort((a, b) => new Date(a.scheduledFor || a.createdAt).getTime() - new Date(b.scheduledFor || b.createdAt).getTime())
    .slice(0, Math.min(2, left));

  let sent = 0;
  for (const message of due) {
    const lead = state.leads.find((l) => l.id === message.leadId);
    if (!lead) continue;
    if (["suppressed", "unsubscribed", "bounced", "lost"].includes(lead.status)) {
      message.status = "cancelled";
      continue;
    }
    try {
      const urls = trackingUrls(message, message.meetUrl || state.settings.meetUrl);
      const bodyWithClick = state.settings.trackClicks
        ? applyClickUrl(message.body, message.meetUrl || state.settings.meetUrl, urls.clickUrl)
        : message.body;
      const full = withFooter(bodyWithClick, state.settings, urls.unsubUrl);
      const result = await deliverMail({
        settings: state.settings,
        to: lead.email,
        subject: message.subject,
        body: full,
        unsubUrl: urls.unsubUrl,
        pixelUrl: state.settings.trackOpens ? urls.pixelUrl : null,
      });
      state.settings = result.settings;
      message.status = "sent";
      message.sentAt = nowIso();
      message.updatedAt = nowIso();
      lead.status = "sent";
      lead.lastTouchedAt = nowIso();
      lead.updatedAt = nowIso();
      if (!state.settings.startedSendingOn) state.settings.startedSendingOn = todayKey(state.settings.timezone);
      bumpSendLog(state);
      scheduleFollowups(state, lead, message);
      state.events.unshift({
        id: uid("evt"),
        at: nowIso(),
        type: "sent",
        leadId: lead.id,
        messageId: message.id,
        detail: `Sent to ${lead.email}`,
      });
      sent += 1;
    } catch (err) {
      message.status = "failed";
      message.failedAt = nowIso();
      message.error = err instanceof Error ? err.message : "Send failed";
      message.updatedAt = nowIso();
    }
  }
  return { sent, reason: sent ? `Sent ${sent}.` : "Nothing due right now." };
}

function scheduleFollowups(state: DeskState, lead: Lead, message: Message) {
  if (message.type !== "outreach") return;
  const [d1, d2] = state.settings.followupDays;
  for (const days of [d1, d2]) {
    state.reminders.push({
      id: uid("rem"),
      leadId: lead.id,
      messageId: message.id,
      meetingId: null,
      type: "followup",
      title: `Follow up with ${lead.contactName} at ${lead.company}`,
      dueAt: addDaysIso(message.sentAt || nowIso(), days),
      doneAt: null,
      createdAt: nowIso(),
    });
  }
}

export async function detectReplies(state: DeskState) {
  if (!state.settings.google?.refreshToken) return 0;
  const fresh = await freshAccessToken(state.settings.google, state.settings);
  state.settings.google = fresh.tokens;
  let n = 0;
  const awaiting = state.leads.filter((l) => ["sent", "opened", "clicked"].includes(l.status));
  for (const lead of awaiting) {
    const last = state.messages.filter((m) => m.leadId === lead.id && m.sentAt).sort((a, b) => (b.sentAt || "").localeCompare(a.sentAt || ""))[0];
    if (!last?.sentAt) continue;
    const hit = await gmailReplied(fresh.access, lead.email, last.sentAt);
    if (hit.hit) {
      lead.status = "replied";
      lead.updatedAt = nowIso();
      if (hit.snippet) lead.notes = [lead.notes, `Reply: ${hit.snippet}`].filter(Boolean).join("\n");
      for (const m of state.messages.filter((x) => x.leadId === lead.id && ["draft", "pending_approval", "approved", "scheduled"].includes(x.status))) {
        m.status = "cancelled";
      }
      for (const r of state.reminders.filter((x) => x.leadId === lead.id && x.type === "followup" && !x.doneAt)) {
        r.doneAt = nowIso();
      }
      n += 1;
      state.events.unshift({
        id: uid("evt"),
        at: nowIso(),
        type: "replied",
        leadId: lead.id,
        messageId: last.id,
        detail: `${lead.contactName} replied${hit.snippet ? `: ${hit.snippet}` : ""}`,
      });
    }
  }
  return n;
}

export function dueReminders(state: DeskState) {
  const now = Date.now();
  return state.reminders.filter((r) => !r.doneAt && new Date(r.dueAt).getTime() <= now);
}

export function markMeetingReminders(state: DeskState) {
  const now = Date.now();
  let n = 0;
  for (const meeting of state.meetings) {
    if (meeting.reminded || !meeting.remindAt) continue;
    if (new Date(meeting.remindAt).getTime() <= now) {
      meeting.reminded = true;
      state.reminders.push({
        id: uid("rem"),
        leadId: meeting.leadId,
        messageId: null,
        meetingId: meeting.id,
        type: "meeting",
        title: `Meeting soon: ${meeting.title}`,
        dueAt: meeting.startsAt,
        doneAt: null,
        createdAt: nowIso(),
      });
      n += 1;
    }
  }
  return n;
}

export { sentToday };
