"use client";

import LeadForm from "./LeadForm";

type Service = { title: string; description: string };
type Track = "security" | "support";

export default function ServiceTrack({
  id,
  eyebrow,
  headline,
  description,
  services,
  leadForm,
  track,
  reversed = false,
}: {
  id: string;
  eyebrow: string;
  headline: string;
  description: string;
  services: Service[];
  leadForm: { id: string; heading: string; subheading: string; formspreeId: string; submitLabel: string };
  track: Track;
  reversed?: boolean;
}) {
  const accent = track === "security" ? "var(--signal-security)" : "var(--signal-support)";
  const accentDim = track === "security" ? "var(--signal-security-dim)" : "var(--signal-support-dim)";
  const gradient = track === "security" ? "var(--gradient-security)" : "var(--gradient-support)";

  return (
    <section id={id} className="relative py-24 sm:py-32">
      {/* Section accent glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full blur-[180px] opacity-8 pointer-events-none"
        style={{ background: accent }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className={`max-w-2xl ${reversed ? "ml-auto text-right" : ""}`}>
          <p className="eyebrow" style={{ color: accent }}>
            {eyebrow}
          </p>
          <h2 className="font-display mt-5 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
            {headline}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-[var(--ink-soft)] max-w-xl">
            {description}
          </p>
        </div>

        {/* Service cards — 2x2 grid */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="group relative rounded-2xl p-8 sm:p-10 transition-all duration-500 hover:-translate-y-1.5 card-glow"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderTop: `3px solid ${accent}`,
              }}
            >
              <div
                className="absolute top-0 left-10 right-10 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
                }}
              />
              <div className="flex items-start gap-5">
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-base font-bold font-display"
                  style={{ background: accentDim, color: accent }}
                >
                  0{i + 1}
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-white group-hover:text-[var(--ink)] transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lead Form */}
        <div className="mt-20">
          <LeadForm
            id={leadForm.id}
            formspreeId={leadForm.formspreeId}
            heading={leadForm.heading}
            subheading={leadForm.subheading}
            submitLabel={leadForm.submitLabel}
            track={track}
          />
        </div>
      </div>
    </section>
  );
}