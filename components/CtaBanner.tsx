import { ctaBanner } from "@/lib/content";
import Reveal from "./Reveal";

export default function CtaBanner() {
  return (
    <section className="relative py-10 sm:py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <Reveal variant="scale">
          <div className="relative overflow-hidden rounded-[2rem] bg-[var(--ink)] text-white px-8 py-14 sm:py-16 text-center">
            <div className="absolute -top-16 -left-10 w-48 h-48 rounded-full bg-[var(--lime)]/30 blur-3xl animate-blob" />
            <div className="absolute -bottom-20 -right-10 w-56 h-56 rounded-full bg-[var(--purple)]/40 blur-3xl animate-blob" style={{ animationDelay: "2s" }} />
            <div className="absolute inset-0 dot-field opacity-20" />

            <div className="relative">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight max-w-2xl mx-auto">
                {ctaBanner.headline}
              </h2>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={ctaBanner.primary.href}
                  className="rounded-full bg-[var(--lime)] text-[var(--ink)] px-7 py-3.5 text-sm font-bold hover:scale-[1.03] transition-transform"
                >
                  {ctaBanner.primary.label}
                </a>
                <a
                  href={ctaBanner.secondary.href}
                  className="rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold hover:bg-white/10 transition-colors"
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
