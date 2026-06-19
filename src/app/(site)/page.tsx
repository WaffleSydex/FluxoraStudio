import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import Manifesto from "@/components/home/Manifesto";
import ServicesPreview from "@/components/home/ServicesPreview";
import FeaturedWork from "@/components/home/FeaturedWork";
import Clients from "@/components/home/Clients";
import Process from "@/components/home/Process";
import Stats from "@/components/home/Stats";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";
import Marquee from "@/components/ui/Marquee";
import Faq from "@/components/ui/Faq";
import JsonLd from "@/components/ui/JsonLd";
import { canonical, faqSchema, organizationSchema, websiteSchema, type FaqItem } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/"),
};

const faqs: FaqItem[] = [
  {
    q: "What does Fluxora Studio do?",
    a: "We're a creative marketing studio. We build brands, websites, social media, video and content — and run the campaigns that grow them — all from one team.",
  },
  {
    q: "Which marketing services do you offer?",
    a: "Web design & development, Instagram & social media marketing, video editing & production, branding, content creation, paid social ads (Meta & TikTok), SEO and email marketing.",
  },
  {
    q: "Do you run Google Ads?",
    a: "No. We focus on every other channel so we can go deeper on the work that builds lasting brands — organic social, paid social, SEO, content, video, web and branding.",
  },
  {
    q: "Who do you work with?",
    a: "Ambitious brands of all sizes — from founders and creators to established companies — across industries, worldwide. We're remote-first.",
  },
  {
    q: "How do I get started?",
    a: "Head to the contact page and tell us what you need. We'll reply within one business day with next steps.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={[organizationSchema, websiteSchema, faqSchema(faqs)]} />

      <Hero />

      <div className="bg-ink py-4 text-bone">
        <Marquee
          items={[
            "Web Design",
            "Instagram Marketing",
            "Video Editing",
            "Branding",
            "Content",
            "Paid Social",
            "SEO",
            "Email",
          ]}
          className="text-sm uppercase tracking-[0.25em] text-bone/70"
          speed={40}
        />
      </div>

      <Manifesto />
      <ServicesPreview />
      <FeaturedWork />
      <Clients />
      <Process />
      <Stats />
      <Testimonials />
      <Faq items={faqs} eyebrow="FAQ" title="Questions, answered" />
      <CTA />
    </>
  );
}
