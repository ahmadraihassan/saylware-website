import { decryptSecret, encryptSecret } from "./secret";
import type { DeskSettings, GoogleTokens } from "./types";

const SCOPES = [
  "https://www.googleapis.com/auth/gmail.send",
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/userinfo.email",
].join(" ");

export function googleConfigured() {
  return Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
}

export function googleAuthUrl(origin: string) {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID || "",
    redirect_uri: `${origin}/api/desk/google/callback`,
    response_type: "code",
    scope: SCOPES,
    access_type: "offline",
    prompt: "consent",
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

export async function exchangeCode(code: string, origin: string): Promise<GoogleTokens> {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID || "",
      client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
      redirect_uri: `${origin}/api/desk/google/callback`,
      grant_type: "authorization_code",
    }),
  });
  if (!res.ok) throw new Error(`Google token exchange failed (${res.status})`);
  const json = (await res.json()) as {
    access_token: string;
    refresh_token?: string;
    expires_in: number;
  };
  const email = await fetchGoogleEmail(json.access_token);
  return {
    accessToken: encryptSecret(json.access_token),
    refreshToken: encryptSecret(json.refresh_token || ""),
    expiry: Date.now() + json.expires_in * 1000,
    email,
  };
}

async function fetchGoogleEmail(access: string) {
  const res = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: { Authorization: `Bearer ${access}` },
  });
  const json = (await res.json()) as { email?: string };
  return json.email || "";
}

export async function freshAccessToken(tokens: GoogleTokens) {
  const access = decryptSecret(tokens.accessToken);
  if (Date.now() < tokens.expiry - 30_000) return { access, tokens };
  const refresh = decryptSecret(tokens.refreshToken);
  if (!refresh) return { access, tokens };
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID || "",
      client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
      refresh_token: refresh,
      grant_type: "refresh_token",
    }),
  });
  if (!res.ok) throw new Error("Could not refresh Gmail access. Reconnect Google in Settings.");
  const json = (await res.json()) as { access_token: string; expires_in: number };
  const next: GoogleTokens = {
    ...tokens,
    accessToken: encryptSecret(json.access_token),
    expiry: Date.now() + json.expires_in * 1000,
  };
  return { access: json.access_token, tokens: next };
}

export async function gmailSend(access: string, rawRfc822: string) {
  const raw = Buffer.from(rawRfc822).toString("base64url");
  const res = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ raw }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Gmail send failed: ${text.slice(0, 180)}`);
  }
}

export async function gmailReplied(access: string, email: string, sinceIso: string) {
  const after = Math.floor(new Date(sinceIso).getTime() / 1000);
  const q = `from:${email} after:${after}`;
  const res = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=5&q=${encodeURIComponent(q)}`,
    { headers: { Authorization: `Bearer ${access}` } },
  );
  if (!res.ok) return false;
  const json = (await res.json()) as { messages?: { id: string }[] };
  return Boolean(json.messages?.length);
}

export function mailboxReady(settings: DeskSettings) {
  if (settings.google?.refreshToken) return true;
  if (settings.smtpHost && settings.smtpUser && settings.smtpPass) return true;
  return false;
}
