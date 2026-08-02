"use client";

import { useState, FormEvent } from "react";

export default function ProjectNeed() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1500);
  }

  return (
    <section id="project-need" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "var(--gradient-mesh)" }} />
      
      <div className="relative mx-auto max-w-3xl px-6 z-10">
        <div className="text-center mb-12">
          <p className="eyebrow mb-4">Describe Your Needs</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#1c1917]">
            What Do You Need Help With?
          </h2>
          <p className="mt-4 text-lg text-[#78716c]">
            Tell us about your project and we&apos;ll match you with the right experts.
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
              <h3 className="text-xl font-bold text-[#1c1917]">Request Received!</h3>
              <p className="mt-2 text-[#78716c]">We&apos;ll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold mb-2 text-[#78716c] uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-2xl border border-[#1c1917]/8 px-5 py-4 text-sm bg-[#faf6f0] text-[#1c1917] placeholder:text-[#a8a29e] outline-none"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-2 text-[#78716c] uppercase tracking-wider">Work Email</label>
                  <input
                    type="email"
                    required
                    className="w-full rounded-2xl border border-[#1c1917]/8 px-5 py-4 text-sm bg-[#faf6f0] text-[#1c1917] placeholder:text-[#a8a29e] outline-none"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-2 text-[#78716c] uppercase tracking-wider">Service Type</label>
                <select className="w-full rounded-2xl border border-[#1c1917]/8 px-5 py-4 text-sm bg-[#faf6f0] text-[#1c1917] outline-none appearance-none cursor-pointer">
                  <option>Select a service...</option>
                  <option>Penetration Testing</option>
                  <option>Managed Security</option>
                  <option>Incident Response</option>
                  <option>Customer Support Outsourcing</option>
                  <option>Technical Helpdesk</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-2 text-[#78716c] uppercase tracking-wider">Describe Your Needs</label>
                <textarea
                  rows={4}
                  required
                  className="w-full rounded-2xl border border-[#1c1917]/8 px-5 py-4 text-sm bg-[#faf6f0] text-[#1c1917] placeholder:text-[#a8a29e] outline-none resize-none"
                  placeholder="Tell us about your environment, challenges, and goals..."
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full sm:w-auto rounded-full px-10 py-4 text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[var(--signal-security)]/30 disabled:opacity-60"
                  style={{ background: "var(--gradient-security)" }}
                >
                  {status === "loading" ? "Sending..." : "Request Help"}
                </button>
                
                <a
                  href="#contact"
                  className="text-sm text-[#78716c] hover:text-[var(--signal-security)] transition-colors underline underline-offset-4"
                >
                  Still not sure what you want?
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}