"use client";

import { useEffect, useRef, useState } from "react";
import { journey } from "@/lib/content";
import Reveal from "./Reveal";
import Icon from "./Icon";

export default function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const raw = Math.min(1, Math.max(0, -rect.top / Math.max(total, 1)));
      setProgress(raw);
      setActive(Math.min(journey.steps.length - 1, Math.floor(raw * journey.steps.length)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative px-4 sm:px-6 lg:px-8"
      style={{ height: `${journey.steps.length * 85}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center py-20">
        <div className="mx-auto max-w-7xl w-full">
          <Reveal>
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,3rem)] font-bold tracking-tight text-center mb-10 sm:mb-14">
              {journey.headline}
            </h2>
          </Reveal>

          <div className="relative">
            {/* Track */}
            <div className="absolute left-4 sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-px bg-white/10" />
            <div
              className="absolute left-4 sm:left-1/2 sm:-translate-x-px top-0 w-px bg-[var(--accent)] origin-top transition-none"
              style={{ height: `${progress * 100}%` }}
            />

            <div className="space-y-8 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-16 sm:gap-y-10">
              {journey.steps.map((step, i) => {
                const isActive = i === active;
                const isPast = i < active;
                const side = i % 2 === 0;
                return (
                  <div
                    key={step.title}
                    className={`relative pl-12 sm:pl-0 ${side ? "sm:pr-10 sm:text-right sm:col-start-1" : "sm:pl-10 sm:col-start-2"}`}
                    style={{ gridRow: i + 1 }}
                  >
                    <div
                      className={`absolute left-[0.55rem] sm:left-1/2 sm:-translate-x-1/2 top-5 w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 ${
                        isActive || isPast
                          ? "bg-[var(--accent)] border-[var(--accent)] scale-110"
                          : "bg-[var(--bg)] border-white/25"
                      }`}
                    />
                    <article
                      className={`soft-shell p-5 sm:p-6 inline-block w-full max-w-md transition-all duration-400 ${
                        side ? "sm:ml-auto" : ""
                      } ${isActive ? "ring-1 ring-[var(--accent)]/40 scale-[1.02]" : "opacity-60"}`}
                    >
                      <div className={`flex items-center gap-3 ${side ? "sm:flex-row-reverse" : ""}`}>
                        <span className="w-10 h-10 rounded-xl glass-strong flex items-center justify-center text-[var(--accent)] shrink-0">
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
      </div>
    </section>
  );
}
