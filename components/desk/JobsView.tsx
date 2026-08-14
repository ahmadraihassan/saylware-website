"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { upsertLeadAction } from "@/lib/desk/actions";
import { Card, Field, inputClass, PrimaryButton } from "./ui";

export default function JobsView() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function onSubmit(formData: FormData) {
    setError("");
    try {
      const id = await upsertLeadAction({
        company: String(formData.get("company") || ""),
        domain: String(formData.get("domain") || ""),
        contactName: String(formData.get("contactName") || ""),
        contactRole: String(formData.get("contactRole") || ""),
        email: String(formData.get("email") || ""),
        context: "hiring",
        source: "hiring_signal",
        jobTitle: String(formData.get("jobTitle") || ""),
        jobUrl: String(formData.get("jobUrl") || ""),
        jobLocation: String(formData.get("jobLocation") || ""),
        research: String(formData.get("research") || ""),
      });
      router.push(`/desk/leads/${id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save.");
    }
  }

  return (
    <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-5">
      <Card>
        <form action={onSubmit} className="grid sm:grid-cols-2 gap-4">
          <Field label="Company">
            <input name="company" required className={inputClass} />
          </Field>
          <Field label="Company domain">
            <input name="domain" placeholder="acme.com" className={inputClass} />
          </Field>
          <Field label="Role they posted">
            <input name="jobTitle" required className={inputClass} placeholder="SOC analyst" />
          </Field>
          <Field label="Job URL (paste what you found)">
            <input name="jobUrl" className={inputClass} placeholder="https://..." />
          </Field>
          <Field label="Location">
            <input name="jobLocation" className={inputClass} />
          </Field>
          <Field label="Person to write (if you already have one)">
            <input name="contactName" className={inputClass} />
          </Field>
          <Field label="Their role">
            <input name="contactRole" className={inputClass} placeholder="CEO, Head of IT" />
          </Field>
          <Field label="Work email (or add later after Find people)">
            <input name="email" type="email" className={inputClass} />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Why this hire might be expensive">
              <textarea
                name="research"
                rows={3}
                className={inputClass}
                placeholder="Night coverage, ticket backlog, they are hiring two analysts at once."
              />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <PrimaryButton type="submit">Create hiring lead</PrimaryButton>
          </div>
        </form>
        {error ? <p className="text-sm text-red-300 mt-3">{error}</p> : null}
      </Card>
      <Card>
        <h2 className="font-display font-semibold mb-3">How to use hiring without burning the domain</h2>
        <ol className="text-sm text-[var(--ink-soft)] space-y-3 list-decimal pl-5">
          <li>Find a real posting yourself (Indeed, LinkedIn, their site). Paste the URL. We do not scrape those sites.</li>
          <li>Write the person who owns cost, not a random inbox. CEO, founder, ops, or the hiring manager.</li>
          <li>Look them up with Hunter in the lead page, or add an email you already have. Then verify it.</li>
          <li>The draft talks about covering the work cheaper than another seat. You still approve every send.</li>
        </ol>
        <p className="text-sm text-[var(--ink-muted)] mt-4">
          Harvesting inboxes off a job board is against those sites&apos; rules and looks like spam. A named person plus a verified address is the path that gets replies.
        </p>
      </Card>
    </div>
  );
}
