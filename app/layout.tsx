import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/content";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${ibmPlexMono.variable} antialiased bg-[#05080f] text-[#f0f4f8] selection:bg-[var(--signal-security)]/30 selection:text-white min-h-screen flex flex-col relative`}
      >
        {/* Subtle Tech Scanline Effect */}
        <div className="fixed inset-0 pointer-events-none scanline z-50 opacity-40" />

        {/* Global Ambient Gradient Mesh */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[var(--signal-security)]/5 blur-[160px]" />
          <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[var(--signal-support)]/5 blur-[160px]" />
        </div>

        {/* Main Content Viewport */}
        <div className="relative z-10 flex-1">{children}</div>
      </body>
    </html>
  );
}