"use client";

import { useState, FormEvent } from "react";
import { contact } from "@/lib/content";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const notConfigured = contact.formspreeId.startsWith("REPLACE_WITH");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (notConfigured) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("funnel", "General");
    try {
      const res = await fetch(`https://formspree.io/f/${contact.formspreeId}`, {
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
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Mesh gradient background */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-mesh)" }} />
      <div className="absolute inset-0 bg-[var(--bg-elevated)]/80" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative mx-auto max-w-3xl px-6 text-center z-10">
        <p className="eyebrow" style={{ color: "var(--signal-support)" }}>
          {contact.eyebrow}
        </p>
        <h2 className="font-display mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-white">
          {contact.headline}
        </h2>
        <p className="mt-5 text-lg text-[var(--ink-soft)]">
          {contact.description}
        </p>

        {status === "success" ? (
          <div
            className="mt-10 rounded-xl px-6 py-5 text-sm font-medium border inline-block"
            style={{
              background: "var(--signal-security-dim)",
              borderColor: "var(--signal-security)",
              color: "var(--signal-security)",
            }}
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Thanks — we received your message and will follow up shortly.
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              name="email"
              required
              placeholder="you@company.com"
              className="flex-1 rounded-full px-6 py-4 text-sm outline-none transition-all duration-300 bg-[var(--bg-card)] text-white placeholder:text-[var(--ink-muted)] border border-white/[0.08] focus:border-[var(--signal-security)] focus:shadow-[0_0_0_3px_rgba(0,212,170,0.1)]"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-full px-8 py-4 text-sm font-semibold text-[var(--bg)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(245,158,11,0.35)] disabled:opacity-60"
              style={{ background: "var(--gradient-support)" }}
            >
              {status === "loading" ? "Sending…" : "Send"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="mt-4 text-xs text-red-400">
            {notConfigured
              ? "Form isn't connected yet — add your Formspree ID in lib/content.ts."
              : "Something went wrong. Please try again or email us directly."}
          </p>
        )}

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-[var(--ink-muted)]">
          <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {contact.email}
          </a>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-[var(--ink-muted)]" />
          <a href={`tel:${contact.phone}`} className="flex items-center gap-2 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {contact.phone}
          </a>
        </div>
      </div>
    </section>
  );
}