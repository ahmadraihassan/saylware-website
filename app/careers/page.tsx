import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CareersBoard from "@/components/CareersBoard";
import JsonLd from "@/components/JsonLd";
import { careers, faqs } from "@/lib/content";
import {
  absUrl,
  breadcrumbJsonLd,
  careersMetadata,
  faqJsonLd,
  itemListJsonLd,
  jobPostingJsonLd,
} from "@/lib/seo";

export const metadata = careersMetadata;

export default function CareersPage() {
  return (
    <main className="relative bg-[var(--bg)] min-h-screen flex flex-col">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(
          "Saylware jobs",
          careers.roles.map((r) => ({
            name: r.title,
            url: absUrl(`/careers/${r.slug}`),
          }))
        )}
      />
      {careers.roles.map((role) => (
        <JsonLd key={role.slug} data={jobPostingJsonLd(role)} />
      ))}
      <JsonLd data={faqJsonLd(faqs.careers)} />
      <Header />
      <div className="flex-1 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[82rem] w-full">
          <CareersBoard />
        </div>
      </div>
      <Footer />
    </main>
  );
}
