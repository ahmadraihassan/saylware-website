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
  const bg = reversed ? "var(--paper-raised)" : "transparent";

  return (
    <section id={id} className="py-20 sm:py-28" style={{ background: bg }}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="eyebrow" style={{ color: accent }}>
            {eyebrow}
          </p>
          <h2 className="font-display mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
            {headline}
          </h2>
          <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--ink-soft)" }}>
            {description}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl border p-6"
              style={{ borderColor: "var(--line)", background: "var(--paper-raised)" }}
            >
              <div className="h-1 w-8 rounded-full mb-4" style={{ background: accent }} />
              <h3 className="font-display text-lg font-semibold">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14">
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
