import { testimonials } from "@/lib/content";
import Reveal from "./Reveal";

function Stars() {
  return (
    <div className="flex gap-1 text-[var(--purple)]" aria-label="5 star rating">
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
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--lime)] to-[var(--purple)] flex items-center justify-center text-xs font-bold text-[var(--ink)]">
      {initials}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-16 sm:py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-center font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--purple)] mb-3">
            {testimonials.eyebrow}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-center text-[var(--ink)] mb-10 sm:mb-14">
            {testimonials.headline}
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-5">
          {testimonials.items.map((item, i) => (
            <Reveal key={item.name} delay={i * 100}>
              <article className="h-full rounded-[1.75rem] bg-white border border-[var(--border)] p-6 sm:p-7 flex flex-col transition-all duration-400 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/5">
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
