import { partners } from "@/lib/content";
import Reveal from "./Reveal";

export default function Partners() {
  const loop = [...partners.names, ...partners.names];

  return (
    <section id="partners" className="relative py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl w-full">
        <Reveal>
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--ink-muted)] mb-5">
            {partners.label}
          </p>
        </Reveal>
        <div className="relative overflow-hidden rounded-2xl glass py-5">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-[var(--bg)] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-[var(--bg)] to-transparent z-10" />
          <div className="flex w-max animate-marquee gap-10 sm:gap-14 px-6">
            {loop.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="font-display text-base sm:text-lg font-semibold tracking-tight text-white/25 whitespace-nowrap"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
