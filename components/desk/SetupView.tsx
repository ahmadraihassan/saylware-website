"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { DeskSnapshot } from "@/lib/desk/actions";
import { saveSetupAction } from "@/lib/desk/actions";
import { Badge, Card, Field, GhostButton, inputClass, PrimaryButton } from "./ui";

function Copy({ value }: { value: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      type="button"
      className="text-xs text-[var(--accent)]"
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setOk(true);
      }}
    >
      {ok ? "Copied" : "Copy"}
    </button>
  );
}

export default function SetupView({ snap }: { snap: DeskSnapshot }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [note, setNote] = useState("");
  const origin = typeof window !== "undefined" ? window.location.origin : "https://saylware.com";
  const redirectUri = `${origin}/api/desk/google/callback`;
  const s = snap.settings;

  async function onSave(formData: FormData) {
    setError("");
    setNote("");
    try {
      await saveSetupAction({
        googleClientId: String(formData.get("googleClientId") || ""),
        googleClientSecret: String(formData.get("googleClientSecret") || "") || undefined,
        hunterApiKey: String(formData.get("hunterApiKey") || "") || undefined,
        meetUrl: String(formData.get("meetUrl") || ""),
        physicalAddress: String(formData.get("physicalAddress") || ""),
        senderName: String(formData.get("senderName") || ""),
        senderEmail: String(formData.get("senderEmail") || ""),
        smtpHost: String(formData.get("smtpHost") || ""),
        smtpPort: Number(formData.get("smtpPort") || 587),
        smtpUser: String(formData.get("smtpUser") || ""),
        smtpPass: String(formData.get("smtpPass") || "") || undefined,
        autopilot: formData.get("autopilot") === "on",
      });
      setNote("Saved. If you just added Google keys, click Connect work mail next.");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save.");
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="font-display font-semibold mb-3">Status</h2>
        <ul className="space-y-2">
          {snap.checklist.map((row) => (
            <li key={row.id} className="flex items-center gap-2 text-sm">
              <Badge tone={row.done ? "lime" : "warn"}>{row.done ? "Ready" : "Do this"}</Badge>
              <span>{row.label}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--accent)] mb-2">Step 1</p>
        <h2 className="font-display font-semibold mb-2">Neon database</h2>
        <p className="text-sm text-[var(--ink-soft)] mb-3">
          Vercel file storage is wiped on each deploy. Neon keeps leads and drafts.
        </p>
        {snap.persistence === "neon" ? (
          <p className="text-sm text-[var(--lime)]">Database is connected.</p>
        ) : (
          <ol className="text-sm text-[var(--ink-soft)] space-y-2 list-decimal pl-5">
            <li>
              Open{" "}
              <a className="underline" href="https://vercel.com/dashboard" target="_blank" rel="noreferrer">
                Vercel Dashboard
              </a>{" "}
              → your <span className="font-medium text-[var(--ink)]">saylware-website</span> project.
            </li>
            <li>Storage → Create Database → <span className="text-[var(--ink)]">Neon</span> → accept the free plan → connect to this project.</li>
            <li>
              Or:{" "}
              <a className="underline" href="https://console.neon.tech" target="_blank" rel="noreferrer">
                console.neon.tech
              </a>{" "}
              → New project → copy the connection string.
            </li>
            <li>
              Vercel → Settings → Environment Variables → add <span className="font-mono text-[var(--ink)]">DATABASE_URL</span> for Production, Preview, and Development.
            </li>
            <li>Redeploy the project so the desk can see it.</li>
          </ol>
        )}
      </Card>

      <Card>
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--accent)] mb-2">Step 2</p>
        <h2 className="font-display font-semibold mb-2">Connect awaisu@saylware.com</h2>
        <p className="text-sm text-[var(--ink-soft)] mb-4">
          This uses Google Workspace OAuth so the desk can send as you and watch for replies. Use an Internal app so Google does not need a public review.
        </p>
        <ol className="text-sm text-[var(--ink-soft)] space-y-2 list-decimal pl-5 mb-5">
          <li>
            Open{" "}
            <a className="underline" href="https://console.cloud.google.com/apis/library/gmail.googleapis.com" target="_blank" rel="noreferrer">
              Gmail API
            </a>{" "}
            in Google Cloud. Create a project named Saylware Desk if asked. Enable the API.
          </li>
          <li>
            APIs &amp; Services →{" "}
            <a className="underline" href="https://console.cloud.google.com/auth/overview" target="_blank" rel="noreferrer">
              OAuth consent screen
            </a>
            . User type: <span className="text-[var(--ink)]">Internal</span> (Workspace). App name: Saylware Desk. Support email: yours.
          </li>
          <li>
            Scopes: <span className="font-mono text-[11px] text-[var(--ink)]">gmail.send</span>,{" "}
            <span className="font-mono text-[11px] text-[var(--ink)]">gmail.readonly</span>,{" "}
            <span className="font-mono text-[11px] text-[var(--ink)]">userinfo.email</span>
          </li>
          <li>
            Credentials → Create credentials → OAuth client ID → Web application. Authorized redirect URI:
            <span className="mt-2 flex items-center gap-2 font-mono text-[12px] text-[var(--ink)] break-all">
              {redirectUri} <Copy value={redirectUri} />
            </span>
            Also add <span className="font-mono text-[12px] text-[var(--ink)]">https://saylware.com/api/desk/google/callback</span> if this preview URL is different.
          </li>
          <li>Copy Client ID and Client secret into the form below. Save. Then click Connect work mail and sign in as {snap.allowedEmail}.</li>
        </ol>
        {s.googleConnected ? (
          <p className="text-sm text-[var(--lime)] mb-4">Connected as {s.googleEmail}</p>
        ) : null}
        <form action={onSave} className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Field label="Google Client ID">
              <input name="googleClientId" defaultValue={s.googleClientId} className={inputClass} placeholder="xxxxx.apps.googleusercontent.com" />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Google Client secret">
              <input name="googleClientSecret" type="password" className={inputClass} placeholder={s.googleSecretSet ? "Saved" : ""} />
            </Field>
          </div>
          <Field label="Your name on emails">
            <input name="senderName" defaultValue={s.senderName} className={inputClass} />
          </Field>
          <Field label="From email">
            <input name="senderEmail" defaultValue={s.senderEmail} className={inputClass} />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Meeting link">
              <input name="meetUrl" defaultValue={s.meetUrl} className={inputClass} placeholder="https://cal.com/awais/15" />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Physical address (on every email)">
              <input name="physicalAddress" defaultValue={s.physicalAddress} className={inputClass} />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Hunter API key (find + verify people)">
              <input name="hunterApiKey" type="password" className={inputClass} placeholder={s.hunterSet ? "Saved" : "hunter.io → API"} />
            </Field>
          </div>
          <p className="sm:col-span-2 text-sm text-[var(--ink-muted)]">
            Optional SMTP fallback if OAuth is delayed: Google Account → Security → 2-Step Verification → App passwords. Host smtp.gmail.com, port 587, user {snap.allowedEmail}.
          </p>
          <Field label="SMTP host">
            <input name="smtpHost" defaultValue={s.smtpHost} className={inputClass} />
          </Field>
          <Field label="SMTP port">
            <input name="smtpPort" type="number" defaultValue={s.smtpPort} className={inputClass} />
          </Field>
          <Field label="SMTP user">
            <input name="smtpUser" defaultValue={s.smtpUser} className={inputClass} />
          </Field>
          <Field label="SMTP app password">
            <input name="smtpPass" type="password" className={inputClass} placeholder={s.smtpPassSet ? "Saved" : ""} />
          </Field>
          <label className="sm:col-span-2 flex items-center gap-2 text-sm">
            <input type="checkbox" name="autopilot" defaultChecked={s.autopilot} />
            Autopilot: find people, verify, draft, and queue. You still approve every send.
          </label>
          <div className="sm:col-span-2 flex flex-wrap gap-2">
            <PrimaryButton type="submit">Save setup</PrimaryButton>
            {snap.googleApp ? (
              <a href="/api/desk/google/start" className="rounded-full bg-[var(--ink)] text-[var(--bg)] text-sm font-semibold px-4 py-2.5">
                Connect work mail
              </a>
            ) : (
              <GhostButton type="button" disabled>
                Save Google keys first
              </GhostButton>
            )}
          </div>
        </form>
        {error ? <p className="text-sm text-red-300 mt-3">{error}</p> : null}
        {note ? <p className="text-sm text-[var(--lime)] mt-3">{note}</p> : null}
      </Card>

      <Card>
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--accent)] mb-2">Step 3</p>
        <h2 className="font-display font-semibold mb-2">Hunter</h2>
        <p className="text-sm text-[var(--ink-soft)]">
          Create a free key at{" "}
          <a className="underline" href="https://hunter.io/api-keys" target="_blank" rel="noreferrer">
            hunter.io/api-keys
          </a>
          . Paste it in the form above. The desk uses it to find a named person at a company domain and to verify the inbox. It does not scrape Indeed.
        </p>
      </Card>
    </div>
  );
}
