export function uid(prefix = "id") {
  const bytes = new Uint8Array(9);
  crypto.getRandomValues(bytes);
  const tail = Array.from(bytes, (b) => b.toString(36).padStart(2, "0")).join("").slice(0, 12);
  return `${prefix}_${tail}`;
}

export function nowIso() {
  return new Date().toISOString();
}

export function todayKey(timeZone = "America/Denver") {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export function domainFromEmail(email: string) {
  const at = email.trim().toLowerCase().split("@")[1];
  return at || "";
}

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function domainFromCompanyUrl(value: string) {
  const raw = value.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "");
  return raw.split("/")[0].split("?")[0];
}

export function firstNameFrom(full: string) {
  const part = full.trim().split(/\s+/)[0] || "";
  if (!part) return "";
  return part.charAt(0).toUpperCase() + part.slice(1);
}

export function addDaysIso(iso: string, days: number) {
  const next = new Date(iso);
  next.setUTCDate(next.getUTCDate() + days);
  return next.toISOString();
}

export function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}
