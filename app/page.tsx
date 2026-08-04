import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Pillars from "@/components/Pillars";
import SignatureTracks from "@/components/SignatureTracks";
import Values from "@/components/Values";
import Journey from "@/components/Journey";
import CtaBanner from "@/components/CtaBanner";
import Testimonials from "@/components/Testimonials";
import LeadForm from "@/components/LeadForm";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { cybersecurity, customerService } from "@/lib/content";

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-[var(--bg)]">
      <Header />
      <Hero />
      <Pillars />
      <SignatureTracks />
      <Values />
      <Journey />
      <CtaBanner />
      <Testimonials />

      <section className="py-12 sm:py-20 px-5 sm:px-8">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-5 sm:gap-6">
          <Reveal variant="left">
            <LeadForm
              id={cybersecurity.leadForm.id}
              formspreeId={cybersecurity.leadForm.formspreeId}
              heading={cybersecurity.leadForm.heading}
              subheading={cybersecurity.leadForm.subheading}
              submitLabel={cybersecurity.leadForm.submitLabel}
              track="security"
            />
          </Reveal>
          <Reveal variant="right" delay={100}>
            <LeadForm
              id={customerService.leadForm.id}
              formspreeId={customerService.leadForm.formspreeId}
              heading={customerService.leadForm.heading}
              subheading={customerService.leadForm.subheading}
              submitLabel={customerService.leadForm.submitLabel}
              track="support"
            />
          </Reveal>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  );
}
