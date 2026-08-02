import { trustBar } from "@/lib/content";

export default function TrustBar() {
  return (
    <section className="border-y" style={{ borderColor: "var(--line)" }}>
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-8">
        <p className="text-sm max-w-xs text-center sm:text-left" style={{ color: "var(--ink-soft)" }}>
          {trustBar.label}
        </p>
        <div className="flex items-center gap-10">
          {trustBar.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-2xl sm:text-3xl font-semibold">{stat.value}</div>
              <div className="text-xs mt-1 max-w-[9rem]" style={{ color: "var(--ink-soft)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
