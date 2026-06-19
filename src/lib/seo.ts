import { DEFAULT_SETTINGS } from "@/lib/types";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://fluxorastudio.com";

export interface FaqItem {
  q: string;
  a: string;
}

/** FAQPage structured data for rich results in Google. */
export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Fluxora Studio",
  alternateName: "Fluxora",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-flux.png`,
  email: DEFAULT_SETTINGS.contact_email,
  description:
    "Fluxora Studio is a creative marketing studio offering web design, Instagram & social marketing, video editing, branding, content, paid social, SEO and email marketing.",
  sameAs: DEFAULT_SETTINGS.socials.map((s) => s.url),
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Fluxora Studio",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

/** Helper for per-page <link rel="canonical"> via Next metadata. */
export function canonical(path: string) {
  return { alternates: { canonical: path } };
}
