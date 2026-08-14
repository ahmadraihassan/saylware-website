import Link from "next/link";
import { logoutAction } from "@/lib/desk/actions";

const NAV = [
  { href: "/desk", label: "Home" },
  { href: "/desk/queue", label: "Approve" },
  { href: "/desk/leads", label: "Leads" },
  { href: "/desk/jobs", label: "Hiring" },
  { href: "/desk/follow-ups", label: "Follow-ups" },
  { href: "/desk/calendar", label: "Calendar" },
  { href: "/desk/settings", label: "Settings" },
];

export default function DeskShell({
  children,
  remaining,
  awaiting,
}: {
  children: React.ReactNode;
  remaining: number;
  awaiting: number;
}) {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <header className="sticky top-0 z-40 border-b border-white/8 bg-[#0e0f12]/85 backdrop-blur-xl">
        <div className="mx-auto max-w-[88rem] px-4 sm:px-6 h-16 flex items-center gap-4">
          <Link href="/desk" className="font-display font-bold tracking-tight shrink-0">
            Saylware Desk
          </Link>
          <nav className="hidden md:flex items-center gap-1 overflow-x-auto no-scrollbar">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-1.5 text-[13px] font-medium text-[var(--ink-soft)] hover:text-[var(--ink)] hover:bg-white/5"
              >
                {item.label}
                {item.href === "/desk/queue" && awaiting > 0 ? (
                  <span className="ml-1.5 rounded-full bg-[var(--accent)] text-[var(--bg)] text-[10px] font-bold px-1.5 py-0.5">
                    {awaiting}
                  </span>
                ) : null}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <span className="font-mono text-[11px] text-[var(--ink-muted)]">{remaining} left today</span>
            <form action={logoutAction}>
              <button type="submit" className="text-[13px] text-[var(--ink-soft)] hover:text-[var(--ink)]">
                Log out
              </button>
            </form>
          </div>
        </div>
        <nav className="md:hidden px-4 pb-3 flex gap-2 overflow-x-auto no-scrollbar">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-full glass px-3 py-1.5 text-xs font-medium text-[var(--ink-soft)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-[88rem] px-4 sm:px-6 py-8">{children}</main>
    </div>
  );
}
