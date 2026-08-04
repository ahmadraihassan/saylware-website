"use client";

import { useState, FormEvent } from "react";

type Track = "security" | "support" | "general";

const roles = [
  "Founder / CEO",
  "CTO / Engineering",
  "IT / Security Lead",
  "Head of Support / CX",
  "Operations",
  "Other",
];

const countries = ["Pakistan", "United States", "United Kingdom", "UAE", "Saudi Arabia", "Canada", "Other"];

export default function LeadForm({
  formspreeId,
  heading,
  subheading,
  submitLabel,
  track,
}: {
  formspreeId: string;
  heading: string;
  subheading: string;
  submitLabel: string;
  track: Track;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const notConfigured = formspreeId.startsWith("REPLACE_WITH");
  const funnel =
    track === "security" ? "Cybersecurity" : track === "support" ? "Customer Service" : "General";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (notConfigured) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("funnel", funnel);
    const first = String(data.get("firstName") || "");
    const last = String(data.get("lastName") || "");
    data.set("name", `${first} ${last}`.trim());

    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const field =
    "w-full rounded-xl border border-[var(--border)] px-3.5 py-3 text-sm bg-white/[0.03] text-[var(--ink)] placeholder:text-[var(--ink-muted)] outline-none";

  return (
    <div>
      <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">{heading}</h3>
      <p className="mt-2 text-sm text-[var(--ink-soft)]">{subheading}</p>

      {status === "success" ? (
        <div className="mt-8 rounded-2xl px-5 py-4 text-sm glass-strong text-[var(--lime)]">
          Thanks. Your message is in. We will be in touch within one business day.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-[11px] font-medium mb-1.5 text-[var(--ink-muted)]">First Name</label>
              <input name="firstName" required className={field} placeholder="First name" />
            </div>
            <div>
              <label className="block text-[11px] font-medium mb-1.5 text-[var(--ink-muted)]">Last Name</label>
              <input name="lastName" required className={field} placeholder="Last name" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-[11px] font-medium mb-1.5 text-[var(--ink-muted)]">Email</label>
              <input name="email" type="email" required className={field} placeholder="john@company.com" />
            </div>
            <div>
              <label className="block text-[11px] font-medium mb-1.5 text-[var(--ink-muted)]">Country</label>
              <select name="country" required className={field} defaultValue="">
                <option value="" disabled>
                  Select country
                </option>
                {countries.map((c) => (
                  <option key={c} value={c} className="bg-[var(--bg-elevated)]">
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium mb-1.5 text-[var(--ink-muted)]">Your Role</label>
            <select name="role" required className={field} defaultValue="">
              <option value="" disabled>
                Select your role
              </option>
              {roles.map((r) => (
                <option key={r} value={r} className="bg-[var(--bg-elevated)]">
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-medium mb-1.5 text-[var(--ink-muted)]">Message</label>
            <textarea
              name="message"
              rows={4}
              required
              className={`${field} resize-none`}
              placeholder="Tell us what you need..."
            />
          </div>

          <div className="flex items-center justify-between gap-3 flex-wrap pt-1">
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-full px-6 py-3 text-sm font-bold text-[var(--bg)] bg-[var(--accent)] hover:scale-[1.02] transition-transform disabled:opacity-60"
            >
              {status === "loading" ? "Sending…" : submitLabel}
            </button>
            {status === "error" && (
              <p className="text-xs text-red-400">
                {notConfigured
                  ? "Form is not connected yet."
                  : "Something went wrong. Please try again."}
              </p>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
