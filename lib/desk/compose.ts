import type { DeskSettings, Lead, OutreachContext } from "./types";
import { wordCount } from "./lint";

const SUBJECTS: Record<OutreachContext, ((lead: Lead) => string)[]> = {
  security: [
    (l) => `quick question on ${l.company} monitoring`,
    (l) => `${first(l)}, noticed ${l.company} is hiring`,
    (l) => `coverage while ${l.company} scales`,
    (l) => `${l.company} detection without extra seats`,
    (l) => `a thought on ${l.company}'s alert load`,
  ],
  care: [
    (l) => `support coverage at ${l.company}`,
    (l) => `${first(l)}, a note on ${l.company} tickets`,
    (l) => `${l.company} helpdesk without extra hires`,
    (l) => `branded support for ${l.company}`,
    (l) => `${first(l)}, saw ${l.company} is hiring support`,
  ],
  hiring: [
    (l) => `${l.company} hiring for ${role(l)}`,
    (l) => `a thought on the ${role(l)} seat`,
    (l) => `${first(l)}, saw the ${role(l)} posting`,
    (l) => `${l.company} coverage vs another hire`,
    (l) => `before ${l.company} fills ${role(l)}`,
  ],
  general: [
    (l) => `${first(l)}, a short note for ${l.company}`,
    (l) => `worth a look at ${l.company}?`,
    (l) => `${l.company} operations, briefly`,
    (l) => `${first(l)}, 15 minutes on ${l.company}`,
    (l) => `one idea for ${l.company}`,
  ],
};

function first(lead: Lead) {
  return lead.contactFirstName || "there";
}

function role(lead: Lead) {
  return lead.job?.title || lead.contactRole || "that role";
}

function meetLine(url: string) {
  if (!url) return "If a short call is easier, reply with a time that works.";
  return `If a short call is easier, grab a slot here:\n${url}`;
}

function researchLine(lead: Lead) {
  const bit = lead.research.trim();
  if (!bit) return "";
  return `${bit.endsWith(".") ? bit : `${bit}.`} `;
}

function jobLine(lead: Lead) {
  if (!lead.job?.title) return "";
  const where = lead.job.location ? ` (${lead.job.location})` : "";
  return `Saw you are hiring a ${lead.job.title}${where}. `;
}

export function pickSubject(lead: Lead, used: string[]) {
  const pool = SUBJECTS[lead.context];
  const unused = pool.map((fn) => fn(lead)).filter((s) => !used.includes(s.toLowerCase()));
  const pick = unused[0] || `${lead.company} / ${first(lead)}`;
  return pick.slice(0, 62);
}

export function draftBodies(lead: Lead, settings: DeskSettings) {
  const name = first(lead);
  const meet = meetLine(settings.meetUrl);
  const research = researchLine(lead);
  const job = jobLine(lead);
  const sig = settings.signature || settings.senderName;

  const firstTouch: Record<OutreachContext, string> = {
    security: `Hi ${name},\n\n${job}${research}Teams usually open that kind of seat when alert volume is already eating engineer time.\n\nWe run managed detection for companies in that spot, so your people can stay on the work that actually needs someone on your side.\n\n${meet}\n\n${sig}`,
    care: `Hi ${name},\n\n${job}${research}If ${lead.company} is stretching the support team, adding another seat is one path. Another is a branded desk that already knows your tone and SLAs.\n\nHappy to show what that looks like in 15 minutes, no deck.\n\n${meet}\n\n${sig}`,
    hiring: `Hi ${name},\n\n${job}${research}Before ${lead.company} fills that seat, it may be cheaper to cover the work with a team that already does it every day.\n\nIf you want, I can walk through what that would replace in cost and time. Fifteen minutes is enough.\n\n${meet}\n\n${sig}`,
    general: `Hi ${name},\n\n${research}I work with teams at ${lead.company}'s stage on cybersecurity and customer care operations.\n\nIf either is on your plate, I can keep this to 15 minutes and be specific.\n\n${meet}\n\n${sig}`,
  };

  const follow1 = `Hi ${name},\n\nFloating this once more in case last week was packed. Happy to keep it to 15 minutes, or send a one-pager if a call is the wrong shape.\n\n${meet}\n\n${sig}`;
  const follow2 = `Hi ${name},\n\nI'll close the loop on my side. If the plan at ${lead.company} is still to hire, ignore this. If you'd rather not add headcount for coverage, the offer stands.\n\n${meet}\n\n${sig}`;

  return {
    outreach: firstTouch[lead.context],
    followup1: follow1,
    followup2: follow2,
  };
}

export function withFooter(body: string, settings: DeskSettings, unsubUrl: string) {
  return `${body.trim()}\n\n--\n${settings.companyName} · ${settings.physicalAddress}\nIf this is not useful, you can stop these notes here: ${unsubUrl}`;
}

export function draftForStep(lead: Lead, settings: DeskSettings, step: 0 | 1 | 2, usedSubjects: string[]) {
  const bodies = draftBodies(lead, settings);
  const body = step === 0 ? bodies.outreach : step === 1 ? bodies.followup1 : bodies.followup2;
  const subject =
    step === 0
      ? pickSubject(lead, usedSubjects)
      : step === 1
        ? `${lead.company} / quick follow-up`
        : `${lead.company} / last note from me`;
  return { subject, body, wordCount: wordCount(body) };
}

const AI_SYSTEM = `You write short B2B notes that sound like a real person at a small firm.
Rules:
- Plain English. No em dashes, en dashes, or hyphen sandwiches used as asides.
- No fluff: no "I hope this finds you well", circling back, touching base, leverage, synergy, unlock, excited to, just wanted to.
- 70 to 110 words.
- One concrete observation using the facts given. Do not invent facts, job titles, or metrics.
- One ask: a 15 minute conversation. Include the meeting URL exactly as provided.
- Greet with first name. Sign with the sender name.
- Do not impersonate the recipient's bank, vendor, or employer. This is a clear sales note, not a security alert.
- Do not use Re: or Fwd: unless this truly is a reply.`;

export async function polishDraft(input: {
  subject: string;
  body: string;
  lead: Lead;
  settings: DeskSettings;
}) {
  if (!process.env.AI_GATEWAY_API_KEY && !process.env.VERCEL_OIDC_TOKEN) {
    return { subject: input.subject, body: input.body, usedModel: false as const };
  }
  try {
    const { generateText } = await import("ai");
    const { text } = await generateText({
      model: "openai/gpt-5.4-mini",
      system: AI_SYSTEM,
      prompt: `Company: ${input.lead.company}
Person: ${input.lead.contactName} (${input.lead.contactRole})
Context: ${input.lead.context}
Job: ${input.lead.job?.title || "none"} ${input.lead.job?.url || ""}
Research notes (only use these): ${input.lead.research || "none"}
Meet URL: ${input.settings.meetUrl || "none, ask them to reply with a time"}
Sender: ${input.settings.senderName}
Current subject: ${input.subject}
Current body:
${input.body}

Return JSON only: {"subject":"...","body":"..."}`,
    });
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return { subject: input.subject, body: input.body, usedModel: false as const };
    const parsed = JSON.parse(jsonMatch[0]) as { subject?: string; body?: string };
    const subject = (parsed.subject || input.subject).replace(/[—–]/g, "-").slice(0, 62);
    const body = (parsed.body || input.body).replace(/[—–]/g, "-");
    return { subject, body, usedModel: true as const };
  } catch {
    return { subject: input.subject, body: input.body, usedModel: false as const };
  }
}
