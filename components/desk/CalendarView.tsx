"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { DeskSnapshot } from "@/lib/desk/actions";
import { addMeetingAction } from "@/lib/desk/actions";
import { Card, Field, inputClass, PrimaryButton } from "./ui";

export default function CalendarView({ snap }: { snap: DeskSnapshot }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const meetings = [...snap.meetings].sort((a, b) => a.startsAt.localeCompare(b.startsAt));

  async function onSubmit(formData: FormData) {
    setError("");
    try {
      await addMeetingAction({
        leadId: String(formData.get("leadId") || ""),
        title: String(formData.get("title") || ""),
        startsAt: String(formData.get("startsAt") || ""),
        endsAt: String(formData.get("endsAt") || ""),
        location: String(formData.get("location") || snap.settings.meetUrl),
        notes: String(formData.get("notes") || ""),
      });
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save meeting.");
    }
  }

  return (
    <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-5">
      <Card>
        <form action={onSubmit} className="space-y-4">
          <Field label="Lead">
            <select name="leadId" required className={inputClass} defaultValue="">
              <option value="" disabled>
                Select
              </option>
              {snap.leads.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.company} · {l.contactName}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Title">
            <input name="title" className={inputClass} placeholder="Intro call" />
          </Field>
          <Field label="Starts">
            <input name="startsAt" type="datetime-local" required className={inputClass} />
          </Field>
          <Field label="Ends">
            <input name="endsAt" type="datetime-local" className={inputClass} />
          </Field>
          <Field label="Where">
            <input name="location" className={inputClass} defaultValue={snap.settings.meetUrl} />
          </Field>
          <Field label="Notes">
            <textarea name="notes" rows={3} className={inputClass} />
          </Field>
          <PrimaryButton type="submit">Add meeting</PrimaryButton>
        </form>
        {error ? <p className="text-sm text-red-300 mt-3">{error}</p> : null}
      </Card>
      <div className="space-y-3">
        {meetings.length === 0 ? (
          <Card>
            <p className="text-sm text-[var(--ink-muted)]">No meetings yet. When someone books, log it here so a reminder fires an hour before.</p>
          </Card>
        ) : (
          meetings.map((m) => {
            const lead = snap.leads.find((l) => l.id === m.leadId);
            return (
              <Card key={m.id}>
                <p className="font-medium">{m.title}</p>
                <p className="text-sm text-[var(--ink-soft)] mt-1">
                  {lead?.company} · {new Date(m.startsAt).toLocaleString()}
                </p>
                {m.location ? (
                  <p className="text-sm mt-2">
                    <a className="underline" href={m.location} target="_blank" rel="noreferrer">
                      {m.location}
                    </a>
                  </p>
                ) : null}
                {m.notes ? <p className="text-sm text-[var(--ink-muted)] mt-2">{m.notes}</p> : null}
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
