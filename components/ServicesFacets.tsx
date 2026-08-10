"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { facets, serviceCatalog, type ServiceFacet, type ServiceItem } from "@/lib/content";
import Reveal from "./Reveal";

function FacetRail({
  facet,
  title,
  subtitle,
  id,
  active,
  onActivate,
}: {
  facet: ServiceFacet;
  title: string;
  subtitle: string;
  id: string;
  active: boolean;
  onActivate: (on: boolean) => void;
}) {
  const items = serviceCatalog.filter((s) => s.facet === facet);
  const scroller = useRef<HTMLDivElement>(null);
  const [hoveringRail, setHoveringRail] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const tick = () => {
      if (hoveringRail && !focused) {
        el.scrollLeft += 0.75;
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 2) el.scrollLeft = 0;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [hoveringRail, focused]);

  return (
    <div
      id={id}
      className={`soft-shell p-4 sm:p-6 min-w-0 h-full flex flex-col transition-all duration-500 ${
        active ? "ring-1 ring-[var(--accent)]/35" : "opacity-90"
      }`}
      onMouseEnter={() => {
        setHoveringRail(true);
        onActivate(true);
      }}
      onMouseLeave={() => {
        setHoveringRail(false);
        setFocused(null);
        onActivate(false);
      }}
    >
      <div className="flex items-end justify-between gap-3 mb-5 px-1">
        <div>
          <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight">{title}</h3>
          <p className="text-xs sm:text-sm text-[var(--ink-muted)] mt-1">{subtitle}</p>
        </div>
        <span className="text-[10px] uppercase tracking-wider text-[var(--ink-muted)] hidden sm:inline">
          Hover to browse
        </span>
      </div>

      <div ref={scroller} className="flex gap-3.5 overflow-x-auto no-scrollbar pb-1 flex-1 items-stretch">
        {items.map((item) => (
          <ServiceMiniCard
            key={item.slug}
            item={item}
            expanded={focused === item.slug}
            onEnter={() => setFocused(item.slug)}
            onLeave={() => setFocused(null)}
          />
        ))}
      </div>
    </div>
  );
}

function ServiceMiniCard({
  item,
  expanded,
  onEnter,
  onLeave,
}: {
  item: ServiceItem;
  expanded: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <article
      className={`shrink-0 rounded-2xl border border-white/10 bg-[#16181f] overflow-hidden transition-all duration-400 flex flex-col ${
        expanded ? "w-[min(90vw,340px)] ring-1 ring-[var(--accent)]/50" : "w-[260px] sm:w-[280px]"
      }`}
      style={{ height: expanded ? 400 : 340 }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="relative h-[140px] shrink-0 overflow-hidden">
        <img src={item.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#16181f] via-transparent to-transparent" />
      </div>
      <div className="p-4 flex flex-col flex-1 min-h-0">
        <h4 className="font-display text-sm sm:text-[15px] font-semibold leading-snug">{item.title}</h4>
        <p className={`text-xs text-[var(--ink-soft)] mt-2 leading-relaxed ${expanded ? "line-clamp-5" : "line-clamp-3"}`}>
          {item.short}
        </p>
        <div className="mt-auto pt-3">
          <div className="flex flex-wrap gap-1.5 mb-3 min-h-[22px]">
            {(expanded ? item.tags : item.tags.slice(0, 2)).map((t) => (
              <span key={t} className="rounded-full bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] text-[var(--ink-muted)]">
                {t}
              </span>
            ))}
          </div>
          <div
            className={`grid transition-all duration-300 ${
              expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <Link
                href={`/services/${item.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] text-[var(--bg)] text-xs font-bold px-3.5 py-2 hover:scale-[1.03] transition-transform"
              >
                Open service
                <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ServicesFacets() {
  const [focus, setFocus] = useState<ServiceFacet | null>(null);

  return (
    <section id="services" className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="mx-auto max-w-[82rem] w-full space-y-5 sm:space-y-6">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-2">
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,3rem)] font-bold tracking-tight">{facets.headline}</h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--ink-soft)]">{facets.intro}</p>
          </div>
        </Reveal>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 items-stretch min-h-[420px]">
          <div
            className="transition-all duration-500 ease-out min-w-0"
            style={{ flex: focus === "support" ? "0.72 1 0%" : focus === "security" ? "1.45 1 0%" : "1 1 0%" }}
          >
            <FacetRail
              facet="security"
              id={facets.security.id}
              title={facets.security.title}
              subtitle={facets.security.subtitle}
              active={focus === "security"}
              onActivate={(on) => setFocus(on ? "security" : null)}
            />
          </div>
          <div
            className="transition-all duration-500 ease-out min-w-0"
            style={{ flex: focus === "security" ? "0.72 1 0%" : focus === "support" ? "1.45 1 0%" : "1 1 0%" }}
          >
            <FacetRail
              facet="support"
              id={facets.support.id}
              title={facets.support.title}
              subtitle={facets.support.subtitle}
              active={focus === "support"}
              onActivate={(on) => setFocus(on ? "support" : null)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
