"use server";

import { redirect } from "next/navigation";
import { checkPassword, clearSession, createSession, deskPasswordConfigured, requireDesk } from "./auth";
import { draftForStep, polishDraft } from "./compose";
import { domainFromCompanyUrl, domainFromEmail, firstNameFrom, normalizeEmail, nowIso, uid } from "./ids";
import { lintCopy, wordCount } from "./lint";
import { detectReplies, processDueSends } from "./process";
import { companyTaken, emailTaken, nextSendAt, scoreLead, stats, usedSubjects } from "./rules";
import { googleAppFrom, setupChecklist, verifierKeysFrom } from "./credentials";
import { encryptSecret } from "./secret";
import { loadState, mutateState, persistenceHint } from "./store";
import type { DeskSettings, Lead, LeadStatus, Meeting, Message, OutreachContext } from "./types";
import { hunterFindPeople, verifyEmail } from "./verify";
import { mailboxReady } from "./gmail";
import { runAutopilot } from "./autopilot";

function fail(message: string): never {
  throw new Error(message);
}

export async function loginAction(_prev: { error: string } | undefined, formData: FormData) {
  const password = String(formData.get("password") || "");
  if (!deskPasswordConfigured()) {
    return { error: "Set DESK_PASSWORD in the environment before logging in." };
  }
  if (!checkPassword(password)) return { error: "That password did not match." };
  await createSession();
  redirect("/desk");
}

export async function logoutAction() {
  await clearSession();
  redirect("/desk/login");
}

export async function getDeskSnapshot() {
  await requireDesk();
  const state = await loadState();
  const safeSettings = { ...state.settings };
  delete (safeSettings as { smtpPass?: string }).smtpPass;
  delete (safeSettings as { google?: unknown }).google;
  delete (safeSettings as { googleClientSecret?: string }).googleClientSecret;
  delete (safeSettings as { hunterApiKey?: string }).hunterApiKey;
  const keys = verifierKeysFrom(state.settings);
  const googleApp = Boolean(googleAppFrom(state.settings));
  const hunter = Boolean(keys.hunter);
  const checklist = setupChecklist({
    passwordSet: deskPasswordConfigured(),
    persistence: persistenceHint(),
    googleApp,
    googleConnected: Boolean(state.settings.google?.refreshToken),
    meetUrl: state.settings.meetUrl,
    hunter,
    mailboxReady: mailboxReady(state.settings),
  });
  return {
    settings: {
      ...safeSettings,
      smtpPassSet: Boolean(state.settings.smtpPass),
      googleEmail: state.settings.google?.email || "",
      googleConnected: Boolean(state.settings.google?.refreshToken),
      mailboxReady: mailboxReady(state.settings),
      googleClientId: state.settings.googleClientId,
      hunterSet: hunter,
      googleSecretSet: Boolean(state.settings.googleClientSecret || process.env.GOOGLE_CLIENT_SECRET),
    },
    leads: state.leads,
    messages: state.messages,
    meetings: state.meetings,
    reminders: state.reminders,
    suppressions: state.suppressions,
    events: state.events.slice(0, 40),
    stats: stats(state),
    persistence: persistenceHint(),
    hunter,
    verifier: Boolean(keys.hunter || keys.neverbounce || keys.abstract),
    googleApp,
    passwordSet: deskPasswordConfigured(),
    now: nowIso(),
    checklist,
    publicUrl: process.env.DESK_PUBLIC_URL || "",
    allowedEmail: process.env.DESK_ALLOWED_EMAIL || "awaisu@saylware.com",
  };
}

export type DeskSnapshot = Awaited<ReturnType<typeof getDeskSnapshot>>;

export async function saveSettingsAction(input: Partial<DeskSettings> & { smtpPass?: string }) {
  await requireDesk();
  await mutateState((state) => {
    const smtpPass = input.smtpPass;
    const rest = { ...input };
    delete rest.smtpPass;
    delete rest.google;
    const next = { ...state.settings, ...rest };
    next.dailyCap = Math.min(50, Math.max(1, Number(next.dailyCap) || 50));
    if (smtpPass) next.smtpPass = encryptSecret(smtpPass);
    next.google = state.settings.google;
    if (input.googleClientSecret) next.googleClientSecret = encryptSecret(input.googleClientSecret);
    else next.googleClientSecret = state.settings.googleClientSecret;
    if (input.hunterApiKey) next.hunterApiKey = encryptSecret(input.hunterApiKey);
    else next.hunterApiKey = state.settings.hunterApiKey;
    state.settings = next;
    state.events.unshift({
      id: uid("evt"),
      at: nowIso(),
      type: "settings",
      leadId: null,
      messageId: null,
      detail: "Settings updated",
    });
  });
}

export async function saveSetupAction(input: {
  googleClientId?: string;
  googleClientSecret?: string;
  hunterApiKey?: string;
  meetUrl?: string;
  physicalAddress?: string;
  senderName?: string;
  senderEmail?: string;
  smtpHost?: string;
  smtpPort?: number;
  smtpUser?: string;
  smtpPass?: string;
  autopilot?: boolean;
}) {
  await requireDesk();
  await mutateState((state) => {
    if (input.googleClientId !== undefined) state.settings.googleClientId = input.googleClientId.trim();
    if (input.googleClientSecret) state.settings.googleClientSecret = encryptSecret(input.googleClientSecret.trim());
    if (input.hunterApiKey) state.settings.hunterApiKey = encryptSecret(input.hunterApiKey.trim());
    if (input.meetUrl !== undefined) state.settings.meetUrl = input.meetUrl.trim();
    if (input.physicalAddress !== undefined) state.settings.physicalAddress = input.physicalAddress.trim();
    if (input.senderName !== undefined) state.settings.senderName = input.senderName.trim();
    if (input.senderEmail !== undefined) state.settings.senderEmail = input.senderEmail.trim();
    if (input.smtpHost !== undefined) state.settings.smtpHost = input.smtpHost.trim();
    if (input.smtpPort !== undefined) state.settings.smtpPort = input.smtpPort;
    if (input.smtpUser !== undefined) state.settings.smtpUser = input.smtpUser.trim();
    if (input.smtpPass) state.settings.smtpPass = encryptSecret(input.smtpPass);
    if (input.autopilot !== undefined) state.settings.autopilot = input.autopilot;
  });
}

export async function runAutopilotAction() {
  await requireDesk();
  return mutateState((state) => runAutopilot(state));
}

export async function disconnectGoogleAction() {
  await requireDesk();
  await mutateState((state) => {
    state.settings.google = null;
  });
}

export async function upsertLeadAction(input: {
  id?: string;
  company: string;
  domain?: string;
  contactName: string;
  contactRole: string;
  email: string;
  context: OutreachContext;
  source: Lead["source"];
  jobTitle?: string;
  jobUrl?: string;
  jobLocation?: string;
  research?: string;
  notes?: string;
  timezone?: string;
}) {
  await requireDesk();
  return mutateState((state) => {
    const email = normalizeEmail(input.email);
    const domain = (input.domain || domainFromEmail(email) || domainFromCompanyUrl(input.company)).toLowerCase().replace(/^www\./, "");
    if (!input.company.trim()) fail("Add the company name.");
    if (!email && input.source !== "hiring_signal") fail("Add an email.");
    if (email && emailTaken(state, email, input.id)) fail("That email is already in the desk. We do not contact the same person twice.");
    if (companyTaken(state, domain, input.id)) {
      fail("This company was already contacted. We keep one thread per business unless you suppress and start over.");
    }
    const existing = input.id ? state.leads.find((l) => l.id === input.id) : undefined;
    const lead: Lead = existing
      ? { ...existing }
      : {
          id: uid("lead"),
          company: "",
          domain: "",
          contactName: "",
          contactFirstName: "",
          contactRole: "",
          email: "",
          emailVerified: false,
          verification: null,
          context: input.context,
          status: "new",
          source: input.source,
          job: null,
          research: "",
          notes: "",
          timezone: input.timezone || state.settings.timezone,
          score: 0,
          lastTouchedAt: nowIso(),
          createdAt: nowIso(),
          updatedAt: nowIso(),
        };
    lead.company = input.company.trim();
    lead.domain = domain;
    lead.contactName = input.contactName.trim();
    lead.contactFirstName = firstNameFrom(input.contactName);
    lead.contactRole = input.contactRole.trim();
    lead.email = email;
    lead.context = input.context;
    lead.source = input.source;
    lead.research = (input.research || "").trim();
    lead.notes = (input.notes || "").trim();
    lead.timezone = input.timezone || lead.timezone;
    lead.job =
      input.jobTitle || input.jobUrl
        ? {
            title: (input.jobTitle || "").trim(),
            url: (input.jobUrl || "").trim(),
            location: (input.jobLocation || "").trim(),
            postedAt: existing?.job?.postedAt || nowIso(),
            notes: "",
          }
        : existing?.job || null;
    lead.score = scoreLead(lead);
    lead.updatedAt = nowIso();
    if (!existing) state.leads.unshift(lead);
    else Object.assign(existing, lead);
    return lead.id;
  });
}

export async function verifyLeadAction(leadId: string) {
  await requireDesk();
  return mutateState(async (state) => {
    const lead = state.leads.find((l) => l.id === leadId);
    if (!lead) fail("Lead not found.");
    if (!lead.email) fail("Add an email first.");
    const verification = await verifyEmail(lead.email, verifierKeysFrom(state.settings));
    lead.verification = verification;
    lead.emailVerified = verification.verdict === "deliverable";
    lead.score = scoreLead(lead);
    lead.updatedAt = nowIso();
    if (verification.verdict === "undeliverable") lead.status = lead.status === "new" ? "new" : lead.status;
    return verification;
  });
}

export async function findPeopleAction(leadId: string) {
  await requireDesk();
  const state = await loadState();
  const lead = state.leads.find((l) => l.id === leadId);
  if (!lead) fail("Lead not found.");
  return hunterFindPeople(lead.domain, verifierKeysFrom(state.settings).hunter);
}

export async function applyFoundPersonAction(leadId: string, person: { email: string; name: string; role: string }) {
  await requireDesk();
  await mutateState((state) => {
    const lead = state.leads.find((l) => l.id === leadId);
    if (!lead) fail("Lead not found.");
    const email = normalizeEmail(person.email);
    if (emailTaken(state, email, leadId)) fail("That email already belongs to another lead.");
    lead.email = email;
    if (person.name) {
      lead.contactName = person.name;
      lead.contactFirstName = firstNameFrom(person.name);
    }
    if (person.role) lead.contactRole = person.role;
    lead.emailVerified = false;
    lead.verification = null;
    lead.updatedAt = nowIso();
  });
}

export async function draftMessageAction(leadId: string, step: 0 | 1 | 2 = 0) {
  await requireDesk();
  return mutateState((state) => {
    const lead = state.leads.find((l) => l.id === leadId);
    if (!lead) fail("Lead not found.");
    if (!lead.email) fail("Add an email before drafting.");
    if (!state.settings.meetUrl) fail("Add a meeting link in Settings first. Every note includes it.");
    const existingOpen = state.messages.find(
      (m) => m.leadId === leadId && m.sequenceStep === step && ["draft", "pending_approval", "approved", "scheduled"].includes(m.status),
    );
    if (existingOpen) return existingOpen.id;
    const used = usedSubjects(state);
    const draft = draftForStep(lead, state.settings, step, used);
    const message: Message = {
      id: uid("msg"),
      leadId,
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
    return message.id;
  });
}

export async function polishMessageAction(messageId: string) {
  await requireDesk();
  return mutateState(async (state) => {
    const message = state.messages.find((m) => m.id === messageId);
    if (!message) fail("Message not found.");
    const lead = state.leads.find((l) => l.id === message.leadId);
    if (!lead) fail("Lead not found.");
    const polished = await polishDraft({ subject: message.subject, body: message.body, lead, settings: state.settings });
    message.subject = polished.subject;
    message.body = polished.body;
    message.wordCount = wordCount(message.body);
    message.updatedAt = nowIso();
    return polished.usedModel;
  });
}

export async function updateMessageAction(messageId: string, subject: string, body: string) {
  await requireDesk();
  await mutateState((state) => {
    const message = state.messages.find((m) => m.id === messageId);
    if (!message) fail("Message not found.");
    if (message.status === "sent") fail("Sent mail cannot be edited.");
    message.subject = subject.trim();
    message.body = body.replace(/[—–]/g, "-");
    message.wordCount = wordCount(message.body);
    message.updatedAt = nowIso();
  });
}

export async function submitForApprovalAction(messageId: string) {
  await requireDesk();
  await mutateState((state) => {
    const message = state.messages.find((m) => m.id === messageId);
    if (!message) fail("Message not found.");
    const lead = state.leads.find((l) => l.id === message.leadId);
    if (!lead) fail("Lead not found.");
    if (!lead.emailVerified && lead.verification?.verdict !== "deliverable") {
      fail("Verify the email first. We will not queue mail to an unchecked address.");
    }
    if (lead.verification?.verdict === "undeliverable") fail("This address looks undeliverable. Do not send.");
    const issues = lintCopy(message.subject, message.body, lead, message.meetUrl || state.settings.meetUrl);
    const blocks = issues.filter((i) => i.level === "block");
    if (blocks.length) fail(blocks[0].message);
    message.status = "pending_approval";
    lead.status = "awaiting_approval";
    lead.updatedAt = nowIso();
    message.updatedAt = nowIso();
  });
}

export async function approveMessageAction(messageId: string) {
  await requireDesk();
  await mutateState((state) => {
    const message = state.messages.find((m) => m.id === messageId);
    if (!message) fail("Message not found.");
    const lead = state.leads.find((l) => l.id === message.leadId);
    if (!lead) fail("Lead not found.");
    if (state.settings.pauseSending) fail("Sending is paused.");
    message.status = "scheduled";
    message.approvedAt = nowIso();
    message.scheduledFor = nextSendAt(state);
    message.updatedAt = nowIso();
    lead.status = "approved";
    lead.updatedAt = nowIso();
  });
}

export async function rejectMessageAction(messageId: string) {
  await requireDesk();
  await mutateState((state) => {
    const message = state.messages.find((m) => m.id === messageId);
    if (!message) fail("Message not found.");
    message.status = "draft";
    message.updatedAt = nowIso();
    const lead = state.leads.find((l) => l.id === message.leadId);
    if (lead) {
      lead.status = "draft";
      lead.updatedAt = nowIso();
    }
  });
}

export async function cancelMessageAction(messageId: string) {
  await requireDesk();
  await mutateState((state) => {
    const message = state.messages.find((m) => m.id === messageId);
    if (!message) fail("Message not found.");
    if (message.status === "sent") fail("Already sent.");
    message.status = "cancelled";
    message.updatedAt = nowIso();
  });
}

export async function setLeadStatusAction(leadId: string, status: LeadStatus) {
  await requireDesk();
  await mutateState((state) => {
    const lead = state.leads.find((l) => l.id === leadId);
    if (!lead) fail("Lead not found.");
    lead.status = status;
    lead.updatedAt = nowIso();
    lead.lastTouchedAt = nowIso();
  });
}

export async function suppressLeadAction(leadId: string, reason: string) {
  await requireDesk();
  await mutateState((state) => {
    const lead = state.leads.find((l) => l.id === leadId);
    if (!lead) fail("Lead not found.");
    lead.status = "suppressed";
    lead.updatedAt = nowIso();
    state.suppressions.unshift({
      id: uid("sup"),
      email: lead.email,
      domain: lead.domain,
      company: lead.company,
      reason: reason.trim() || "Do not contact",
      createdAt: nowIso(),
    });
    for (const m of state.messages.filter((x) => x.leadId === leadId && ["draft", "pending_approval", "approved", "scheduled"].includes(x.status))) {
      m.status = "cancelled";
    }
  });
}

export async function addSuppressionAction(email: string, reason: string) {
  await requireDesk();
  await mutateState((state) => {
    const e = normalizeEmail(email);
    const domain = domainFromEmail(e);
    state.suppressions.unshift({
      id: uid("sup"),
      email: e,
      domain,
      company: "",
      reason: reason.trim() || "Do not contact",
      createdAt: nowIso(),
    });
  });
}

export async function addMeetingAction(input: {
  leadId: string;
  title: string;
  startsAt: string;
  endsAt: string;
  location: string;
  notes: string;
}) {
  await requireDesk();
  await mutateState((state) => {
    const lead = state.leads.find((l) => l.id === input.leadId);
    if (!lead) fail("Lead not found.");
    const starts = new Date(input.startsAt);
    const remind = new Date(starts.getTime() - 60 * 60 * 1000);
    const meeting: Meeting = {
      id: uid("mtg"),
      leadId: input.leadId,
      title: input.title.trim() || `Call with ${lead.contactName}`,
      startsAt: new Date(input.startsAt).toISOString(),
      endsAt: new Date(input.endsAt || new Date(starts.getTime() + 30 * 60 * 1000)).toISOString(),
      location: input.location || state.settings.meetUrl,
      notes: input.notes || "",
      remindAt: remind.toISOString(),
      reminded: false,
      createdAt: nowIso(),
    };
    state.meetings.unshift(meeting);
    lead.status = "meeting";
    lead.updatedAt = nowIso();
    state.reminders.push({
      id: uid("rem"),
      leadId: lead.id,
      messageId: null,
      meetingId: meeting.id,
      type: "meeting",
      title: `Prepare for ${meeting.title}`,
      dueAt: meeting.remindAt || meeting.startsAt,
      doneAt: null,
      createdAt: nowIso(),
    });
    return meeting.id;
  });
}

export async function completeReminderAction(id: string) {
  await requireDesk();
  await mutateState((state) => {
    const rem = state.reminders.find((r) => r.id === id);
    if (rem) rem.doneAt = nowIso();
  });
}

export async function sendDueNowAction() {
  await requireDesk();
  return mutateState((state) => processDueSends(state));
}

export async function syncRepliesAction() {
  await requireDesk();
  return mutateState((state) => detectReplies(state));
}

export async function lintMessageAction(messageId: string) {
  await requireDesk();
  const state = await loadState();
  const message = state.messages.find((m) => m.id === messageId);
  if (!message) fail("Message not found.");
  const lead = state.leads.find((l) => l.id === message.leadId);
  if (!lead) fail("Lead not found.");
  return lintCopy(message.subject, message.body, lead, message.meetUrl || state.settings.meetUrl);
}

export async function importCsvAction(csv: string) {
  await requireDesk();
  const lines = csv.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  if (lines.length < 2) fail("CSV needs a header row and at least one lead.");
  const header = lines[0].split(",").map((h) => h.trim().toLowerCase().replace(/"/g, ""));
  const idx = (name: string) => header.indexOf(name);
  const need = ["company", "email"];
  for (const n of need) if (idx(n) < 0) fail(`CSV is missing a “${n}” column.`);
  let added = 0;
  await mutateState((state) => {
    for (const line of lines.slice(1)) {
      const cols = parseCsvLine(line);
      const company = cols[idx("company")] || "";
      const email = normalizeEmail(cols[idx("email")] || "");
      if (!company || !email) continue;
      if (emailTaken(state, email)) continue;
      const domain = domainFromEmail(email);
      if (companyTaken(state, domain)) continue;
      const contactName = cols[idx("name")] || cols[idx("contact")] || "";
      const context = (["security", "care", "hiring", "general"].includes(cols[idx("context")] || "")
        ? cols[idx("context")]
        : "general") as OutreachContext;
      state.leads.unshift({
        id: uid("lead"),
        company,
        domain,
        contactName,
        contactFirstName: firstNameFrom(contactName),
        contactRole: cols[idx("role")] || "",
        email,
        emailVerified: false,
        verification: null,
        context,
        status: "new",
        source: "manual",
        job: cols[idx("job")]
          ? { title: cols[idx("job")], url: cols[idx("joburl")] || "", location: "", postedAt: nowIso(), notes: "" }
          : null,
        research: cols[idx("research")] || "",
        notes: "",
        timezone: state.settings.timezone,
        score: 40,
        lastTouchedAt: nowIso(),
        createdAt: nowIso(),
        updatedAt: nowIso(),
      });
      added += 1;
    }
  });
  return added;
}

function parseCsvLine(line: string) {
  const out: string[] = [];
  let cur = "";
  let q = false;
  for (const ch of line) {
    if (ch === '"') {
      q = !q;
      continue;
    }
    if (ch === "," && !q) {
      out.push(cur.trim());
      cur = "";
      continue;
    }
    cur += ch;
  }
  out.push(cur.trim());
  return out;
}
