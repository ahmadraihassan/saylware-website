import type { Lead, OutreachContext } from "./types";

const BANNED = [
  /\bact now\b/i,
  /\blimited time\b/i,
  /\bfree (audit|scan|trial|quote)\b/i,
  /\burgent\b/i,
  /\bcongratulations\b/i,
  /\byou('ve| have) been selected\b/i,
  /\bclick here\b/i,
  /\bmake money\b/i,
  /\bguarantee(d)?\b/i,
  /\b100%\b/,
  /\bas seen on\b/i,
  /\bno obligation\b/i,
  /\bwinner\b/i,
  /\bbitcoin\b/i,
  /\bpassword\b/i,
  /\bverify your account\b/i,
  /\bsuspended\b/i,
  /\bwire transfer\b/i,
];

const INTIMIDATING_SUBJECT = [
  /\bre:/i,
  /\bfwd:/i,
  /\burgent/i,
  /\balert/i,
  /\bwarning/i,
  /\baction required/i,
  /\binvoice/i,
  /\bpayment/i,
  /\bsecurity breach/i,
  /\byour account/i,
  /!!!/,
];

export type LintIssue = { level: "block" | "warn"; message: string };

export function lintCopy(subject: string, body: string, lead: Pick<Lead, "company" | "contactFirstName" | "email">, meetUrl: string) {
  const issues: LintIssue[] = [];
  const text = `${subject}\n${body}`;

  if (!subject.trim()) issues.push({ level: "block", message: "Add a subject." });
  if (subject.length > 62) issues.push({ level: "warn", message: "Keep the subject under 62 characters." });
  if (INTIMIDATING_SUBJECT.some((re) => re.test(subject))) {
    issues.push({ level: "block", message: "This subject looks like spam, a fake reply, or an alarm. Write a calm, specific line instead." });
  }
  if (/^[A-Z0-9 !?]{12,}$/.test(subject)) {
    issues.push({ level: "block", message: "All-caps subjects look like spam." });
  }

  for (const re of BANNED) {
    if (re.test(text)) {
      issues.push({ level: "block", message: `Blocked phrase: “${text.match(re)?.[0]}”. This reads as spam or phishing.` });
    }
  }

  if (text.includes("—") || text.includes("–")) {
    issues.push({ level: "block", message: "Remove em dashes and en dashes. They read as generated copy." });
  }
  if (/\b(delve|leverage|synergy|unlock|elevate|streamline|cutting-edge|game-changer|landscape|utilize)\b/i.test(body)) {
    issues.push({ level: "warn", message: "This still sounds like brochure copy. Use a shorter, plainer sentence." });
  }
  if (/\b(I hope this (email )?finds you well|just circling back|per my last|touching base|kindly)\b/i.test(body)) {
    issues.push({ level: "warn", message: "Drop the filler opener. Start with the specific reason you wrote." });
  }

  const words = body.trim().split(/\s+/).filter(Boolean);
  if (words.length < 40) issues.push({ level: "warn", message: "This is very short. Add one concrete observation about their company." });
  if (words.length > 130) issues.push({ level: "block", message: "Keep the body under 130 words. Long cold mail gets ignored and looks automated." });

  if (lead.company && !body.toLowerCase().includes(lead.company.toLowerCase())) {
    issues.push({ level: "block", message: "Mention the company by name. Generic mail is what spam filters and people both skip." });
  }
  if (lead.contactFirstName && !body.toLowerCase().includes(lead.contactFirstName.toLowerCase())) {
    issues.push({ level: "warn", message: "Use their first name once, near the top." });
  }
  if (meetUrl && !body.includes(meetUrl) && !/https?:\/\/\S+/i.test(body)) {
    issues.push({ level: "block", message: "Include your meeting link in the body." });
  }
  if ((body.match(/https?:\/\//g) || []).length > 2) {
    issues.push({ level: "warn", message: "More than two links starts to look like a campaign." });
  }
  if (body.includes("<") && /<a |<img |<table/i.test(body)) {
    issues.push({ level: "warn", message: "Prefer plain text. Heavy HTML hurts inbox placement." });
  }

  return issues;
}

export function wordCount(body: string) {
  return body.trim().split(/\s+/).filter(Boolean).length;
}

export const CONTEXT_LABEL: Record<OutreachContext, string> = {
  security: "Cybersecurity",
  care: "Customer care",
  hiring: "Hiring cost",
  general: "General",
};
