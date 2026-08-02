import { nav } from "@/lib/content";

export default function Header() {
  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur"
      style={{ borderColor: "var(--line)", background: "color-mix(in srgb, var(--paper) 88%, transparent)" }}
    >
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-display text-lg font-semibold tracking-tight">
          {nav.logoText}
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium hover:opacity-70 transition-opacity"
              style={{ color: "var(--ink-soft)" }}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="rounded-full px-4 py-2 text-sm font-semibold text-white"
          style={{ background: "var(--ink)" }}
        >
          Get in touch
        </a>
      </div>
    </header>
  );
}
