import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import Faq from "@/components/ui/Faq";
import EndCTA from "@/components/layout/EndCTA";
import JsonLd from "@/components/ui/JsonLd";
import { faqSchema, canonical, SITE_URL, type FaqItem } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Fluxora Studio — Creative Marketing Studio",
  description:
    "Fluxora Studio is a remote-first creative marketing studio. Meet the team that combines strategy, design and production to build brands, content and momentum for ambitious companies.",
  keywords: [
    "about Fluxora Studio",
    "creative marketing studio",
    "marketing team",
    "brand studio",
    "remote marketing agency",
  ],
  ...canonical("/about"),
};

const glance = [
  { k: "Remote-first", v: "Working with clients worldwide, across time zones." },
  { k: "Senior team", v: "You work with the people doing the work — no account-manager runaround." },
  { k: "8 disciplines", v: "Brand, web, social, video, content, paid, SEO and email under one roof." },
];

const values = [
  {
    title: "Craft over templates",
    body: "Everything we ship is made to a high bar — bespoke, considered and unmistakably yours. No cookie-cutter work.",
  },
  {
    title: "One team, every channel",
    body: "Site, social, video and brand under one roof, so your marketing actually moves in sync instead of in silos.",
  },
  {
    title: "Built for momentum",
    body: "We don't do one-off deliverables and disappear. We design systems that compound — month over month.",
  },
  {
    title: "Honest & focused",
    body: "We say no to the work that doesn't serve you (yes, even Google Ads) so we can go all-in on what does.",
  },
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
        intro="Fluxora Studio is a creative marketing studio. We combine strategy, design and production to build brands, content and momentum — for ambitious companies who want to stand out and stay there."
      />

      {/* Story */}
      <section className="bg-ink py-16 text-bone md:py-24">
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
            </div>
          </Reveal>
        </div>
      </section>

      {/* Studio at a glance */}
      <section className="max-w-site container-px py-16 md:py-24">
        <Reveal>
          <p className="chip text-ink/50">Studio at a glance</p>
        </Reveal>
        <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-ink/10 bg-ink/10 md:grid-cols-3">
          {glance.map((g, i) => (
            <Reveal key={g.k} delay={i} as="div">
              <div className="h-full bg-bone p-8">
                <h3 className="font-display text-2xl font-medium uppercase tracking-tight">{g.k}</h3>
                <p className="mt-3 text-ink/60">{g.v}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="max-w-site container-px pb-16 md:pb-24">
        <Reveal>
          <p className="chip text-ink/50">What we believe</p>
          <h2 className="mt-6 max-w-2xl font-display font-semibold uppercase text-display">
            Principles we work by
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-ink/10 bg-ink/10 sm:grid-cols-2">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i} as="div">
              <div className="h-full bg-bone p-8 md:p-12">
                <h3 className="font-display text-2xl font-medium uppercase tracking-tight">{v.title}</h3>
                <p className="mt-4 text-ink/65">{v.body}</p>
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
