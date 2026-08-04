"use client";

import { useState } from "react";
import LeadForm from "./LeadForm";
import Reveal from "./Reveal";
import { contact, customerService, cybersecurity, formFlow } from "@/lib/content";

const labels = ["Customer Care", "Cybersecurity", "General"];

export default function FormWizard() {
  const [step, setStep] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const current = formFlow.steps[step];

  function goTo(index: number) {
    setStep(index);
    setAnimKey((k) => k + 1);
  }

  return (
    <section id="get-started" className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="mx-auto max-w-[82rem] w-full">
        <Reveal>
          <div className="text-center mb-8 sm:mb-10 max-w-2xl mx-auto">
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--accent)] mb-3">Get started</p>
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,3rem)] font-bold tracking-tight">
              Tell us what you need
            </h2>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div className="relative grid lg:grid-cols-[1fr_auto] gap-4 lg:gap-5 items-stretch">
            <div className="soft-shell p-5 sm:p-8 min-w-0">
              <div className="flex flex-wrap gap-2 mb-6">
                {labels.map((label, i) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => goTo(i)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                      i === step
                        ? "bg-[var(--accent)] text-[var(--bg)]"
                        : "glass text-[var(--ink-muted)] hover:text-[var(--ink)]"
                    }`}
                  >
                    {i + 1}. {label}
                  </button>
                ))}
              </div>

              <div key={animKey} className="form-slide-enter">
                {current.key === "support" && (
                  <LeadForm
                    formspreeId={customerService.leadForm.formspreeId}
                    heading={customerService.leadForm.heading}
                    subheading={customerService.leadForm.subheading}
                    submitLabel={customerService.leadForm.submitLabel}
                    track="support"
                  />
                )}
                {current.key === "security" && (
                  <LeadForm
                    formspreeId={cybersecurity.leadForm.formspreeId}
                    heading={cybersecurity.leadForm.heading}
                    subheading={cybersecurity.leadForm.subheading}
                    submitLabel={cybersecurity.leadForm.submitLabel}
                    track="security"
                  />
                )}
                {current.key === "general" && (
                  <LeadForm
                    formspreeId={contact.formspreeId}
                    heading={contact.headline}
                    subheading={contact.description}
                    submitLabel="Contact Us"
                    track="general"
                  />
                )}
              </div>

              {step > 0 && (
                <button
                  type="button"
                  onClick={() => goTo(step - 1)}
                  className="mt-6 text-sm text-[var(--ink-muted)] hover:text-[var(--ink)]"
                >
                  ← Back
                </button>
              )}
            </div>

            {/* Side next CTA */}
            {current.nextLabel && (
              <div className="flex lg:flex-col items-center justify-center gap-3 lg:w-[220px]">
                <button
                  type="button"
                  onClick={() => goTo(step + 1)}
                  className="group w-full lg:w-full soft-shell p-5 sm:p-6 text-left hover:ring-1 hover:ring-[var(--accent)]/40 transition-all"
                >
                  <span className="w-11 h-11 rounded-full bg-[var(--accent)] text-[var(--bg)] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="block font-display text-base font-semibold leading-snug">{current.nextLabel}</span>
                  {current.nextHint && (
                    <span className="block text-xs text-[var(--ink-muted)] mt-2">{current.nextHint}</span>
                  )}
                </button>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
