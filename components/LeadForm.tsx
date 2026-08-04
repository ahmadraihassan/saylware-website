"use client";

import { useState, FormEvent } from "react";

type Track = "security" | "support" | "general";

export default function LeadForm({
  id,
  formspreeId,
  heading,
  subheading,
  submitLabel,
  track,
  compact = false,
}: {
  id?: string;
  formspreeId: string;
  heading: string;
  subheading: string;
  submitLabel: string;
  track: Track;
  compact?: boolean;
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
    <div id={id} className={compact ? "" : "scroll-mt-28"}>
      <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--ink)]">{heading}</h3>
      <p className="mt-2 text-sm text-[var(--ink-soft)]">{subheading}</p>

      {status === "success" ? (
        <div className="mt-8 rounded-2xl px-6 py-5 text-sm font-medium bg-[var(--mint)] text-[var(--ink)] border border-[var(--border)]">
          Thanks. Your message is in. We will be in touch within one business day.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-medium mb-1.5 text-[var(--ink-muted)] uppercase tracking-wider">
                Full name
              </label>
              <input
                name="name"
                type="text"
                required
                className="w-full rounded-2xl border border-[var(--border)] px-4 py-3 text-sm bg-[var(--bg-soft)] text-[var(--ink)] placeholder:text-[var(--ink-muted)] outline-none"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium mb-1.5 text-[var(--ink-muted)] uppercase tracking-wider">
                Work email
              </label>
              <input
                name="email"
                type="email"
                required
                className="w-full rounded-2xl border border-[var(--border)] px-4 py-3 text-sm bg-[var(--bg-soft)] text-[var(--ink)] placeholder:text-[var(--ink-muted)] outline-none"
                placeholder="john@company.com"
              />
            </div>
          </div>

          {track !== "general" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-medium mb-1.5 text-[var(--ink-muted)] uppercase tracking-wider">
                  Company
                </label>
                <input
                  name="company"
                  type="text"
                  className="w-full rounded-2xl border border-[var(--border)] px-4 py-3 text-sm bg-[var(--bg-soft)] text-[var(--ink)] placeholder:text-[var(--ink-muted)] outline-none"
                  placeholder="Acme Inc."
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium mb-1.5 text-[var(--ink-muted)] uppercase tracking-wider">
                  Phone (optional)
                </label>
                <input
                  name="phone"
                  type="tel"
                  className="w-full rounded-2xl border border-[var(--border)] px-4 py-3 text-sm bg-[var(--bg-soft)] text-[var(--ink)] placeholder:text-[var(--ink-muted)] outline-none"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-medium mb-1.5 text-[var(--ink-muted)] uppercase tracking-wider">
              {track === "general" ? "Message" : "What do you need help with?"}
            </label>
            <textarea
              name="message"
              rows={track === "general" ? 4 : 3}
              required={track === "general"}
              className="w-full rounded-2xl border border-[var(--border)] px-4 py-3 text-sm bg-[var(--bg-soft)] text-[var(--ink)] placeholder:text-[var(--ink-muted)] outline-none resize-none"
              placeholder={
                track === "general"
                  ? "How can we help you?"
                  : "Tell us about your environment or support needs..."
              }
            />
          </div>

          <div className="flex items-center justify-between gap-4 flex-wrap pt-1">
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-full px-7 py-3.5 text-sm font-bold text-[var(--ink)] transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 bg-[var(--lime)] shadow-lg shadow-[var(--lime)]/25"
            >
              {status === "loading" ? "Sending…" : submitLabel}
            </button>
            {status === "error" && (
              <p className="text-xs text-red-500">
                {notConfigured
                  ? "Form is not connected yet. Add your Formspree ID in lib/content.ts."
                  : "Something went wrong. Please try again or email us directly."}
              </p>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
