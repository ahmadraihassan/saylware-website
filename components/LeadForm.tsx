"use client";

import { useState, FormEvent } from "react";

type Track = "security" | "support";

export default function LeadForm({
  id,
  formspreeId,
  heading,
  subheading,
  submitLabel,
  track,
}: {
  id: string;
  formspreeId: string;
  heading: string;
  subheading: string;
  submitLabel: string;
  track: Track;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const accent = track === "security" ? "var(--signal-security)" : "var(--signal-support)";
  const accentDim = track === "security" ? "var(--signal-security-dim)" : "var(--signal-support-dim)";
  const gradient = track === "security" ? "var(--gradient-security)" : "var(--gradient-support)";
  const notConfigured = formspreeId.startsWith("REPLACE_WITH");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (notConfigured) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("funnel", track === "security" ? "Cybersecurity" : "Customer Service");

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

  return (
    <div
      id={id}
      className="relative rounded-[1.75rem] p-7 sm:p-10 overflow-hidden bg-[var(--bg-card)] border border-white/[0.06] scroll-mt-28"
    >
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: gradient }} />

      <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--ink)]">{heading}</h3>
      <p className="mt-3 text-sm text-[var(--ink-soft)]">{subheading}</p>

      {status === "success" ? (
        <div
          className="mt-8 rounded-2xl px-6 py-5 text-sm font-medium border"
          style={{ background: accentDim, borderColor: accent, color: accent }}
        >
          Thanks — your message is in. We&apos;ll be in touch within one business day.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-[11px] font-medium mb-2 text-[var(--ink-muted)] uppercase tracking-wider">
              Full name
            </label>
            <input
              name="name"
              type="text"
              required
              className="w-full rounded-2xl border border-white/10 px-4 py-3.5 text-sm bg-[var(--bg-elevated)] text-[var(--ink)] placeholder:text-[var(--ink-muted)] outline-none"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium mb-2 text-[var(--ink-muted)] uppercase tracking-wider">
              Work email
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full rounded-2xl border border-white/10 px-4 py-3.5 text-sm bg-[var(--bg-elevated)] text-[var(--ink)] placeholder:text-[var(--ink-muted)] outline-none"
              placeholder="john@company.com"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium mb-2 text-[var(--ink-muted)] uppercase tracking-wider">
              Company
            </label>
            <input
              name="company"
              type="text"
              className="w-full rounded-2xl border border-white/10 px-4 py-3.5 text-sm bg-[var(--bg-elevated)] text-[var(--ink)] placeholder:text-[var(--ink-muted)] outline-none"
              placeholder="Acme Inc."
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium mb-2 text-[var(--ink-muted)] uppercase tracking-wider">
              Phone (optional)
            </label>
            <input
              name="phone"
              type="tel"
              className="w-full rounded-2xl border border-white/10 px-4 py-3.5 text-sm bg-[var(--bg-elevated)] text-[var(--ink)] placeholder:text-[var(--ink-muted)] outline-none"
              placeholder="+1 (555) 000-0000"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-[11px] font-medium mb-2 text-[var(--ink-muted)] uppercase tracking-wider">
              What do you need help with?
            </label>
            <textarea
              name="message"
              rows={4}
              className="w-full rounded-2xl border border-white/10 px-4 py-3.5 text-sm bg-[var(--bg-elevated)] text-[var(--ink)] placeholder:text-[var(--ink-muted)] outline-none resize-none"
              placeholder="Tell us about your environment..."
            />
          </div>
          <div className="sm:col-span-2 flex items-center justify-between gap-4 flex-wrap">
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-full px-7 py-3.5 text-sm font-semibold text-[var(--bg)] transition-all duration-300 hover:scale-[1.02] disabled:opacity-60"
              style={{ background: gradient }}
            >
              {status === "loading" ? "Sending…" : submitLabel}
            </button>
            {status === "error" && (
              <p className="text-xs text-red-400">
                {notConfigured
                  ? "Form isn't connected yet — add your Formspree ID in lib/content.ts."
                  : "Something went wrong. Please try again or email us directly."}
              </p>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
