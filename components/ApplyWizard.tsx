"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { careers, type CareerRole } from "@/lib/content";

type Props = {
  role?: CareerRole | null;
};

const field =
  "w-full rounded-xl border border-[var(--border)] px-3.5 py-3 text-sm bg-white/[0.03] text-[var(--ink)] placeholder:text-[var(--ink-muted)] outline-none";

function ChoiceCards({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: { value: string; title: string; description: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid sm:grid-cols-3 gap-3">
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <label
            key={opt.value}
            className={`cursor-pointer rounded-2xl border p-4 transition-colors ${
              active
                ? "border-[var(--accent)] bg-[var(--accent-dim)]"
                : "border-[var(--border)] bg-white/[0.02] hover:border-[var(--border-strong)]"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={active}
              onChange={() => onChange(opt.value)}
              className="sr-only"
            />
            <span className="flex items-start gap-3">
              <span
                className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                  active ? "border-[var(--accent)]" : "border-[var(--ink-muted)]"
                }`}
              >
                {active && <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />}
              </span>
              <span>
                <span className="block text-sm font-semibold text-[var(--ink)]">{opt.title}</span>
                <span className="mt-1 block text-xs text-[var(--ink-soft)] leading-relaxed">
                  {opt.description}
                </span>
              </span>
            </span>
          </label>
        );
      })}
    </div>
  );
}

function validateStep(form: HTMLFormElement, step: number) {
  const groups = [
    ["firstName", "lastName", "email", "phone", "city", "country"],
    ["positionSelect", "availableFrom"],
    ["yearsExperience", "resumeUrl", "message"],
  ];
  const names = groups[step] ?? [];
  for (const name of names) {
    const el = form.elements.namedItem(name);
    if (el instanceof HTMLInputElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement) {
      if (!el.checkValidity()) {
        el.reportValidity();
        return false;
      }
    }
  }
  return true;
}

export default function ApplyWizard({ role = null }: Props) {
  const steps = careers.apply.steps;
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [workplace, setWorkplace] = useState(
    role?.location.toLowerCase().includes("remote") && !role.location.toLowerCase().includes("hybrid")
      ? "Remote"
      : role?.location.toLowerCase().includes("hybrid")
        ? "Hybrid"
        : "On-Site"
  );
  const [employment, setEmployment] = useState(role?.type ?? "Full Time");
  const [hideSalary, setHideSalary] = useState(false);
  const [selectedRole, setSelectedRole] = useState(role?.title ?? "");

  const pageTitle = useMemo(
    () => (role ? `Apply · ${role.title}` : "Create your application"),
    [role]
  );

  function goNext(form: HTMLFormElement) {
    if (!validateStep(form, step)) return;
    setStep((s) => Math.min(steps.length - 1, s + 1));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (step < steps.length - 1) {
      goNext(form);
      return;
    }

    if (!validateStep(form, step)) return;

    setStatus("loading");
    const data = new FormData(form);
    const first = String(data.get("firstName") || "");
    const last = String(data.get("lastName") || "");
    data.set("name", `${first} ${last}`.trim());
    data.set("funnel", "Careers");
    data.set("position", selectedRole || "General application");
    data.set("workplacePreference", workplace);
    data.set("employmentPreference", employment);
    if (role) {
      data.set("department", role.department);
      data.set("listedLocation", role.location);
      data.set("roleSlug", role.slug);
    }
    if (hideSalary) {
      data.set("salaryPreference", "Prefer not to say");
      data.delete("minSalary");
      data.delete("maxSalary");
      data.delete("currency");
    }

    try {
      const res = await fetch(`https://formspree.io/f/${careers.formspreeId}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="soft-shell overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/careers"
            className="w-9 h-9 rounded-full glass flex items-center justify-center text-[var(--ink-soft)] hover:text-[var(--ink)] shrink-0"
            aria-label="Back to careers"
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <div className="min-w-0">
            <p className="font-display text-sm sm:text-base font-semibold truncate">{pageTitle}</p>
            {role && (
              <p className="text-xs text-[var(--ink-muted)] truncate">
                {role.department} · {role.location}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {step > 0 && status !== "success" && (
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className="hidden sm:inline-flex rounded-full border border-[var(--border)] px-4 py-2.5 text-sm font-semibold text-[var(--ink-soft)] hover:text-[var(--ink)]"
            >
              Back
            </button>
          )}
          {status !== "success" && (
            <button
              type="submit"
              form="apply-form"
              disabled={status === "loading"}
              className="inline-flex rounded-full bg-[var(--accent)] text-[var(--bg)] px-5 py-2.5 text-sm font-bold hover:scale-[1.02] transition-transform disabled:opacity-60"
            >
              {status === "loading" ? "Sending…" : step < steps.length - 1 ? "Next" : "Submit application"}
            </button>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-[240px_1fr]">
        <aside className="border-b lg:border-b-0 lg:border-r border-[var(--border)] p-4 sm:p-5 space-y-2">
          {steps.map((s, i) => {
            const active = i === step;
            const done = i < step || status === "success";
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => status !== "success" && i <= step && setStep(i)}
                className={`w-full text-left rounded-2xl p-3.5 transition-colors ${
                  active ? "bg-[var(--accent-dim)] border border-[var(--accent)]/40" : "border border-transparent hover:bg-white/[0.03]"
                }`}
              >
                <span className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                      active || done
                        ? "bg-[var(--accent)] text-[var(--bg)]"
                        : "bg-white/[0.06] text-[var(--ink-muted)]"
                    }`}
                  >
                    {done && !active ? "✓" : i + 1}
                  </span>
                  <span>
                    <span className={`block text-sm font-semibold ${active ? "text-[var(--ink)]" : "text-[var(--ink-soft)]"}`}>
                      {s.label}
                    </span>
                    <span className="mt-0.5 block text-[11px] text-[var(--ink-muted)] leading-snug">
                      {s.description}
                    </span>
                  </span>
                </span>
              </button>
            );
          })}
        </aside>

        <div className="p-4 sm:p-6 lg:p-8">
          {status === "success" ? (
            <div className="rounded-2xl glass-strong p-6 sm:p-8 max-w-xl">
              <p className="font-display text-2xl font-bold tracking-tight">Application received</p>
              <p className="mt-3 text-sm text-[var(--ink-soft)] leading-relaxed">
                Thanks for applying{role ? ` for ${role.title}` : ""}. We will review your details and
                follow up if there is a fit.
              </p>
              <Link
                href="/careers"
                className="mt-6 inline-flex rounded-full bg-[var(--ink)] text-[var(--bg)] px-5 py-2.5 text-sm font-bold"
              >
                Back to careers
              </Link>
            </div>
          ) : (
            <form id="apply-form" onSubmit={handleSubmit} className="space-y-8 max-w-3xl" noValidate>
              <section className={`space-y-5 form-slide-enter ${step === 0 ? "" : "hidden"}`}>
                <div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight">Your details</h2>
                  <p className="mt-1 text-sm text-[var(--ink-soft)]">
                    Provide key details so we can follow up quickly.
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium mb-1.5 text-[var(--ink-muted)]">First name</label>
                    <input name="firstName" required className={field} placeholder="Enter first name" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium mb-1.5 text-[var(--ink-muted)]">Last name</label>
                    <input name="lastName" required className={field} placeholder="Enter last name" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium mb-1.5 text-[var(--ink-muted)]">Email</label>
                    <input name="email" type="email" required className={field} placeholder="you@email.com" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium mb-1.5 text-[var(--ink-muted)]">Phone</label>
                    <input name="phone" type="tel" required className={field} placeholder="+92 300 0000000" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium mb-1.5 text-[var(--ink-muted)]">City</label>
                    <input name="city" required className={field} placeholder="Enter city" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium mb-1.5 text-[var(--ink-muted)]">Country</label>
                    <select name="country" required className={field} defaultValue="">
                      <option value="" disabled>
                        Select country
                      </option>
                      {careers.apply.countries.map((c) => (
                        <option key={c} value={c} className="bg-[var(--bg-elevated)]">
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </section>

              <section className={`space-y-6 form-slide-enter ${step === 1 ? "" : "hidden"}`}>
                <div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight">Role preferences</h2>
                  <p className="mt-1 text-sm text-[var(--ink-soft)]">
                    Confirm the role and how you prefer to work.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-medium mb-1.5 text-[var(--ink-muted)]">
                      Position applying for
                    </label>
                    <select
                      name="positionSelect"
                      required
                      className={field}
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                    >
                      <option value="" disabled>
                        Select role
                      </option>
                      <option value="General application" className="bg-[var(--bg-elevated)]">
                        General application
                      </option>
                      {careers.roles.map((r) => (
                        <option key={r.slug} value={r.title} className="bg-[var(--bg-elevated)]">
                          {r.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium mb-1.5 text-[var(--ink-muted)]">
                      Available from
                    </label>
                    <input name="availableFrom" type="date" required className={field} />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium mb-1.5 text-[var(--ink-muted)]">
                      Notice period
                    </label>
                    <input name="noticePeriod" className={field} placeholder="e.g. 2 weeks / Immediate" />
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-3">Workplace type</h3>
                  <ChoiceCards
                    name="workplace"
                    options={careers.apply.workplaceOptions}
                    value={workplace}
                    onChange={setWorkplace}
                  />
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-3">Employment type</h3>
                  <ChoiceCards
                    name="employment"
                    options={careers.apply.employmentOptions}
                    value={employment}
                    onChange={setEmployment}
                  />
                </div>
              </section>

              <section className={`space-y-6 form-slide-enter ${step === 2 ? "" : "hidden"}`}>
                <div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight">Experience</h2>
                  <p className="mt-1 text-sm text-[var(--ink-soft)]">
                    Links and a short note help us review faster.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium mb-1.5 text-[var(--ink-muted)]">
                      Years of experience
                    </label>
                    <input name="yearsExperience" required className={field} placeholder="e.g. 3" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium mb-1.5 text-[var(--ink-muted)]">
                      LinkedIn profile
                    </label>
                    <input name="linkedin" type="url" className={field} placeholder="https://linkedin.com/in/…" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-medium mb-1.5 text-[var(--ink-muted)]">
                      Resume or portfolio link
                    </label>
                    <input
                      name="resumeUrl"
                      type="url"
                      required
                      className={field}
                      placeholder="Google Drive, Notion, personal site…"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <h3 className="text-sm font-semibold">Salary expectation</h3>
                    <label className="inline-flex items-center gap-2 text-xs text-[var(--ink-muted)] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hideSalary}
                        onChange={(e) => setHideSalary(e.target.checked)}
                        className="rounded border-[var(--border)]"
                      />
                      Prefer not to say
                    </label>
                  </div>
                  {!hideSalary && (
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[11px] font-medium mb-1.5 text-[var(--ink-muted)]">
                          Min salary
                        </label>
                        <input name="minSalary" className={field} placeholder="Min" />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium mb-1.5 text-[var(--ink-muted)]">
                          Max salary
                        </label>
                        <input name="maxSalary" className={field} placeholder="Max" />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium mb-1.5 text-[var(--ink-muted)]">
                          Currency
                        </label>
                        <select name="currency" className={field} defaultValue="PKR">
                          {["PKR", "USD", "GBP", "AED", "SAR", "CAD"].map((c) => (
                            <option key={c} value={c} className="bg-[var(--bg-elevated)]">
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-medium mb-1.5 text-[var(--ink-muted)]">
                    Why Saylware?
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    className={`${field} resize-none`}
                    placeholder="A short note on fit, wins, and what you want next…"
                  />
                </div>

                {status === "error" && (
                  <p className="text-xs text-red-400">Something went wrong. Please try again.</p>
                )}
              </section>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
