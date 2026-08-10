/** Distinct company logo marks for testimonial brands */

type LogoId = "phoenix" | "allpest" | "quickfix" | "azsecurity";

function Mark({ id }: { id: LogoId }) {
  switch (id) {
    case "phoenix":
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
          <rect width="28" height="28" rx="7" fill="#5b4fd1" />
          <path d="M14 6c2.5 3 4 5.5 4 8.2A4 4 0 0114 18.2 4 4 0 0110 14.2C10 11.5 11.5 9 14 6z" fill="#f8f7ff" />
          <path d="M9 16.5c1.2 1.8 2.8 3 5 3.8 2.2-.8 3.8-2 5-3.8-1.4 3.2-3.2 4.8-5 5.5-1.8-.7-3.6-2.3-5-5.5z" fill="#c4b5fd" />
        </svg>
      );
    case "allpest":
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
          <rect width="28" height="28" rx="7" fill="#16a34a" />
          <path d="M14 5l8 4v6c0 5-3.4 8.2-8 9.5C9.4 23.2 6 20 6 15V9l8-4z" fill="#ecfdf5" />
          <path d="M14 11v8M11 14.5h6" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "quickfix":
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
          <rect width="28" height="28" rx="7" fill="#ea580c" />
          <path d="M9 18.5l3.2-7.2h3.6L19 18.5h-2.2l-.7-1.6h-4.2l-.7 1.6H9zM12.4 14.8h3.2l-1.1-2.6h-1l-1.1 2.6z" fill="#fff7ed" />
          <circle cx="11.2" cy="19.4" r="1.3" fill="#fff7ed" />
          <circle cx="16.8" cy="19.4" r="1.3" fill="#fff7ed" />
        </svg>
      );
    case "azsecurity":
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
          <rect width="28" height="28" rx="7" fill="#0284c7" />
          <path d="M14 6l7 3v5.2c0 4.4-2.9 7.4-7 8.8-4.1-1.4-7-4.4-7-8.8V9l7-3z" fill="#e0f2fe" />
          <path d="M14 12.2a2.2 2.2 0 00-2.2 2.2v1.1h4.4V14.4A2.2 2.2 0 0014 12.2zm-3.2 3.3v2.8h6.4v-2.8H10.8z" fill="#0284c7" />
        </svg>
      );
  }
}

const names: Record<LogoId, string> = {
  phoenix: "Phoenix Solutions",
  allpest: "All Pest Control",
  quickfix: "Quick Fix Auto",
  azsecurity: "AZ Security",
};

export default function CompanyLogo({
  id,
  className = "",
  iconOnly = false,
}: {
  id: LogoId;
  className?: string;
  iconOnly?: boolean;
}) {
  if (iconOnly) {
    return (
      <span className={`inline-flex ${className}`} title={names[id]}>
        <Mark id={id} />
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-2 ${className}`} title={names[id]}>
      <Mark id={id} />
      <span className="text-xs font-semibold tracking-tight text-[var(--ink)]">{names[id]}</span>
    </span>
  );
}
