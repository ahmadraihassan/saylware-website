"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import { careers } from "@/lib/content";

export default function CareersPage() {
  const [filter, setFilter] = useState("All Roles");
  const [openRole, setOpenRole] = useState<string | null>(null);

  const roles = useMemo(() => {
    if (filter === "All Roles") return careers.roles;
    if (filter === "Remote") return careers.roles.filter((r) => r.location.toLowerCase().includes("remote"));
    return careers.roles.filter(
      (r) => r.location.toLowerCase().includes("on-site") || r.location.toLowerCase().includes("hybrid")
    );
  }, [filter]);

  return (
    <main className="relative bg-[var(--bg)] min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[82rem] w-full">
          <Reveal>
            <span className="inline-flex rounded-full glass px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--ink-muted)]">
              {careers.eyebrow}
            </span>
            <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight">
              {careers.headline}
            </h1>
          </Reveal>

          <div className="mt-8 flex flex-wrap gap-2">
            {careers.filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  filter === f ? "bg-[var(--ink)] text-[var(--bg)]" : "glass text-[var(--ink-soft)] hover:text-[var(--ink)]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="mt-8 soft-shell overflow-hidden divide-y divide-[var(--border)]">
            {roles.map((role) => {
              const open = openRole === role.title;
              return (
                <div key={role.title}>
                  <button
                    type="button"
                    onClick={() => setOpenRole(open ? null : role.title)}
                    className="w-full grid grid-cols-1 sm:grid-cols-[1.4fr_0.8fr_1fr_auto] gap-2 sm:gap-4 px-5 sm:px-6 py-5 text-left hover:bg-white/[0.03] transition-colors items-center"
                  >
                    <span className="font-semibold text-[var(--ink)]">{role.title}</span>
                    <span className="text-sm text-[var(--ink-muted)]">{role.type}</span>
                    <span className="text-sm text-[var(--ink-muted)]">{role.location}</span>
                    <span className={`justify-self-end text-[var(--ink-muted)] transition-transform ${open ? "rotate-180" : ""}`}>
                      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                  <div className={`grid transition-all duration-350 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <div className="px-5 sm:px-6 pb-5 pt-0 sm:pl-6">
                        <p className="text-sm text-[var(--ink-soft)] leading-relaxed max-w-3xl border-t border-[var(--border)] pt-4">
                          {role.description}
                        </p>
                        <div className="mt-4 flex flex-wrap items-center gap-3">
                          <span className="rounded-full glass px-3 py-1 text-[11px] text-[var(--ink-muted)]">
                            {role.department}
                          </span>
                          <a
                            href={`/careers/${role.slug}/apply`}
                            className="inline-flex rounded-full bg-[var(--accent)] text-[var(--bg)] px-5 py-2.5 text-sm font-bold hover:scale-[1.02] transition-transform"
                          >
                            Apply now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
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
                  <div className="flex items-start gap-3 p-2">
                    <span className="w-10 h-10 rounded-xl glass-strong flex items-center justify-center text-[var(--accent)] shrink-0">
                      <Icon name={perk.icon} />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold">{perk.title}</h3>
                      <p className="mt-1.5 text-sm text-[var(--ink-soft)] leading-relaxed">{perk.description}</p>
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
                href="/careers/apply"
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
