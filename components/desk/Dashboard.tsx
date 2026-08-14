"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { runAutopilotAction } from "@/lib/desk/actions";
import type { DeskSnapshot } from "@/lib/desk/actions";
import { Badge, Card, PrimaryButton } from "./ui";

export default function Dashboard({ snap }: { snap: DeskSnapshot }) {
  const s = snap.stats;
  const router = useRouter();
  const [log, setLog] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const missing = snap.checklist.filter((c) => !c.done);
  const cards = [
    { label: "Leads", value: s.leads },
    { label: "Waiting on you", value: s.awaiting },
    { label: "Sent", value: s.sent },
    { label: "Left today", value: `${s.remainingToday}/${s.cap}` },
    { label: "Opens", value: `${s.openRate}%` },
    { label: "Clicks", value: `${s.clickRate}%` },
    { label: "Replies", value: `${s.replyRate}%` },
    { label: "Meetings", value: s.meetings },
  ];

  async function run() {
    setBusy(true);
    try {
      const result = await runAutopilotAction();
      setLog(result.log);
      router.refresh();
    } catch (err) {
      setLog([err instanceof Error ? err.message : "Run failed."]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      {missing.length > 0 ? (
        <div className="rounded-2xl border border-[var(--accent)]/30 bg-[var(--accent-dim)] px-4 py-3 text-sm">
          Finish <Link href="/desk/setup" className="underline">Setup</Link> ({missing.map((m) => m.label).join(" · ")}). Then you can run the desk and only approve.
        </div>
      ) : null}
      {s.paused ? (
        <div className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          Sending is paused. Nothing leaves the queue until you turn it back on in Settings.
        </div>
      ) : null}

      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display font-semibold">Run the desk</h2>
            <p className="text-sm text-[var(--ink-soft)] mt-1">
              Finds people, verifies inboxes, drafts notes, watches Gmail for replies, and sends what you already approved. You still sign off on every new note.
            </p>
          </div>
          <PrimaryButton type="button" disabled={busy} onClick={run}>
            {busy ? "Working…" : "Run now"}
          </PrimaryButton>
        </div>
        {log.length > 0 ? (
          <ul className="mt-4 space-y-1 text-sm text-[var(--ink-soft)]">
            {log.map((line, i) => (
              <li key={`${i}-${line}`}>{line}</li>
            ))}
          </ul>
        ) : null}
      </Card>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {cards.map((c) => (
          <Card key={c.label} className="p-4 sm:p-5">
            <p className="text-xs text-[var(--ink-muted)]">{c.label}</p>
            <p className="font-display text-2xl font-bold mt-1">{c.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <h2 className="font-display font-semibold mb-3">Your job</h2>
          <ul className="space-y-2 text-sm text-[var(--ink-soft)]">
            <li>
              <Link href="/desk/queue" className="text-[var(--ink)] underline">
                {s.awaiting} note{s.awaiting === 1 ? "" : "s"} to approve
              </Link>
            </li>
            <li>Reply to anyone who writes back. The desk marks replies from Gmail and stops follow-ups.</li>
            <li>
              <Link href="/desk/jobs" className="text-[var(--ink)] underline">
                Drop in a hiring signal
              </Link>{" "}
              when you see a role. Autopilot tries to find the right person.
            </li>
          </ul>
        </Card>
        <Card>
          <h2 className="font-display font-semibold mb-3">Guardrails</h2>
          <ul className="space-y-2 text-sm text-[var(--ink-soft)]">
            <li>Hard cap: 50 a day, with a slow warmup so the mailbox stays trusted.</li>
            <li>Nothing new leaves until you approve it.</li>
            <li>Same company and same inbox are blocked from a second thread.</li>
            <li>Opens are a weak signal. Replies and meet clicks matter more.</li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge tone={snap.settings.googleConnected ? "lime" : "muted"}>
              {snap.settings.googleConnected ? `Gmail ${snap.settings.googleEmail}` : "Gmail off"}
            </Badge>
            <Badge tone={snap.verifier ? "lime" : "warn"}>{snap.verifier ? "Verifier connected" : "MX-only checks"}</Badge>
            <Badge>{snap.persistence === "neon" ? "Saved to Postgres" : "Saved to local file"}</Badge>
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="font-display font-semibold mb-3">Recent activity</h2>
        {snap.events.length === 0 ? (
          <p className="text-sm text-[var(--ink-muted)]">Nothing yet. Add a hiring signal, then hit Run now.</p>
        ) : (
          <ul className="space-y-2">
            {snap.events.slice(0, 12).map((e) => (
              <li key={e.id} className="flex gap-3 text-sm">
                <span className="font-mono text-[11px] text-[var(--ink-muted)] w-40 shrink-0">
                  {new Date(e.at).toLocaleString()}
                </span>
                <span className="text-[var(--ink-soft)]">{e.detail}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
