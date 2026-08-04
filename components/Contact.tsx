"use client";

import { useState, FormEvent } from "react";
import { contact } from "@/lib/content";
import Reveal from "./Reveal";

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
    <section id="contact" className="relative py-20 sm:py-28 px-5 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <div className="text-center mb-10 sm:mb-12">
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--accent)] mb-4">
              {contact.eyebrow}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--ink)]">
              {contact.headline}
            </h2>
            <p className="mt-4 text-base text-[var(--ink-soft)]">{contact.description}</p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="rounded-[1.75rem] bg-[var(--bg-card)] border border-white/[0.06] p-7 sm:p-10">
            {status === "success" ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-full bg-[var(--accent-dim)] flex items-center justify-center mx-auto mb-4 text-[var(--accent)]">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Message sent</h3>
                <p className="mt-2 text-sm text-[var(--ink-soft)]">
                  Thanks — we received your message and will follow up shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-medium mb-2 text-[var(--ink-muted)] uppercase tracking-wider">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full rounded-2xl border border-white/10 px-4 py-3.5 text-sm bg-[var(--bg-elevated)] text-[var(--ink)] placeholder:text-[var(--ink-muted)] outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium mb-2 text-[var(--ink-muted)] uppercase tracking-wider">
                      Work Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full rounded-2xl border border-white/10 px-4 py-3.5 text-sm bg-[var(--bg-elevated)] text-[var(--ink)] placeholder:text-[var(--ink-muted)] outline-none"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-medium mb-2 text-[var(--ink-muted)] uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    className="w-full rounded-2xl border border-white/10 px-4 py-3.5 text-sm bg-[var(--bg-elevated)] text-[var(--ink)] placeholder:text-[var(--ink-muted)] outline-none resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="rounded-full px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] disabled:opacity-60"
                  style={{ background: "var(--gradient-accent)" }}
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </button>
                {status === "error" && (
                  <p className="text-xs text-red-400">
                    {notConfigured
                      ? "Form isn't connected yet — add your Formspree ID in lib/content.ts."
                      : "Something went wrong. Please try again or email us directly."}
                  </p>
                )}
              </form>
            )}
          </div>
        </Reveal>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5 text-sm text-[var(--ink-soft)]">
          <a href={`mailto:${contact.email}`} className="hover:text-[var(--ink)] transition-colors">
            {contact.email}
          </a>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-[var(--ink-muted)]" />
          <a href={`tel:${contact.phone}`} className="hover:text-[var(--ink)] transition-colors">
            {contact.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
