"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { DeskSnapshot } from "@/lib/desk/actions";
import { importCsvAction, upsertLeadAction } from "@/lib/desk/actions";
import { CONTEXT_LABEL } from "@/lib/desk/lint";
import { Badge, Card, Field, GhostButton, inputClass, PrimaryButton, statusTone } from "./ui";

export default function LeadsView({ snap }: { snap: DeskSnapshot }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const filtered = snap.leads.filter((l) => {
    const blob = `${l.company} ${l.contactName} ${l.email} ${l.context}`.toLowerCase();
    return blob.includes(q.toLowerCase());
  });

  async function onCreate(formData: FormData) {
    setError("");
    try {
      const id = await upsertLeadAction({
        company: String(formData.get("company") || ""),
        domain: String(formData.get("domain") || ""),
        contactName: String(formData.get("contactName") || ""),
        contactRole: String(formData.get("contactRole") || ""),
        email: String(formData.get("email") || ""),
        context: String(formData.get("context") || "general") as "security" | "care" | "hiring" | "general",
        source: "manual",
        research: String(formData.get("research") || ""),
      });
      router.push(`/desk/leads/${id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save.");
    }
  }

  async function onCsv(formData: FormData) {
    setError("");
    const file = formData.get("csv") as File | null;
    if (!file) return;
    try {
      const text = await file.text();
      const n = await importCsvAction(text);
      setError(`Imported ${n} new lead${n === 1 ? "" : "s"}. Duplicates were skipped.`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Import failed.");
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3 items-center">
        <input className={`${inputClass} max-w-sm`} placeholder="Search company, person, email" value={q} onChange={(e) => setQ(e.target.value)} />
        <PrimaryButton type="button" onClick={() => setOpen((v) => !v)}>
          {open ? "Close" : "New lead"}
        </PrimaryButton>
      </div>

      {open ? (
        <Card>
          <form action={onCreate} className="grid sm:grid-cols-2 gap-4">
            <Field label="Company">
              <input name="company" required className={inputClass} />
            </Field>
            <Field label="Domain (optional)">
              <input name="domain" placeholder="acme.com" className={inputClass} />
            </Field>
            <Field label="Person">
              <input name="contactName" required className={inputClass} />
            </Field>
            <Field label="Role">
              <input name="contactRole" placeholder="Head of Ops" className={inputClass} />
            </Field>
            <Field label="Work email">
              <input name="email" type="email" required className={inputClass} />
            </Field>
            <Field label="Context">
              <select name="context" className={inputClass} defaultValue="security">
                <option value="security">Cybersecurity</option>
                <option value="care">Customer care</option>
                <option value="hiring">Hiring cost</option>
                <option value="general">General</option>
              </select>
            </Field>
            <div className="sm:col-span-2">
              <Field label="What you noticed (used in the draft)">
                <textarea name="research" rows={3} className={inputClass} placeholder="They posted a SOC analyst role. Alert volume is likely the pain." />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <PrimaryButton type="submit">Save lead</PrimaryButton>
            </div>
          </form>
          <form action={onCsv} className="mt-6 pt-6 border-t border-white/8 flex flex-wrap gap-3 items-end">
            <Field label="Or import CSV (company, email, name, role, context, job, research)">
              <input name="csv" type="file" accept=".csv,text/csv" className="text-sm" />
            </Field>
            <GhostButton type="submit">Import</GhostButton>
          </form>
        </Card>
      ) : null}

      {error ? <p className="text-sm text-red-300">{error}</p> : null}

      <Card className="overflow-x-auto p-0 sm:p-0">
        <table className="w-full text-sm">
          <thead className="text-left text-[var(--ink-muted)] text-xs">
            <tr className="border-b border-white/8">
              <th className="px-4 py-3 font-medium">Company</th>
              <th className="px-4 py-3 font-medium">Person</th>
              <th className="px-4 py-3 font-medium">Context</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Score</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-[var(--ink-muted)]">
                  No leads yet. Add one, or start from a hiring signal.
                </td>
              </tr>
            ) : (
              filtered.map((lead) => (
                <tr key={lead.id} className="border-b border-white/6 hover:bg-white/3">
                  <td className="px-4 py-3">
                    <Link href={`/desk/leads/${lead.id}`} className="font-medium hover:text-[var(--accent)]">
                      {lead.company}
                    </Link>
                    <div className="text-xs text-[var(--ink-muted)]">{lead.domain}</div>
                  </td>
                  <td className="px-4 py-3">
                    {lead.contactName || "—"}
                    <div className="text-xs text-[var(--ink-muted)]">{lead.email}</div>
                  </td>
                  <td className="px-4 py-3">{CONTEXT_LABEL[lead.context]}</td>
                  <td className="px-4 py-3">
                    <Badge tone={statusTone(lead.status)}>{lead.status.replaceAll("_", " ")}</Badge>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">{lead.score}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
