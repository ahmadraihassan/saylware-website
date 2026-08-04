"use client";

import { useState } from "react";
import { pillars } from "@/lib/content";
import Reveal from "./Reveal";
import Icon from "./Icon";

const accents = [
  "from-[#8b7cff]/25 to-[#8b7cff]/5 border-[#8b7cff]/35",
  "from-[#c6f24a]/20 to-[#c6f24a]/5 border-[#c6f24a]/30",
  "from-[#f59e0b]/25 to-[#f59e0b]/5 border-[#f59e0b]/35",
];

export default function Pillars() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="about" className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[82rem] w-full">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 lg:gap-12 mb-8 sm:mb-10">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--accent)] mb-3">{pillars.eyebrow}</p>
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,3rem)] font-bold tracking-tight leading-tight">
              {pillars.headline}
            </h2>
          </Reveal>
          <Reveal delay={80} variant="right">
            <p className="text-[var(--ink-soft)] text-base sm:text-lg leading-relaxed max-w-xl lg:pt-8">{pillars.description}</p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-5">
          {pillars.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.title} delay={i * 70}>
                <article
                  className={`rounded-2xl border bg-gradient-to-br p-5 sm:p-6 transition-all duration-400 cursor-default backdrop-blur-xl ${accents[i]} ${
                    isOpen ? "shadow-xl shadow-black/30 -translate-y-0.5" : "hover:-translate-y-0.5"
                  }`}
                  style={{ backgroundColor: "rgba(22, 24, 30, 0.85)" }}
                  onMouseEnter={() => setOpen(i)}
                  onMouseLeave={() => setOpen(null)}
                  onFocus={() => setOpen(i)}
                  onBlur={() => setOpen(null)}
                  tabIndex={0}
                >
                  <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-[var(--accent)] mb-4">
                    <Icon name={item.icon} className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-2 text-sm text-[var(--ink-soft)]">{item.summary}</p>
                  <div
                    className={`grid transition-all duration-400 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 mt-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-sm leading-relaxed text-[var(--ink-muted)] border-t border-white/10 pt-4">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
