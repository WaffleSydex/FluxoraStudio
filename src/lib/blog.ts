import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  thumbnail_url: string | null;
  category: string;
  seo_title: string | null;
  seo_description: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });
  return (data ?? []) as BlogPost[];
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  return (data as BlogPost | null) ?? null;
}

export async function getAllPostsAdmin(): Promise<BlogPost[]> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });
  return (data ?? []) as BlogPost[];
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
