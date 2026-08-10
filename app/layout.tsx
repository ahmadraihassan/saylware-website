import type { Metadata } from "next";
import { Syne, Outfit, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/content";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: `${site.name} · ${site.tagline}`,
  description: site.tagline,
  icons: {
    icon: [
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/saylware-icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/saylware-icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: `${site.name} · ${site.tagline}`,
    description: site.tagline,
    url: `https://${site.domain}`,
    siteName: site.name,
    images: [{ url: "/saylware-mark.png", width: 512, height: 512, alt: site.name }],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${syne.variable} ${outfit.variable} ${ibmPlexMono.variable} antialiased bg-[var(--bg)] text-[var(--ink)] min-h-screen flex flex-col relative`}
      >
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-32 left-1/4 w-[480px] h-[480px] rounded-full bg-[var(--accent)]/10 blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full bg-[var(--purple)]/12 blur-[120px]" />
        </div>
        <div className="relative z-10 flex-1 flex flex-col w-full">{children}</div>
      </body>
    </html>
  );
}
