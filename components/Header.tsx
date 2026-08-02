"use client";

import { useState, useEffect } from "react";
import { nav } from "@/lib/content";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-[#1c1917]/6 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 h-18 flex items-center justify-between">
        <a
          href="#"
          className="font-display text-xl font-bold tracking-tight text-[#1c1917] hover:opacity-80 transition-opacity"
        >
          {nav.logoText}
          <span className="text-[var(--signal-security)]">.</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#78716c] hover:text-[#1c1917] transition-colors tracking-wide uppercase"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:+1234567890"
            className="w-10 h-10 rounded-full border border-[#1c1917]/10 flex items-center justify-center text-[#1c1917] hover:bg-[#1c1917]/5 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center rounded-full px-6 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[var(--signal-security)]/25"
            style={{ background: "var(--gradient-security)" }}
          >
            Get in touch
          </a>
        </div>
      </div>
    </header>
  );
}