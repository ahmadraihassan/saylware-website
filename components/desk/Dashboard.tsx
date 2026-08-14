"use client";

import Link from "next/link";
import { Badge, Card } from "./ui";
import type { DeskSnapshot } from "@/lib/desk/actions";

export default function Dashboard({ snap }: { snap: DeskSnapshot }) {
  const s = snap.stats;
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

  return (
    <div className="space-y-6">
      {s.paused ? (
        <div className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          Sending is paused. Nothing leaves the queue until you turn it back on in Settings.
        </div>
      ) : null}
      {!snap.settings.mailboxReady ? (
        <div className="rounded-2xl border border-[var(--accent)]/30 bg-[var(--accent-dim)] px-4 py-3 text-sm">
          Connect Gmail or SMTP in <Link href="/desk/settings" className="underline">Settings</Link> before anything can send. Drafts and approvals still work.
        </div>
      ) : null}
      {!snap.settings.meetUrl ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-[var(--ink-soft)]">
          Add a Cal.com or Google Meet link in Settings. Every note includes it.
        </div>
      ) : null}

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
          <h2 className="font-display font-semibold mb-3">What to do next</h2>
          <ul className="space-y-2 text-sm text-[var(--ink-soft)]">
            <li>
              <Link href="/desk/queue" className="text-[var(--ink)] underline">
                {s.awaiting} note{s.awaiting === 1 ? "" : "s"} waiting for your eyes
              </Link>
            </li>
            <li>
              <Link href="/desk/follow-ups" className="text-[var(--ink)] underline">
                {s.dueReminders} follow-up{s.dueReminders === 1 ? "" : "s"} due
              </Link>
            </li>
            <li>
              <Link href="/desk/jobs" className="text-[var(--ink)] underline">
                Add a hiring signal
              </Link>{" "}
              when a company posts a role you can cover cheaper than a new seat.
            </li>
          </ul>
        </Card>
        <Card>
          <h2 className="font-display font-semibold mb-3">Guardrails</h2>
          <ul className="space-y-2 text-sm text-[var(--ink-soft)]">
            <li>Hard cap: 50 a day, with a slow warmup so the mailbox stays trusted.</li>
            <li>Nothing sends until you approve it. No bulk blast.</li>
            <li>Same company and same inbox are blocked from a second thread.</li>
            <li>Opens are a weak signal (many clients hide images). Replies and meet clicks matter more.</li>
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
          <p className="text-sm text-[var(--ink-muted)]">Nothing yet. Add a lead or a hiring signal to start.</p>
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
