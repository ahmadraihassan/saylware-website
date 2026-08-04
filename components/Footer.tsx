import { contact, footer, nav } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="relative mt-auto bg-[var(--ink)] text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 sm:py-16">
        <div className="rounded-[1.75rem] bg-white/5 border border-white/10 p-6 sm:p-8 mb-12 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-lg font-semibold">Stay in the loop</p>
            <p className="mt-1 text-sm text-white/55">Questions? Reach us anytime.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <a
              href={`mailto:${contact.email}`}
              className="rounded-full bg-white/10 px-5 py-3 text-sm hover:bg-white/15 transition-colors"
            >
              {contact.email}
            </a>
            <a
              href="#get-started"
              className="rounded-full bg-[var(--lime)] text-[var(--ink)] px-5 py-3 text-sm font-bold text-center hover:scale-[1.02] transition-transform"
            >
              Get started
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="sm:col-span-2">
            <a href="#" className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-[var(--lime)] text-[var(--ink)] flex items-center justify-center font-display font-bold text-sm">
                S
              </span>
              <span className="font-display text-lg font-bold tracking-tight">{nav.logoText}</span>
            </a>
            <p className="mt-5 text-sm max-w-sm leading-relaxed text-white/55">
              {footer.companyDescription}
            </p>
          </div>

          {footer.columns.map((col) => (
            <div key={col.heading}>
              <div className="text-[11px] uppercase tracking-[0.2em] font-mono text-white/40 mb-5">
                {col.heading}
              </div>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-white/65 hover:text-white transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-7 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-white/40">{footer.copyright}</span>
          <div className="flex items-center gap-6">
            {footer.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="text-xs text-white/40 hover:text-white transition-colors uppercase tracking-wider"
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
