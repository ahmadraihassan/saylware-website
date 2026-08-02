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
      className="relative rounded-2xl p-8 sm:p-12 overflow-hidden"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: gradient }}
      />

      {/* Glow effect */}
      <div
        className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[100px] opacity-15 pointer-events-none"
        style={{ background: accent }}
      />

      <div className="relative z-10">
        <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white">
          {heading}
        </h3>
        <p className="mt-3 text-sm text-[var(--ink-soft)]">
          {subheading}
        </p>

        {status === "success" ? (
          <div
            className="mt-10 rounded-2xl px-8 py-6 text-sm font-medium border"
            style={{
              background: accentDim,
              borderColor: accent,
              color: accent,
            }}
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Thanks — your message is in. We'll be in touch within one business day.
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="sm:col-span-1">
              <label htmlFor={`${id}-name`} className="block text-xs font-medium mb-2.5 text-[var(--ink-soft)] uppercase tracking-wider">
                Full name
              </label>
              <input
                id={`${id}-name`}
                name="name"
                type="text"
                required
                className="w-full rounded-xl border px-4 py-3.5 text-sm outline-none transition-all duration-300 bg-[var(--bg-elevated)] text-white placeholder:text-[var(--ink-muted)] focus:border-[var(--signal-security)] focus:shadow-[0_0_0_3px_rgba(227,30,36,0.1)]"
                style={{ borderColor: "var(--border)" }}
                placeholder="John Doe"
              />
            </div>
            <div className="sm:col-span-1">
              <label htmlFor={`${id}-email`} className="block text-xs font-medium mb-2.5 text-[var(--ink-soft)] uppercase tracking-wider">
                Work email
              </label>
              <input
                id={`${id}-email`}
                name="email"
                type="email"
                required
                className="w-full rounded-xl border px-4 py-3.5 text-sm outline-none transition-all duration-300 bg-[var(--bg-elevated)] text-white placeholder:text-[var(--ink-muted)] focus:border-[var(--signal-security)] focus:shadow-[0_0_0_3px_rgba(227,30,36,0.1)]"
                style={{ borderColor: "var(--border)" }}
                placeholder="john@company.com"
              />
            </div>
            <div className="sm:col-span-1">
              <label htmlFor={`${id}-company`} className="block text-xs font-medium mb-2.5 text-[var(--ink-soft)] uppercase tracking-wider">
                Company
              </label>
              <input
                id={`${id}-company`}
                name="company"
                type="text"
                className="w-full rounded-xl border px-4 py-3.5 text-sm outline-none transition-all duration-300 bg-[var(--bg-elevated)] text-white placeholder:text-[var(--ink-muted)] focus:border-[var(--signal-security)] focus:shadow-[0_0_0_3px_rgba(227,30,36,0.1)]"
                style={{ borderColor: "var(--border)" }}
                placeholder="Acme Inc."
              />
            </div>
            <div className="sm:col-span-1">
              <label htmlFor={`${id}-phone`} className="block text-xs font-medium mb-2.5 text-[var(--ink-soft)] uppercase tracking-wider">
                Phone (optional)
              </label>
              <input
                id={`${id}-phone`}
                name="phone"
                type="tel"
                className="w-full rounded-xl border px-4 py-3.5 text-sm outline-none transition-all duration-300 bg-[var(--bg-elevated)] text-white placeholder:text-[var(--ink-muted)] focus:border-[var(--signal-security)] focus:shadow-[0_0_0_3px_rgba(227,30,36,0.1)]"
                style={{ borderColor: "var(--border)" }}
                placeholder="+1 (555) 000-0000"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor={`${id}-message`} className="block text-xs font-medium mb-2.5 text-[var(--ink-soft)] uppercase tracking-wider">
                What do you need help with?
              </label>
              <textarea
                id={`${id}-message`}
                name="message"
                rows={4}
                className="w-full rounded-xl border px-4 py-3.5 text-sm outline-none transition-all duration-300 bg-[var(--bg-elevated)] text-white placeholder:text-[var(--ink-muted)] focus:border-[var(--signal-security)] focus:shadow-[0_0_0_3px_rgba(227,30,36,0.1)] resize-none"
                style={{ borderColor: "var(--border)" }}
                placeholder="Tell us about your environment..."
              />
            </div>

            <div className="sm:col-span-2 flex items-center justify-between gap-4 flex-wrap">
              <button
                type="submit"
                disabled={status === "loading"}
                className="rounded-full px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(227,30,36,0.35)] disabled:opacity-60 disabled:hover:scale-100 border border-white/10"
                style={{ background: gradient }}
              >
                {status === "loading" ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending…
                  </span>
                ) : (
                  submitLabel
                )}
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
    </div>
  );
}