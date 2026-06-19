import { createClient, hasSupabaseEnv } from "@/lib/supabase/server";
import { DEFAULT_SETTINGS, type PortfolioItem, type SiteSettings } from "@/lib/types";

/**
 * Fetch editable site settings. Falls back to sensible defaults so the site
 * renders even before Supabase is configured or seeded.
 */
export async function getSettings(): Promise<SiteSettings> {
  if (!hasSupabaseEnv()) return DEFAULT_SETTINGS;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle();

    if (error || !data) return DEFAULT_SETTINGS;

    return {
      ...DEFAULT_SETTINGS,
      ...data,
      socials: Array.isArray(data.socials) ? data.socials : DEFAULT_SETTINGS.socials,
    } as SiteSettings;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function getPortfolio(): Promise<PortfolioItem[]> {
  if (!hasSupabaseEnv()) return [];

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("portfolio_items")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error || !data) return [];
    return data as PortfolioItem[];
  } catch {
    return [];
  }
}

export async function getFeaturedPortfolio(limit = 4): Promise<PortfolioItem[]> {
  const all = await getPortfolio();
  const featured = all.filter((p) => p.featured);
  return (featured.length ? featured : all).slice(0, limit);
}
