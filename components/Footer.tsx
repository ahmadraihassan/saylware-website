import { contact, footer, nav } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="relative mt-auto border-t border-[var(--border)]">
      <div className="mx-auto max-w-[82rem] w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        <div className="soft-shell p-5 sm:p-6 mb-10 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-lg font-semibold">Reach us anytime</p>
            <p className="mt-1 text-sm text-[var(--ink-muted)]">
              Questions, alerts, or escalations — we pick up when you need us. Double down and get in touch.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={`mailto:${contact.email}`} className="rounded-full glass px-5 py-3 text-sm text-center">
              {contact.email}
            </a>
            <a href={`tel:${contact.phone.replace(/\s+/g, "")}`} className="rounded-full glass px-5 py-3 text-sm text-center">
              {contact.phone}
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full glass px-5 py-3 text-sm text-center"
            >
              LinkedIn
            </a>
            <a
              href="/#get-started"
              className="rounded-full bg-[var(--accent)] text-[var(--bg)] px-5 py-3 text-sm font-bold text-center"
            >
              Get started
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
          <div className="sm:col-span-2">
            <a href="/" className="flex items-center gap-2.5">
              <img src="/saylware-mark.png" alt="Saylware" className="w-8 h-8 rounded-xl object-cover" />
              <span className="font-display text-lg font-bold">{nav.logoText}</span>
            </a>
            <p className="mt-4 text-sm max-w-sm leading-relaxed text-[var(--ink-soft)]">{footer.companyDescription}</p>
            <a href="/careers" className="inline-flex mt-4 text-sm font-semibold text-[var(--accent)] hover:underline">
              Work with us →
            </a>
          </div>
          {footer.columns.map((col) => (
            <div key={col.heading}>
              <div className="text-[11px] uppercase tracking-[0.2em] font-mono text-[var(--ink-muted)] mb-4">
                {col.heading}
              </div>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-[var(--ink-soft)] hover:text-[var(--ink)]">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-[var(--ink-muted)]">{footer.copyright}</span>
          <div className="flex gap-5">
            {footer.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-xs text-[var(--ink-muted)] hover:text-[var(--ink)] uppercase tracking-wider"
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
