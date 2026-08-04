"use client";

import { useState } from "react";
import { testimonials } from "@/lib/content";
import Reveal from "./Reveal";
import Icon from "./Icon";

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const items = testimonials.items;
  const n = items.length;

  function prev() {
    setActive((i) => (i - 1 + n) % n);
  }
  function next() {
    setActive((i) => (i + 1) % n);
  }

  return (
    <section id="testimonials" className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="mx-auto max-w-[82rem] w-full">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="inline-flex rounded-full glass px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--ink-muted)]">
              {testimonials.eyebrow}
            </span>
            <h2 className="mt-4 font-display text-[clamp(1.75rem,3.5vw,3rem)] font-bold tracking-tight">
              {testimonials.headline}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--ink-soft)]">{testimonials.subheadline}</p>
          </div>
        </Reveal>

        <div className="flex items-end justify-center gap-4 sm:gap-5 mb-8 sm:mb-10">
          {items.map((item, i) => {
            const dist = Math.min(Math.abs(i - active), Math.abs(i - active + n), Math.abs(i - active - n));
            const size = dist === 0 ? 88 : dist === 1 ? 72 : 60;
            const opacity = dist === 0 ? 1 : dist === 1 ? 0.65 : 0.4;
            return (
              <button
                key={item.name}
                type="button"
                onClick={() => setActive(i)}
                className="relative transition-all duration-300"
                style={{ width: size, height: size, opacity }}
                aria-label={`Show ${item.name}`}
              >
                <span
                  className={`block w-full h-full rounded-2xl overflow-hidden border-2 ${
                    dist === 0 ? "border-[var(--accent)]" : "border-white/10"
                  }`}
                >
                  <img src={item.avatar} alt="" className="w-full h-full object-cover" />
                </span>
                <span
                  className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-lg border border-white/15 text-[10px] font-bold flex items-center justify-center text-[var(--bg)] shadow-lg"
                  style={{ background: item.logoColor }}
                  title={item.company}
                >
                  {item.logo}
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative flex items-center justify-center min-h-[300px] sm:min-h-[320px]">
          {items.map((item, i) => {
            const offset = (i - active + n) % n;
            const pos =
              offset === 0
                ? 0
                : offset === 1
                  ? 1
                  : offset === n - 1
                    ? -1
                    : offset > n / 2
                      ? -2
                      : 2;
            const isCenter = i === active;
            return (
              <article
                key={item.name}
                className={`absolute w-[min(94vw,560px)] rounded-2xl border p-5 sm:p-7 transition-all duration-500 ${
                  isCenter ? "z-20 opacity-100" : "z-10 opacity-35 pointer-events-none"
                }`}
                style={{
                  transform: `translateX(${pos * 26}%) scale(${isCenter ? 1 : 0.92})`,
                  background: "#171920",
                  borderColor: isCenter ? "rgba(245,158,11,0.35)" : "rgba(255,255,255,0.08)",
                  boxShadow: isCenter ? "0 24px 60px -28px rgba(0,0,0,0.7)" : "none",
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-[var(--ink-muted)]">
                    <Icon name="asterisk" className="w-4 h-4 text-[var(--accent)]" />
                    {item.type}
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="relative">
                      <img src={item.avatar} alt="" className="w-11 h-11 rounded-xl object-cover" />
                      <span
                        className="absolute -bottom-1 -right-1 w-5 h-5 rounded-md text-[8px] font-bold flex items-center justify-center text-[var(--bg)]"
                        style={{ background: item.logoColor }}
                      >
                        {item.logo}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold leading-tight">{item.name}</p>
                      <p className="text-[11px] text-[var(--ink-muted)]">{item.role}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-[var(--accent)]">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <svg key={s} className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 1.5l1.9 3.85 4.25.62-3.07 2.99.72 4.22L8 11.27 4.2 13.18l.72-4.22L1.85 5.97l4.25-.62L8 1.5z" />
                    </svg>
                  ))}
                  <span className="text-sm font-semibold text-[var(--ink)] ml-1">{item.rating}</span>
                </div>

                <p className="mt-4 text-sm sm:text-base leading-relaxed text-[var(--ink-soft)]">“{item.quote}”</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((t) => (
                    <span key={t} className="rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-[10px] text-[var(--ink-muted)]">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center gap-3">
          <button type="button" onClick={prev} aria-label="Previous" className="w-11 h-11 rounded-xl glass-strong flex items-center justify-center hover:border-[var(--accent)]/40 transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button type="button" onClick={next} aria-label="Next" className="w-11 h-11 rounded-xl glass-strong flex items-center justify-center hover:border-[var(--accent)]/40 transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
