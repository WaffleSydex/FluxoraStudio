import { createAdminClient } from "@/lib/supabase/admin";
import { createPublicClient, hasSupabaseEnv } from "@/lib/supabase/public";
export type { BlogPost } from "./blog-types";
export { generateSlug, formatDate } from "./blog-types";
import type { BlogPost } from "./blog-types";

export async function getPublishedPosts(): Promise<BlogPost[]> {
  if (!hasSupabaseEnv()) return [];
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });
  return (data ?? []) as BlogPost[];
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!hasSupabaseEnv()) return null;
  const supabase = createPublicClient();
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
