import { ogSize, brandOgImage } from "@/lib/og-image";

export const alt = "Saylware — cybersecurity and customer support services";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return brandOgImage({
    kicker: "Operations",
    title: "Cybersecurity and customer support, run right.",
    subtitle: "Managed detection, incident response, and branded helpdesk services.",
  });
}
