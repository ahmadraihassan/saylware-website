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
}: {
  facet: ServiceFacet;
  title: string;
  subtitle: string;
  id: string;
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
        el.scrollLeft += 0.7;
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 2) {
          el.scrollLeft = 0;
        }
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
      className="soft-shell p-4 sm:p-5 min-w-0"
      onMouseEnter={() => setHoveringRail(true)}
      onMouseLeave={() => {
        setHoveringRail(false);
        setFocused(null);
      }}
    >
      <div className="flex items-end justify-between gap-3 mb-4 px-1">
        <div>
          <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight">{title}</h3>
          <p className="text-xs sm:text-sm text-[var(--ink-muted)] mt-1">{subtitle}</p>
        </div>
        <span className="text-[10px] uppercase tracking-wider text-[var(--ink-muted)] hidden sm:inline">
          Hover to browse
        </span>
      </div>

      <div ref={scroller} className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
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
      className={`shrink-0 rounded-2xl glass overflow-hidden transition-all duration-400 ${
        expanded ? "w-[min(86vw,320px)] ring-1 ring-[var(--accent)]/50" : "w-[200px] sm:w-[220px]"
      }`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className={`relative overflow-hidden transition-all duration-400 ${expanded ? "h-36" : "h-24"}`}>
        <img src={item.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/80 to-transparent" />
      </div>
      <div className="p-3.5 sm:p-4">
        <h4 className="font-display text-sm font-semibold leading-snug">{item.title}</h4>
        <p className={`text-xs text-[var(--ink-soft)] mt-1.5 leading-relaxed ${expanded ? "" : "line-clamp-2"}`}>
          {item.short}
        </p>
        <div
          className={`grid transition-all duration-300 ${
            expanded ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="flex flex-wrap gap-1.5 mb-3">
              {item.tags.map((t) => (
                <span key={t} className="rounded-full glass-strong px-2 py-0.5 text-[10px] text-[var(--ink-muted)]">
                  {t}
                </span>
              ))}
            </div>
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
    </article>
  );
}

export default function ServicesFacets() {
  return (
    <section id="services" className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="mx-auto max-w-7xl w-full space-y-5 sm:space-y-6">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-2">
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,3rem)] font-bold tracking-tight">{facets.headline}</h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--ink-soft)]">{facets.intro}</p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-5">
          <Reveal variant="left">
            <FacetRail
              facet="security"
              id={facets.security.id}
              title={facets.security.title}
              subtitle={facets.security.subtitle}
            />
          </Reveal>
          <Reveal variant="right" delay={80}>
            <FacetRail
              facet="support"
              id={facets.support.id}
              title={facets.support.title}
              subtitle={facets.support.subtitle}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
