"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import { careers, faqs } from "@/lib/content";

export default function CareersBoard() {
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
    <>
      <Reveal>
        <span className="inline-flex rounded-full glass px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--ink-muted)]">
          {careers.eyebrow}
        </span>
        <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight">
          {careers.headline}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-[var(--ink-soft)] max-w-2xl leading-relaxed">
          {careers.subheadline}
        </p>
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
              <div className="w-full grid grid-cols-1 sm:grid-cols-[1.4fr_0.8fr_1fr_auto] gap-2 sm:gap-4 px-5 sm:px-6 py-5 items-center">
                <Link href={`/careers/${role.slug}`} className="group">
                  <h2 className="font-semibold text-[var(--ink)] text-[15px] sm:text-base group-hover:text-[var(--accent)]">
                    {role.title}
                  </h2>
                </Link>
                <span className="text-sm text-[var(--ink-muted)]">{role.type}</span>
                <span className="text-sm text-[var(--ink-muted)]">{role.location}</span>
                <button
                  type="button"
                  onClick={() => setOpenRole(open ? null : role.title)}
                  className={`justify-self-end text-[var(--ink-muted)] transition-transform ${open ? "rotate-180" : ""}`}
                  aria-expanded={open}
                  aria-label={`${open ? "Hide" : "Show"} ${role.title} details`}
                >
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
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
                      <Link
                        href={`/careers/${role.slug}`}
                        className="inline-flex rounded-full glass px-5 py-2.5 text-sm font-semibold hover:text-[var(--ink)]"
                      >
                        View role
                      </Link>
                      <Link
                        href={`/careers/${role.slug}/apply`}
                        className="inline-flex rounded-full bg-[var(--accent)] text-[var(--bg)] px-5 py-2.5 text-sm font-bold hover:scale-[1.02] transition-transform"
                      >
                        Apply now
                      </Link>
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

      <section className="mt-16 sm:mt-20">
        <h2 className="font-display text-2xl font-bold tracking-tight mb-5">Applying to Saylware</h2>
        <div className="space-y-3">
          {faqs.careers.map((item) => (
            <article key={item.question} className="soft-shell p-5">
              <h3 className="font-display text-base font-semibold">{item.question}</h3>
              <p className="mt-2 text-sm text-[var(--ink-soft)] leading-relaxed">{item.answer}</p>
            </article>
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
          <Link
            href="/careers/apply"
            className="inline-flex self-start lg:self-end rounded-full bg-[var(--ink)] text-[var(--bg)] px-6 py-3 text-sm font-bold hover:bg-[var(--accent)] transition-colors"
          >
            Apply Now!
          </Link>
        </div>
      </section>
    </>
  );
}
