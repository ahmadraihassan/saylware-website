import { signature } from "@/lib/content";
import Reveal from "./Reveal";

function ServicePanel({
  track,
  accent,
}: {
  track: typeof signature.security;
  accent: "security" | "support";
}) {
  const badgeBg = accent === "security" ? "bg-[var(--lavender)]" : "bg-[var(--mint)]";
  const highlightBg =
    accent === "security"
      ? "bg-[var(--purple)] text-white"
      : "bg-[var(--lime)] text-[var(--ink)]";

  return (
    <div id={track.id} className="scroll-mt-28">
      <Reveal>
        <div className="soft-shell p-5 sm:p-8 overflow-hidden">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h3 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[var(--ink)]">
                {track.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--ink-muted)]">{track.tags}</p>
            </div>
            <span className={`rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide ${badgeBg}`}>
              {track.badge}
            </span>
          </div>

          <div className="mt-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-5 items-stretch">
            <Reveal variant="left" delay={80}>
              <div className="relative rounded-[1.5rem] overflow-hidden min-h-[260px] sm:min-h-[340px] group">
                <img
                  src={track.image}
                  alt={track.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </Reveal>

            <Reveal variant="right" delay={140}>
              <div className="rounded-[1.5rem] bg-[var(--bg-soft)] p-6 sm:p-7 h-full flex flex-col">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="rounded-full bg-white px-3 py-1 text-[11px] font-medium border border-[var(--border)]">
                    {track.cert}
                  </span>
                </div>
                <h4 className="font-display text-xl font-semibold tracking-tight text-[var(--ink)]">
                  {track.cardTitle}
                </h4>
                <p className="mt-2 text-sm text-[var(--ink-soft)]">{track.cardMeta}</p>

                <div className={`mt-6 inline-flex self-start rounded-2xl px-4 py-3 text-sm font-semibold ${highlightBg}`}>
                  {track.highlight}
                </div>

                <div className="mt-auto pt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-white p-4 border border-[var(--border)]">
                    <p className="text-[10px] uppercase tracking-widest text-[var(--ink-muted)]">
                      {track.metaLabel}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[var(--ink)]">{track.metaValue}</p>
                  </div>
                  <div className="rounded-2xl bg-white p-4 border border-[var(--border)]">
                    <p className="text-[10px] uppercase tracking-widest text-[var(--ink-muted)]">
                      {track.statusLabel}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[var(--purple)]">{track.statusValue}</p>
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
    <section id="services" className="relative py-10 sm:py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-4">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--ink)]">
              {signature.headline}
            </h2>
            <p className="mt-4 text-[var(--ink-soft)]">{signature.intro}</p>
          </div>
        </Reveal>

        <ServicePanel track={signature.support} accent="support" />
        <ServicePanel track={signature.security} accent="security" />
      </div>
    </section>
  );
}
