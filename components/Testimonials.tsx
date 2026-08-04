import { testimonials } from "@/lib/content";
import Reveal from "./Reveal";

function Stars() {
  return (
    <div className="flex gap-1 text-[var(--accent)]" aria-label="5 star rating">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 1.5l1.9 3.85 4.25.62-3.07 2.99.72 4.22L8 11.27 4.2 13.18l.72-4.22L1.85 5.97l4.25-.62L8 1.5z" />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
  return (
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--signal-support)] flex items-center justify-center text-xs font-bold text-white">
      {initials}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-20 sm:py-28 px-5 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-center text-[var(--ink)] mb-12 sm:mb-16">
            {testimonials.headline}
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-5">
          {testimonials.items.map((item, i) => (
            <Reveal key={item.name} delay={i * 100}>
              <article className="h-full rounded-[1.75rem] bg-[var(--bg-card)] border border-white/[0.06] p-6 sm:p-7 flex flex-col transition-all duration-400 hover:-translate-y-1 hover:border-white/15">
                <Stars />
                <p className="mt-5 text-sm leading-relaxed text-[var(--ink-soft)] flex-1">
                  “{item.quote}”
                </p>
                <div className="mt-8 flex items-center gap-3">
                  <Avatar name={item.name} />
                  <div>
                    <p className="text-sm font-semibold text-[var(--ink)]">{item.name}</p>
                    <p className="text-xs text-[var(--ink-muted)]">{item.role}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
