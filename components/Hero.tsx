"use client";

import { hero } from "@/lib/content";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[128px] opacity-20"
        style={{ background: "var(--signal-security)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[128px] opacity-15"
        style={{ background: "var(--signal-support)" }}
      />

      {/* Floating decorative elements */}
      <div className="absolute top-32 left-[10%] w-2 h-2 rounded-full bg-[var(--signal-security)] animate-float opacity-60" />
      <div className="absolute top-48 right-[15%] w-3 h-3 rounded-full bg-[var(--signal-support)] animate-float opacity-40" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-40 left-[20%] w-1.5 h-1.5 rounded-full bg-white/30 animate-float opacity-50" style={{ animationDelay: "4s" }} />

      <div className="relative mx-auto max-w-5xl px-6 text-center z-10">
        <p className="eyebrow mb-6">{hero.eyebrow}</p>

        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05]">
          <span className="gradient-text">{hero.headline.split(" — ")[0]}</span>
          <br />
          <span className="text-white">{hero.headline.split(" — ")[1] || ""}</span>
        </h1>

        <p className="mt-8 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto text-[var(--ink-soft)]">
          {hero.subheadline}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={hero.primaryCta.href}
            className="group relative w-full sm:w-auto rounded-full px-8 py-4 text-sm font-semibold text-[var(--bg)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,212,170,0.35)] overflow-hidden"
            style={{ background: "var(--gradient-security)" }}
          >
            <span className="relative z-10">{hero.primaryCta.label}</span>
          </a>
          <a
            href={hero.secondaryCta.href}
            className="group relative w-full sm:w-auto rounded-full px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 border border-white/10 hover:border-[var(--signal-support)]/50 bg-white/[0.03] hover:bg-white/[0.06]"
          >
            {hero.secondaryCta.label}
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-20 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--ink-muted)]">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-[var(--ink-muted)] to-transparent" />
        </div>
      </div>
    </section>
  );
}