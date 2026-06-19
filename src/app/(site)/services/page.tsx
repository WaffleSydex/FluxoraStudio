import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import { SERVICES } from "@/lib/services";
import { Reveal } from "@/components/ui/Reveal";
import Faq from "@/components/ui/Faq";
import EndCTA from "@/components/layout/EndCTA";
import JsonLd from "@/components/ui/JsonLd";
import Marquee from "@/components/ui/Marquee";
import Link from "next/link";
import { faqSchema, canonical, SITE_URL, type FaqItem } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Marketing Services — Web, Social, Video, Branding & More | Fluxora Studio",
  description:
    "Fluxora Studio offers full-service marketing: web design & development, social media management, video production, branding, content creation, Meta & TikTok ads, SEO and email — all under one roof.",
  keywords: [
    "marketing services",
    "web design agency",
    "instagram marketing agency",
    "video editing services",
    "social media management",
    "branding agency",
    "paid social ads",
    "SEO services",
    "full service marketing studio",
  ],
  ...canonical("/services"),
};

const engagements = [
  {
    name: "Project",
    tag: "One-time",
    body: "A defined scope, start to finish. Ideal for websites, brand identities, video sets and campaign launches.",
  },
  {
    name: "Retainer",
    tag: "Monthly",
    body: "An ongoing monthly partnership for social, content, paid and growth — so results compound over time.",
  },
  {
    name: "Sprint",
    tag: "Two weeks",
    body: "A focused burst to ship something fast: a landing page, a reel pack or a full campaign. Ready when you are.",
  },
];

const compare = [
  { label: "Senior team on every project", us: true, freelancer: true, agency: false },
  { label: "All 8 channels under one roof", us: true, freelancer: false, agency: true },
  { label: "Fast turnaround & communication", us: true, freelancer: true, agency: false },
  { label: "Consistent brand voice", us: true, freelancer: false, agency: true },
  { label: "Scalable as you grow", us: true, freelancer: false, agency: true },
  { label: "Accessible pricing", us: true, freelancer: true, agency: false },
  { label: "Integrated strategy across channels", us: true, freelancer: false, agency: true },
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
  "Finance & Fintech",
  "Fashion & Lifestyle",
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

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="9" fill="currentColor" fillOpacity="0.12" />
      <path d="M5 9l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Dash() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="9" fill="currentColor" fillOpacity="0.06" />
      <path d="M6 9h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={[serviceSchema, faqSchema(faqs)]} />

      <PageHero
        label="Services"
        title="Marketing that moves the needle"
        intro="From the first impression to the thousandth touchpoint, Fluxora handles the marketing that builds brands: websites, social, video, branding, content, paid social, SEO and email. Everything except Google Ads — so we can go deeper on what works."
      />

      {/* Services marquee strip */}
      <div className="overflow-hidden border-y border-ink/10 bg-ink py-4 text-bone">
        <Marquee
          items={SERVICES.map((s) => s.title)}
          speed={28}
          className="font-display text-sm uppercase tracking-[0.18em] text-bone/60"
        />
      </div>

      {/* Services list */}
      <section className="max-w-site container-px py-10 md:py-14">
        <div className="border-t border-ink/10">
          {SERVICES.map((s, i) => (
            <Reveal key={s.num} delay={i % 3} as="div">
              <article className="group grid gap-6 border-b border-ink/10 py-8 transition-colors duration-300 hover:bg-ink/[0.02] md:grid-cols-[auto_1fr_1.1fr] md:gap-12 md:py-10">
                <span className="font-display text-xl text-ink/25 transition-colors duration-300 group-hover:text-ink/50">
                  {s.num}
                </span>
                <div>
                  <h2 className="font-display text-3xl font-medium uppercase tracking-tight md:text-4xl">
                    {s.title}
                  </h2>
                  <p className="mt-2 text-sm uppercase tracking-[0.18em] text-ink/40">{s.tagline}</p>
                </div>
                <div>
                  <p className="text-ink/70">{s.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
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

      {/* Comparison */}
      <section className="bg-ink py-12 text-bone md:py-20">
        <div className="max-w-site container-px">
          <Reveal>
            <p className="chip text-bone/50">Why Fluxora</p>
            <h2 className="mt-6 max-w-2xl font-display font-semibold uppercase text-display">
              One studio beats the alternatives
            </h2>
            <p className="mt-4 max-w-xl text-bone/55">
              A freelancer can't cover every channel. A big agency buries you in process. We're the third way — senior craft, full coverage, no runaround.
            </p>
          </Reveal>
          <div className="mt-10 overflow-hidden rounded-2xl border border-bone/10">
            {/* Header */}
            <div className="grid grid-cols-[1fr_auto_auto_auto] gap-px border-b border-bone/10 bg-bone/10">
              <div className="bg-ink px-6 py-4" />
              {["Fluxora", "Freelancer", "Big Agency"].map((col) => (
                <div key={col} className="bg-ink px-6 py-4 text-center">
                  <span className={`text-xs font-semibold uppercase tracking-[0.18em] ${col === "Fluxora" ? "text-accent-400" : "text-bone/40"}`}>
                    {col}
                  </span>
                </div>
              ))}
            </div>
            {/* Rows */}
            {compare.map((row, i) => (
              <Reveal key={row.label} delay={i % 4} as="div">
                <div className="grid grid-cols-[1fr_auto_auto_auto] gap-px border-b border-bone/10 bg-bone/10 last:border-0">
                  <div className="bg-ink px-6 py-4 text-sm text-bone/70">{row.label}</div>
                  <div className="flex items-center justify-center bg-ink px-6 py-4 text-accent-400">
                    {row.us ? <Check /> : <Dash />}
                  </div>
                  <div className="flex items-center justify-center bg-ink px-6 py-4 text-bone/40">
                    {row.freelancer ? <Check /> : <Dash />}
                  </div>
                  <div className="flex items-center justify-center bg-ink px-6 py-4 text-bone/40">
                    {row.agency ? <Check /> : <Dash />}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement models */}
      <section className="max-w-site container-px py-12 md:py-20">
        <Reveal>
          <p className="chip text-ink/50">How we work together</p>
          <h2 className="mt-6 max-w-2xl font-display font-semibold uppercase text-display">
            Three ways to engage
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 md:grid-cols-3">
          {engagements.map((e, i) => (
            <Reveal key={e.name} delay={i} as="div">
              <div className="group h-full bg-bone p-8 transition-colors duration-500 hover:bg-ink">
                <p className="chip text-ink/40 transition-colors duration-500 group-hover:text-bone/40">
                  {e.tag}
                </p>
                <h3 className="mt-6 font-display text-2xl font-medium uppercase tracking-tight transition-colors duration-500 group-hover:text-bone">
                  {e.name}
                </h3>
                <p className="mt-4 text-ink/60 transition-colors duration-500 group-hover:text-bone/60">
                  {e.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={1}>
          <div className="mt-8 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 text-sm uppercase tracking-[0.18em] text-bone transition-opacity hover:opacity-80"
            >
              Get a quote <span>&#8594;</span>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Industries */}
      <section className="bg-ink py-12 text-bone md:py-20">
        <div className="max-w-site container-px">
          <Reveal>
            <p className="chip text-bone/50">Who we work with</p>
            <h2 className="mt-6 max-w-2xl font-display font-semibold uppercase text-display">
              Industries we know well
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-bone/10 bg-bone/10 sm:grid-cols-3 lg:grid-cols-5">
              {industries.map((ind) => (
                <div
                  key={ind}
                  className="group bg-ink px-5 py-5 text-sm font-medium uppercase tracking-[0.12em] text-bone/50 transition-colors duration-300 hover:text-bone"
                >
                  {ind}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
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
