import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProjectNeed from "@/components/ProjectNeed";
import TrustBar from "@/components/TrustBar";
import ServiceTrack from "@/components/ServiceTrack";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-[#faf6f0]">
      <Header />
      <Hero />
      <ProjectNeed />
      <TrustBar />
      <ServiceTrack />
      <Team />
      <Contact />
      <Footer />
    </main>
  );
}