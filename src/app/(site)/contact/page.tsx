import type { Metadata } from "next";
import { getSettings } from "@/lib/data";
import ContactForm from "@/components/contact/ContactForm";
import ContactHero from "@/components/contact/ContactHero";
import SocialIcon from "@/components/ui/SocialIcon";
import { Reveal } from "@/components/ui/Reveal";
import Faq from "@/components/ui/Faq";
import JsonLd from "@/components/ui/JsonLd";
import { faqSchema, canonical, SITE_URL, type FaqItem } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact Fluxora Studio — Start a Marketing Project",
  description:
    "Ready to grow your brand? Get in touch with Fluxora Studio. Tell us about your website, social, video or branding needs and we'll reply within one business day.",
  keywords: ["contact marketing agency", "hire marketing studio", "start a project", "marketing quote", "fluxora studio contact"],
  ...canonical("/contact"),
};

const steps = [
  { n: "01", t: "You reach out", d: "Send the form or email us. A few lines about your business and what you need is all we need to get started." },
  { n: "02", t: "We reply fast", d: "Within one business day — often sooner. We might ask a couple of clarifying questions or invite you to a quick call." },
  { n: "03", t: "We scope it", d: "You get a clear plan, timeline and quote. No jargon, no surprises, no hidden fees." },
  { n: "04", t: "We get to work", d: "Kickoff, steady progress, regular check-ins — until the work is live and performing." },
];

const goodFit = [
  "You want senior people doing the work, not juniors",
  "You need more than one channel covered",
  "You're tired of stitching together freelancers",
  "You want strategy and execution under one roof",
  "You care about results, not just deliverables",
  "You want a long-term partner, not a one-off vendor",
];

const faqs: FaqItem[] = [
  {
    q: "How soon will you reply?",
    a: "Within one business day, and usually sooner. If it's urgent, say so in your message and we'll prioritise it.",
  },
  {
    q: "What should I include in my message?",
    a: "A sentence or two about your business, what you're looking for, a rough timeline, and a budget range if you have one.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes — we're remote-first and work with clients worldwide across time zones.",
  },
  {
    q: "Is there a minimum budget?",
    a: "Most projects start in the low four figures and retainers vary by scope. Tell us your range and we'll be upfront about whether we're the right fit.",
  },
  {
    q: "Do you offer Google Ads?",
    a: "No — that's the one channel we don't run. Everything else (Meta & TikTok ads, social, SEO, content, video, web and branding) we do.",
  },
];

export default async function ContactPage() {
  const settings = await getSettings();

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Fluxora Studio",
    url: `${SITE_URL}/contact`,
    description: "Get in touch with Fluxora Studio to start a marketing project.",
  };

  return (
    <>
      <JsonLd data={[contactSchema, faqSchema(faqs)]} />

      <ContactHero email={settings.contact_email} />

      {/* Form + sidebar — split panel */}
      <section className="bg-ink text-bone">
        <div className="max-w-site container-px grid lg:grid-cols-[1fr_1.5fr]">
          {/* Left: contact info + good fit */}
          <div className="border-b border-bone/10 py-12 md:py-16 lg:border-b-0 lg:border-r lg:pr-14">
            <Reveal>
              <p className="chip text-bone/50">Who this is for</p>
              <h2 className="mt-6 font-display text-2xl font-semibold uppercase leading-tight tracking-tight md:text-3xl">
                You&apos;re in the right place if&hellip;
              </h2>
            </Reveal>
            <ul className="mt-8 space-y-3">
              {goodFit.map((item, i) => (
                <Reveal key={item} delay={i} as="li">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 shrink-0 text-accent-400">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                        <path d="M2 7l3.5 3.5L12 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="text-sm text-bone/70">{item}</span>
                  </div>
                </Reveal>
              ))}
            </ul>

            <div className="mt-12 space-y-8 border-t border-bone/10 pt-10">
              <Reveal>
                <p className="text-xs uppercase tracking-[0.2em] text-bone/40">Response time</p>
                <p className="mt-2 font-display text-2xl">Within 1 business day</p>
              </Reveal>
              <Reveal delay={1}>
                <p className="text-xs uppercase tracking-[0.2em] text-bone/40">Email us directly</p>
                <a
                  href={`mailto:${settings.contact_email}`}
                  className="link-underline mt-2 block font-display text-xl"
                >
                  {settings.contact_email}
                </a>
              </Reveal>
              {settings.contact_address && (
                <Reveal delay={2}>
                  <p className="text-xs uppercase tracking-[0.2em] text-bone/40">Where we work</p>
                  <p className="mt-2 font-display text-xl">{settings.contact_address}</p>
                </Reveal>
              )}
              {settings.socials.filter((s) => s.url?.trim()).length > 0 && (
                <Reveal delay={3}>
                  <p className="text-xs uppercase tracking-[0.2em] text-bone/40">Follow our work</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {settings.socials.filter((s) => s.url?.trim()).map((s) => (
                      <a
                        key={s.platform + s.url}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.platform}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-bone/20 text-bone/60 transition-colors hover:border-bone hover:bg-bone hover:text-ink"
                      >
                        <SocialIcon platform={s.platform} />
                      </a>
                    ))}
                  </div>
                </Reveal>
              )}
            </div>
          </div>

          {/* Right: form */}
          <div className="py-12 md:py-16 lg:pl-14">
            <Reveal>
              <p className="chip text-bone/50">Start a project</p>
              <h2 className="mt-4 font-display text-2xl font-semibold uppercase tracking-tight md:text-3xl">
                Send us a message
              </h2>
              <p className="mt-3 text-sm text-bone/50">
                Fill in a few details and we&apos;ll get back to you with next steps.
              </p>
            </Reveal>
            <div className="mt-8">
              <ContactForm dark />
            </div>
          </div>
        </div>
      </section>

      {/* What happens next */}
      <section className="max-w-site container-px py-12 md:py-20">
        <Reveal>
          <p className="chip text-ink/50">What happens next</p>
          <h2 className="mt-6 max-w-2xl font-display font-semibold uppercase text-display">
            From hello to launch
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i} as="div">
              <div className="group h-full bg-bone p-8 transition-colors duration-500 hover:bg-ink">
                <span className="font-display text-4xl font-semibold text-ink/12 transition-colors duration-500 group-hover:text-bone/15">{s.n}</span>
                <h3 className="mt-6 font-display text-xl font-medium uppercase tracking-tight transition-colors duration-500 group-hover:text-bone">{s.t}</h3>
                <p className="mt-3 text-ink/60 transition-colors duration-500 group-hover:text-bone/60">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Faq items={faqs} eyebrow="Contact FAQ" title="Before you reach out" />
    </>
  );
}
