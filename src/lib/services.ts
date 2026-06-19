export interface Service {
  num: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
}

/** Every marketing service Fluxora offers — deliberately excludes Google Ads. */
export const SERVICES: Service[] = [
  {
    num: "01",
    title: "Web Design & Development",
    tagline: "Sites that convert",
    description:
      "Custom, fast, motion-rich websites and landing pages built to convert. From one-page launches to full marketing sites and headless storefronts.",
    deliverables: ["Design & UX", "Next.js builds", "Landing pages", "E-commerce", "CMS & maintenance"],
  },
  {
    num: "02",
    title: "Instagram & Social Marketing",
    tagline: "Grow your audience",
    description:
      "Always-on social strategy and management across Instagram, TikTok and more — content calendars, community, and growth that compounds.",
    deliverables: ["Strategy", "Content calendars", "Community management", "Growth", "Analytics"],
  },
  {
    num: "03",
    title: "Video Editing & Production",
    tagline: "Stories that move",
    description:
      "Short-form reels, long-form, brand films and ad creative — shot, edited, color graded and cut down for every platform.",
    deliverables: ["Reels & shorts", "Brand films", "Ad creative", "Color & sound", "Motion graphics"],
  },
  {
    num: "04",
    title: "Branding & Identity",
    tagline: "Brands with character",
    description:
      "Naming, logo systems, visual identity and brand guidelines that make you unmistakable and built to scale across every channel.",
    deliverables: ["Logo & identity", "Brand guidelines", "Visual systems", "Naming", "Art direction"],
  },
  {
    num: "05",
    title: "Content Creation",
    tagline: "Always something to post",
    description:
      "Photography, copywriting and design that fuels your channels — a steady engine of on-brand content, never scrambling for ideas.",
    deliverables: ["Photography", "Copywriting", "Graphic design", "Content systems", "Campaigns"],
  },
  {
    num: "06",
    title: "Paid Social Ads",
    tagline: "Spend that performs",
    description:
      "Meta, Instagram and TikTok ad campaigns — creative, targeting, testing and optimization that turns budget into measurable results.",
    deliverables: ["Meta & IG ads", "TikTok ads", "Creative testing", "Funnels", "Reporting"],
  },
  {
    num: "07",
    title: "SEO & Organic Growth",
    tagline: "Get found",
    description:
      "Technical SEO, content strategy and on-page optimization that grows non-brand organic traffic and compounds over time.",
    deliverables: ["Technical SEO", "Content strategy", "On-page", "Keyword mapping", "Reporting"],
  },
  {
    num: "08",
    title: "Email & Lifecycle",
    tagline: "Own your audience",
    description:
      "Newsletters, automations and lifecycle flows that nurture leads and turn one-time buyers into repeat customers.",
    deliverables: ["Newsletters", "Automations", "Flows", "Design", "List growth"],
  },
];
