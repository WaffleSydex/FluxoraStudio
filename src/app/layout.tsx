import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fluxorastudio.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Fluxora Studio — Marketing in Motion",
    template: "%s — Fluxora Studio",
  },
  description:
    "Fluxora Studio is a creative marketing studio: websites, Instagram & social marketing, video editing, branding, content, SEO and more. Marketing in motion.",
  keywords: [
    "marketing agency",
    "web design",
    "instagram marketing",
    "video editing",
    "branding",
    "social media",
    "content creation",
    "Fluxora Studio",
  ],
  openGraph: {
    title: "Fluxora Studio — Marketing in Motion",
    description:
      "A creative marketing studio building brands, content and momentum. Websites, social, video and everything in between.",
    url: siteUrl,
    siteName: "Fluxora Studio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fluxora Studio — Marketing in Motion",
    description: "Websites, social, video, branding and more. Marketing in motion.",
  },
  icons: { icon: "/logo-flux.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="grain">{children}</body>
    </html>
  );
}
