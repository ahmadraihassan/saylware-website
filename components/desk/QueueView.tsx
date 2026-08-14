"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { DeskSnapshot } from "@/lib/desk/actions";
import { approveMessageAction, rejectMessageAction, sendDueNowAction } from "@/lib/desk/actions";
import { Badge, Card, GhostButton, PrimaryButton, statusTone } from "./ui";

export default function QueueView({ snap }: { snap: DeskSnapshot }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const pending = snap.messages.filter((m) => m.status === "pending_approval");
  const scheduled = snap.messages.filter((m) => m.status === "scheduled" || m.status === "approved");

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
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 items-center">
        <PrimaryButton
          type="button"
          onClick={() =>
            run(async () => {
              const result = await sendDueNowAction();
              setError(result.reason);
            })
          }
        >
          Send due mail now
        </PrimaryButton>
        <p className="text-sm text-[var(--ink-muted)]">
          {snap.stats.remainingToday} remaining today · {snap.stats.paused ? "paused" : "live"}
        </p>
      </div>
      {error ? <p className="text-sm text-[var(--ink-soft)]">{error}</p> : null}

      <section className="space-y-3">
        <h2 className="font-display font-semibold">Needs your eyes</h2>
        {pending.length === 0 ? (
          <Card>
            <p className="text-sm text-[var(--ink-muted)]">Nothing waiting. Draft a note from a lead, then send it here.</p>
          </Card>
        ) : (
          pending.map((msg) => {
            const lead = snap.leads.find((l) => l.id === msg.leadId);
            return (
              <Card key={msg.id}>
                <div className="flex flex-wrap justify-between gap-2 mb-3">
                  <div>
                    <p className="font-medium">
                      {lead?.company} · {lead?.contactName}
                    </p>
                    <p className="text-xs text-[var(--ink-muted)]">{lead?.email}</p>
                  </div>
                  <Badge tone={statusTone(lead?.verification?.verdict || "muted")}>
                    {lead?.verification?.verdict || "unverified"}
                  </Badge>
                </div>
                <p className="text-sm font-medium mb-2">{msg.subject}</p>
                <pre className="whitespace-pre-wrap text-sm text-[var(--ink-soft)] font-body mb-4">{msg.body}</pre>
                <div className="flex flex-wrap gap-2">
                  <PrimaryButton type="button" onClick={() => run(() => approveMessageAction(msg.id))}>
                    Approve and schedule
                  </PrimaryButton>
                  <GhostButton type="button" onClick={() => run(() => rejectMessageAction(msg.id))}>
                    Send back
                  </GhostButton>
                  {lead ? (
                    <Link href={`/desk/leads/${lead.id}`} className="rounded-full glass px-4 py-2.5 text-sm">
                      Edit on lead
                    </Link>
                  ) : null}
                </div>
              </Card>
            );
          })
        )}
      </section>

      <section className="space-y-3">
        <h2 className="font-display font-semibold">Scheduled</h2>
        {scheduled.length === 0 ? (
          <p className="text-sm text-[var(--ink-muted)]">No approved mail waiting on the send window.</p>
        ) : (
          <Card className="p-0 sm:p-0 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs text-[var(--ink-muted)]">
                <tr className="border-b border-white/8">
                  <th className="px-4 py-3">Company</th>
                  <th className="px-4 py-3">Subject</th>
                  <th className="px-4 py-3">When</th>
                </tr>
              </thead>
              <tbody>
                {scheduled.map((msg) => {
                  const lead = snap.leads.find((l) => l.id === msg.leadId);
                  return (
                    <tr key={msg.id} className="border-b border-white/6">
                      <td className="px-4 py-3">{lead?.company}</td>
                      <td className="px-4 py-3">{msg.subject}</td>
                      <td className="px-4 py-3 text-[var(--ink-muted)]">
                        {msg.scheduledFor ? new Date(msg.scheduledFor).toLocaleString() : "next window"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        )}
      </section>
    </div>
  );
}
