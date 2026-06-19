import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import { getPortfolio } from "@/lib/data";
import PortfolioGrid from "@/components/work/PortfolioGrid";
import { Reveal } from "@/components/ui/Reveal";
import Faq from "@/components/ui/Faq";
import EndCTA from "@/components/layout/EndCTA";
import JsonLd from "@/components/ui/JsonLd";
import Counter from "@/components/ui/Counter";
import { faqSchema, canonical, SITE_URL, type FaqItem } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Our Work & Case Studies — Portfolio | Fluxora Studio",
  description:
    "See what Fluxora Studio has built: websites, social campaigns, brand identities, video production and content for ambitious brands. Real projects, real results.",
  keywords: [
    "marketing portfolio",
    "case studies",
    "web design portfolio",
    "social media case study",
    "video production portfolio",
    "branding work",
    "creative agency portfolio",
  ],
  ...canonical("/work"),
};

export const revalidate = 0;

const outcomes = [
  { to: 2, suffix: ".1s", label: "Average page load time on sites we ship" },
  { to: 4, suffix: ".2M", label: "Organic views for a social client in 90 days" },
  { to: 3, suffix: "×", label: "Non-brand organic traffic from SEO overhaul" },
  { to: 40, suffix: "%", label: "Average lift in engagement after content rebuild" },
];

const process = [
  {
    n: "01",
    t: "Discovery",
    d: "We audit what's working, what isn't, and where the opportunity is. No assumptions — just clear-eyed analysis.",
  },
  {
    n: "02",
    t: "Strategy",
    d: "Every project starts with a brief, a direction and a definition of what success looks like. Strategy before execution, always.",
  },
  {
    n: "03",
    t: "Production",
    d: "Senior creatives build the work — bespoke, intentional and made to your bar. You're in the loop at every milestone.",
  },
  {
    n: "04",
    t: "Launch & optimise",
    d: "We ship, measure and iterate. The work is live but the job isn't done until the numbers move.",
  },
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
        intro="The brands, sites, films and campaigns we've shipped — and the thinking behind them. Every project is built on strategy, driven by craft, and measured on results."
      />

      {/* Portfolio grid */}
      <section className="pb-10 md:pb-14">
        <PortfolioGrid items={items} />
      </section>

      {/* Outcomes — animated counters */}
      <section className="bg-ink py-12 text-bone md:py-20">
        <div className="max-w-site container-px">
          <Reveal>
            <p className="chip text-bone/50">The results</p>
            <h2 className="mt-6 max-w-2xl font-display font-semibold uppercase text-display">
              Work that performs
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-bone/10 bg-bone/10 sm:grid-cols-2 lg:grid-cols-4">
            {outcomes.map((o, i) => (
              <Reveal key={o.label} delay={i} as="div">
                <div className="h-full bg-ink p-8 md:p-10">
                  <p className="font-display text-5xl font-semibold tracking-tight text-bone md:text-6xl">
                    <Counter to={o.to} suffix={o.suffix} />
                  </p>
                  <p className="mt-3 text-sm text-bone/55">{o.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How a project works */}
      <section className="max-w-site container-px py-12 md:py-20">
        <Reveal>
          <p className="chip text-ink/50">How a project works</p>
          <h2 className="mt-6 max-w-2xl font-display font-semibold uppercase text-display">
            From brief to launch
          </h2>
        </Reveal>
        <div className="mt-10">
          {process.map((step, i) => (
            <Reveal key={step.n} delay={i} as="div">
              <div className="grid gap-4 border-b border-ink/10 py-8 md:grid-cols-[80px_1fr_1.8fr] md:gap-12 md:py-10">
                <span className="font-display text-lg font-medium text-ink/25">{step.n}</span>
                <h3 className="font-display text-2xl font-medium uppercase tracking-tight md:text-3xl">
                  {step.t}
                </h3>
                <p className="text-ink/65 md:text-lg">{step.d}</p>
              </div>
            </Reveal>
          ))}
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
