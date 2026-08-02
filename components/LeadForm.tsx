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
  const accentBright =
    track === "security" ? "var(--signal-security-bright)" : "var(--signal-support-bright)";

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
      className="rounded-2xl border p-8 sm:p-10"
      style={{ borderColor: "var(--line)", background: "var(--paper-raised)" }}
    >
      <div
        className="mb-1 h-1.5 w-12 rounded-full"
        style={{ background: `linear-gradient(90deg, ${accent}, ${accentBright})` }}
      />
      <h3 className="font-display text-2xl font-semibold mt-4" style={{ color: "var(--ink)" }}>
        {heading}
      </h3>
      <p className="mt-2 text-sm" style={{ color: "var(--ink-soft)" }}>
        {subheading}
      </p>

      {status === "success" ? (
        <div
          className="mt-6 rounded-xl px-5 py-4 text-sm font-medium"
          style={{ background: "color-mix(in srgb, " + accent + " 12%, white)", color: accent }}
        >
          Thanks — your message is in. We'll be in touch within one business day.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-1">
            <label htmlFor={`${id}-name`} className="block text-xs font-medium mb-1.5" style={{ color: "var(--ink-soft)" }}>
              Full name
            </label>
            <input
              id={`${id}-name`}
              name="name"
              type="text"
              required
              className="w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-colors"
              style={{ borderColor: "var(--line)", background: "var(--paper)" }}
            />
          </div>
          <div className="sm:col-span-1">
            <label htmlFor={`${id}-email`} className="block text-xs font-medium mb-1.5" style={{ color: "var(--ink-soft)" }}>
              Work email
            </label>
            <input
              id={`${id}-email`}
              name="email"
              type="email"
              required
              className="w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-colors"
              style={{ borderColor: "var(--line)", background: "var(--paper)" }}
            />
          </div>
          <div className="sm:col-span-1">
            <label htmlFor={`${id}-company`} className="block text-xs font-medium mb-1.5" style={{ color: "var(--ink-soft)" }}>
              Company
            </label>
            <input
              id={`${id}-company`}
              name="company"
              type="text"
              className="w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-colors"
              style={{ borderColor: "var(--line)", background: "var(--paper)" }}
            />
          </div>
          <div className="sm:col-span-1">
            <label htmlFor={`${id}-phone`} className="block text-xs font-medium mb-1.5" style={{ color: "var(--ink-soft)" }}>
              Phone (optional)
            </label>
            <input
              id={`${id}-phone`}
              name="phone"
              type="tel"
              className="w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-colors"
              style={{ borderColor: "var(--line)", background: "var(--paper)" }}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor={`${id}-message`} className="block text-xs font-medium mb-1.5" style={{ color: "var(--ink-soft)" }}>
              What do you need help with?
            </label>
            <textarea
              id={`${id}-message`}
              name="message"
              rows={4}
              className="w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-colors"
              style={{ borderColor: "var(--line)", background: "var(--paper)" }}
            />
          </div>

          <div className="sm:col-span-2 flex items-center justify-between gap-4 flex-wrap">
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-60"
              style={{ background: accent }}
            >
              {status === "loading" ? "Sending…" : submitLabel}
            </button>
            {status === "error" && (
              <p className="text-xs" style={{ color: "#b3261e" }}>
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
