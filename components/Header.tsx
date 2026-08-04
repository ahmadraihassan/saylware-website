"use client";

import { useEffect, useState } from "react";
import { nav } from "@/lib/content";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "px-3 sm:px-4 pt-3" : ""}`}>
      <div
        className={`mx-auto max-w-[82rem] w-full flex items-center justify-between gap-4 transition-all duration-300 ${
          scrolled
            ? "glass-strong rounded-full h-14 px-4 sm:px-6 shadow-lg shadow-black/30"
            : "h-16 sm:h-20 px-4 sm:px-6 lg:px-8"
        }`}
      >
        <a href="/" className="flex items-center gap-2.5 shrink-0">
          <span className="w-8 h-8 rounded-xl bg-[var(--ink)] text-[var(--bg)] flex items-center justify-center font-display font-bold text-sm">
            S
          </span>
          <span className="font-display text-[15px] font-bold tracking-tight">{nav.logoText}</span>
        </a>

        <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
          {nav.links.map((link) => (
            <a key={link.label} href={link.href} className="nav-link text-[13px] font-medium text-[var(--ink-soft)] hover:text-[var(--ink)]">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={nav.actions[0].href}
            className="hidden sm:inline-flex rounded-full bg-[var(--ink)] text-[var(--bg)] text-[13px] font-semibold px-4 sm:px-5 py-2.5 hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-colors"
          >
            {nav.actions[0].label}
          </a>
          <button
            type="button"
            className="lg:hidden w-10 h-10 rounded-full glass flex items-center justify-center"
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
          >
            <div className="flex flex-col gap-1.5">
              <span className={`block h-0.5 w-4 bg-[var(--ink)] transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
              <span className={`block h-0.5 w-4 bg-[var(--ink)] transition ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-4 bg-[var(--ink)] transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden mx-3 mt-2 soft-shell p-5 space-y-3">
          {nav.links.map((link) => (
            <a key={link.label} href={link.href} className="block text-sm text-[var(--ink-soft)]" onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <a href={nav.actions[0].href} className="inline-flex rounded-full bg-[var(--ink)] text-[var(--bg)] text-sm font-semibold px-5 py-2.5" onClick={() => setOpen(false)}>
            {nav.actions[0].label}
          </a>
        </div>
      )}
    </header>
  );
}
