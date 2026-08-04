import { ctaBanner } from "@/lib/content";
import Reveal from "./Reveal";

export default function CtaBanner() {
  return (
    <section className="relative py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl w-full">
        <Reveal variant="scale">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-[var(--border)] px-6 py-14 sm:py-16 text-center min-h-[280px] flex items-center justify-center">
            <div className="absolute inset-0 bg-[var(--bg-elevated)]" />
            <div className="absolute -top-24 -left-16 w-[420px] h-[420px] rounded-full bg-[var(--accent)]/25 blur-[80px] animate-glass-drift" />
            <div className="absolute -bottom-28 -right-10 w-[460px] h-[460px] rounded-full bg-[var(--purple)]/30 blur-[90px] animate-glass-drift-alt" />
            <div className="absolute inset-8 rounded-[1.5rem] glass pointer-events-none" />

            <div className="relative z-10">
              <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] font-bold tracking-tight max-w-2xl mx-auto">
                {ctaBanner.headline}
              </h2>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={ctaBanner.primary.href}
                  className="rounded-full bg-[var(--accent)] text-[var(--bg)] px-7 py-3.5 text-sm font-bold hover:scale-[1.03] transition-transform"
                >
                  {ctaBanner.primary.label}
                </a>
                <a
                  href={ctaBanner.secondary.href}
                  className="rounded-full glass-strong px-7 py-3.5 text-sm font-semibold hover:border-[var(--accent)]/40 transition-colors"
                >
                  {ctaBanner.secondary.label}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
