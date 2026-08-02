"use client";

import { testimonials } from "@/lib/content";

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[180px] opacity-5 pointer-events-none bg-white" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="eyebrow">{testimonials.eyebrow}</p>
          <h2 className="font-display mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-white">
            {testimonials.headline}
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.items.map((t, i) => (
            <figure
              key={t.name}
              className="group relative rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1 card-glow"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
            >
              {/* Quote icon */}
              <div
                className="text-4xl font-display font-bold leading-none mb-4 opacity-20"
                style={{ color: i % 2 === 0 ? "var(--signal-security)" : "var(--signal-support)" }}
              >
                &ldquo;
              </div>

              <blockquote className="text-sm leading-relaxed text-[var(--ink-soft)]">
                {t.quote}
              </blockquote>

              <figcaption className="mt-8 flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-[var(--bg)]"
                  style={{
                    background: i % 2 === 0 ? "var(--gradient-security)" : "var(--gradient-support)",
                  }}
                >
                  {t.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-[var(--ink-muted)]">{t.role}</div>
                </div>
              </figcaption>

              {/* Bottom accent line on hover */}
              <div
                className="absolute bottom-0 left-8 right-8 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: i % 2 === 0
                    ? "linear-gradient(90deg, transparent, var(--signal-security), transparent)"
                    : "linear-gradient(90deg, transparent, var(--signal-support), transparent)",
                }}
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}