"use client";

import { useEffect, useRef, useState } from "react";
import { trustBar } from "@/lib/content";

function AnimatedNumber({ value, suffix = "" }: { value: string; suffix?: string }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const numericValue = parseInt(value.replace(/[^0-9]/g, ""));
          const duration = 2000;
          const startTime = Date.now();

          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(numericValue * easeOut);
            setDisplay(current.toLocaleString());
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <div ref={ref} className="font-display text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight gradient-text-security">
      {display}{suffix}
    </div>
  );
}

export default function TrustBar() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-white">
      {/* Large ellipse decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[var(--signal-security)]/5 blur-[100px] animate-pulse-soft" />
      
      <div className="relative mx-auto max-w-5xl px-6 text-center z-10">
        <p className="eyebrow mb-6">Our Impact</p>
        <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#1c1917] mb-16">
          Together, We&apos;re Making<br />A Difference
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8">
          {trustBar.stats.map((stat, i) => (
            <div key={stat.label} className="text-center relative">
              <AnimatedNumber 
                value={stat.value} 
                suffix={stat.value.includes("+") ? "+" : stat.value.includes("%") ? "%" : ""} 
              />
              <div className="mt-4 text-sm font-medium text-[#78716c] max-w-[12rem] mx-auto leading-relaxed">
                {stat.label}
              </div>
              {i < 2 && (
                <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-[#1c1917]/8" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}