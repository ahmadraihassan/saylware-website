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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${syne.variable} ${outfit.variable} ${ibmPlexMono.variable} antialiased bg-[var(--bg)] text-[var(--ink)] selection:bg-[var(--lime)]/40 min-h-screen flex flex-col relative`}
      >
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-24 -left-16 w-[420px] h-[420px] rounded-full bg-[var(--lime)]/25 blur-[100px] animate-blob" />
          <div className="absolute top-1/3 -right-20 w-[460px] h-[460px] rounded-full bg-[var(--purple)]/15 blur-[110px] animate-blob" style={{ animationDelay: "2s" }} />
          <div className="absolute bottom-0 left-1/3 w-[380px] h-[380px] rounded-full bg-[#7dd3fc]/20 blur-[100px] animate-blob" style={{ animationDelay: "4s" }} />
        </div>
        <div className="relative z-10 flex-1 flex flex-col">{children}</div>
      </body>
    </html>
  );
}
