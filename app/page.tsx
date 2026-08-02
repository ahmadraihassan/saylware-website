import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import ServiceTrack from "@/components/ServiceTrack";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { cybersecurity, customerService } from "@/lib/content";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Header />
      <Hero />
      <TrustBar />
      <ServiceTrack
        id={cybersecurity.id}
        eyebrow={cybersecurity.eyebrow}
        headline={cybersecurity.headline}
        description={cybersecurity.description}
        services={cybersecurity.services}
        leadForm={cybersecurity.leadForm}
        track="security"
      />
      <ServiceTrack
        id={customerService.id}
        eyebrow={customerService.eyebrow}
        headline={customerService.headline}
        description={customerService.description}
        services={customerService.services}
        leadForm={customerService.leadForm}
        track="support"
        reversed
      />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}