"use client";

import { hero } from "@/lib/content";

export default function Hero() {
  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern opacity-40" />
      
      {/* Ambient glow orbs */}
      <div
        className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full blur-[150px] opacity-20 animate-pulse-glow"
        style={{ background: "var(--signal-security)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[150px] opacity-10 animate-pulse-glow"
        style={{ background: "var(--signal-support)", animationDelay: "2s" }}
      />

      {/* Decorative grid lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/[0.04] to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/[0.04] to-transparent" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 text-center z-10">
        <p className="eyebrow mb-8">{hero.eyebrow}</p>

        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]">
          <span className="gradient-text">{hero.headline.split(" — ")[0]}</span>
          <br />
          <span className="text-white">{hero.headline.split(" — ")[1] || ""}</span>
        </h1>

        <p className="mt-8 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto text-[var(--ink-soft)]">
          {hero.subheadline}
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={hero.primaryCta.href}
            className="group relative w-full sm:w-auto rounded-full px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(227,30,36,0.4)] overflow-hidden border border-[var(--signal-security)]/40 bg-[var(--signal-security)]/90"
          >
            <span className="relative z-10">{hero.primaryCta.label}</span>
          </a>
          <a
            href={hero.secondaryCta.href}
            className="group relative w-full sm:w-auto rounded-full px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 border border-white/10 hover:border-[var(--signal-support)]/40 bg-white/[0.03] hover:bg-white/[0.06]"
          >
            {hero.secondaryCta.label}
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-24 flex flex-col items-center gap-2 opacity-30">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--ink-muted)]">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-[var(--ink-muted)] to-transparent" />
        </div>
      </div>
    </section>
  );
}