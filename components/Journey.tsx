"use client";

import { useRef, useState } from "react";
import { journey } from "@/lib/content";
import Reveal from "./Reveal";

export default function Journey() {
  const [active, setActive] = useState(0);
  const scroller = useRef<HTMLDivElement>(null);

  function goTo(index: number) {
    setActive(index);
    const el = scroller.current?.children[index] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }

  return (
    <section id="journey" className="relative py-16 sm:py-24 overflow-hidden">
      <div className="px-4 sm:px-6 mx-auto max-w-7xl mb-10 sm:mb-12">
        <Reveal>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-center text-[var(--ink)]">
            {journey.headline}
          </h2>
        </Reveal>
      </div>

      <Reveal variant="scale">
        <div
          ref={scroller}
          className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory px-[max(1rem,calc((100vw-72rem)/2+1rem))] pb-4"
          onScroll={() => {
            const root = scroller.current;
            if (!root) return;
            const children = Array.from(root.children) as HTMLElement[];
            const center = root.scrollLeft + root.clientWidth / 2;
            let best = 0;
            let bestDist = Infinity;
            children.forEach((child, i) => {
              const mid = child.offsetLeft + child.offsetWidth / 2;
              const dist = Math.abs(mid - center);
              if (dist < bestDist) {
                bestDist = dist;
                best = i;
              }
            });
            setActive(best);
          }}
        >
          {journey.steps.map((step, i) => (
            <article
              key={step.title}
              onClick={() => goTo(i)}
              className={`snap-center shrink-0 w-[min(86vw,400px)] rounded-[1.75rem] p-7 sm:p-8 cursor-pointer transition-all duration-500 border ${
                active === i
                  ? "bg-white border-[var(--border)] shadow-xl shadow-black/8 scale-100"
                  : "bg-white/60 border-transparent scale-[0.96] opacity-75"
              }`}
            >
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--purple)]">
                Step {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-[var(--ink)]">
                {step.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[var(--ink-soft)]">{step.description}</p>
              <div className="mt-8 h-28 rounded-2xl overflow-hidden relative">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      i % 2 === 0
                        ? "linear-gradient(135deg, rgba(198,242,74,0.7), rgba(123,92,255,0.25))"
                        : "linear-gradient(135deg, rgba(123,92,255,0.35), rgba(199,238,248,0.8))",
                  }}
                />
                <div className="absolute inset-0 dot-field opacity-40" />
              </div>
            </article>
          ))}
        </div>
      </Reveal>

      <div className="mt-8 flex justify-center gap-2">
        {journey.steps.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to step ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              active === i ? "w-8 bg-[var(--purple)]" : "w-1.5 bg-[var(--ink)]/15"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
