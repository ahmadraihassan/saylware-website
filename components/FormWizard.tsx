"use client";

import { useState } from "react";
import LeadForm from "./LeadForm";
import Reveal from "./Reveal";
import {
  contact,
  customerService,
  cybersecurity,
  formFlow,
} from "@/lib/content";

const stepMeta = [
  {
    key: "support" as const,
    accent: "bg-[var(--mint)]",
    label: "Customer Care",
  },
  {
    key: "security" as const,
    accent: "bg-[var(--lavender)]",
    label: "Cybersecurity",
  },
  {
    key: "general" as const,
    accent: "bg-[var(--peach)]",
    label: "General",
  },
];

export default function FormWizard() {
  const [step, setStep] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  function goTo(index: number) {
    setStep(index);
    setAnimKey((k) => k + 1);
  }

  const current = formFlow.steps[step];

  return (
    <section id="get-started" className="relative py-16 sm:py-24 px-4 sm:px-6 scroll-mt-24">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <div className="text-center mb-8 sm:mb-10">
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--purple)] mb-3">
              Get started
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[var(--ink)]">
              Tell us what you need
            </h2>
            <p className="mt-3 text-[var(--ink-soft)]">
              One form at a time. Switch anytime if you want a different service.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="soft-shell p-6 sm:p-9 relative overflow-hidden">
            {/* Step pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {stepMeta.map((s, i) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => goTo(i)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    i === step
                      ? `${s.accent} text-[var(--ink)] shadow-sm`
                      : "bg-[var(--bg-soft)] text-[var(--ink-muted)] hover:text-[var(--ink)]"
                  }`}
                >
                  {i + 1}. {s.label}
                </button>
              ))}
            </div>

            <div key={animKey} className="form-slide-enter">
              {current.key === "support" && (
                <LeadForm
                  compact
                  formspreeId={customerService.leadForm.formspreeId}
                  heading={customerService.leadForm.heading}
                  subheading={customerService.leadForm.subheading}
                  submitLabel={customerService.leadForm.submitLabel}
                  track="support"
                />
              )}
              {current.key === "security" && (
                <LeadForm
                  compact
                  formspreeId={cybersecurity.leadForm.formspreeId}
                  heading={cybersecurity.leadForm.heading}
                  subheading={cybersecurity.leadForm.subheading}
                  submitLabel={cybersecurity.leadForm.submitLabel}
                  track="security"
                />
              )}
              {current.key === "general" && (
                <LeadForm
                  compact
                  formspreeId={contact.formspreeId}
                  heading={contact.headline}
                  subheading={contact.description}
                  submitLabel="Send Message"
                  track="general"
                />
              )}
            </div>

            {/* Next step CTA */}
            {current.nextLabel && (
              <div className="mt-8 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => goTo(Math.max(0, step - 1))}
                  className={`text-sm font-medium text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors ${
                    step === 0 ? "invisible pointer-events-none" : ""
                  }`}
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => goTo(step + 1)}
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-[var(--ink)] text-white pl-5 pr-2 py-2 text-sm font-semibold hover:bg-[var(--purple)] transition-colors"
                >
                  <span className="text-left">
                    <span className="block">{current.nextLabel}</span>
                    {current.nextHint && (
                      <span className="block text-[11px] font-normal text-white/60 mt-0.5">
                        {current.nextHint}
                      </span>
                    )}
                  </span>
                  <span className="w-10 h-10 rounded-full bg-[var(--lime)] text-[var(--ink)] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
              </div>
            )}

            {current.key === "general" && (
              <div className="mt-8 pt-6 border-t border-[var(--border)] flex justify-between items-center gap-4">
                <button
                  type="button"
                  onClick={() => goTo(step - 1)}
                  className="text-sm font-medium text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
                >
                  ← Back
                </button>
                <div className="text-xs text-[var(--ink-muted)] text-right">
                  Or email{" "}
                  <a href={`mailto:${contact.email}`} className="text-[var(--purple)] font-medium">
                    {contact.email}
                  </a>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
