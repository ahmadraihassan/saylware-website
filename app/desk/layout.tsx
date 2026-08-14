import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Desk",
  robots: { index: false, follow: false },
};

export default function DeskRootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
