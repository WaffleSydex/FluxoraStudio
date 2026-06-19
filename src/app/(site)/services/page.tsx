import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import { SERVICES } from "@/lib/services";
import { Reveal } from "@/components/ui/Reveal";
import Faq from "@/components/ui/Faq";
import EndCTA from "@/components/layout/EndCTA";
import JsonLd from "@/components/ui/JsonLd";
import { faqSchema, canonical, SITE_URL, type FaqItem } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Marketing Services — Web, Social, Video & Branding",
  description:
    "Fluxora Studio's marketing services: web design & development, Instagram & social media marketing, video editing & production, branding, content creation, paid social ads (Meta & TikTok), SEO and email — everything except Google Ads.",
  keywords: [
    "marketing services",
    "web design agency",
    "instagram marketing agency",
    "video editing services",
    "social media management",
    "branding agency",
    "paid social ads",
    "SEO services",
  ],
  ...canonical("/services"),
};

const engagements = [
  {
    name: "Project",
    body: "A defined scope, start to finish. Ideal for websites, brand identities, video sets and launches.",
  },
  {
    name: "Retainer",
    body: "An ongoing monthly partnership for social, content, paid and growth — so results compound.",
  },
  {
    name: "Sprint",
    body: "A focused two-week burst to ship something fast: a landing page, a reel pack or a campaign.",
  },
];

const industries = [
  "SaaS & Tech",
  "E-commerce & DTC",
  "Hospitality & Food",
  "Health & Wellness",
  "Real Estate",
  "Creators & Personal Brands",
  "Professional Services",
  "Local Business",
];

const faqs: FaqItem[] = [
  {
    q: "Do you run Google Ads?",
    a: "No — and that's on purpose. We focus on everything else: Meta and TikTok ads, organic social, SEO, content, video, web and branding. Going deep on these channels lets us build brands that last, not just buy clicks.",
  },
  {
    q: "Can I hire you for just one service?",
    a: "Yes. Take a single service like video editing or web design on its own, or combine several into one monthly retainer — whatever fits where you are.",
  },
  {
    q: "Do you offer monthly retainers?",
    a: "We do. Most social, content and growth work runs as a monthly retainer so the strategy, creative and optimization all build on each other over time.",
  },
  {
    q: "How quickly can you start?",
    a: "Most engagements kick off within one to two weeks of a signed proposal. Need something urgent? Our two-week sprints can often start sooner.",
  },
  {
    q: "Will you work with our existing brand and tools?",
    a: "Absolutely. We can build on your current brand guidelines and plug into the platforms and tools your team already uses, or help you level them up.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: SERVICES.map((s) => s.title),
  provider: { "@type": "Organization", name: "Fluxora Studio", url: SITE_URL },
  areaServed: "Worldwide",
  description:
    "Full-service marketing: web design, social media marketing, video editing, branding, content, paid social, SEO and email.",
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={[serviceSchema, faqSchema(faqs)]} />

      <PageHero
        label="Services"
        title="Marketing that moves the needle"
        intro="From the first impression to the thousandth touchpoint, Fluxora handles the marketing that builds brands: websites, social, video, branding, content, paid social, SEO and email. The one thing we don't do is Google Ads — so we can go deeper on everything else."
      />

      <section className="max-w-site container-px py-12 md:py-16">
        <div className="border-t border-ink/10">
          {SERVICES.map((s, i) => (
            <Reveal key={s.num} delay={i % 3} as="div">
              <article className="grid gap-6 border-b border-ink/10 py-10 md:grid-cols-[auto_1fr_1.1fr] md:gap-12">
                <span className="font-display text-xl text-ink/30">{s.num}</span>
                <div>
                  <h2 className="font-display text-3xl font-medium uppercase tracking-tight md:text-4xl">
                    {s.title}
                  </h2>
                  <p className="mt-2 text-sm uppercase tracking-[0.18em] text-ink/40">{s.tagline}</p>
                </div>
                <div>
                  <p className="text-ink/70">{s.description}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {s.deliverables.map((d) => (
                      <li key={d} className="chip text-ink/60">
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Engagement models */}
      <section className="bg-ink py-16 text-bone md:py-24">
        <div className="max-w-site container-px">
          <Reveal>
            <p className="chip text-bone/50">How we work together</p>
            <h2 className="mt-6 max-w-2xl font-display font-semibold uppercase text-display">
              Three ways to engage
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-bone/10 bg-bone/10 md:grid-cols-3">
            {engagements.map((e, i) => (
              <Reveal key={e.name} delay={i} as="div">
                <div className="h-full bg-ink p-8">
                  <h3 className="font-display text-2xl font-medium uppercase tracking-tight">{e.name}</h3>
                  <p className="mt-4 text-bone/60">{e.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="max-w-site container-px py-16 md:py-24">
        <Reveal>
          <p className="chip text-ink/50">Who we work with</p>
          <h2 className="mt-6 max-w-2xl font-display font-semibold uppercase text-display">
            Industries we know well
          </h2>
        </Reveal>
        <Reveal delay={1}>
          <div className="mt-10 flex flex-wrap gap-3">
            {industries.map((ind) => (
              <span key={ind} className="chip text-base text-ink/70">
                {ind}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      <Faq items={faqs} eyebrow="Services FAQ" title="Questions about our services" />

      <EndCTA
        eyebrow="Ready when you are"
        title="Let's build your marketing engine"
        sub="Tell us what you need and we'll put together a clear plan and a quote."
      />
    </>
  );
}
