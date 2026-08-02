import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import ServiceTrack from "@/components/ServiceTrack";
import SignalDivider from "@/components/SignalDivider";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { cybersecurity, customerService } from "@/lib/content";

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-[#05080f]">
      {/* Navigation Bar */}
      <Header />

      {/* Hero Header Section */}
      <Hero />

      {/* Trust & Stats Section */}
      <TrustBar />

      {/* Cybersecurity Service Track */}
      <ServiceTrack
        id={cybersecurity.id}
        eyebrow={cybersecurity.eyebrow}
        headline={cybersecurity.headline}
        description={cybersecurity.description}
        services={cybersecurity.services}
        leadForm={cybersecurity.leadForm}
        track="security"
      />

      {/* Interactive Laser/Signal Section Divider */}
      <div className="my-8">
        <SignalDivider />
      </div>

      {/* Customer Service / Operations Track */}
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

      {/* Testimonials Section */}
      <Testimonials />

      {/* Main Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />
    </main>
  );
}