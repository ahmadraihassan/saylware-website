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
    <section id="contact" className="py-20 sm:py-28" style={{ background: "var(--ink)" }}>
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="eyebrow" style={{ color: "var(--signal-support-bright)" }}>
          {contact.eyebrow}
        </p>
        <h2 className="font-display mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-white">
          {contact.headline}
        </h2>
        <p className="mt-4 text-base" style={{ color: "#c7cec9" }}>
          {contact.description}
        </p>

        {status === "success" ? (
          <div className="mt-8 rounded-xl px-5 py-4 text-sm font-medium inline-block" style={{ background: "#1c2a24", color: "var(--signal-security-bright)" }}>
            Thanks — we received your message and will follow up shortly.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              name="email"
              required
              placeholder="you@company.com"
              className="flex-1 rounded-full px-5 py-3 text-sm outline-none"
              style={{ background: "#1c2a24", color: "white", border: "1px solid #2c3a34" }}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-full px-6 py-3 text-sm font-semibold text-white disabled:opacity-60"
              style={{ background: "var(--signal-support)" }}
            >
              {status === "loading" ? "Sending…" : "Send"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="mt-3 text-xs" style={{ color: "#e5a5a0" }}>
            {notConfigured
              ? "Form isn't connected yet — add your Formspree ID in lib/content.ts."
              : "Something went wrong. Please try again or email us directly."}
          </p>
        )}

        <p className="mt-8 text-sm" style={{ color: "#8fa198" }}>
          Or reach us directly — {contact.email} · {contact.phone}
        </p>
      </div>
    </section>
  );
}
