import { footer, nav } from "@/lib/content";

export default function Footer() {
  return (
    <footer style={{ background: "var(--ink)", color: "#c7cec9" }}>
      <div className="mx-auto max-w-6xl px-6 py-14 grid grid-cols-1 sm:grid-cols-4 gap-10">
        <div className="sm:col-span-2">
          <div className="font-display text-lg font-semibold text-white">{nav.logoText}</div>
          <p className="mt-3 text-sm max-w-xs leading-relaxed">{footer.companyDescription}</p>
        </div>
        {footer.columns.map((col) => (
          <div key={col.heading}>
            <div className="text-xs uppercase tracking-wider font-mono text-white/60 mb-3">
              {col.heading}
            </div>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div
        className="border-t px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 max-w-6xl mx-auto text-xs"
        style={{ borderColor: "#2c3a34" }}
      >
        <span>{footer.copyright}</span>
        <div className="flex gap-5">
          {footer.socials.map((s) => (
            <a key={s.label} href={s.href} className="hover:text-white transition-colors">
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
