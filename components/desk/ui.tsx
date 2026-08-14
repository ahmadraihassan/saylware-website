export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`soft-shell p-5 sm:p-6 ${className}`}>{children}</div>;
}

export function PageTitle({ kicker, title, hint }: { kicker: string; title: string; hint?: string }) {
  return (
    <div className="mb-6">
      <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--accent)] mb-2">{kicker}</p>
      <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">{title}</h1>
      {hint ? <p className="mt-2 text-sm text-[var(--ink-soft)] max-w-2xl">{hint}</p> : null}
    </div>
  );
}

export function Badge({
  children,
  tone = "muted",
}: {
  children: React.ReactNode;
  tone?: "muted" | "accent" | "lime" | "purple" | "warn";
}) {
  const map = {
    muted: "bg-white/8 text-[var(--ink-soft)]",
    accent: "bg-[var(--accent-dim)] text-[var(--accent)]",
    lime: "bg-[rgba(198,242,74,0.12)] text-[var(--lime)]",
    purple: "bg-[rgba(139,124,255,0.15)] text-[var(--purple)]",
    warn: "bg-red-500/15 text-red-300",
  };
  return <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${map[tone]}`}>{children}</span>;
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-medium text-[var(--ink-soft)]">{label}</span>
      {children}
    </label>
  );
}

export const inputClass =
  "w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-sm text-[var(--ink)] placeholder:text-[var(--ink-muted)]";

export function PrimaryButton({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`rounded-full bg-[var(--accent)] text-[var(--bg)] text-sm font-semibold px-4 py-2.5 hover:brightness-110 disabled:opacity-50 ${props.className || ""}`}
    >
      {children}
    </button>
  );
}

export function GhostButton({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`rounded-full glass text-sm font-medium px-4 py-2.5 text-[var(--ink)] hover:bg-white/10 disabled:opacity-50 ${props.className || ""}`}
    >
      {children}
    </button>
  );
}

export function statusTone(status: string) {
  if (["replied", "meeting", "won", "clicked"].includes(status)) return "lime" as const;
  if (["awaiting_approval", "approved", "queued", "scheduled"].includes(status)) return "accent" as const;
  if (["bounced", "lost", "suppressed", "unsubscribed", "failed"].includes(status)) return "warn" as const;
  if (["opened", "sent"].includes(status)) return "purple" as const;
  return "muted" as const;
}
