import type { DeskState, Lead, Message } from "./types";
import { todayKey } from "./ids";

export function effectiveDailyCap(state: DeskState) {
  const { dailyCap, warmupDays, startedSendingOn } = state.settings;
  const cap = Math.min(50, Math.max(1, dailyCap || 50));
  if (!startedSendingOn || warmupDays <= 1) return cap;
  const start = new Date(`${startedSendingOn}T00:00:00Z`).getTime();
  const days = Math.max(0, Math.floor((Date.now() - start) / 86400000));
  const ramp = Math.ceil(((days + 1) / warmupDays) * cap);
  return Math.min(cap, Math.max(5, ramp));
}

export function sentToday(state: DeskState) {
  const key = todayKey(state.settings.timezone);
  return state.sendLog.find((d) => d.date === key)?.count ?? 0;
}

export function remainingToday(state: DeskState) {
  return Math.max(0, effectiveDailyCap(state) - sentToday(state));
}

export function inSendWindow(state: DeskState, at = new Date()) {
  const { sendDays, sendStartHour, sendEndHour, timezone } = state.settings;
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    weekday: "short",
    hour: "numeric",
    hourCycle: "h23",
  }).formatToParts(at);
  const weekday = parts.find((p) => p.type === "weekday")?.value;
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const map: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const day = map[weekday || ""] ?? -1;
  if (!sendDays.includes(day)) return false;
  return hour >= sendStartHour && hour < sendEndHour;
}

export function companyTaken(state: DeskState, domain: string, exceptLeadId?: string) {
  const d = domain.toLowerCase().replace(/^www\./, "");
  if (!d) return false;
  if (state.suppressions.some((s) => s.domain === d)) return true;
  return state.leads.some((lead) => {
    if (exceptLeadId && lead.id === exceptLeadId) return false;
    if (lead.domain !== d) return false;
    return !["lost", "suppressed", "unsubscribed"].includes(lead.status);
  });
}

export function emailTaken(state: DeskState, email: string, exceptLeadId?: string) {
  const e = email.trim().toLowerCase();
  if (state.suppressions.some((s) => s.email === e)) return true;
  return state.leads.some((lead) => lead.email === e && lead.id !== exceptLeadId);
}

export function usedSubjects(state: DeskState) {
  return state.messages.map((m) => m.subject.trim().toLowerCase());
}

export function scoreLead(lead: Lead) {
  let n = 40;
  if (lead.emailVerified) n += 20;
  if (lead.verification?.verdict === "deliverable") n += 15;
  if (lead.verification?.verdict === "risky") n -= 10;
  if (lead.verification?.roleAddress) n -= 15;
  if (lead.job?.title) n += 15;
  if (lead.research.trim().length > 20) n += 10;
  if (lead.contactRole && /ceo|founder|cto|coo|vp|head|director|owner/i.test(lead.contactRole)) n += 10;
  return Math.max(0, Math.min(100, n));
}

export function stats(state: DeskState) {
  const messages = state.messages;
  const sent = messages.filter((m) => m.sentAt);
  const opened = sent.filter((m) => m.openedAt);
  const clicked = sent.filter((m) => m.clickedAt);
  const replied = state.leads.filter((l) => l.status === "replied" || l.status === "meeting" || l.status === "won");
  const meetings = state.meetings.length;
  const awaiting = messages.filter((m) => m.status === "pending_approval").length;
  const dueReminders = state.reminders.filter((r) => !r.doneAt && new Date(r.dueAt) <= new Date()).length;
  return {
    leads: state.leads.length,
    sent: sent.length,
    opened: opened.length,
    clicked: clicked.length,
    replied: replied.length,
    meetings,
    awaiting,
    dueReminders,
    remainingToday: remainingToday(state),
    cap: effectiveDailyCap(state),
    sentToday: sentToday(state),
    paused: state.settings.pauseSending,
    persistence: process.env.DATABASE_URL ? "neon" : "file",
    mailbox: state.settings.google?.email || (state.settings.smtpHost ? "smtp" : "none"),
    openRate: sent.length ? Math.round((opened.length / sent.length) * 100) : 0,
    clickRate: sent.length ? Math.round((clicked.length / sent.length) * 100) : 0,
    replyRate: sent.length ? Math.round((replied.length / sent.length) * 100) : 0,
  };
}

export function nextSendAt(state: DeskState) {
  const last = [...state.messages].filter((m) => m.sentAt || m.scheduledFor).sort((a, b) => {
    const ta = new Date(a.sentAt || a.scheduledFor || 0).getTime();
    const tb = new Date(b.sentAt || b.scheduledFor || 0).getTime();
    return tb - ta;
  })[0];
  const jitterMin = 8 + Math.floor(Math.random() * 12);
  const base = last?.sentAt || last?.scheduledFor ? new Date(last.sentAt || last.scheduledFor || Date.now()) : new Date();
  const next = new Date(Math.max(Date.now(), base.getTime()) + jitterMin * 60 * 1000);
  return next.toISOString();
}

export function messageByToken(state: DeskState, kind: "open" | "click" | "unsub", token: string): Message | undefined {
  if (kind === "open") return state.messages.find((m) => m.openToken === token);
  if (kind === "click") return state.messages.find((m) => m.clickToken === token);
  return state.messages.find((m) => m.unsubToken === token);
}
