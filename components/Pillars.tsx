import { pillars } from "@/lib/content";
import Reveal from "./Reveal";

const toneBg: Record<(typeof pillars.items)[number]["tone"], string> = {
  lavender: "bg-[var(--lavender)]",
  mint: "bg-[var(--mint)]",
  peach: "bg-[var(--peach)]",
};

function IconGrid() {
  return (
    <svg className="w-7 h-7 text-[var(--ink)]" viewBox="0 0 28 28" fill="none" aria-hidden>
      <circle cx="6" cy="6" r="2.2" fill="currentColor" />
      <circle cx="14" cy="6" r="2.2" fill="currentColor" />
      <circle cx="22" cy="6" r="2.2" fill="currentColor" />
      <circle cx="6" cy="14" r="2.2" fill="currentColor" />
      <circle cx="14" cy="14" r="2.2" fill="currentColor" />
      <circle cx="22" cy="14" r="2.2" fill="currentColor" />
      <circle cx="6" cy="22" r="2.2" fill="currentColor" />
      <circle cx="14" cy="22" r="2.2" fill="currentColor" />
      <circle cx="22" cy="22" r="2.2" fill="currentColor" />
    </svg>
  );
}

export default function Pillars() {
  return (
    <section id="about" className="relative py-16 sm:py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-14 mb-10 sm:mb-12">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--purple)] mb-3">
              {pillars.eyebrow}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-[var(--ink)]">
              {pillars.headline}
            </h2>
          </Reveal>
          <Reveal delay={100} variant="right">
            <p className="text-[var(--ink-soft)] text-base sm:text-lg leading-relaxed max-w-xl lg:pt-8">
              {pillars.description}
            </p>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {pillars.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 90}>
              <article
                className={`group h-full rounded-[1.75rem] p-7 sm:p-8 transition-transform duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/5 ${toneBg[item.tone]}`}
              >
                <div className="mb-10 opacity-80">
                  <IconGrid />
                </div>
                <h3 className="font-display text-xl font-semibold tracking-tight text-[var(--ink)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
                  {item.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
