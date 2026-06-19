import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-guard";
import { createAdminClient, hasServiceRole } from "@/lib/supabase/admin";

function guard() {
  if (!hasServiceRole())
    return NextResponse.json({ error: "SUPABASE_SERVICE_ROLE_KEY not set." }, { status: 500 });
  return null;
}

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const err = guard();
  if (err) return err;

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ posts: data ?? [] });
}

export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const err = guard();
  if (err) return err;

  const body = await req.json().catch(() => ({}));
  const supabase = createAdminClient();

  const slug = String(body.slug || "").trim();
  if (!slug) return NextResponse.json({ error: "Slug is required." }, { status: 400 });
  if (!body.title) return NextResponse.json({ error: "Title is required." }, { status: 400 });

  const payload = {
    title: String(body.title).trim(),
    slug,
    excerpt: body.excerpt ? String(body.excerpt).trim() : null,
    content: body.content ? String(body.content).trim() : null,
    thumbnail_url: body.thumbnail_url ? String(body.thumbnail_url).trim() : null,
    category: String(body.category || "Insights").trim(),
    seo_title: body.seo_title ? String(body.seo_title).trim() : null,
    seo_description: body.seo_description ? String(body.seo_description).trim() : null,
    published: Boolean(body.published),
    published_at: body.published ? (body.published_at || new Date().toISOString()) : null,
    updated_at: new Date().toISOString(),
  };

  if (body.id) {
    const { error } = await supabase.from("blog_posts").update(payload).eq("id", body.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  }

  const { error } = await supabase.from("blog_posts").insert(payload);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const err = guard();
  if (err) return err;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const supabase = createAdminClient();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
