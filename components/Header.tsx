"use client";

import { useEffect, useState } from "react";
import { nav } from "@/lib/content";

function Mark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M16 3L28 28H22.5L16 14.5L9.5 28H4L16 3Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[var(--bg)]/80 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 h-16 sm:h-[4.5rem] grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <div className="flex items-center gap-6 min-w-0">
          <a
            href="#"
            className="font-display text-[15px] font-bold tracking-[0.18em] uppercase text-[var(--ink)] shrink-0"
          >
            {nav.logoText}
          </a>
          <nav className="hidden lg:flex items-center gap-6">
            {nav.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link text-[13px] text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <a
          href="#"
          className="justify-self-center text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
          aria-label="Saylware home"
        >
          <Mark className="w-7 h-7" />
        </a>

        <div className="flex items-center justify-end gap-5">
          <div className="hidden md:flex items-center gap-5">
            {nav.actions.map((action, i) => (
              <a
                key={action.label}
                href={action.href}
                className={`text-[13px] transition-colors ${
                  i === nav.actions.length - 1
                    ? "font-semibold text-[var(--ink)] hover:text-[var(--accent)]"
                    : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
                }`}
              >
                {action.label}
              </a>
            ))}
          </div>
          <button
            type="button"
            className="lg:hidden w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[var(--ink)]"
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <div className="flex flex-col gap-1.5">
              <span className={`block h-px w-4 bg-current transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
              <span className={`block h-px w-4 bg-current transition ${open ? "opacity-0" : ""}`} />
              <span className={`block h-px w-4 bg-current transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/[0.06] bg-[var(--bg)]/95 backdrop-blur-xl px-6 py-6 space-y-4">
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
          {nav.actions.map((action) => (
            <a
              key={action.label}
              href={action.href}
              className="block text-sm font-medium text-[var(--ink)]"
              onClick={() => setOpen(false)}
            >
              {action.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
