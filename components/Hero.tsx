"use client";

import { hero } from "@/lib/content";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" style={{ background: "var(--gradient-hero)" }}>
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 dots-pattern opacity-50" />

      {/* Floating decorative circles */}
      <div className="absolute top-32 left-[8%] w-16 h-16 rounded-full bg-[var(--signal-security)]/10 animate-float" />
      <div className="absolute top-48 right-[12%] w-24 h-24 rounded-full bg-[var(--signal-support)]/10 animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-32 left-[15%] w-12 h-12 rounded-full bg-[#1c1917]/5 animate-float" style={{ animationDelay: "4s" }} />

      <div className="relative mx-auto max-w-6xl px-6 text-center z-10">
        <p className="eyebrow mb-8">{hero.eyebrow}</p>

        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] text-[#1c1917]">
          <span className="block">Secure What</span>
          <span className="inline-flex items-center gap-4 justify-center flex-wrap">
            <span>Matters</span>
            {/* Ellipse image in headline */}
            <span className="relative inline-block w-32 h-16 sm:w-48 sm:h-20 md:w-56 md:h-24 rounded-full overflow-hidden shadow-xl ring-4 ring-white/50">
              <img
                src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=200&fit=crop"
                alt="Security"
                className="w-full h-full object-cover"
              />
            </span>
            <span>Most</span>
          </span>
        </h1>

        <p className="mt-8 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto text-[#78716c]">
          {hero.subheadline}
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#services-security"
            className="w-full sm:w-auto rounded-full px-10 py-4 text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[var(--signal-security)]/30"
            style={{ background: "var(--gradient-security)" }}
          >
            Cybersecurity
          </a>
          <a
            href="#services-support"
            className="w-full sm:w-auto rounded-full px-10 py-4 text-sm font-bold text-[#1c1917] transition-all duration-300 hover:scale-105 border-2 border-[#1c1917]/10 hover:border-[var(--signal-support)] bg-white hover:bg-[var(--signal-support)]/5"
          >
            Customer Support
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-20 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#a8a29e]">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#a8a29e] to-transparent" />
        </div>
      </div>
    </section>
  );
}