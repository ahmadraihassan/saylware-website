import { values } from "@/lib/content";
import Reveal from "./Reveal";

const toneBg: Record<(typeof values.items)[number]["tone"], string> = {
  amber: "bg-[#2a2418] hover:bg-[#322b1c]",
  sky: "bg-[#15202b] hover:bg-[#1a2836]",
  peach: "bg-[#2a1f1c] hover:bg-[#332521]",
  rose: "bg-[#261820] hover:bg-[#2f1e28]",
};

function IconRays() {
  return (
    <svg className="w-6 h-6 text-[var(--ink)]" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <rect
          key={deg}
          x="11.25"
          y="2"
          width="1.5"
          height="4"
          rx="0.75"
          fill="currentColor"
          transform={`rotate(${deg} 12 12)`}
        />
      ))}
    </svg>
  );
}

export default function Values() {
  return (
    <section className="relative py-20 sm:py-28 px-5 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-center text-[var(--ink)] mb-12 sm:mb-16">
            {values.headline}
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <article
                className={`h-full rounded-[1.75rem] p-6 sm:p-7 transition-all duration-400 hover:-translate-y-1 ${toneBg[item.tone]}`}
              >
                <IconRays />
                <h3 className="mt-10 font-display text-lg font-semibold tracking-tight text-[var(--ink)]">
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
