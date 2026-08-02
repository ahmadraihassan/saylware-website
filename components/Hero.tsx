import { hero } from "@/lib/content";
import SignalDivider from "./SignalDivider";

export default function Hero() {
  return (
    <section className="relative pt-20 pb-4 sm:pt-28">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="eyebrow" style={{ color: "var(--ink-soft)" }}>
          {hero.eyebrow}
        </p>
        <h1 className="font-display mt-5 text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.08]">
          {hero.headline}
        </h1>
        <p className="mt-6 text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "var(--ink-soft)" }}>
          {hero.subheadline}
        </p>
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={hero.primaryCta.href}
            className="w-full sm:w-auto rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
            style={{ background: "var(--signal-security)" }}
          >
            {hero.primaryCta.label}
          </a>
          <a
            href={hero.secondaryCta.href}
            className="w-full sm:w-auto rounded-full px-7 py-3.5 text-sm font-semibold transition-transform hover:scale-[1.02] border-2"
            style={{ borderColor: "var(--signal-support)", color: "var(--signal-support)" }}
          >
            {hero.secondaryCta.label}
          </a>
        </div>
      </div>
      <div className="mt-14 max-w-4xl mx-auto">
        <SignalDivider />
      </div>
    </section>
  );
}
