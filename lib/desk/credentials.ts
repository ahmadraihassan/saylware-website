import { decryptSecret } from "./secret";
import type { DeskSettings } from "./types";

export function googleAppFrom(settings?: DeskSettings | null) {
  const clientId = settings?.googleClientId || process.env.GOOGLE_CLIENT_ID || "";
  const clientSecret =
    (settings?.googleClientSecret ? decryptSecret(settings.googleClientSecret) : "") ||
    process.env.GOOGLE_CLIENT_SECRET ||
    "";
  if (!clientId || !clientSecret) return null;
  return { clientId, clientSecret };
}

export function verifierKeysFrom(settings?: DeskSettings | null) {
  return {
    hunter:
      (settings?.hunterApiKey ? decryptSecret(settings.hunterApiKey) : "") || process.env.HUNTER_API_KEY || "",
    neverbounce: process.env.NEVERBOUNCE_API_KEY || "",
    abstract: process.env.ABSTRACT_API_KEY || "",
  };
}

export function isAllowedOperator(email: string) {
  const allow = (process.env.DESK_ALLOWED_EMAIL || "awaisu@saylware.com").toLowerCase();
  const e = email.trim().toLowerCase();
  if (!e) return false;
  if (e === allow) return true;
  return e.endsWith("@saylware.com");
}

export function setupChecklist(input: {
  passwordSet: boolean;
  persistence: string;
  googleApp: boolean;
  googleConnected: boolean;
  meetUrl: string;
  hunter: boolean;
  mailboxReady: boolean;
}) {
  return [
    { id: "login", label: "Desk login password in Vercel", done: input.passwordSet },
    { id: "db", label: "Neon database (survives deploys)", done: input.persistence === "neon" },
    { id: "google-app", label: "Google app (Client ID + secret)", done: input.googleApp },
    { id: "mailbox", label: "Work mailbox connected", done: input.googleConnected || input.mailboxReady },
    { id: "meet", label: "Meeting link", done: Boolean(input.meetUrl) },
    { id: "hunter", label: "Hunter (find + verify people)", done: input.hunter },
  ];
}
