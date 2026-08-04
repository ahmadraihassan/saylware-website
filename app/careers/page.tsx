"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import { careers } from "@/lib/content";

export default function CareersPage() {
  const [filter, setFilter] = useState("All Roles");

  const roles = useMemo(() => {
    if (filter === "All Roles") return careers.roles;
    if (filter === "Remote") return careers.roles.filter((r) => r.location.toLowerCase().includes("remote"));
    return careers.roles.filter((r) => r.location.toLowerCase().includes("on-site") || r.location.toLowerCase().includes("hybrid"));
  }, [filter]);

  return (
    <main className="relative bg-[var(--bg)] min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl w-full">
          <Reveal>
            <span className="inline-flex rounded-full glass px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--ink-muted)]">
              {careers.eyebrow}
            </span>
            <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight">
              {careers.headline}
            </h1>
          </Reveal>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {careers.filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    filter === f
                      ? "bg-[var(--ink)] text-[var(--bg)]"
                      : "glass text-[var(--ink-soft)] hover:text-[var(--ink)]"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 soft-shell overflow-hidden divide-y divide-[var(--border)]">
            {roles.map((role) => (
              <a
                key={role.title}
                href={`mailto:hello@saylware.com?subject=Application: ${encodeURIComponent(role.title)}`}
                className="grid grid-cols-1 sm:grid-cols-[1.4fr_0.8fr_1fr] gap-2 sm:gap-4 px-5 sm:px-6 py-5 hover:bg-white/[0.03] transition-colors"
              >
                <span className="font-semibold text-[var(--ink)]">{role.title}</span>
                <span className="text-sm text-[var(--ink-muted)]">{role.type}</span>
                <span className="text-sm text-[var(--ink-muted)] sm:text-right">{role.location}</span>
              </a>
            ))}
            {roles.length === 0 && (
              <p className="px-6 py-8 text-sm text-[var(--ink-muted)]">No roles in this filter right now.</p>
            )}
          </div>

          <section className="mt-16 sm:mt-20">
            <Reveal>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-center mb-8">
                Our perks and benefits
              </h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
              {careers.perks.map((perk, i) => (
                <Reveal key={perk.title} delay={i * 60}>
                  <div className="p-2">
                    <div className="flex items-start gap-3">
                      <span className="w-10 h-10 rounded-xl glass-strong flex items-center justify-center text-[var(--accent)] shrink-0">
                        <Icon name={perk.icon} />
                      </span>
                      <div>
                        <h3 className="font-display text-lg font-semibold">{perk.title}</h3>
                        <p className="mt-1.5 text-sm text-[var(--ink-soft)] leading-relaxed">{perk.description}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <section className="mt-16 sm:mt-20 soft-shell p-6 sm:p-8">
            <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end">
              <div className="space-y-5">
                {careers.values.map((v) => (
                  <div key={v.num} className="grid grid-cols-[auto_1fr] gap-4">
                    <span className="font-mono text-sm text-[var(--accent)]">{v.num}</span>
                    <div>
                      <h3 className="font-display font-semibold">{v.title}</h3>
                      <p className="mt-1 text-sm text-[var(--ink-soft)]">{v.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <a
                href="mailto:hello@saylware.com?subject=General application"
                className="inline-flex self-start lg:self-end rounded-full bg-[var(--ink)] text-[var(--bg)] px-6 py-3 text-sm font-bold hover:bg-[var(--accent)] transition-colors"
              >
                Apply Now!
              </a>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
