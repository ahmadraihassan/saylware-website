import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import Pillars from "@/components/Pillars";
import ServicesFacets from "@/components/ServicesFacets";
import Values from "@/components/Values";
import Journey from "@/components/Journey";
import CtaBanner from "@/components/CtaBanner";
import Testimonials from "@/components/Testimonials";
import FormWizard from "@/components/FormWizard";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { pages } from "@/lib/content";
import { homeMetadata, siteUrl } from "@/lib/seo";

export const metadata = homeMetadata;

export default function Home() {
  return (
    <main className="relative overflow-x-hidden bg-[var(--bg)] w-full">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: pages.home.title,
          description: pages.home.description,
          url: `${siteUrl}/`,
          isPartOf: { "@id": `${siteUrl}/#website` },
          about: [
            { "@type": "Thing", name: "Cybersecurity services" },
            { "@type": "Thing", name: "Customer support services" },
          ],
        }}
      />
      <Header />
      <Hero />
      <Partners />
      <Pillars />
      <ServicesFacets />
      <Values />
      <Journey />
      <CtaBanner />
      <Testimonials />
      <FormWizard />
      <Footer />
    </main>
  );
}
