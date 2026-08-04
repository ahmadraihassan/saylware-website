type IconName =
  | "shield"
  | "bolt"
  | "nodes"
  | "spark"
  | "search"
  | "grid"
  | "rocket"
  | "chart"
  | "clock"
  | "book"
  | "heart"
  | "trend"
  | "asterisk";

export default function Icon({
  name,
  className = "w-5 h-5",
}: {
  name: IconName;
  className?: string;
}) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" />
          <path d="M9.5 12l1.8 1.8L15 10" />
        </svg>
      );
    case "bolt":
      return (
        <svg {...common}>
          <path d="M13 2L4 13h7l-1 9 10-13h-7l1-7z" />
        </svg>
      );
    case "nodes":
      return (
        <svg {...common}>
          <circle cx="6" cy="6" r="2.2" />
          <circle cx="18" cy="6" r="2.2" />
          <circle cx="12" cy="18" r="2.2" />
          <path d="M7.8 7.2l6.4 0M16.5 8l-3.2 7.2M9.5 15.2L7.5 8.5" />
        </svg>
      );
    case "spark":
      return (
        <svg {...common}>
          <path d="M12 3v4M12 17v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M3 12h4M17 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="6" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
      );
    case "grid":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="6" height="6" rx="1.2" />
          <rect x="14" y="4" width="6" height="6" rx="1.2" />
          <rect x="4" y="14" width="6" height="6" rx="1.2" />
          <rect x="14" y="14" width="6" height="6" rx="1.2" />
        </svg>
      );
    case "rocket":
      return (
        <svg {...common}>
          <path d="M5 19c2-1 3.5-1.5 5-1.5 5 0 8-4.5 9.5-10.5-6 1.5-10.5 4.5-10.5 9.5 0 1.5-.5 3-1.5 5z" />
          <path d="M9 15l-3 3M14.5 9.5l1.5 1.5" />
        </svg>
      );
    case "chart":
      return (
        <svg {...common}>
          <path d="M4 19V5M4 19h16" />
          <path d="M8 15v-4M12 15V8M16 15v-7" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v5l3 2" />
        </svg>
      );
    case "book":
      return (
        <svg {...common}>
          <path d="M5 5.5A2.5 2.5 0 017.5 3H19v16H7.5A2.5 2.5 0 005 16.5v-11z" />
          <path d="M5 16.5A2.5 2.5 0 017.5 19H19" />
        </svg>
      );
    case "heart":
      return (
        <svg {...common}>
          <path d="M12 20s-7-4.4-7-10a4 4 0 017-2.5A4 4 0 0119 10c0 5.6-7 10-7 10z" />
        </svg>
      );
    case "trend":
      return (
        <svg {...common}>
          <path d="M4 16l5-5 3.5 3.5L20 7" />
          <path d="M14 7h6v6" />
        </svg>
      );
    case "asterisk":
      return (
        <svg {...common}>
          <path d="M12 4v16M6 8l12 8M6 16l12-8" />
        </svg>
      );
  }
}
