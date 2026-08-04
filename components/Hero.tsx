"use client";

import { useState } from "react";
import { hero } from "@/lib/content";
import Reveal from "./Reveal";

export default function Hero() {
  const [hotspotOpen, setHotspotOpen] = useState(true);

  return (
    <section className="relative pt-28 sm:pt-32 pb-16 sm:pb-24 px-5 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-16 items-end mb-10 sm:mb-14">
          <Reveal>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold tracking-tight leading-[1.05] uppercase text-[var(--ink)]">
              {hero.headlineLeft}
              <br />
              <span className="text-[var(--ink-soft)]">{hero.headlineRight}</span>
            </h1>
          </Reveal>
          <Reveal delay={120} variant="right">
            <p className="text-base sm:text-lg leading-relaxed text-[var(--ink-soft)] max-w-md lg:ml-auto lg:pb-2">
              {hero.subheadline}
            </p>
          </Reveal>
        </div>

        <Reveal variant="scale" delay={80}>
          <div className="notch-frame group relative aspect-[16/10] sm:aspect-[21/10] bg-[var(--bg-card)]">
            <span className="notch-side-left" />
            <span className="notch-side-right" />
            <img
              src={hero.image}
              alt={hero.imageAlt}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] cubic-bezier(0.16,1,0.3,1) group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

            {/* Hotspot */}
            <div className="absolute left-[42%] top-[48%] z-10">
              <button
                type="button"
                aria-label="Show highlight"
                onClick={() => setHotspotOpen((v) => !v)}
                className="relative w-4 h-4 rounded-full bg-white hotspot-dot cursor-pointer"
              >
                <span className="absolute inset-0 rounded-full bg-white/40 scale-150" />
              </button>

              <div
                className={`absolute left-8 top-1/2 -translate-y-1/2 w-56 sm:w-64 transition-all duration-500 ${
                  hotspotOpen
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-3 pointer-events-none"
                }`}
              >
                <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 p-4 shadow-2xl shadow-black/40">
                  <p className="font-display text-sm font-semibold text-white">
                    {hero.hotspot.title}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-white/70">
                    {hero.hotspot.description}
                  </p>
                  <a
                    href={hero.hotspot.href}
                    className="mt-3 inline-flex items-center gap-2 rounded-full bg-white text-[var(--bg)] text-xs font-semibold px-3.5 py-1.5 hover:bg-[var(--accent)] hover:text-white transition-colors"
                  >
                    {hero.hotspot.cta}
                    <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
