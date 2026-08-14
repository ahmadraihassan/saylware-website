"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { DeskSnapshot } from "@/lib/desk/actions";
import { addSuppressionAction, disconnectGoogleAction, saveSettingsAction, syncRepliesAction } from "@/lib/desk/actions";
import { Card, Field, GhostButton, inputClass, PrimaryButton } from "./ui";

export default function SettingsView({ snap }: { snap: DeskSnapshot }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [note, setNote] = useState("");
  const s = snap.settings;

  async function onSave(formData: FormData) {
    setError("");
    setNote("");
    try {
      const days = String(formData.get("sendDays") || "1,2,3,4")
        .split(",")
        .map((n) => Number(n.trim()))
        .filter((n) => n >= 0 && n <= 6);
      await saveSettingsAction({
        senderName: String(formData.get("senderName") || ""),
        senderTitle: String(formData.get("senderTitle") || ""),
        senderEmail: String(formData.get("senderEmail") || ""),
        companyName: String(formData.get("companyName") || ""),
        physicalAddress: String(formData.get("physicalAddress") || ""),
        meetUrl: String(formData.get("meetUrl") || ""),
        dailyCap: Number(formData.get("dailyCap") || 50),
        warmupDays: Number(formData.get("warmupDays") || 8),
        sendDays: days.length ? days : [1, 2, 3, 4],
        sendStartHour: Number(formData.get("sendStartHour") || 8),
        sendEndHour: Number(formData.get("sendEndHour") || 11),
        timezone: String(formData.get("timezone") || "America/Denver"),
        trackOpens: formData.get("trackOpens") === "on",
        trackClicks: formData.get("trackClicks") === "on",
        pauseSending: formData.get("pauseSending") === "on",
        signature: String(formData.get("signature") || ""),
        smtpHost: String(formData.get("smtpHost") || ""),
        smtpPort: Number(formData.get("smtpPort") || 587),
        smtpUser: String(formData.get("smtpUser") || ""),
        smtpPass: String(formData.get("smtpPass") || "") || undefined,
      });
      setNote("Saved.");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save.");
    }
  }

  async function onSuppress(formData: FormData) {
    setError("");
    try {
      await addSuppressionAction(String(formData.get("email") || ""), String(formData.get("reason") || ""));
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not add.");
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="font-display font-semibold mb-4">Mailbox</h2>
        <p className="text-sm text-[var(--ink-soft)] mb-4">
          Mail should leave from your real inbox. That keeps threads in Gmail and avoids a cold sending domain.
        </p>
        {snap.googleApp ? (
          <div className="flex flex-wrap gap-2 mb-6">
            {s.googleConnected ? (
              <>
                <p className="text-sm">Connected as {s.googleEmail}</p>
                <GhostButton
                  type="button"
                  onClick={async () => {
                    await disconnectGoogleAction();
                    router.refresh();
                  }}
                >
                  Disconnect
                </GhostButton>
                <GhostButton
                  type="button"
                  onClick={async () => {
                    const n = await syncRepliesAction();
                    setNote(`Marked ${n} repl${n === 1 ? "y" : "ies"} from Gmail.`);
                    router.refresh();
                  }}
                >
                  Scan Gmail for replies
                </GhostButton>
              </>
            ) : (
              <a href="/api/desk/google/start" className="rounded-full bg-[var(--accent)] text-[var(--bg)] text-sm font-semibold px-4 py-2.5">
                Connect Gmail
              </a>
            )}
          </div>
        ) : (
          <p className="text-sm text-[var(--ink-muted)] mb-6">
            Finish Google Client ID and secret on the <a href="/desk/setup" className="underline">Setup</a> page, then connect your work mail.
          </p>
        )}
        <form action={onSave} className="grid sm:grid-cols-2 gap-4">
          <Field label="Your name">
            <input name="senderName" defaultValue={s.senderName} className={inputClass} />
          </Field>
          <Field label="From email">
            <input name="senderEmail" defaultValue={s.senderEmail} className={inputClass} />
          </Field>
          <Field label="Title / company line">
            <input name="senderTitle" defaultValue={s.senderTitle} className={inputClass} />
          </Field>
          <Field label="Company">
            <input name="companyName" defaultValue={s.companyName} className={inputClass} />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Physical address (required on every mail)">
              <input name="physicalAddress" defaultValue={s.physicalAddress} className={inputClass} />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Meeting link (Cal.com, Google Meet, or Hub)">
              <input name="meetUrl" defaultValue={s.meetUrl} className={inputClass} placeholder="https://cal.com/you/15" />
            </Field>
          </div>
          <Field label="Daily cap (max 50)">
            <input name="dailyCap" type="number" min={1} max={50} defaultValue={s.dailyCap} className={inputClass} />
          </Field>
          <Field label="Warmup days">
            <input name="warmupDays" type="number" min={1} max={30} defaultValue={s.warmupDays} className={inputClass} />
          </Field>
          <Field label="Send days (0=Sun … 6=Sat)">
            <input name="sendDays" defaultValue={s.sendDays.join(",")} className={inputClass} />
          </Field>
          <Field label="Timezone">
            <input name="timezone" defaultValue={s.timezone} className={inputClass} />
          </Field>
          <Field label="Window start hour">
            <input name="sendStartHour" type="number" min={0} max={23} defaultValue={s.sendStartHour} className={inputClass} />
          </Field>
          <Field label="Window end hour">
            <input name="sendEndHour" type="number" min={1} max={24} defaultValue={s.sendEndHour} className={inputClass} />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Signature">
              <textarea name="signature" rows={3} defaultValue={s.signature} className={inputClass} />
            </Field>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="trackClicks" defaultChecked={s.trackClicks} />
            Track meeting-link clicks
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="trackOpens" defaultChecked={s.trackOpens} />
            Track opens with a tiny image (off by default; many inboxes block it)
          </label>
          <label className="flex items-center gap-2 text-sm sm:col-span-2">
            <input type="checkbox" name="pauseSending" defaultChecked={s.pauseSending} />
            Pause all sending
          </label>
          <Field label="SMTP host (if not using Gmail)">
            <input name="smtpHost" defaultValue={s.smtpHost} className={inputClass} />
          </Field>
          <Field label="SMTP port">
            <input name="smtpPort" type="number" defaultValue={s.smtpPort} className={inputClass} />
          </Field>
          <Field label="SMTP user">
            <input name="smtpUser" defaultValue={s.smtpUser} className={inputClass} />
          </Field>
          <Field label="SMTP password">
            <input name="smtpPass" type="password" placeholder={s.smtpPassSet ? "Saved" : ""} className={inputClass} />
          </Field>
          <div className="sm:col-span-2">
            <PrimaryButton type="submit">Save settings</PrimaryButton>
          </div>
        </form>
      </Card>

      <Card>
        <h2 className="font-display font-semibold mb-2">Domain reputation</h2>
        <ul className="text-sm text-[var(--ink-soft)] space-y-2">
          <li>Send from the mailbox people already know (Gmail / Google Workspace), not a brand-new bulk domain.</li>
          <li>Keep SPF, DKIM, and DMARC aligned on saylware.com if you later send from that domain.</li>
          <li>Stay inside 50 a day. The warmup starts lower and climbs.</li>
          <li>Verify every address. Bounces hurt more than a skipped lead.</li>
          <li>Plain text, unique subjects, no fake Re: lines, no “urgent” copy.</li>
        </ul>
        <p className="text-sm text-[var(--ink-muted)] mt-3">
          Verifiers: set HUNTER_API_KEY, NEVERBOUNCE_API_KEY, or ABSTRACT_API_KEY. Status now: {snap.verifier ? "connected" : "MX and syntax only"}.
        </p>
      </Card>

      <Card>
        <h2 className="font-display font-semibold mb-4">Never contact</h2>
        <form action={onSuppress} className="flex flex-wrap gap-3 items-end mb-4">
          <Field label="Email">
            <input name="email" type="email" required className={inputClass} />
          </Field>
          <Field label="Reason">
            <input name="reason" className={inputClass} />
          </Field>
          <GhostButton type="submit">Add</GhostButton>
        </form>
        {snap.suppressions.length === 0 ? (
          <p className="text-sm text-[var(--ink-muted)]">Empty. Unsubscribes land here automatically.</p>
        ) : (
          <ul className="text-sm space-y-1">
            {snap.suppressions.map((row) => (
              <li key={row.id}>
                {row.email} · {row.reason}
              </li>
            ))}
          </ul>
        )}
      </Card>
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
      {note ? <p className="text-sm text-[var(--lime)]">{note}</p> : null}
    </div>
  );
}
