import type { DeskSettings, Message } from "./types";
import { mailboxReady, freshAccessToken, gmailSend } from "./gmail";
import { decryptSecret } from "./secret";

function encodeHeader(value: string) {
  if (/^[\x20-\x7E]*$/.test(value)) return value;
  return `=?UTF-8?B?${Buffer.from(value).toString("base64")}?=`;
}

export function buildRfc822(opts: {
  settings: DeskSettings;
  to: string;
  subject: string;
  body: string;
  unsubUrl: string;
  pixelUrl?: string | null;
}) {
  const from = `${opts.settings.senderName} <${opts.settings.senderEmail}>`;
  const pixel = opts.pixelUrl
    ? `\n\n<img src="${opts.pixelUrl}" width="1" height="1" alt="" />`
    : "";
  const html = `<pre style="font-family:Georgia,serif;font-size:15px;line-height:1.5;white-space:pre-wrap">${escapeHtml(opts.body)}</pre>${pixel}`;
  const boundary = `sayl_${Math.random().toString(36).slice(2)}`;
  const headers = [
    `From: ${from}`,
    `To: ${opts.to}`,
    `Subject: ${encodeHeader(opts.subject)}`,
    "MIME-Version: 1.0",
    `List-Unsubscribe: <${opts.unsubUrl}>`,
    "List-Unsubscribe-Post: List-Unsubscribe=One-Click",
    "X-Mailer: Saylware Desk",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
  ];
  return `${headers.join("\r\n")}\r\n\r\n--${boundary}\r\nContent-Type: text/plain; charset=UTF-8\r\n\r\n${opts.body}\r\n--${boundary}\r\nContent-Type: text/html; charset=UTF-8\r\n\r\n${html}\r\n--${boundary}--`;
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function deliverMail(opts: {
  settings: DeskSettings;
  to: string;
  subject: string;
  body: string;
  unsubUrl: string;
  pixelUrl?: string | null;
}): Promise<{ settings: DeskSettings }> {
  if (!mailboxReady(opts.settings)) {
    throw new Error("Connect Gmail or SMTP in Settings before sending.");
  }
  const raw = buildRfc822(opts);
  let settings = opts.settings;

  if (settings.google?.refreshToken) {
    const fresh = await freshAccessToken(settings.google, settings);
    settings = { ...settings, google: fresh.tokens };
    await gmailSend(fresh.access, raw);
    return { settings };
  }

  const nodemailer = await import("nodemailer");
  const transport = nodemailer.createTransport({
    host: settings.smtpHost,
    port: settings.smtpPort,
    secure: settings.smtpPort === 465,
    auth: {
      user: settings.smtpUser,
      pass: decryptSecret(settings.smtpPass) || settings.smtpPass,
    },
  });
  await transport.sendMail({
    from: `${settings.senderName} <${settings.senderEmail}>`,
    to: opts.to,
    subject: opts.subject,
    text: opts.body,
    list: { unsubscribe: { url: opts.unsubUrl, comment: "stop these notes" } },
  });
  return { settings };
}

export function publicBase() {
  return process.env.DESK_PUBLIC_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");
}

export function trackingUrls(message: Pick<Message, "openToken" | "clickToken" | "unsubToken">, meetUrl: string) {
  const base = publicBase();
  return {
    pixelUrl: `${base}/api/desk/t/${message.openToken}`,
    clickUrl: `${base}/api/desk/c/${message.clickToken}?to=${encodeURIComponent(meetUrl)}`,
    unsubUrl: `${base}/api/desk/u/${message.unsubToken}`,
  };
}
