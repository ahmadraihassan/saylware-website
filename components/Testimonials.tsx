import { testimonials } from "@/lib/content";

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="eyebrow" style={{ color: "var(--ink-soft)" }}>
            {testimonials.eyebrow}
          </p>
          <h2 className="font-display mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
            {testimonials.headline}
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.items.map((t, i) => (
            <figure
              key={t.name}
              className="rounded-2xl border p-6 flex flex-col justify-between"
              style={{
                borderColor: "var(--line)",
                background: "var(--paper-raised)",
                borderTop: `3px solid ${i % 2 === 0 ? "var(--signal-security)" : "var(--signal-support)"}`,
              }}
            >
              <blockquote className="text-sm leading-relaxed" style={{ color: "var(--ink)" }}>
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6">
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="text-xs mt-0.5" style={{ color: "var(--ink-soft)" }}>
                  {t.role}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
