const DISPOSABLE = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "10minutemail.com",
  "tempmail.com",
  "temp-mail.org",
  "yopmail.com",
  "trashmail.com",
  "getnada.com",
  "sharklasers.com",
  "discard.email",
  "mailnesia.com",
  "throwaway.email",
  "fakeinbox.com",
  "moakt.com",
  "emailondeck.com",
]);

const ROLE_LOCALS = new Set([
  "info",
  "hello",
  "support",
  "sales",
  "admin",
  "webmaster",
  "noreply",
  "no-reply",
  "billing",
  "contact",
  "office",
  "help",
  "team",
  "jobs",
  "careers",
  "hr",
  "privacy",
  "abuse",
  "postmaster",
]);

const EMAIL_RE =
  /^[a-z0-9](?:[a-z0-9._%+-]{0,62}[a-z0-9])?@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z]{2,})+$/i;

export function isDisposableDomain(domain: string) {
  return DISPOSABLE.has(domain.toLowerCase());
}

export function isRoleAddress(email: string) {
  const local = email.split("@")[0]?.toLowerCase() || "";
  return ROLE_LOCALS.has(local);
}

export function syntaxOk(email: string) {
  return EMAIL_RE.test(email.trim());
}

async function mxLookup(domain: string): Promise<boolean> {
  try {
    const dns = await import("node:dns/promises");
    const mx = await dns.resolveMx(domain);
    return mx.length > 0;
  } catch {
    try {
      const dns = await import("node:dns/promises");
      const a = await dns.resolve4(domain);
      return a.length > 0;
    } catch {
      return false;
    }
  }
}

type RemoteVerdict = {
  verdict: "deliverable" | "risky" | "undeliverable" | "unknown";
  source: "hunter" | "neverbounce" | "abstract";
  score: number;
  detail: string;
};

async function hunterVerify(email: string): Promise<RemoteVerdict | null> {
  const key = process.env.HUNTER_API_KEY;
  if (!key) return null;
  const url = `https://api.hunter.io/v2/email-verifier?email=${encodeURIComponent(email)}&api_key=${encodeURIComponent(key)}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return { verdict: "unknown", source: "hunter", score: 0, detail: `Hunter returned ${res.status}` };
  const json = (await res.json()) as {
    data?: { status?: string; score?: number; result?: string };
  };
  const status = (json.data?.status || json.data?.result || "").toLowerCase();
  const score = Number(json.data?.score ?? 0);
  if (status === "valid" || status === "deliverable") {
    return { verdict: "deliverable", source: "hunter", score, detail: "Hunter marked this as valid." };
  }
  if (status === "accept_all" || status === "webmail" || status === "risky") {
    return { verdict: "risky", source: "hunter", score, detail: `Hunter status: ${status}.` };
  }
  if (status === "invalid" || status === "disposable" || status === "unknown") {
    return {
      verdict: status === "unknown" ? "unknown" : "undeliverable",
      source: "hunter",
      score,
      detail: `Hunter status: ${status}.`,
    };
  }
  return { verdict: "unknown", source: "hunter", score, detail: `Hunter status: ${status || "empty"}.` };
}

async function neverbounceVerify(email: string): Promise<RemoteVerdict | null> {
  const key = process.env.NEVERBOUNCE_API_KEY;
  if (!key) return null;
  const res = await fetch("https://api.neverbounce.com/v4/single/check", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key, email }),
    cache: "no-store",
  });
  if (!res.ok) return { verdict: "unknown", source: "neverbounce", score: 0, detail: `NeverBounce returned ${res.status}` };
  const json = (await res.json()) as { result?: string };
  const result = (json.result || "").toLowerCase();
  if (result === "valid") return { verdict: "deliverable", source: "neverbounce", score: 95, detail: "NeverBounce: valid." };
  if (result === "catchall" || result === "unknown") {
    return { verdict: "risky", source: "neverbounce", score: 50, detail: `NeverBounce: ${result}.` };
  }
  if (result === "invalid" || result === "disposable") {
    return { verdict: "undeliverable", source: "neverbounce", score: 5, detail: `NeverBounce: ${result}.` };
  }
  return { verdict: "unknown", source: "neverbounce", score: 0, detail: `NeverBounce: ${result || "empty"}.` };
}

async function abstractVerify(email: string): Promise<RemoteVerdict | null> {
  const key = process.env.ABSTRACT_API_KEY;
  if (!key) return null;
  const url = `https://emailreputation.abstractapi.com/v1/?api_key=${encodeURIComponent(key)}&email=${encodeURIComponent(email)}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return { verdict: "unknown", source: "abstract", score: 0, detail: `Abstract returned ${res.status}` };
  const json = (await res.json()) as {
    email_deliverability?: { status?: string; score?: number };
  };
  const status = (json.email_deliverability?.status || "").toLowerCase();
  const score = Number(json.email_deliverability?.score ?? 0);
  if (status === "deliverable") return { verdict: "deliverable", source: "abstract", score, detail: "Abstract: deliverable." };
  if (status === "risky") return { verdict: "risky", source: "abstract", score, detail: "Abstract: risky." };
  if (status === "undeliverable") return { verdict: "undeliverable", source: "abstract", score, detail: "Abstract: undeliverable." };
  return { verdict: "unknown", source: "abstract", score, detail: `Abstract: ${status || "empty"}.` };
}

export async function verifyEmail(email: string) {
  const normalized = email.trim().toLowerCase();
  const domain = normalized.split("@")[1] || "";
  const disposable = isDisposableDomain(domain);
  const roleAddress = isRoleAddress(normalized);

  if (!syntaxOk(normalized)) {
    return {
      verdict: "undeliverable" as const,
      source: "syntax" as const,
      score: 0,
      checkedAt: new Date().toISOString(),
      detail: "This does not look like a valid email address.",
      mxFound: false,
      disposable,
      roleAddress,
    };
  }

  if (disposable) {
    return {
      verdict: "undeliverable" as const,
      source: "syntax" as const,
      score: 0,
      checkedAt: new Date().toISOString(),
      detail: "Disposable inboxes are blocked. They bounce and hurt the domain.",
      mxFound: false,
      disposable,
      roleAddress,
    };
  }

  const mxFound = await mxLookup(domain);
  const remote = (await hunterVerify(normalized)) || (await neverbounceVerify(normalized)) || (await abstractVerify(normalized));

  if (remote) {
    return {
      ...remote,
      checkedAt: new Date().toISOString(),
      mxFound,
      disposable,
      roleAddress,
      detail: roleAddress
        ? `${remote.detail} This looks like a shared inbox (info@, sales@). Prefer a named person.`
        : remote.detail,
    };
  }

  if (!mxFound) {
    return {
      verdict: "undeliverable" as const,
      source: "mx" as const,
      score: 10,
      checkedAt: new Date().toISOString(),
      detail: "No mail server (MX) found for this domain.",
      mxFound,
      disposable,
      roleAddress,
    };
  }

  return {
    verdict: (roleAddress ? "risky" : "unknown") as "risky" | "unknown",
    source: "mx" as const,
    score: roleAddress ? 45 : 60,
    checkedAt: new Date().toISOString(),
    detail: roleAddress
      ? "MX exists, but this is a shared inbox. Add a named contact if you can. Connect Hunter, NeverBounce, or Abstract to confirm deliverability."
      : "MX exists. Connect Hunter, NeverBounce, or Abstract in Settings to confirm the inbox before sending.",
    mxFound,
    disposable,
    roleAddress,
  };
}

export async function hunterFindPeople(domain: string) {
  const key = process.env.HUNTER_API_KEY;
  if (!key) return { ok: false as const, error: "Add HUNTER_API_KEY to look up people at a domain. We do not scrape job boards." };
  const url = `https://api.hunter.io/v2/domain-search?domain=${encodeURIComponent(domain)}&api_key=${encodeURIComponent(key)}&limit=10`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return { ok: false as const, error: `Hunter returned ${res.status}` };
  const json = (await res.json()) as {
    data?: {
      emails?: { value?: string; first_name?: string; last_name?: string; position?: string; confidence?: number }[];
    };
  };
  const people = (json.data?.emails || [])
    .filter((row) => row.value)
    .map((row) => ({
      email: String(row.value),
      name: [row.first_name, row.last_name].filter(Boolean).join(" "),
      role: row.position || "",
      confidence: Number(row.confidence ?? 0),
    }));
  return { ok: true as const, people };
}
