import { draftForStep } from "./compose";
import { firstNameFrom, nowIso, uid } from "./ids";
import { lintCopy, wordCount } from "./lint";
import { scoreLead, usedSubjects } from "./rules";
import type { DeskState, Lead, Message } from "./types";
import { hunterFindPeople, verifyEmail } from "./verify";
import { verifierKeysFrom } from "./credentials";

const SENIOR = /ceo|founder|co-founder|owner|president|cto|coo|cfo|vp|vice president|head of|director|managing/i;

export function pickPerson(
  people: { email: string; name: string; role: string; confidence: number }[],
) {
  const ranked = [...people].sort((a, b) => {
    const as = SENIOR.test(a.role) ? 100 : 0;
    const bs = SENIOR.test(b.role) ? 100 : 0;
    return bs + b.confidence - (as + a.confidence);
  });
  return ranked[0] || null;
}

export async function verifyLeadOnState(state: DeskState, lead: Lead) {
  if (!lead.email) return { ok: false, detail: "No email" };
  const verification = await verifyEmail(lead.email, verifierKeysFrom(state.settings));
  lead.verification = verification;
  lead.emailVerified = verification.verdict === "deliverable";
  lead.score = scoreLead(lead);
  lead.updatedAt = nowIso();
  return { ok: verification.verdict !== "undeliverable", detail: verification.detail };
}

export async function enrichLeadOnState(state: DeskState, lead: Lead) {
  if (lead.email) return { ok: true, detail: "Already has email" };
  if (!lead.domain) return { ok: false, detail: "No domain" };
  const found = await hunterFindPeople(lead.domain, verifierKeysFrom(state.settings).hunter);
  if (!found.ok) return { ok: false, detail: found.error };
  const person = pickPerson(found.people);
  if (!person) return { ok: false, detail: "Hunter found no people" };
  lead.email = person.email.toLowerCase();
  if (person.name) {
    lead.contactName = person.name;
    lead.contactFirstName = firstNameFrom(person.name);
  }
  if (person.role) lead.contactRole = person.role;
  lead.updatedAt = nowIso();
  return { ok: true, detail: `Using ${person.name || person.email}` };
}

export function draftOnState(state: DeskState, lead: Lead, step: 0 | 1 | 2) {
  if (!lead.email) return { ok: false as const, error: "No email" };
  if (!state.settings.meetUrl) return { ok: false as const, error: "Add a meeting link first" };
  const existingOpen = state.messages.find(
    (m) => m.leadId === lead.id && m.sequenceStep === step && ["draft", "pending_approval", "approved", "scheduled"].includes(m.status),
  );
  if (existingOpen) return { ok: true as const, messageId: existingOpen.id, created: false };
  const draft = draftForStep(lead, state.settings, step, usedSubjects(state));
  const message: Message = {
    id: uid("msg"),
    leadId: lead.id,
    type: step === 0 ? "outreach" : "followup",
    sequenceStep: step,
    context: lead.context,
    subject: draft.subject,
    body: draft.body,
    status: "draft",
    meetUrl: state.settings.meetUrl,
    scheduledFor: null,
    approvedAt: null,
    sentAt: null,
    openedAt: null,
    clickedAt: null,
    failedAt: null,
    error: null,
    openToken: uid("opn"),
    clickToken: uid("clk"),
    unsubToken: uid("uns"),
    wordCount: draft.wordCount,
    createdAt: nowIso(),
    updatedAt: nowIso(),
  };
  state.messages.unshift(message);
  lead.status = "draft";
  lead.updatedAt = nowIso();
  return { ok: true as const, messageId: message.id, created: true };
}

export function queueIfClean(state: DeskState, message: Message) {
  const lead = state.leads.find((l) => l.id === message.leadId);
  if (!lead) return { ok: false, error: "Lead missing" };
  if (lead.verification?.verdict === "undeliverable") return { ok: false, error: "Undeliverable" };
  if (!lead.emailVerified && lead.verification?.verdict !== "deliverable" && lead.verification?.verdict !== "risky") {
    return { ok: false, error: "Not verified" };
  }
  const issues = lintCopy(message.subject, message.body, lead, message.meetUrl || state.settings.meetUrl);
  const blocks = issues.filter((i) => i.level === "block");
  if (blocks.length) return { ok: false, error: blocks[0].message };
  message.status = "pending_approval";
  message.wordCount = wordCount(message.body);
  message.updatedAt = nowIso();
  lead.status = "awaiting_approval";
  lead.updatedAt = nowIso();
  return { ok: true };
}
