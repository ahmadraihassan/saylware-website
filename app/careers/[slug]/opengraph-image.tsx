import { ogSize, brandOgImage } from "@/lib/og-image";
import { careers, getRoleBySlug } from "@/lib/content";

export const alt = "Saylware job opening";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return careers.roles.map((r) => ({ slug: r.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const role = getRoleBySlug(slug);

  return brandOgImage({
    kicker: "We're hiring",
    title: role?.title ?? "Open role",
    subtitle: role
      ? `${role.type} · ${role.location} · ${role.department}`
      : "Jobs in cybersecurity and customer support.",
  });
}
