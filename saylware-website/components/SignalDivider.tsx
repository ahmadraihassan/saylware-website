"use client";

export default function SignalDivider() {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: 120 }} aria-hidden="true">
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <filter id="glow-security" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-support" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="grad-security" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--signal-security)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--signal-security)" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="grad-support" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--signal-support)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--signal-support)" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Incoming line */}
        <path
          d="M 0 60 L 480 60"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1.5"
          strokeDasharray="8 4"
        />

        {/* Security path */}
        <path
          d="M 480 60 C 620 60, 620 24, 1200 24"
          fill="none"
          stroke="url(#grad-security)"
          strokeWidth="2.5"
          filter="url(#glow-security)"
        />

        {/* Support path */}
        <path
          d="M 480 60 C 620 60, 620 96, 1200 96"
          fill="none"
          stroke="url(#grad-support)"
          strokeWidth="2.5"
          filter="url(#glow-support)"
        />

        {/* Nodes */}
        <circle cx="480" cy="60" r="5" fill="rgba(255,255,255,0.9)" />
        <circle cx="480" cy="60" r="12" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <circle cx="1196" cy="24" r="5" fill="var(--signal-security)" filter="url(#glow-security)" />
        <circle cx="1196" cy="96" r="5" fill="var(--signal-support)" filter="url(#glow-support)" />
      </svg>

      <span
        className="absolute font-mono text-[10px] tracking-[0.2em] uppercase font-semibold"
        style={{ top: 6, right: 14, color: "var(--signal-security)" }}
      >
        security
      </span>
      <span
        className="absolute font-mono text-[10px] tracking-[0.2em] uppercase font-semibold"
        style={{ bottom: 6, right: 14, color: "var(--signal-support)" }}
      >
        support
      </span>
    </div>
  );
}