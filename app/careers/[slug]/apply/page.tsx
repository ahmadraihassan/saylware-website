import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ApplyWizard from "@/components/ApplyWizard";
import { careers, getRoleBySlug, site } from "@/lib/content";

export function generateStaticParams() {
  return careers.roles.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const role = getRoleBySlug(slug);
  if (!role) return { title: `Apply · ${site.name}` };
  return {
    title: `Apply · ${role.title} · ${site.name}`,
    description: role.description,
  };
}

export default async function RoleApplyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const role = getRoleBySlug(slug);
  if (!role) notFound();

  return (
    <main className="relative bg-[var(--bg)] min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[82rem] w-full">
          <ApplyWizard role={role} />
        </div>
      </div>
      <Footer />
    </main>
  );
}
