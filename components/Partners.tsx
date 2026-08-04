import { partners } from "@/lib/content";
import Reveal from "./Reveal";

export default function Partners() {
  const loop = [...partners.names, ...partners.names];

  return (
    <section id="partners" className="relative py-10 sm:py-14 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--ink-muted)] mb-6">
            {partners.label}
          </p>
        </Reveal>
        <div className="relative overflow-hidden rounded-[1.5rem] bg-white border border-[var(--border)] py-6">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />
          <div className="flex w-max animate-marquee gap-12 px-8">
            {loop.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="font-display text-lg sm:text-xl font-semibold tracking-tight text-[var(--ink)]/25 whitespace-nowrap hover:text-[var(--ink)]/60 transition-colors"
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
