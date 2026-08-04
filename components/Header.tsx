"use client";

import { useEffect, useState } from "react";
import { nav } from "@/lib/content";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled ? "px-3 sm:px-5 pt-3" : "px-0 pt-0"
      }`}
    >
      <div
        className={`mx-auto max-w-7xl transition-all duration-400 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl border border-[var(--border)] shadow-lg shadow-black/5 rounded-full px-5 sm:px-7 h-14"
            : "bg-transparent px-5 sm:px-8 h-18 sm:h-20"
        } flex items-center justify-between`}
      >
        <a href="#" className="flex items-center gap-2.5 shrink-0">
          <span className="w-8 h-8 rounded-xl bg-[var(--ink)] text-[var(--lime)] flex items-center justify-center font-display font-bold text-sm">
            S
          </span>
          <span className="font-display text-[15px] font-bold tracking-tight text-[var(--ink)]">
            {nav.logoText}
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          {nav.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link text-[13px] font-medium text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={nav.actions[0].href}
            className="hidden sm:inline-flex rounded-full bg-[var(--ink)] text-white text-[13px] font-semibold px-5 py-2.5 hover:bg-[var(--purple)] transition-colors duration-300"
          >
            {nav.actions[0].label}
          </a>
          <button
            type="button"
            className="lg:hidden w-10 h-10 rounded-full border border-[var(--border)] bg-white flex items-center justify-center"
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
            <a
              key={link.label}
              href={link.href}
              className="block text-sm text-[var(--ink-soft)]"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={nav.actions[0].href}
            className="inline-flex rounded-full bg-[var(--ink)] text-white text-sm font-semibold px-5 py-2.5"
            onClick={() => setOpen(false)}
          >
            {nav.actions[0].label}
          </a>
        </div>
      )}
    </header>
  );
}
