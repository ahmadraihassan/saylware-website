import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import Pillars from "@/components/Pillars";
import SignatureTracks from "@/components/SignatureTracks";
import Values from "@/components/Values";
import Journey from "@/components/Journey";
import CtaBanner from "@/components/CtaBanner";
import Testimonials from "@/components/Testimonials";
import FormWizard from "@/components/FormWizard";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-[var(--bg)]">
      <Header />
      <Hero />
      <Partners />
      <Pillars />
      <SignatureTracks />
      <Values />
      <Journey />
      <CtaBanner />
      <Testimonials />
      <FormWizard />
      <Footer />
    </main>
  );
}
