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

export default function Home() {
  return (
    <main className="relative overflow-x-hidden bg-[var(--bg)] w-full">
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
