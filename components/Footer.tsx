import { footer, nav } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-[var(--bg)]">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <a href="#" className="font-display text-2xl font-bold text-white tracking-tight">
              {nav.logoText}
              <span className="text-[var(--signal-security)]">.</span>
            </a>
            <p className="mt-5 text-sm max-w-sm leading-relaxed text-[var(--ink-soft)]">
              {footer.companyDescription}
            </p>
          </div>

          {/* Columns */}
          {footer.columns.map((col) => (
            <div key={col.heading}>
              <div className="text-xs uppercase tracking-widest font-mono text-[var(--ink-muted)] mb-5">
                {col.heading}
              </div>
              <ul className="space-y-3.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[var(--ink-soft)] hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-[var(--ink-muted)]">{footer.copyright}</span>
          <div className="flex items-center gap-6">
            {footer.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="text-xs text-[var(--ink-muted)] hover:text-white transition-colors duration-300 uppercase tracking-wider"
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