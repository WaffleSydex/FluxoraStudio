import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import Faq from "@/components/ui/Faq";
import EndCTA from "@/components/layout/EndCTA";
import JsonLd from "@/components/ui/JsonLd";
import Marquee from "@/components/ui/Marquee";
import Counter from "@/components/ui/Counter";
import { faqSchema, canonical, SITE_URL, type FaqItem } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Fluxora Studio — Remote Creative Marketing Studio",
  description:
    "Fluxora Studio is a remote-first creative marketing studio combining strategy, design and production. One senior team across brand, web, social, video, content, paid, SEO and email.",
  keywords: [
    "about Fluxora Studio",
    "creative marketing studio",
    "remote marketing agency",
    "brand studio team",
    "full service marketing",
  ],
  ...canonical("/about"),
};

const stats = [
  { to: 50, suffix: "+", label: "Brands grown" },
  { to: 8, suffix: "", label: "Disciplines" },
  { to: 4, suffix: "+", label: "Years building" },
  { to: 3, suffix: "×", label: "Avg. traffic lift" },
];

const disciplines = [
  "Brand Strategy",
  "Web Design & Dev",
  "Social Media",
  "Video Production",
  "Content Creation",
  "Paid Social",
  "SEO & Growth",
  "Email & Lifecycle",
  "Art Direction",
  "Copywriting",
];

const values = [
  {
    title: "Craft over templates",
    body: "Everything we ship is made to a high bar — bespoke, considered and unmistakably yours. No cookie-cutter work, ever.",
  },
  {
    title: "One team, every channel",
    body: "Site, social, video and brand under one roof, so your marketing actually moves in sync instead of in silos.",
  },
  {
    title: "Built for momentum",
    body: "We don't do one-off deliverables and disappear. We design systems that compound — month over month, year over year.",
  },
  {
    title: "Honest & focused",
    body: "We say no to work that doesn't serve you so we can go all-in on what does. Strategy first, always.",
  },
];

const approach = [
  {
    n: "01",
    t: "Understand",
    d: "We dig into your business, audience and goals before touching a brief. No assumptions — we ask the right questions and listen hard.",
  },
  {
    n: "02",
    t: "Create",
    d: "Senior creatives and strategists build the work — not juniors, not templates. Everything is bespoke, intentional and made to last.",
  },
  {
    n: "03",
    t: "Launch & compound",
    d: "We move fast, ship clean and stay close through launch and beyond — iterating and optimising until the work performs.",
  },
];

const glance = [
  { k: "Remote-first", v: "Working with clients worldwide, across time zones and industries." },
  { k: "Senior team", v: "You work with the people doing the work — no account-manager runaround." },
  { k: "8 disciplines", v: "Brand, web, social, video, content, paid, SEO and email under one roof." },
];

const faqs: FaqItem[] = [
  {
    q: "Where is Fluxora Studio based?",
    a: "We're a remote-first studio working with clients worldwide. That keeps us lean and lets us hand-pick the right people for each project, wherever they are.",
  },
  {
    q: "How big is the team?",
    a: "A tight senior core, plus a trusted network of specialists — editors, designers, strategists — we bring in per project so you always get the right expertise.",
  },
  {
    q: "What's it like to work with you?",
    a: "Direct, fast and collaborative. You talk to the people doing the work, get regular check-ins, and never get lost in layers of account management.",
  },
  {
    q: "Do you work with small businesses or only big brands?",
    a: "Both. We've helped solo founders and personal brands as well as established companies — the work scales to your stage and budget.",
  },
  {
    q: "What don't you do?",
    a: "Google Ads. We'd rather point you to a specialist than do it half-heartedly. Everything else marketing-related, we've got you.",
  },
];

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Fluxora Studio",
  url: `${SITE_URL}/about`,
  description:
    "Fluxora Studio is a remote-first creative marketing studio building brands, content and momentum.",
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={[aboutSchema, faqSchema(faqs)]} />

      <PageHero
        label="About"
        title="We make brands move"
        intro="Fluxora Studio is a creative marketing studio. We combine strategy, design and production to build brands, content and momentum for ambitious companies who want to stand out and stay there."
      />

      {/* Animated stats band */}
      <section className="bg-ink py-10 text-bone md:py-12">
        <div className="max-w-site container-px grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-bone/10 bg-bone/10 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i} as="div">
              <div className="h-full bg-ink p-8 md:p-10">
                <p className="font-display text-5xl font-semibold tracking-tight md:text-6xl">
                  <Counter to={s.to} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-bone/50">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Disciplines marquee */}
      <div className="overflow-hidden border-y border-ink/10 bg-ink py-4 text-bone">
        <Marquee
          items={disciplines}
          speed={22}
          className="font-display text-sm uppercase tracking-[0.18em] text-bone/60"
        />
      </div>

      {/* Story */}
      <section className="bg-ink py-12 text-bone md:py-20">
        <div className="max-w-site container-px grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <h2 className="font-display text-3xl font-medium uppercase leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
            <RevealText text="Strategy, design and motion in one place — built to turn attention into growth." />
          </h2>
          <Reveal delay={1}>
            <div className="flex h-full flex-col justify-end gap-4 text-bone/60">
              <p>
                Most brands juggle a web person, a social person, a video person and a designer
                who never talk to each other. The result is marketing that looks stitched
                together — because it is.
              </p>
              <p>
                Fluxora exists to fix that. One studio, one direction, every channel pulling the
                same way. We obsess over craft, move fast, and treat your growth like our own.
              </p>
              <p>
                From the first brand touchpoint to the thousandth social post, everything we make
                is built to compound — getting stronger and more recognisable over time.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-site container-px py-12 md:py-20">
        <Reveal>
          <p className="chip text-ink/50">What we believe</p>
          <h2 className="mt-6 max-w-2xl font-display font-semibold uppercase text-display">
            Principles we work by
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i} as="div">
              <div className="group h-full bg-bone p-8 transition-colors duration-500 hover:bg-ink md:p-12">
                <h3 className="font-display text-2xl font-medium uppercase tracking-tight transition-colors duration-500 group-hover:text-bone">
                  {v.title}
                </h3>
                <p className="mt-4 text-ink/65 transition-colors duration-500 group-hover:text-bone/60">
                  {v.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Our approach */}
      <section className="bg-ink py-12 text-bone md:py-20">
        <div className="max-w-site container-px">
          <Reveal>
            <p className="chip text-bone/50">How we work</p>
            <h2 className="mt-6 max-w-2xl font-display font-semibold uppercase text-display">
              Our approach
            </h2>
          </Reveal>
          <div className="mt-10">
            {approach.map((step, i) => (
              <Reveal key={step.n} delay={i} as="div">
                <div className="grid gap-4 border-b border-bone/10 py-8 md:grid-cols-[80px_1fr_1.8fr] md:gap-12 md:py-10">
                  <span className="font-display text-lg font-medium text-bone/25">{step.n}</span>
                  <h3 className="font-display text-2xl font-medium uppercase tracking-tight md:text-3xl">
                    {step.t}
                  </h3>
                  <p className="text-bone/60 md:text-lg">{step.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Studio at a glance */}
      <section className="max-w-site container-px py-12 md:py-20">
        <Reveal>
          <p className="chip text-ink/50">Studio at a glance</p>
        </Reveal>
        <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 md:grid-cols-3">
          {glance.map((g, i) => (
            <Reveal key={g.k} delay={i} as="div">
              <div className="group h-full bg-bone p-8 transition-colors duration-500 hover:bg-ink">
                <h3 className="font-display text-2xl font-medium uppercase tracking-tight transition-colors duration-500 group-hover:text-bone">
                  {g.k}
                </h3>
                <p className="mt-3 text-ink/60 transition-colors duration-500 group-hover:text-bone/60">
                  {g.v}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Faq items={faqs} eyebrow="About FAQ" title="Getting to know us" />

      <EndCTA
        eyebrow="Say hello"
        title="Think we'd be a good fit?"
        sub="We'd love to hear what you're building. Let's talk."
      />
    </>
  );
}
