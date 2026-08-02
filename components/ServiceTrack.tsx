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
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[150px] opacity-10 pointer-events-none"
        style={{ background: accent }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className={`max-w-2xl ${reversed ? "ml-auto text-right" : ""}`}>
          <p className="eyebrow" style={{ color: accent }}>
            {eyebrow}
          </p>
          <h2 className="font-display mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-white">
            {headline}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[var(--ink-soft)]">
            {description}
          </p>
        </div>

        {/* Service cards — 2x2 grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="group relative rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1 card-glow"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderTop: `2px solid ${accent}`,
              }}
            >
              <div
                className="absolute top-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
                }}
              />
              <div className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold font-display"
                  style={{ background: accentDim, color: accent }}
                >
                  0{i + 1}
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-white group-hover:text-[var(--ink)] transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lead Form */}
        <div className="mt-16">
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