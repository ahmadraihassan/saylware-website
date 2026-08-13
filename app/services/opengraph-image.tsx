import { ogSize, brandOgImage } from "@/lib/og-image";

export const alt = "Saylware cybersecurity and customer support services";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return brandOgImage({
    kicker: "Services",
    title: "Cybersecurity and customer support services",
    subtitle: "MDR, incident response, vulnerability management, and branded helpdesk operations.",
  });
}
