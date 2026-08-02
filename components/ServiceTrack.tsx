"use client";

import { useState, useEffect } from "react";
import { cybersecurity, customerService } from "@/lib/content";

const allServices = [
  ...cybersecurity.services.map((s, i) => ({ ...s, track: "security" as const, image: `https://images.unsplash.com/photo-${[
    "1563986768609-322da13575f3",
    "1555949963-aa79dcee981c",
    "1544197150-b99a580bb7a8",
    "1526374965328-7f61d4dc18c5"
  ][i]}?w=600&h=400&fit=crop` })),
  ...customerService.services.map((s, i) => ({ ...s, track: "support" as const, image: `https://images.unsplash.com/photo-${[
    "1516321318423-f06f85e504b3",
    "1531538606174-0f90ff5dce83",
    "1553877522-43269d4ea984",
    "1521737711867-5f2f08c10d7e"
  ][i]}?w=600&h=400&fit=crop` })),
];

export default function ServiceTrack() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % allServices.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="services" className="relative py-24 sm:py-32 overflow-hidden bg-[#faf6f0]">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="eyebrow mb-4">What We Do</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#1c1917]">
            Providing Hope And Help<br />During Challenging Times
          </h2>
        </div>

        {/* Swipe Cards */}
        <div className="relative">
          <div className="flex gap-6 overflow-hidden">
            {allServices.map((service, i) => {
              const isActive = i === activeIndex;
              const isPrev = i === (activeIndex - 1 + allServices.length) % allServices.length;
              const isNext = i === (activeIndex + 1) % allServices.length;

              return (
                <div
                  key={service.title}
                  className={`flex-shrink-0 w-full sm:w-[calc(50%-12px)] transition-all duration-700 ease-out ${
                    isActive 
                      ? "opacity-100 scale-100" 
                      : isPrev || isNext 
                        ? "opacity-40 scale-95 blur-[2px]" 
                        : "opacity-0 scale-90 blur-sm absolute"
                  }`}
                  style={{
                    transform: isActive ? "translateX(0)" : isPrev ? "translateX(-20%)" : "translateX(20%)",
                  }}
                >
                  <div className={`rounded-3xl overflow-hidden border transition-all duration-500 ${
                    isActive 
                      ? "bg-white border-[#1c1917]/8 shadow-xl shadow-[#1c1917]/5" 
                      : "bg-[#faf6f0] border-[#1c1917]/5"
                  }`}>
                    {/* Image on top */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white ${
                        service.track === "security" ? "bg-[var(--signal-security)]" : "bg-[var(--signal-support)]"
                      }`}>
                        {service.track === "security" ? "Security" : "Support"}
                      </div>
                    </div>

                    {/* Description below */}
                    <div className="p-8">
                      <h3 className="font-display text-xl font-bold text-[#1c1917] mb-3">
                        {service.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[#78716c]">
                        {service.description}
                      </p>
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-2 mt-6 text-sm font-bold text-[var(--signal-security)] hover:gap-3 transition-all"
                      >
                        Learn More
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-10">
            {allServices.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "bg-[var(--signal-security)] w-8" : "bg-[#1c1917]/15 hover:bg-[#1c1917]/25"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}