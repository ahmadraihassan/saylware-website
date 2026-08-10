/** Mini dashboard widgets for service cards — inspired by SaaS analytics UIs */

export default function ServiceWidget({
  slug,
  compact = false,
}: {
  slug: string;
  compact?: boolean;
}) {
  const pad = compact ? "p-2.5" : "p-3";

  switch (slug) {
    case "managed-detection-response":
      return (
        <div className={`${pad} h-full flex flex-col justify-between gap-2`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-[var(--ink-muted)] uppercase tracking-wider">Alert health</span>
            <span className="rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-semibold px-2 py-0.5">• In range</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative w-14 h-14 shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
                <circle cx="18" cy="18" r="14" fill="none" stroke="#f59e0b" strokeWidth="4" strokeDasharray="70 88" strokeLinecap="round" />
                <circle cx="18" cy="18" r="14" fill="none" stroke="#8b7cff" strokeWidth="4" strokeDasharray="18 88" strokeDashoffset="-70" strokeLinecap="round" />
              </svg>
            </div>
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex justify-between text-[11px]"><span className="text-[var(--ink-soft)]">Cleared</span><span className="font-semibold">84</span></div>
              <div className="flex justify-between text-[11px]"><span className="text-[var(--ink-soft)]">Escalated</span><span className="font-semibold text-[var(--accent)]">12</span></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            <div className="rounded-lg bg-white/5 px-2 py-1.5"><p className="text-[9px] text-[var(--ink-muted)]">Endpoints</p><p className="text-[10px] font-semibold text-emerald-400">• Optimal</p></div>
            <div className="rounded-lg bg-white/5 px-2 py-1.5"><p className="text-[9px] text-[var(--ink-muted)]">Cloud</p><p className="text-[10px] font-semibold text-emerald-400">• Optimal</p></div>
          </div>
        </div>
      );

    case "incident-response":
      return (
        <div className={`${pad} h-full flex flex-col gap-2`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-[var(--ink-muted)] uppercase tracking-wider">Containment flow</span>
            <span className="text-[10px] text-[var(--accent)] font-semibold">Live</span>
          </div>
          <div className="flex items-end gap-1 h-16">
            {[40, 55, 70, 48, 85].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-md relative overflow-hidden" style={{ height: `${h}%` }}>
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      i === 4
                        ? "linear-gradient(180deg,#f59e0b,#ea580c)"
                        : "repeating-linear-gradient(135deg, rgba(139,124,255,0.55) 0 3px, rgba(139,124,255,0.2) 3px 6px)",
                  }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[9px] text-[var(--ink-muted)]">
            <span>Triage</span><span>Isolate</span><span>Contain</span><span>Recover</span><span>Done</span>
          </div>
        </div>
      );

    case "vulnerability-management":
      return (
        <div className={`${pad} h-full flex flex-col gap-2`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-[var(--ink-muted)] uppercase tracking-wider">Patch priority</span>
            <span className="rounded-full bg-[var(--accent)]/15 text-[var(--accent)] text-[10px] font-semibold px-2 py-0.5">• Focused</span>
          </div>
          {[
            { label: "Critical exposed", pct: 88, color: "#f59e0b" },
            { label: "High priority", pct: 64, color: "#8b7cff" },
            { label: "Backlog", pct: 35, color: "#38bdf8" },
          ].map((row) => (
            <div key={row.label}>
              <div className="flex justify-between text-[10px] mb-1">
                <span className="text-[var(--ink-soft)]">{row.label}</span>
                <span className="font-semibold">{row.pct}%</span>
              </div>
              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${row.pct}%`,
                    background: `repeating-linear-gradient(135deg, ${row.color} 0 4px, ${row.color}99 4px 8px)`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      );

    case "security-advisory":
      return (
        <div className={`${pad} h-full flex flex-col gap-2`}>
          <span className="text-[10px] font-semibold text-[var(--ink-muted)] uppercase tracking-wider">Roadmap signals</span>
          <div className="rounded-xl bg-white/5 border border-white/8 p-2.5 relative">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-semibold">Hardening score</span>
              <span className="rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] px-2 py-0.5">• Optimal</span>
            </div>
            <p className="text-xl font-display font-bold">78<span className="text-sm text-[var(--ink-muted)]">/100</span></p>
            <svg className="w-full h-8 mt-1" viewBox="0 0 100 24" fill="none">
              <path d="M0 18 L20 14 L40 16 L60 8 L80 10 L100 4" stroke="#c6f24a" strokeWidth="2" />
            </svg>
          </div>
          <div className="flex flex-wrap gap-1">
            {["IAM", "Network", "Backup", "EDR"].map((t) => (
              <span key={t} className="rounded-full bg-white/5 border border-white/8 px-2 py-0.5 text-[9px] text-[var(--ink-muted)]">{t}</span>
            ))}
          </div>
        </div>
      );

    case "managed-support-desk":
      return (
        <div className={`${pad} h-full flex flex-col gap-2`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-[var(--ink-muted)] uppercase tracking-wider">Desk pulse</span>
            <span className="rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-semibold px-2 py-0.5">• On SLA</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { label: "Chat", value: "2m", color: "#38bdf8" },
              { label: "Email", value: "18m", color: "#8b7cff" },
              { label: "Voice", value: "45s", color: "#f59e0b" },
            ].map((c) => (
              <div key={c.label} className="rounded-lg bg-white/5 p-2 text-center">
                <div className="mx-auto w-6 h-6 rounded-md mb-1" style={{ background: `${c.color}33`, border: `1px solid ${c.color}55` }} />
                <p className="text-[9px] text-[var(--ink-muted)]">{c.label}</p>
                <p className="text-[11px] font-bold">{c.value}</p>
              </div>
            ))}
          </div>
          <div className="flex items-end gap-0.5 h-8 mt-auto">
            {[3, 5, 4, 7, 6, 8, 5, 9, 7, 6].map((h, i) => (
              <div key={i} className="flex-1 rounded-sm bg-[var(--accent)]/70" style={{ height: `${h * 10}%`, opacity: 0.4 + h * 0.06 }} />
            ))}
          </div>
        </div>
      );

    case "cx-process-design":
      return (
        <div className={`${pad} h-full flex flex-col gap-2`}>
          <span className="text-[10px] font-semibold text-[var(--ink-muted)] uppercase tracking-wider">Journey steps</span>
          <div className="space-y-1.5">
            {["Intake", "Triage", "Resolve", "Follow-up"].map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-white/5 border border-white/10 text-[9px] flex items-center justify-center font-mono text-[var(--accent)]">{i + 1}</span>
                <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#8b7cff] to-[#f59e0b]" style={{ width: `${90 - i * 15}%` }} />
                </div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-[var(--ink-muted)] mt-auto">Friction points mapped · handoffs clarified</p>
        </div>
      );

    case "escalation-qa":
      return (
        <div className={`${pad} h-full flex flex-col gap-2`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-[var(--ink-muted)] uppercase tracking-wider">QA score</span>
            <span className="text-lg font-display font-bold">94%</span>
          </div>
          <div className="flex gap-1 h-14 items-end">
            {[4, 5, 3, 6, 5, 7, 4, 8, 6, 5, 7, 9].map((n, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end gap-0.5">
                {Array.from({ length: n }).map((_, j) => (
                  <div
                    key={j}
                    className="h-1.5 rounded-[2px]"
                    style={{ background: j >= n - 2 ? "#c6f24a" : "rgba(255,255,255,0.12)" }}
                  />
                ))}
              </div>
            ))}
          </div>
          <p className="text-[10px] text-emerald-400 font-semibold">• Peak quality this week</p>
        </div>
      );

    case "support-analytics":
      return (
        <div className={`${pad} h-full flex flex-col gap-2`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-[var(--ink-muted)] uppercase tracking-wider">CSAT trend</span>
            <span className="rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-semibold px-2 py-0.5">+4.2%</span>
          </div>
          <p className="text-2xl font-display font-bold">4.8</p>
          <svg className="w-full h-12" viewBox="0 0 120 40" fill="none">
            <defs>
              <linearGradient id="csatFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 30 L20 28 L40 22 L60 24 L80 14 L100 12 L120 8 L120 40 L0 40 Z" fill="url(#csatFill)" />
            <path d="M0 30 L20 28 L40 22 L60 24 L80 14 L100 12 L120 8" stroke="#f59e0b" strokeWidth="2" strokeLinejoin="round" />
          </svg>
          <div className="flex gap-1 flex-wrap">
            {["Volume", "FCR", "AHT"].map((t) => (
              <span key={t} className="rounded-full bg-white/5 px-2 py-0.5 text-[9px] text-[var(--ink-muted)]">{t}</span>
            ))}
          </div>
        </div>
      );

    default:
      return (
        <div className={`${pad} h-full flex items-center justify-center text-[var(--ink-muted)] text-xs`}>
          Service snapshot
        </div>
      );
  }
}
