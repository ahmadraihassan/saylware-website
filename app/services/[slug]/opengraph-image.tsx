import { ogSize, brandOgImage } from "@/lib/og-image";
import { getServiceBySlug, serviceCatalog } from "@/lib/content";

export const alt = "Saylware service";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return serviceCatalog.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  const practice =
    service?.facet === "support" ? "Customer support" : "Cybersecurity";

  return brandOgImage({
    kicker: `${practice} services`,
    title: service?.title ?? "Saylware services",
    subtitle: service?.short ?? "Managed cybersecurity and customer support.",
  });
}
