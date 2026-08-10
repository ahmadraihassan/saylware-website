import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ApplyWizard from "@/components/ApplyWizard";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: `Apply · ${site.name}`,
  description: "Apply to join the Saylware team.",
};

export default function GeneralApplyPage() {
  return (
    <main className="relative bg-[var(--bg)] min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[82rem] w-full">
          <ApplyWizard />
        </div>
      </div>
      <Footer />
    </main>
  );
}
