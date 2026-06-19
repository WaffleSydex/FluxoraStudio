export type MediaType = "image" | "video_upload" | "video_link";

export interface SocialLink {
  platform: string;
  url: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company?: string;
}

export interface SiteSettings {
  id: number;
  company_name: string;
  tagline: string;
  footer_blurb: string;
  contact_email: string;
  contact_address: string;
  socials: SocialLink[];
  testimonials: Testimonial[];
  updated_at: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  description: string;
  category: string;
  media_type: MediaType;
  media_url: string;
  thumbnail_url: string | null;
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export const PORTFOLIO_CATEGORIES = [
  "Web",
  "Social",
  "Video",
  "Branding",
  "Content",
  "SEO",
  "Email",
  "Ads",
] as const;

export const DEFAULT_SETTINGS: SiteSettings = {
  id: 1,
  company_name: "Fluxora Studio",
  tagline: "Marketing in motion.",
  footer_blurb:
    "A creative marketing studio building brands, content and momentum. Websites, social, video and everything in between.",
  contact_email: "info@fluxorastudio.com",
  contact_address: "Remote / Worldwide",
  socials: [
    { platform: "instagram", url: "https://instagram.com/fluxorastudio" },
    { platform: "tiktok", url: "https://tiktok.com/@fluxorastudio" },
    { platform: "youtube", url: "https://youtube.com/@fluxorastudio" },
    { platform: "linkedin", url: "https://linkedin.com/company/fluxorastudio" },
    { platform: "x", url: "https://x.com/fluxorastudio" },
  ],
  testimonials: [
    {
      quote: "Fluxora rebuilt our site and ran our social in one go. Leads doubled in a quarter and we finally look the part.",
      name: "Maya R.",
      role: "Founder",
      company: "Atlas Co.",
    },
    {
      quote: "Their video team is unreal. The reels they cut for us outperformed everything we'd ever posted.",
      name: "Daniel K.",
      role: "Head of Brand",
      company: "Pulse",
    },
    {
      quote: "One studio for brand, web and content. No more juggling five freelancers — and the work is sharper.",
      name: "Lena T.",
      role: "CMO",
      company: "Drift",
    },
  ],
  updated_at: new Date(0).toISOString(),
};
