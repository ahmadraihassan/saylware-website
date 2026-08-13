import type { Metadata } from "next";
import {
  careers,
  contact,
  footer,
  pages,
  serviceCatalog,
  site,
  type CareerRole,
  type ServiceItem,
} from "@/lib/content";

export const siteUrl = `https://${site.domain}`;

export function absUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function pageMetadata({
  title,
  description,
  path,
  index = true,
}: {
  title: string;
  description: string;
  path: string;
  index?: boolean;
}): Metadata {
  const url = absUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url,
      siteName: site.name,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
    },
  };
}

export function serviceSeo(service: ServiceItem) {
  const practice =
    service.facet === "security" ? "cybersecurity" : "customer support";
  return {
    title: `${service.title} — ${practice === "cybersecurity" ? "Cybersecurity" : "Customer Support"} Services`,
    description: `${service.short} Saylware ${practice} for growing teams.`,
    imageAlt: `${service.title} ${practice} service`,
  };
}

export function roleSeo(role: CareerRole) {
  return {
    title: `${role.title} Job (${role.location})`,
    description: `Apply for the ${role.title} role at Saylware. ${role.type}, ${role.location}. ${role.description}`,
  };
}

function addDays(isoDate: string, days: number) {
  const d = new Date(`${isoDate}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

function employmentType(role: CareerRole) {
  const t = role.type.toLowerCase();
  if (t.includes("part")) return "PART_TIME";
  if (t.includes("contract")) return "CONTRACTOR";
  return "FULL_TIME";
}

export function organizationJsonLd() {
  return {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: site.name,
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: absUrl("/saylware-icon-512.png"),
      width: 512,
      height: 512,
    },
    image: absUrl("/saylware-mark.png"),
    description: site.description,
    email: contact.email,
    telephone: contact.phone,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: contact.phone,
      email: contact.email,
      contactType: "sales",
      areaServed: "Worldwide",
      availableLanguage: ["English"],
    },
    sameAs: footer.socials.filter((s) => s.href.startsWith("http")).map((s) => s.href),
    knowsAbout: [
      "Cybersecurity",
      "Managed detection and response",
      "Incident response",
      "Vulnerability management",
      "Customer support",
      "Customer experience",
      "Helpdesk",
    ],
    areaServed: "Worldwide",
  };
}

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: site.name,
    description: site.description,
    publisher: { "@id": `${siteUrl}/#organization` },
    inLanguage: "en-US",
  };
}

export function professionalServiceJsonLd() {
  return {
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#service-business`,
    name: site.name,
    url: siteUrl,
    image: absUrl("/saylware-icon-512.png"),
    description: site.description,
    telephone: contact.phone,
    email: contact.email,
    parentOrganization: { "@id": `${siteUrl}/#organization` },
    areaServed: "Worldwide",
    serviceType: [
      "Managed cybersecurity services",
      "Customer support services",
      "Managed detection and response",
      "Outsourced helpdesk",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Saylware services",
      itemListElement: serviceCatalog.map((s, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: {
          "@type": "Service",
          name: s.title,
          url: absUrl(`/services/${s.slug}`),
          serviceType: s.facet === "security" ? "Cybersecurity" : "Customer support",
        },
      })),
    },
  };
}

export function rootGraphJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationJsonLd(), websiteJsonLd(), professionalServiceJsonLd()],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absUrl(item.path),
    })),
  };
}

export function serviceJsonLd(service: ServiceItem) {
  const seo = serviceSeo(service);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    url: absUrl(`/services/${service.slug}`),
    description: seo.description,
    serviceType: service.facet === "security" ? "Cybersecurity" : "Customer support",
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: "Worldwide",
    image: service.image,
  };
}

export function jobPostingJsonLd(role: CareerRole) {
  const remote = role.location.toLowerCase().includes("remote");
  const hybrid = role.location.toLowerCase().includes("hybrid");
  const url = absUrl(`/careers/${role.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: role.title,
    description: `<p>${role.description}</p><p>${role.department} · ${role.type} · ${role.location}</p>`,
    datePosted: role.postedAt,
    validThrough: `${addDays(role.postedAt, 90)}T23:59:59Z`,
    employmentType: employmentType(role),
    hiringOrganization: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: site.name,
      sameAs: siteUrl,
      logo: absUrl("/saylware-icon-512.png"),
    },
    identifier: {
      "@type": "PropertyValue",
      name: site.name,
      value: role.slug,
    },
    url,
    directApply: true,
    industry: role.department === "Security" ? "Cybersecurity" : "Customer support",
    ...(remote || hybrid ? { jobLocationType: "TELECOMMUTE" } : {}),
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: "US",
      },
    },
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function itemListJsonLd(
  name: string,
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

export const homeMetadata = pageMetadata({
  title: pages.home.title,
  description: pages.home.description,
  path: "/",
});

export const servicesIndexMetadata = pageMetadata({
  title: pages.services.title,
  description: pages.services.description,
  path: "/services",
});

export const careersMetadata = pageMetadata({
  title: pages.careers.title,
  description: pages.careers.description,
  path: "/careers",
});

export const applyMetadata = pageMetadata({
  title: pages.apply.title,
  description: pages.apply.description,
  path: "/careers/apply",
});

export function sitemapEntries() {
  const now = new Date();
  const staticPages = [
    { url: absUrl("/"), lastModified: now, changeFrequency: "weekly" as const, priority: 1 },
    { url: absUrl("/services"), lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: absUrl("/careers"), lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: absUrl("/careers/apply"), lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 },
  ];
  const services = serviceCatalog.map((s) => ({
    url: absUrl(`/services/${s.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  const jobs = careers.roles.map((r) => ({
    url: absUrl(`/careers/${r.slug}`),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
  return [...staticPages, ...services, ...jobs];
}
