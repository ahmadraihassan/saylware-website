export const CONTEXTS = ["security", "care", "hiring", "general"] as const;
export type OutreachContext = (typeof CONTEXTS)[number];

export const LEAD_STATUSES = [
  "new",
  "researching",
  "draft",
  "awaiting_approval",
  "approved",
  "queued",
  "sent",
  "opened",
  "clicked",
  "replied",
  "meeting",
  "won",
  "lost",
  "suppressed",
  "bounced",
  "unsubscribed",
] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const MESSAGE_STATUSES = [
  "draft",
  "pending_approval",
  "approved",
  "scheduled",
  "sent",
  "failed",
  "cancelled",
] as const;
export type MessageStatus = (typeof MESSAGE_STATUSES)[number];

export type VerificationVerdict = "deliverable" | "risky" | "undeliverable" | "unknown";

export type EmailVerification = {
  verdict: VerificationVerdict;
  source: "syntax" | "mx" | "hunter" | "neverbounce" | "abstract" | "manual";
  score: number;
  checkedAt: string;
  detail: string;
  mxFound: boolean;
  disposable: boolean;
  roleAddress: boolean;
};

export type HiringSignal = {
  title: string;
  url: string;
  location: string;
  postedAt: string;
  notes: string;
};

export type Lead = {
  id: string;
  company: string;
  domain: string;
  contactName: string;
  contactFirstName: string;
  contactRole: string;
  email: string;
  emailVerified: boolean;
  verification: EmailVerification | null;
  context: OutreachContext;
  status: LeadStatus;
  source: "manual" | "hiring_signal" | "inbound";
  job: HiringSignal | null;
  research: string;
  notes: string;
  timezone: string;
  score: number;
  lastTouchedAt: string;
  createdAt: string;
  updatedAt: string;
};

export type Message = {
  id: string;
  leadId: string;
  type: "outreach" | "followup";
  sequenceStep: 0 | 1 | 2;
  context: OutreachContext;
  subject: string;
  body: string;
  status: MessageStatus;
  meetUrl: string;
  scheduledFor: string | null;
  approvedAt: string | null;
  sentAt: string | null;
  openedAt: string | null;
  clickedAt: string | null;
  failedAt: string | null;
  error: string | null;
  openToken: string;
  clickToken: string;
  unsubToken: string;
  wordCount: number;
  createdAt: string;
  updatedAt: string;
};

export type Meeting = {
  id: string;
  leadId: string;
  title: string;
  startsAt: string;
  endsAt: string;
  location: string;
  notes: string;
  remindAt: string | null;
  reminded: boolean;
  createdAt: string;
};

export type Reminder = {
  id: string;
  leadId: string | null;
  messageId: string | null;
  meetingId: string | null;
  type: "followup" | "meeting" | "approve" | "verify";
  title: string;
  dueAt: string;
  doneAt: string | null;
  createdAt: string;
};

export type Suppression = {
  id: string;
  email: string;
  domain: string;
  company: string;
  reason: string;
  createdAt: string;
};

export type ActivityEvent = {
  id: string;
  at: string;
  type: string;
  leadId: string | null;
  messageId: string | null;
  detail: string;
};

export type SendDay = {
  date: string;
  count: number;
};

export type GoogleTokens = {
  accessToken: string;
  refreshToken: string;
  expiry: number;
  email: string;
};

export type DeskSettings = {
  senderName: string;
  senderTitle: string;
  senderEmail: string;
  companyName: string;
  physicalAddress: string;
  meetUrl: string;
  dailyCap: number;
  warmupDays: number;
  startedSendingOn: string | null;
  sendDays: number[];
  sendStartHour: number;
  sendEndHour: number;
  timezone: string;
  trackOpens: boolean;
  trackClicks: boolean;
  pauseSending: boolean;
  followupDays: [number, number];
  signature: string;
  google: GoogleTokens | null;
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPass: string;
};

export type DeskState = {
  version: 1;
  settings: DeskSettings;
  leads: Lead[];
  messages: Message[];
  meetings: Meeting[];
  reminders: Reminder[];
  suppressions: Suppression[];
  events: ActivityEvent[];
  sendLog: SendDay[];
};
