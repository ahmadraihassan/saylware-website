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
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden bg-[#faf6f0]">
      <div className="absolute inset-0" style={{ background: "var(--gradient-mesh)" }} />
      
      <div className="relative mx-auto max-w-3xl px-6 z-10">
        <div className="text-center mb-12">
          <p className="eyebrow mb-4" style={{ color: "var(--signal-support)" }}>
            {contact.eyebrow}
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#1c1917]">
            {contact.headline}
          </h2>
          <p className="mt-4 text-lg text-[#78716c]">
            {contact.description}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-[#1c1917]/5 border border-[#1c1917]/5">
          {status === "success" ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[var(--signal-security)]/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[var(--signal-security)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#1c1917]">Message Sent!</h3>
              <p className="mt-2 text-[#78716c]">Thanks — we received your message and will follow up shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold mb-2 text-[#78716c] uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full rounded-2xl border border-[#1c1917]/8 px-5 py-4 text-sm bg-[#faf6f0] text-[#1c1917] placeholder:text-[#a8a29e] outline-none"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-2 text-[#78716c] uppercase tracking-wider">Work Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full rounded-2xl border border-[#1c1917]/8 px-5 py-4 text-sm bg-[#faf6f0] text-[#1c1917] placeholder:text-[#a8a29e] outline-none"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-2 text-[#78716c] uppercase tracking-wider">Message</label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  className="w-full rounded-2xl border border-[#1c1917]/8 px-5 py-4 text-sm bg-[#faf6f0] text-[#1c1917] placeholder:text-[#a8a29e] outline-none resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full sm:w-auto rounded-full px-10 py-4 text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[var(--signal-security)]/30 disabled:opacity-60"
                style={{ background: "var(--gradient-security)" }}
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>

              {status === "error" && (
                <p className="text-xs text-red-500 mt-2">
                  {notConfigured
                    ? "Form isn't connected yet — add your Formspree ID in lib/content.ts."
                    : "Something went wrong. Please try again or email us directly."}
                </p>
              )}
            </form>
          )}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-[#78716c]">
          <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-[#1c1917] transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {contact.email}
          </a>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-[#a8a29e]" />
          <a href={`tel:${contact.phone}`} className="flex items-center gap-2 hover:text-[#1c1917] transition-colors">
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