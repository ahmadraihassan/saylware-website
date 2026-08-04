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
  title: `${site.name} — ${site.tagline}`,
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
        className={`${syne.variable} ${outfit.variable} ${ibmPlexMono.variable} antialiased bg-[var(--bg)] text-[var(--ink)] selection:bg-[var(--accent)]/30 min-h-screen flex flex-col relative`}
      >
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-32 left-1/4 w-[520px] h-[520px] rounded-full bg-[var(--accent)]/[0.07] blur-[140px]" />
          <div className="absolute bottom-0 right-0 w-[480px] h-[480px] rounded-full bg-[var(--signal-support)]/[0.06] blur-[140px]" />
          <div className="absolute top-1/2 left-0 w-[360px] h-[360px] rounded-full bg-[var(--signal-security)]/[0.05] blur-[120px]" />
        </div>
        <div className="relative z-10 flex-1 flex flex-col">{children}</div>
      </body>
    </html>
  );
}
