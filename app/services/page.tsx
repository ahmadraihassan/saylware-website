import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { faqs, facets, pages, serviceCatalog } from "@/lib/content";
import {
  absUrl,
  breadcrumbJsonLd,
  faqJsonLd,
  itemListJsonLd,
  serviceSeo,
  servicesIndexMetadata,
} from "@/lib/seo";

export const metadata = servicesIndexMetadata;

export default function ServicesPage() {
  const security = serviceCatalog.filter((s) => s.facet === "security");
  const support = serviceCatalog.filter((s) => s.facet === "support");

  return (
    <main className="relative bg-[var(--bg)] min-h-screen flex flex-col">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(
          "Saylware services",
          serviceCatalog.map((s) => ({
            name: s.title,
            url: absUrl(`/services/${s.slug}`),
          }))
        )}
      />
      <JsonLd data={faqJsonLd(faqs.services)} />
      <Header />
      <div className="flex-1 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[82rem] w-full">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--ink-muted)]">
              Services
            </p>
            <h1 className="mt-3 font-display text-[clamp(1.85rem,4.5vw,3.25rem)] font-bold tracking-tight max-w-3xl">
              {pages.services.headline}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[var(--ink-soft)] max-w-2xl leading-relaxed">
              {pages.services.intro}
            </p>
          </Reveal>

          <section id="cybersecurity" className="mt-12 sm:mt-16 scroll-mt-28">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
              {facets.security.title} services
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[var(--ink-soft)] max-w-2xl">
              {facets.security.subtitle}. Managed detection, incident response, vulnerability management, and advisory for teams that need a real SOC partner.
            </p>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {security.map((s) => (
                <ServiceCard key={s.slug} slug={s.slug} title={s.title} short={s.short} image={s.image} alt={serviceSeo(s).imageAlt} />
              ))}
            </div>
          </section>

          <section id="customer-service" className="mt-14 sm:mt-20 scroll-mt-28">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
              Customer support services
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[var(--ink-soft)] max-w-2xl">
              {facets.support.subtitle}. Branded helpdesk, CX process design, escalation QA, and analytics so support feels like your team.
            </p>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {support.map((s) => (
                <ServiceCard key={s.slug} slug={s.slug} title={s.title} short={s.short} image={s.image} alt={serviceSeo(s).imageAlt} />
              ))}
            </div>
          </section>

          <section className="mt-14 sm:mt-20">
            <h2 className="font-display text-2xl font-bold tracking-tight">Questions teams ask</h2>
            <div className="mt-5 space-y-3">
              {faqs.services.map((item) => (
                <article key={item.question} className="soft-shell p-5">
                  <h3 className="font-display text-base font-semibold">{item.question}</h3>
                  <p className="mt-2 text-sm text-[var(--ink-soft)] leading-relaxed">{item.answer}</p>
                </article>
              ))}
            </div>
          </section>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="/#get-started"
              className="inline-flex rounded-full bg-[var(--accent)] text-[var(--bg)] px-5 py-3 text-sm font-bold"
            >
              Talk to us about services
            </a>
            <Link
              href="/careers"
              className="inline-flex rounded-full glass px-5 py-3 text-sm font-semibold"
            >
              See open jobs
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

function ServiceCard({
  slug,
  title,
  short,
  image,
  alt,
}: {
  slug: string;
  title: string;
  short: string;
  image: string;
  alt: string;
}) {
  return (
    <Link
      href={`/services/${slug}`}
      className="soft-shell overflow-hidden hover:ring-1 hover:ring-[var(--accent)]/30 transition-all group"
    >
      <div className="relative h-40">
        <Image src={image} alt={alt} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" sizes="(max-width: 640px) 100vw, 50vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] to-transparent" />
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-[var(--ink-soft)] leading-relaxed">{short}</p>
        <span className="mt-4 inline-flex text-sm font-semibold text-[var(--accent)]">View service →</span>
      </div>
    </Link>
  );
}
