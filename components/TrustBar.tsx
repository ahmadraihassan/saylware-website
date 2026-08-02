"use client";

import { trustBar } from "@/lib/content";

export default function TrustBar() {
  return (
    <section className="relative border-y border-white/[0.06] bg-[var(--bg-elevated)]">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <p className="text-center text-sm text-[var(--ink-muted)] mb-10 max-w-md mx-auto">
          {trustBar.label}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4">
          {trustBar.stats.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center relative group"
            >
              <div className="font-display text-5xl sm:text-6xl font-bold tracking-tight">
                <span
                  className={i === 0 ? "gradient-text-security" : i === 1 ? "gradient-text" : "gradient-text-support"}
                >
                  {stat.value}
                </span>
              </div>
              <div className="mt-2 text-sm text-[var(--ink-soft)] max-w-[12rem] mx-auto leading-relaxed">
                {stat.label}
              </div>
              {i < 2 && (
                <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-white/[0.06]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}