import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ServiceWidget from "@/components/ServiceWidget";
import JsonLd from "@/components/JsonLd";
import { getServiceBySlug, serviceCatalog } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata, serviceJsonLd, serviceSeo } from "@/lib/seo";

export function generateStaticParams() {
  return serviceCatalog.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service" };
  const seo = serviceSeo(service);
  return pageMetadata({
    title: seo.title,
    description: seo.description,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const seo = serviceSeo(service);
  const related = serviceCatalog
    .filter((s) => s.facet === service.facet && s.slug !== service.slug)
    .slice(0, 3);
  const practice = service.facet === "security" ? "Cybersecurity" : "Customer support";

  return (
    <main className="relative bg-[var(--bg)] min-h-screen flex flex-col">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ])}
      />
      <JsonLd data={serviceJsonLd(service)} />
      <Header />
      <div className="flex-1 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[82rem] w-full">
          <Reveal>
            <Link href="/services" className="text-sm text-[var(--ink-muted)] hover:text-[var(--ink)]">
              ← All {practice.toLowerCase()} services
            </Link>
            <div className="mt-4 flex flex-wrap gap-2">
              {service.tags.map((t) => (
                <span key={t} className="rounded-full glass px-3 py-1 text-[11px] text-[var(--ink-muted)]">
                  {t}
                </span>
              ))}
            </div>
            <h1 className="mt-4 font-display text-[clamp(1.85rem,4.5vw,3.25rem)] font-bold tracking-tight max-w-3xl">
              {service.title}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[var(--ink-soft)] max-w-2xl leading-relaxed">
              {service.overview}
            </p>
          </Reveal>

          <div className="mt-8 sm:mt-10 grid lg:grid-cols-[1.15fr_0.85fr] gap-4 sm:gap-5">
            <Reveal variant="left">
              <div className="relative rounded-2xl overflow-hidden min-h-[280px] sm:min-h-[360px] soft-shell">
                <Image
                  src={service.image}
                  alt={seo.imageAlt}
                  fill
                  className="object-cover opacity-50"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/70 to-transparent" />
                <div className="absolute inset-4 sm:inset-6 rounded-2xl border border-white/10 bg-[#14161c]/90 backdrop-blur-md overflow-hidden">
                  <ServiceWidget slug={service.slug} />
                </div>
              </div>
            </Reveal>
            <Reveal variant="right" delay={80}>
              <div className="soft-shell p-5 sm:p-6 h-full flex flex-col">
                <h2 className="font-display text-xl font-semibold">What you get</h2>
                <ul className="mt-4 space-y-3 flex-1">
                  {service.outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-2 text-sm text-[var(--ink-soft)]">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                      {o}
                    </li>
                  ))}
                </ul>
                <a
                  href="/#get-started"
                  className="mt-6 inline-flex self-start rounded-full bg-[var(--accent)] text-[var(--bg)] px-5 py-3 text-sm font-bold"
                >
                  Talk to us about this
                </a>
              </div>
            </Reveal>
          </div>

          <div className="mt-8 grid sm:grid-cols-3 gap-3 sm:gap-4">
            {service.highlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 70}>
                <article className="soft-shell p-5 h-full">
                  <h3 className="font-display text-base font-semibold">{h.title}</h3>
                  <p className="mt-2 text-sm text-[var(--ink-soft)] leading-relaxed">{h.body}</p>
                </article>
              </Reveal>
            ))}
          </div>

          {related.length > 0 && (
            <section className="mt-14 sm:mt-16">
              <h2 className="font-display text-2xl font-bold tracking-tight mb-5">Related {practice.toLowerCase()} services</h2>
              <div className="grid sm:grid-cols-3 gap-3 sm:gap-4">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/services/${r.slug}`}
                    className="soft-shell overflow-hidden hover:ring-1 hover:ring-[var(--accent)]/30 transition-all"
                  >
                    <div className="relative h-28">
                      <Image
                        src={r.image}
                        alt={serviceSeo(r).imageAlt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/80 to-transparent" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-display text-sm font-semibold">{r.title}</h3>
                      <p className="mt-1 text-xs text-[var(--ink-soft)] line-clamp-2">{r.short}</p>
                    </div>
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
