import type { MetadataRoute } from "next";
import { site } from "@/lib/content";
import { absUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/desk", "/desk/", "/api/desk"],
      },
    ],
    sitemap: absUrl("/sitemap.xml"),
    host: site.domain,
  };
}
