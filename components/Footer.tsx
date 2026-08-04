import { footer, nav } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] mt-auto">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="sm:col-span-2">
            <a
              href="#"
              className="font-display text-xl font-bold tracking-[0.14em] uppercase text-[var(--ink)]"
            >
              {nav.logoText}
            </a>
            <p className="mt-5 text-sm max-w-sm leading-relaxed text-[var(--ink-soft)]">
              {footer.companyDescription}
            </p>
          </div>

          {footer.columns.map((col) => (
            <div key={col.heading}>
              <div className="text-[11px] uppercase tracking-[0.2em] font-mono text-[var(--ink-muted)] mb-5">
                {col.heading}
              </div>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-7 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-[var(--ink-muted)]">{footer.copyright}</span>
          <div className="flex items-center gap-6">
            {footer.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="text-xs text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors uppercase tracking-wider"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
