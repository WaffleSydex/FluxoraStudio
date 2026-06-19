import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-guard";
import { createAdminClient, hasServiceRole } from "@/lib/supabase/admin";
import { type MediaType } from "@/lib/types";

const MEDIA_TYPES: MediaType[] = ["image", "video_upload", "video_link"];

function sanitize(body: Record<string, unknown>) {
  const media_type = MEDIA_TYPES.includes(body.media_type as MediaType)
    ? (body.media_type as MediaType)
    : "image";
  return {
    title: String(body.title ?? "").trim(),
    client: String(body.client ?? "").trim(),
    description: String(body.description ?? "").trim(),
    category: String(body.category ?? "Web").trim(),
    media_type,
    media_url: String(body.media_url ?? "").trim(),
    thumbnail_url: body.thumbnail_url ? String(body.thumbnail_url).trim() : null,
    featured: Boolean(body.featured),
    sort_order: Number(body.sort_order) || 0,
  };
}

async function guard() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasServiceRole())
    return NextResponse.json({ error: "SUPABASE_SERVICE_ROLE_KEY is not configured." }, { status: 500 });
  return null;
}

export async function POST(req: Request) {
  const blocked = await guard();
  if (blocked) return blocked;

  const data = sanitize(await req.json().catch(() => ({})));
  if (!data.title) return NextResponse.json({ error: "Title is required." }, { status: 400 });
  if (!data.media_url) return NextResponse.json({ error: "Media is required." }, { status: 400 });

  const supabase = createAdminClient();
  const { error } = await supabase.from("portfolio_items").insert(data);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function PUT(req: Request) {
  const blocked = await guard();
  if (blocked) return blocked;

  const body = await req.json().catch(() => ({}));
  const id = String(body.id ?? "");
  if (!id) return NextResponse.json({ error: "Missing id." }, { status: 400 });

  const data = sanitize(body);
  const supabase = createAdminClient();
  const { error } = await supabase.from("portfolio_items").update(data).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const blocked = await guard();
  if (blocked) return blocked;

  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id." }, { status: 400 });

  const supabase = createAdminClient();
  const { error } = await supabase.from("portfolio_items").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
