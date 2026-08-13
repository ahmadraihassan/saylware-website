import { ogSize, brandOgImage } from "@/lib/og-image";

export const alt = "Saylware jobs in cybersecurity and customer support";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return brandOgImage({
    kicker: "Careers",
    title: "Jobs in cybersecurity and customer support",
    subtitle: "Apply for remote, hybrid, and on-site roles at Saylware.",
  });
}
