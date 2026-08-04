"use client";

import { useEffect, useState } from "react";
import { hero } from "@/lib/content";
import Reveal from "./Reveal";

export default function Hero() {
  const [now, setNow] = useState("");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setNow(
        d.toLocaleString(undefined, {
          weekday: "long",
          hour: "numeric",
          minute: "2-digit",
        })
      );
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative pt-24 sm:pt-28 pb-10 sm:pb-14 px-4 sm:px-6">
      {/* Decorative floating chips */}
      <div className="pointer-events-none absolute top-32 left-[6%] w-14 h-14 rounded-2xl bg-[var(--lime)]/80 rotate-12 animate-float-rotate hidden md:block" />
      <div className="pointer-events-none absolute top-48 right-[8%] w-10 h-10 rounded-full bg-[var(--purple)]/25 animate-float-y hidden md:block" />
      <div className="pointer-events-none absolute bottom-24 left-[18%] w-8 h-8 rounded-xl bg-[var(--lavender)] animate-float-y hidden lg:block" style={{ animationDelay: "1.5s" }} />

      <div className="mx-auto max-w-7xl">
        <div className="soft-shell overflow-hidden relative">
          <div className="absolute inset-0 dot-field opacity-40 pointer-events-none" />
          <div className="relative grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-4 p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col justify-center py-2 lg:pr-6">
              <Reveal>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-bold tracking-tight leading-[1.08] text-[var(--ink)]">
                  {hero.headline}
                </h1>
              </Reveal>
              <Reveal delay={80}>
                <p className="mt-5 text-base sm:text-lg text-[var(--ink-soft)] leading-relaxed max-w-md">
                  {hero.subheadline}
                </p>
              </Reveal>

              <Reveal delay={140}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={hero.primaryCta.href}
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--lime)] text-[var(--ink)] text-sm font-bold px-6 py-3.5 hover:scale-[1.03] transition-transform shadow-lg shadow-[var(--lime)]/30"
                  >
                    {hero.primaryCta.label}
                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </Reveal>

              <div className="mt-8 grid sm:grid-cols-[1.2fr_auto] gap-3 items-stretch">
                <Reveal delay={180} variant="left">
                  <div className="rounded-[1.35rem] bg-[var(--bg-soft)] p-4 sm:p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--ink-muted)]">
                      {hero.hours.label}
                    </p>
                    <p className="mt-2 text-sm font-medium text-[var(--ink)]">{hero.hours.weekdays}</p>
                    <p className="mt-1 text-sm text-[var(--ink-soft)]">{hero.hours.weekend}</p>
                    {now && (
                      <span className="mt-3 inline-flex rounded-full bg-white px-3 py-1.5 text-[11px] font-medium text-[var(--ink-soft)] border border-[var(--border)]">
                        Today · {now}
                      </span>
                    )}
                  </div>
                </Reveal>
                <Reveal delay={220} variant="right">
                  <a
                    href={hero.bookCta.href}
                    className="group h-full min-h-[140px] rounded-[1.35rem] bg-[#c7eef8] p-5 flex flex-col justify-between hover:scale-[1.02] transition-transform"
                  >
                    <span className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-[var(--ink)] group-hover:bg-[var(--ink)] group-hover:text-white transition-colors">
                      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                        <path d="M5 15L15 5M15 5H8M15 5v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="font-display text-base font-semibold text-[var(--ink)] leading-tight">
                      {hero.bookCta.label}
                    </span>
                  </a>
                </Reveal>
              </div>
            </div>

            <Reveal variant="scale" delay={100}>
              <div className="relative h-[360px] sm:h-[440px] lg:h-full min-h-[420px] rounded-[1.75rem] overflow-hidden bg-[var(--lavender)]">
                <img
                  src={hero.image}
                  alt={hero.imageAlt}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--purple)]/25 via-transparent to-transparent" />
                <div className="absolute top-5 right-5 rounded-2xl bg-white/90 backdrop-blur px-3.5 py-2 text-xs font-semibold text-[var(--ink)] shadow-lg animate-float-y">
                  24/7 coverage ready
                </div>
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/90 backdrop-blur p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-[var(--lime)] flex items-center justify-center text-sm font-bold">
                      ✓
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[var(--ink)]">Two services. One standard.</p>
                      <p className="text-xs text-[var(--ink-soft)]">Security and customer care, run right.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
