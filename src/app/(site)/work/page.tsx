import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import { getPortfolio } from "@/lib/data";
import PortfolioGrid from "@/components/work/PortfolioGrid";
import { Reveal } from "@/components/ui/Reveal";
import Faq from "@/components/ui/Faq";
import EndCTA from "@/components/layout/EndCTA";
import JsonLd from "@/components/ui/JsonLd";
import { faqSchema, canonical, SITE_URL, type FaqItem } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Our Work & Case Studies — Portfolio",
  description:
    "Explore Fluxora Studio's portfolio: websites, social media campaigns, brand identities, video and content for ambitious brands. See the work and the results behind it.",
  keywords: [
    "marketing portfolio",
    "case studies",
    "web design portfolio",
    "social media case study",
    "video production portfolio",
    "branding work",
  ],
  ...canonical("/work"),
};

// Always reflect the latest admin edits.
export const revalidate = 0;

const outcomes = [
  { metric: "2.1s", label: "Average LCP on the sites we ship — fast loads, better conversion." },
  { metric: "4.2M", label: "Organic views for a single social client in 90 days." },
  { metric: "3×", label: "Non-brand organic traffic from a technical SEO overhaul." },
  { metric: "40%", label: "Average lift in engagement after a content-system rebuild." },
];

const faqs: FaqItem[] = [
  {
    q: "Can I see more examples relevant to my project?",
    a: "Yes — the work shown here is a snapshot. Reach out and we'll send case studies and samples closest to what you're planning.",
  },
  {
    q: "Do you have experience in my industry?",
    a: "We work across SaaS, e-commerce, hospitality, wellness, real estate, creators and more. If we haven't done your exact niche, our process adapts fast.",
  },
  {
    q: "Who owns the work you create?",
    a: "You do. Once a project is complete and paid, all final deliverables, files and assets are yours to keep and use however you like.",
  },
  {
    q: "Can you show video and motion work?",
    a: "Definitely. Many of our portfolio items are reels, brand films and ad creative — tap any project with a play icon to watch it.",
  },
  {
    q: "How do you measure success?",
    a: "We agree on the metrics that matter to you up front — traffic, leads, conversion, views, engagement — and report against them, not vanity numbers.",
  },
];

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Work & Case Studies — Fluxora Studio",
  url: `${SITE_URL}/work`,
  description:
    "Portfolio of websites, social campaigns, branding, video and content by Fluxora Studio.",
};

export default async function WorkPage() {
  const items = await getPortfolio();

  return (
    <>
      <JsonLd data={[collectionSchema, faqSchema(faqs)]} />

      <PageHero
        label="Portfolio"
        title="Work & case studies"
        intro="The brands, sites, films and campaigns we've shipped — and the thinking behind them. Tap any project to view it in full. New work is added all the time."
      />

      <section className="pb-12 md:pb-16">
        <PortfolioGrid items={items} />
      </section>

      {/* Outcomes */}
      <section className="bg-ink py-16 text-bone md:py-24">
        <div className="max-w-site container-px">
          <Reveal>
            <p className="chip text-bone/50">The results</p>
            <h2 className="mt-6 max-w-2xl font-display font-semibold uppercase text-display">
              Work that performs
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {outcomes.map((o, i) => (
              <Reveal key={o.metric} delay={i} as="div">
                <p className="font-display text-5xl font-semibold tracking-tight text-bone md:text-6xl">
                  {o.metric}
                </p>
                <p className="mt-3 text-sm text-bone/55">{o.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Faq items={faqs} eyebrow="Portfolio FAQ" title="Questions about our work" />

      <EndCTA
        eyebrow="Your project next"
        title="Imagine your brand in this lineup"
        sub="Let's create work worth showing off. Tell us what you have in mind."
      />
    </>
  );
}
