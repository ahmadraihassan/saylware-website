import { signature } from "@/lib/content";
import Reveal from "./Reveal";

function TrackPanel({
  track,
  accent,
}: {
  track: typeof signature.security;
  accent: "security" | "support";
}) {
  const accentColor =
    accent === "security" ? "var(--signal-security)" : "var(--signal-support)";

  return (
    <div id={track.id} className="scroll-mt-28">
      <Reveal>
        <div className="rounded-[2rem] bg-[var(--bg-elevated)] border border-white/[0.06] p-5 sm:p-8 overflow-hidden">
          <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight uppercase text-[var(--ink)]">
            {track.title}
          </h3>
          <p className="mt-2 text-sm text-[var(--ink-muted)]">{track.tags}</p>

          <div className="mt-8 grid lg:grid-cols-[1.15fr_0.85fr] gap-5 items-stretch">
            <Reveal variant="left" delay={80}>
              <div className="relative rounded-[1.5rem] overflow-hidden min-h-[280px] sm:min-h-[360px] group">
                <img
                  src={track.image}
                  alt={track.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
              </div>
            </Reveal>

            <Reveal variant="right" delay={140}>
              <div className="relative flex flex-col gap-3 h-full">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-white/10 border border-white/10 px-3 py-1 text-[11px] font-medium tracking-wide uppercase text-[var(--ink)]">
                    {track.badge}
                  </span>
                  <span className="rounded-full bg-white/[0.04] border border-white/10 px-3 py-1 text-[11px] font-medium tracking-wide text-[var(--ink-soft)]">
                    {track.cert}
                  </span>
                </div>

                <div className="flex-1 rounded-[1.5rem] bg-[var(--bg-card)] border border-white/[0.06] p-6 sm:p-7 flex flex-col">
                  <h4 className="font-display text-xl font-semibold tracking-tight">
                    {track.cardTitle}
                    <span className="text-[var(--ink-muted)]">™</span>
                  </h4>
                  <p className="mt-2 text-sm text-[var(--ink-soft)]">{track.cardMeta}</p>

                  <div
                    className="mt-6 inline-flex self-start rounded-2xl px-4 py-3 text-sm font-semibold text-white"
                    style={{ background: "var(--gradient-accent)" }}
                  >
                    {track.highlight}
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-4">
                      <p className="text-[10px] uppercase tracking-widest text-[var(--ink-muted)]">
                        {track.metaLabel}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[var(--ink)]">
                        {track.metaValue}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-4">
                      <p className="text-[10px] uppercase tracking-widest text-[var(--ink-muted)]">
                        {track.statusLabel}
                      </p>
                      <p className="mt-1 text-sm font-semibold" style={{ color: accentColor }}>
                        {track.statusValue}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

export default function SignatureTracks() {
  return (
    <section id="services" className="relative py-12 sm:py-20 px-5 sm:px-8">
      <div className="mx-auto max-w-7xl space-y-8 sm:space-y-12">
        <Reveal>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-center text-[var(--ink)]">
            {signature.headline}
          </h2>
        </Reveal>

        <TrackPanel track={signature.security} accent="security" />
        <TrackPanel track={signature.support} accent="support" />
      </div>
    </section>
  );
}
