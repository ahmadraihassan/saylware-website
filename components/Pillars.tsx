import { pillars } from "@/lib/content";
import Reveal from "./Reveal";

const toneBg: Record<(typeof pillars.items)[number]["tone"], string> = {
  amber: "bg-[#2a2418] text-[#f5e6c8]",
  sky: "bg-[#15202b] text-[#cfe3f7]",
  peach: "bg-[#2a1f1c] text-[#f3d5c8]",
};

function IconGrid() {
  return (
    <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none" aria-hidden>
      <circle cx="6" cy="6" r="2" fill="currentColor" />
      <circle cx="14" cy="6" r="2" fill="currentColor" />
      <circle cx="22" cy="6" r="2" fill="currentColor" />
      <circle cx="6" cy="14" r="2" fill="currentColor" />
      <circle cx="14" cy="14" r="2" fill="currentColor" />
      <circle cx="22" cy="14" r="2" fill="currentColor" />
      <circle cx="6" cy="22" r="2" fill="currentColor" />
      <circle cx="14" cy="22" r="2" fill="currentColor" />
      <circle cx="22" cy="22" r="2" fill="currentColor" />
    </svg>
  );
}

export default function Pillars() {
  return (
    <section id="pillars" className="relative py-20 sm:py-28 px-5 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 mb-12">
          <Reveal>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-[var(--ink)]">
              {pillars.headline}
            </h2>
          </Reveal>
          <Reveal delay={100} variant="right">
            <p className="text-[var(--ink-soft)] text-base sm:text-lg leading-relaxed max-w-xl lg:pt-2">
              {pillars.description}
            </p>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {pillars.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 90}>
              <article
                className={`group h-full rounded-[1.75rem] p-7 sm:p-8 transition-transform duration-500 hover:-translate-y-1 ${toneBg[item.tone]}`}
              >
                <div className="opacity-80 mb-10">
                  <IconGrid />
                </div>
                <h3 className="font-display text-xl font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed opacity-75">
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
