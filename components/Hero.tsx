"use client";

import { hero } from "@/lib/content";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section className="relative pt-24 sm:pt-28 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[82rem] w-full">
        <div className="soft-shell overflow-hidden relative">
          <div className="relative grid lg:grid-cols-2 gap-6 lg:gap-8 p-5 sm:p-8 lg:p-10">
            <div className="flex flex-col justify-center min-w-0">
              <Reveal>
                <h1 className="font-display text-[clamp(1.85rem,4.5vw,3.4rem)] font-bold tracking-tight leading-[1.08]">
                  {hero.headline}
                </h1>
              </Reveal>
              <Reveal delay={70}>
                <p className="mt-4 sm:mt-5 text-base sm:text-lg text-[var(--ink-soft)] leading-relaxed max-w-md">
                  {hero.subheadline}
                </p>
              </Reveal>
              <Reveal delay={120}>
                <a
                  href={hero.primaryCta.href}
                  className="mt-6 sm:mt-8 inline-flex items-center gap-2 self-start rounded-full bg-[var(--accent)] text-[var(--bg)] text-sm font-bold px-6 py-3.5 hover:scale-[1.03] transition-transform"
                >
                  {hero.primaryCta.label}
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </Reveal>

              <div className="mt-6 sm:mt-8 grid sm:grid-cols-[1.2fr_auto] gap-3">
                <Reveal delay={160} variant="left">
                  <div className="rounded-2xl glass p-4 sm:p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--accent)]">
                      {hero.availability.label}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-[var(--ink)]">{hero.availability.headline}</p>
                    <p className="mt-1.5 text-sm text-[var(--ink-soft)] leading-relaxed">
                      {hero.availability.body}
                    </p>
                  </div>
                </Reveal>
                <Reveal delay={200} variant="right">
                  <a
                    href={hero.bookCta.href}
                    className="group h-full min-h-[120px] rounded-2xl glass-strong p-5 flex flex-col justify-between hover:border-[var(--accent)]/40 transition-colors"
                  >
                    <span className="w-10 h-10 rounded-full bg-[var(--accent)] text-[var(--bg)] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
                        <path d="M5 15L15 5M15 5H8M15 5v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="font-display text-sm font-semibold">{hero.bookCta.label}</span>
                  </a>
                </Reveal>
              </div>
            </div>

            <Reveal variant="scale" delay={80}>
              <div className="relative grid grid-cols-2 gap-3 h-[300px] sm:h-[400px] lg:h-full min-h-[320px]">
                <div className="relative rounded-2xl overflow-hidden glass">
                  <img
                    src={hero.images.soc}
                    alt={hero.images.socAlt}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/85 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="inline-flex rounded-lg glass-strong px-2.5 py-1.5 text-[11px] font-semibold">
                      SOC Analyst
                    </span>
                  </div>
                </div>
                <div className="relative rounded-2xl overflow-hidden glass mt-6 sm:mt-10">
                  <img
                    src={hero.images.care}
                    alt={hero.images.careAlt}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/85 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="inline-flex rounded-lg glass-strong px-2.5 py-1.5 text-[11px] font-semibold">
                      Customer Care
                    </span>
                  </div>
                </div>
                <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 rounded-xl glass-strong px-3 py-2 text-[11px] font-semibold whitespace-nowrap animate-float-y">
                  Reach us anytime
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
