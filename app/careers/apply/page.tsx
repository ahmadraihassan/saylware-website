import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ApplyWizard from "@/components/ApplyWizard";
import JsonLd from "@/components/JsonLd";
import { applyMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = applyMetadata;

export default function GeneralApplyPage() {
  return (
    <main className="relative bg-[var(--bg)] min-h-screen flex flex-col">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
          { name: "Apply", path: "/careers/apply" },
        ])}
      />
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
