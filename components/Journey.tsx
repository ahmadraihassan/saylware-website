"use client";

import { useEffect, useRef, useState } from "react";
import { journey } from "@/lib/content";
import Reveal from "./Reveal";
import Icon from "./Icon";

export default function Journey() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const nodes = stepRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const idx = Number((visible[0].target as HTMLElement).dataset.index);
          if (!Number.isNaN(idx)) {
            setActive(idx);
            setProgress((idx + 1) / journey.steps.length);
          }
        }
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: [0.2, 0.5, 0.8] }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="journey" className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="mx-auto max-w-[82rem] w-full">
        <Reveal>
          <h2 className="font-display text-[clamp(1.75rem,3.5vw,3rem)] font-bold tracking-tight text-center mb-10 sm:mb-14">
            {journey.headline}
          </h2>
        </Reveal>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-5 sm:left-8 top-2 bottom-2 w-px bg-white/10" />
          <div
            className="absolute left-5 sm:left-8 top-2 w-px bg-[var(--accent)] transition-all duration-500 ease-out"
            style={{ height: `calc(${progress * 100}% - 8px)` }}
          />

          <div className="space-y-5 sm:space-y-6">
            {journey.steps.map((step, i) => {
              const isActive = i === active;
              const isPast = i < active;
              return (
                <div
                  key={step.title}
                  data-index={i}
                  ref={(el) => {
                    stepRefs.current[i] = el;
                  }}
                  className={`relative pl-14 sm:pl-20 transition-all duration-500 ${
                    isActive ? "opacity-100 translate-x-0" : isPast ? "opacity-70" : "opacity-35 translate-x-2"
                  }`}
                >
                  <div
                    className={`absolute left-3.5 sm:left-[1.65rem] top-6 w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 ${
                      isActive || isPast
                        ? "bg-[var(--accent)] border-[var(--accent)] scale-110"
                        : "bg-[var(--bg)] border-white/25"
                    }`}
                  />
                  <article
                    className={`rounded-2xl border p-5 sm:p-6 transition-all duration-400 ${
                      isActive
                        ? "bg-[#1a1c22] border-[var(--accent)]/40 shadow-lg shadow-black/30 scale-[1.01]"
                        : "bg-white/[0.03] border-[var(--border)]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                          isActive
                            ? "bg-[var(--accent)]/15 border-[var(--accent)]/40 text-[var(--accent)]"
                            : "bg-white/5 border-white/10 text-[var(--ink-muted)]"
                        }`}
                      >
                        <Icon name={step.icon} />
                      </span>
                      <div>
                        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--accent)]">
                          Step {String(i + 1).padStart(2, "0")}
                        </p>
                        <h3 className="font-display text-lg sm:text-xl font-semibold mt-0.5">{step.title}</h3>
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">{step.description}</p>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
