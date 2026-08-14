"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { DeskSnapshot } from "@/lib/desk/actions";
import { completeReminderAction, draftMessageAction } from "@/lib/desk/actions";
import { Card, GhostButton, PrimaryButton } from "./ui";

export default function FollowupsView({ snap }: { snap: DeskSnapshot }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const items = [...snap.reminders].sort((a, b) => a.dueAt.localeCompare(b.dueAt));
  const open = items.filter((r) => !r.doneAt);
  const done = items.filter((r) => r.doneAt).slice(0, 12);

  async function run(fn: () => Promise<unknown>) {
    setError("");
    try {
      await fn();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update.");
    }
  }

  return (
    <div className="space-y-4">
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
      {open.length === 0 ? (
        <Card>
          <p className="text-sm text-[var(--ink-muted)]">No open reminders. Follow-ups appear 3 and 7 days after a first note is sent.</p>
        </Card>
      ) : (
        open.map((r) => {
          const lead = snap.leads.find((l) => l.id === r.leadId);
          const overdue = new Date(r.dueAt).getTime() < new Date(snap.now).getTime();
          const nextStep = lead
            ? snap.messages.filter((m) => m.leadId === lead.id).reduce((max, m) => Math.max(max, m.sequenceStep), 0)
            : 0;
          const step = Math.min(2, nextStep + 1) as 0 | 1 | 2;
          return (
            <Card key={r.id} className={overdue ? "border-red-400/20" : ""}>
              <div className="flex flex-wrap justify-between gap-3">
                <div>
                  <p className="font-medium">{r.title}</p>
                  <p className="text-xs text-[var(--ink-muted)] mt-1">
                    {r.type} · due {new Date(r.dueAt).toLocaleString()}
                    {overdue ? " · overdue" : ""}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {lead && r.type === "followup" ? (
                    <PrimaryButton type="button" onClick={() => run(() => draftMessageAction(lead.id, step))}>
                      Draft follow-up
                    </PrimaryButton>
                  ) : null}
                  {lead ? (
                    <Link href={`/desk/leads/${lead.id}`} className="rounded-full glass px-4 py-2.5 text-sm">
                      Open lead
                    </Link>
                  ) : null}
                  <GhostButton type="button" onClick={() => run(() => completeReminderAction(r.id))}>
                    Done
                  </GhostButton>
                </div>
              </div>
            </Card>
          );
        })
      )}
      {done.length > 0 ? (
        <div>
          <h2 className="font-display font-semibold mb-3">Cleared</h2>
          <ul className="text-sm text-[var(--ink-muted)] space-y-1">
            {done.map((r) => (
              <li key={r.id}>
                {r.title} · {r.doneAt ? new Date(r.doneAt).toLocaleDateString() : ""}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
