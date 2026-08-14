"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { DeskSnapshot } from "@/lib/desk/actions";
import {
  applyFoundPersonAction,
  draftMessageAction,
  findPeopleAction,
  polishMessageAction,
  setLeadStatusAction,
  submitForApprovalAction,
  suppressLeadAction,
  updateMessageAction,
  verifyLeadAction,
} from "@/lib/desk/actions";
import { lintCopy } from "@/lib/desk/lint";
import type { LeadStatus } from "@/lib/desk/types";
import { Badge, Card, Field, GhostButton, inputClass, PrimaryButton, statusTone } from "./ui";

export default function LeadDetail({ snap, leadId }: { snap: DeskSnapshot; leadId: string }) {
  const router = useRouter();
  const lead = snap.leads.find((l) => l.id === leadId);
  const messages = snap.messages.filter((m) => m.leadId === leadId);
  const [error, setError] = useState("");
  const [note, setNote] = useState("");
  const [found, setFound] = useState<{ email: string; name: string; role: string; confidence: number }[]>([]);
  const [editing, setEditing] = useState<Record<string, { subject: string; body: string }>>({});

  const liveLint = useMemo(() => {
    if (!lead) return [];
    const msg = messages[0];
    if (!msg) return [];
    const draft = editing[msg.id] || { subject: msg.subject, body: msg.body };
    return lintCopy(draft.subject, draft.body, lead, msg.meetUrl || snap.settings.meetUrl);
  }, [editing, lead, messages, snap.settings.meetUrl]);

  if (!lead) return <p className="text-sm text-[var(--ink-muted)]">Lead not found.</p>;

  async function run(fn: () => Promise<unknown>, ok?: string) {
    setError("");
    setNote("");
    try {
      await fn();
      if (ok) setNote(ok);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "That did not work.");
    }
  }

  return (
    <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-5">
      <div className="space-y-5">
        <Card>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="font-display text-xl font-bold">{lead.company}</h2>
              <p className="text-sm text-[var(--ink-soft)] mt-1">
                {lead.contactName} {lead.contactRole ? `· ${lead.contactRole}` : ""} · {lead.email}
              </p>
            </div>
            <Badge tone={statusTone(lead.status)}>{lead.status.replaceAll("_", " ")}</Badge>
          </div>
          <dl className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-[var(--ink-muted)] text-xs">Verification</dt>
              <dd>
                {lead.verification
                  ? `${lead.verification.verdict} · ${lead.verification.detail}`
                  : "Not checked yet"}
              </dd>
            </div>
            <div>
              <dt className="text-[var(--ink-muted)] text-xs">Score</dt>
              <dd className="font-mono">{lead.score}</dd>
            </div>
            {lead.job?.title ? (
              <div className="sm:col-span-2">
                <dt className="text-[var(--ink-muted)] text-xs">Hiring signal</dt>
                <dd>
                  {lead.job.title}
                  {lead.job.url ? (
                    <>
                      {" · "}
                      <a className="underline" href={lead.job.url} target="_blank" rel="noreferrer">
                        posting
                      </a>
                    </>
                  ) : null}
                </dd>
              </div>
            ) : null}
            {lead.research ? (
              <div className="sm:col-span-2">
                <dt className="text-[var(--ink-muted)] text-xs">What you noticed</dt>
                <dd>{lead.research}</dd>
              </div>
            ) : null}
          </dl>
          <div className="mt-5 flex flex-wrap gap-2">
            <PrimaryButton type="button" onClick={() => run(() => verifyLeadAction(lead.id), "Verification finished.")}>
              Verify email
            </PrimaryButton>
            <GhostButton
              type="button"
              onClick={() =>
                run(async () => {
                  const result = await findPeopleAction(lead.id);
                  if (!result.ok) throw new Error(result.error);
                  setFound(result.people);
                })
              }
            >
              Find people at domain
            </GhostButton>
            <GhostButton type="button" onClick={() => run(() => draftMessageAction(lead.id, 0), "Draft ready.")}>
              Draft first note
            </GhostButton>
          </div>
          {found.length > 0 ? (
            <ul className="mt-4 space-y-2 text-sm">
              {found.map((p) => (
                <li key={p.email} className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-white/5 px-3 py-2">
                  <span>
                    {p.name || "Unknown"} · {p.role || "role unknown"} · {p.email} ({p.confidence}%)
                  </span>
                  <GhostButton type="button" onClick={() => run(() => applyFoundPersonAction(lead.id, p), "Contact updated. Verify next.")}>
                    Use
                  </GhostButton>
                </li>
              ))}
            </ul>
          ) : null}
        </Card>

        {messages.map((msg) => {
          const draft = editing[msg.id] || { subject: msg.subject, body: msg.body };
          const canEdit = ["draft", "pending_approval"].includes(msg.status);
          return (
            <Card key={msg.id}>
              <div className="flex items-center justify-between gap-2 mb-3">
                <h3 className="font-display font-semibold">
                  {msg.type === "outreach" ? "First note" : `Follow-up ${msg.sequenceStep}`}
                </h3>
                <Badge tone={statusTone(msg.status)}>{msg.status.replaceAll("_", " ")}</Badge>
              </div>
              {canEdit ? (
                <div className="space-y-3">
                  <Field label="Subject">
                    <input
                      className={inputClass}
                      value={draft.subject}
                      onChange={(e) => setEditing((s) => ({ ...s, [msg.id]: { ...draft, subject: e.target.value } }))}
                    />
                  </Field>
                  <Field label="Body">
                    <textarea
                      className={`${inputClass} min-h-48 font-body`}
                      value={draft.body}
                      onChange={(e) => setEditing((s) => ({ ...s, [msg.id]: { ...draft, body: e.target.value } }))}
                    />
                  </Field>
                  <p className="text-xs text-[var(--ink-muted)]">{draft.body.trim().split(/\s+/).filter(Boolean).length} words</p>
                  {liveLint.map((issue) => (
                    <p key={issue.message} className={`text-xs ${issue.level === "block" ? "text-red-300" : "text-[var(--accent)]"}`}>
                      {issue.level === "block" ? "Block: " : "Check: "}
                      {issue.message}
                    </p>
                  ))}
                  <div className="flex flex-wrap gap-2">
                    <GhostButton
                      type="button"
                      onClick={() => run(() => updateMessageAction(msg.id, draft.subject, draft.body), "Saved.")}
                    >
                      Save edits
                    </GhostButton>
                    <GhostButton type="button" onClick={() => run(() => polishMessageAction(msg.id), "Rewrite attempted.")}>
                      Tighten wording
                    </GhostButton>
                    <PrimaryButton type="button" onClick={() => run(() => submitForApprovalAction(msg.id), "In the approve queue.")}>
                      Send to approve
                    </PrimaryButton>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 text-sm">
                  <p className="font-medium">{msg.subject}</p>
                  <pre className="whitespace-pre-wrap text-[var(--ink-soft)] font-body">{msg.body}</pre>
                  {msg.scheduledFor ? (
                    <p className="text-xs text-[var(--ink-muted)]">Scheduled {new Date(msg.scheduledFor).toLocaleString()}</p>
                  ) : null}
                  {msg.openedAt ? <p className="text-xs">Opened {new Date(msg.openedAt).toLocaleString()}</p> : null}
                  {msg.clickedAt ? <p className="text-xs">Meet link clicked {new Date(msg.clickedAt).toLocaleString()}</p> : null}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      <div className="space-y-5">
        <Card>
          <h3 className="font-display font-semibold mb-3">Status</h3>
          <div className="flex flex-wrap gap-2">
            {(["replied", "meeting", "won", "lost"] as LeadStatus[]).map((st) => (
              <GhostButton key={st} type="button" onClick={() => run(() => setLeadStatusAction(lead.id, st))}>
                Mark {st}
              </GhostButton>
            ))}
          </div>
          <div className="mt-4">
            <GhostButton
              type="button"
              onClick={() => run(() => suppressLeadAction(lead.id, "Do not contact"), "Suppressed.")}
            >
              Never contact again
            </GhostButton>
          </div>
        </Card>
        <Card>
          <h3 className="font-display font-semibold mb-2">How this stays human</h3>
          <ul className="text-sm text-[var(--ink-soft)] space-y-2">
            <li>You approve every send. The desk will not mail on its own.</li>
            <li>We look up people through Hunter (if connected), not by scraping job boards.</li>
            <li>Undeliverable and disposable inboxes cannot enter the queue.</li>
            <li>
              <Link href="/desk/queue" className="underline">
                Open the approve queue
              </Link>
            </li>
          </ul>
        </Card>
        {error ? <p className="text-sm text-red-300">{error}</p> : null}
        {note ? <p className="text-sm text-[var(--lime)]">{note}</p> : null}
      </div>
    </div>
  );
}
