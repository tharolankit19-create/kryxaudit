import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "IdeaGap — Scan your startup idea for competitors in seconds",
  description:
    "Describe your startup idea. IdeaGap scans Product Hunt and the live web for competitors, flags the dead ones, and finds the gap none of them solve.",
  openGraph: {
    title: "IdeaGap — Find the gap before you build",
    description:
      "Run your idea through IdeaGap. See how many competitors exist, how many are dead, and the one gap none of them solve.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
