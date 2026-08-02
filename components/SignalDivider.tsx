"use client";

export default function SignalDivider() {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: 140 }} aria-hidden="true">
      <svg
        viewBox="0 0 1200 140"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <filter id="glow-security" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-support" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="grad-security" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--signal-security)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--signal-security)" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="grad-support" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--signal-support)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--signal-support)" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Incoming line */}
        <path
          d="M 0 70 L 480 70"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1.5"
          strokeDasharray="8 4"
        />

        {/* Security path */}
        <path
          d="M 480 70 C 620 70, 620 28, 1200 28"
          fill="none"
          stroke="url(#grad-security)"
          strokeWidth="2"
          filter="url(#glow-security)"
        />

        {/* Support path */}
        <path
          d="M 480 70 C 620 70, 620 112, 1200 112"
          fill="none"
          stroke="url(#grad-support)"
          strokeWidth="2"
          filter="url(#glow-support)"
        />

        {/* Nodes */}
        <circle cx="480" cy="70" r="5" fill="rgba(255,255,255,0.8)" />
        <circle cx="480" cy="70" r="10" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <circle cx="1196" cy="28" r="5" fill="var(--signal-security)" filter="url(#glow-security)" />
        <circle cx="1196" cy="112" r="5" fill="var(--signal-support)" filter="url(#glow-support)" />
      </svg>

      <span
        className="absolute font-mono text-[10px] tracking-[0.2em] uppercase"
        style={{ top: 8, right: 12, color: "var(--signal-security)" }}
      >
        security
      </span>
      <span
        className="absolute font-mono text-[10px] tracking-[0.2em] uppercase"
        style={{ bottom: 8, right: 12, color: "var(--signal-support)" }}
      >
        support
      </span>
    </div>
  );
}