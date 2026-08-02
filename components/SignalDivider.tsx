export default function SignalDivider() {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: 120 }} aria-hidden="true">
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        {/* single incoming line */}
        <path
          d="M 0 60 L 480 60"
          fill="none"
          stroke="var(--ink)"
          strokeOpacity="0.25"
          strokeWidth="2"
        />
        {/* splits into two signal paths */}
        <path
          d="M 480 60 C 620 60, 620 24, 1200 24"
          fill="none"
          stroke="var(--signal-security)"
          strokeWidth="2.5"
        />
        <path
          d="M 480 60 C 620 60, 620 96, 1200 96"
          fill="none"
          stroke="var(--signal-support)"
          strokeWidth="2.5"
        />
        <circle cx="480" cy="60" r="4" fill="var(--ink)" />
        <circle cx="1198" cy="24" r="4" fill="var(--signal-security)" />
        <circle cx="1198" cy="96" r="4" fill="var(--signal-support)" />
      </svg>
      <span
        className="absolute font-mono text-[10px] tracking-widest uppercase"
        style={{ top: 2, right: 8, color: "var(--signal-security)" }}
      >
        security
      </span>
      <span
        className="absolute font-mono text-[10px] tracking-widest uppercase"
        style={{ bottom: 2, right: 8, color: "var(--signal-support)" }}
      >
        support
      </span>
    </div>
  );
}
