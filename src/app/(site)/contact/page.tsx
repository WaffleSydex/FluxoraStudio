import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import { getSettings } from "@/lib/data";
import ContactForm from "@/components/contact/ContactForm";
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
  { n: "01", t: "You reach out", d: "Send the form with a few lines about your business and what you need. The more context, the better." },
  { n: "02", t: "We reply fast", d: "Within one business day — usually with a couple of clarifying questions or a quick call invite." },
  { n: "03", t: "We scope it", d: "You get a clear plan, timeline and quote — no jargon, no surprises, no hidden fees." },
  { n: "04", t: "We get to work", d: "Kickoff, then steady progress with regular check-ins and updates until it's live and performing." },
];

const goodFit = [
  "You want senior people doing the work, not juniors",
  "You need more than one channel covered — web, social, video, ads",
  "You're tired of stitching together different freelancers",
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
    a: "A sentence or two about your business, what you're looking for, a rough timeline, and a budget range if you have one. The more context, the better our first reply.",
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

      <PageHero
        label="Contact"
        title="Start a project"
        intro="Tell us what you're building. Fill in the form or reach out directly — we reply within one business day and get straight to the point."
      />

      {/* Good fit checklist */}
      <section className="bg-ink py-10 text-bone md:py-14">
        <div className="max-w-site container-px grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <Reveal>
            <p className="chip text-bone/50">Is this for you?</p>
            <h2 className="mt-6 font-display text-3xl font-semibold uppercase leading-tight tracking-tight md:text-4xl">
              You&apos;re in the right place if&hellip;
            </h2>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {goodFit.map((item, i) => (
              <Reveal key={item} delay={i} as="div">
                <div className="flex items-start gap-3 rounded-xl border border-bone/10 p-4">
                  <span className="mt-0.5 text-accent-400">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                      <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-sm text-bone/75">{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Form + sidebar */}
      <section className="max-w-site container-px py-12 md:py-20">
        <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={1}>
            <aside className="space-y-10 lg:border-l lg:border-ink/10 lg:pl-16">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-ink/40">Email us directly</p>
                <a
                  href={`mailto:${settings.contact_email}`}
                  className="link-underline mt-2 block font-display text-xl"
                >
                  {settings.contact_email}
                </a>
              </div>

              {settings.contact_address && (
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-ink/40">Where we work</p>
                  <p className="mt-2 font-display text-xl">{settings.contact_address}</p>
                </div>
              )}

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-ink/40">Response time</p>
                <p className="mt-2 font-display text-xl">Within 1 business day</p>
              </div>

              {settings.socials.length > 0 && (
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-ink/40">Follow our work</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {settings.socials.map((s) => (
                      <a
                        key={s.platform + s.url}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.platform}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 text-ink/70 transition-colors hover:border-ink hover:bg-ink hover:text-bone"
                      >
                        <SocialIcon platform={s.platform} />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </Reveal>
        </div>
      </section>

      {/* What happens next */}
      <section className="bg-ink py-12 text-bone md:py-20">
        <div className="max-w-site container-px">
          <Reveal>
            <p className="chip text-bone/50">What happens next</p>
            <h2 className="mt-6 max-w-2xl font-display font-semibold uppercase text-display">
              From hello to launch
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-bone/10 bg-bone/10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i} as="div">
                <div className="h-full bg-ink p-8">
                  <span className="font-display text-4xl font-semibold text-bone/15">{s.n}</span>
                  <h3 className="mt-6 font-display text-xl font-medium uppercase tracking-tight">{s.t}</h3>
                  <p className="mt-3 text-bone/60">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Faq items={faqs} eyebrow="Contact FAQ" title="Before you reach out" />
    </>
  );
}
