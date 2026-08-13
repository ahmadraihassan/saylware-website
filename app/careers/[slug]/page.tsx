import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { careers, getRoleBySlug } from "@/lib/content";
import { breadcrumbJsonLd, jobPostingJsonLd, pageMetadata, roleSeo } from "@/lib/seo";

export function generateStaticParams() {
  return careers.roles.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const role = getRoleBySlug(slug);
  if (!role) return { title: "Job" };
  const seo = roleSeo(role);
  return pageMetadata({
    title: seo.title,
    description: seo.description,
    path: `/careers/${role.slug}`,
  });
}

export default async function RolePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const role = getRoleBySlug(slug);
  if (!role) notFound();

  const related = careers.roles.filter((r) => r.slug !== role.slug).slice(0, 3);

  return (
    <main className="relative bg-[var(--bg)] min-h-screen flex flex-col">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
          { name: role.title, path: `/careers/${role.slug}` },
        ])}
      />
      <JsonLd data={jobPostingJsonLd(role)} />
      <Header />
      <div className="flex-1 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[82rem] w-full">
          <Reveal>
            <Link href="/careers" className="text-sm text-[var(--ink-muted)] hover:text-[var(--ink)]">
              ← All jobs
            </Link>
            <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--ink-muted)]">
              {role.department} · {role.type}
            </p>
            <h1 className="mt-3 font-display text-[clamp(1.85rem,4.5vw,3.25rem)] font-bold tracking-tight max-w-3xl">
              {role.title}
            </h1>
            <p className="mt-3 text-sm text-[var(--ink-muted)]">{role.location}</p>
            <p className="mt-5 text-base sm:text-lg text-[var(--ink-soft)] max-w-2xl leading-relaxed">
              {role.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/careers/${role.slug}/apply`}
                className="inline-flex rounded-full bg-[var(--accent)] text-[var(--bg)] px-6 py-3 text-sm font-bold"
              >
                Apply for this role
              </Link>
              <Link href="/careers/apply" className="inline-flex rounded-full glass px-6 py-3 text-sm font-semibold">
                General application
              </Link>
            </div>
          </Reveal>

          {related.length > 0 && (
            <section className="mt-16">
              <h2 className="font-display text-2xl font-bold tracking-tight mb-5">Other open jobs</h2>
              <div className="grid sm:grid-cols-3 gap-3 sm:gap-4">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/careers/${r.slug}`}
                    className="soft-shell p-5 hover:ring-1 hover:ring-[var(--accent)]/30 transition-all"
                  >
                    <h3 className="font-display text-base font-semibold">{r.title}</h3>
                    <p className="mt-1 text-xs text-[var(--ink-muted)]">
                      {r.type} · {r.location}
                    </p>
                    <p className="mt-3 text-sm text-[var(--ink-soft)] line-clamp-3">{r.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
