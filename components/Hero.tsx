"use client";

import { useEffect, useState } from "react";
import { hero } from "@/lib/content";
import Reveal from "./Reveal";

export default function Hero() {
  const [now, setNow] = useState("");

  useEffect(() => {
    const tick = () => {
      setNow(
        new Date().toLocaleString(undefined, {
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
    <section className="relative pt-24 sm:pt-28 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl w-full">
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

              <div className="mt-6 sm:mt-8 grid sm:grid-cols-[1.15fr_auto] gap-3">
                <Reveal delay={160} variant="left">
                  <div className="rounded-2xl glass p-4 sm:p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--ink-muted)]">{hero.hours.label}</p>
                    <p className="mt-2 text-sm font-medium">{hero.hours.weekdays}</p>
                    <p className="mt-1 text-sm text-[var(--ink-soft)]">{hero.hours.weekend}</p>
                    {now && (
                      <span className="mt-3 inline-flex rounded-full glass-strong px-3 py-1.5 text-[11px] text-[var(--ink-soft)]">
                        Today · {now}
                      </span>
                    )}
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
              <div className="relative h-[300px] sm:h-[400px] lg:h-full min-h-[320px] rounded-2xl overflow-hidden glass">
                <img src={hero.image} alt={hero.imageAlt} className="absolute inset-0 w-full h-full object-cover object-top opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/80 via-transparent to-transparent" />
                <div className="absolute top-4 right-4 rounded-xl glass-strong px-3 py-2 text-xs font-semibold animate-float-y">
                  24/7 coverage ready
                </div>
                <div className="absolute bottom-4 left-4 right-4 rounded-xl glass-strong p-4">
                  <p className="text-sm font-semibold">Two services. One standard.</p>
                  <p className="text-xs text-[var(--ink-soft)] mt-1">Security and customer care, run right.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
