import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-guard";
import { createAdminClient, hasServiceRole, PORTFOLIO_BUCKET } from "@/lib/supabase/admin";

const ALLOWED_FOLDERS = ["images", "videos", "thumbnails"];

/**
 * Returns a short-lived signed upload URL so the browser can upload large
 * files (e.g. videos) directly to Supabase Storage — bypassing serverless
 * request-size limits.
 */
export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasServiceRole())
    return NextResponse.json({ error: "SUPABASE_SERVICE_ROLE_KEY is not configured." }, { status: 500 });

  const body = await req.json().catch(() => ({}));
  const folder = ALLOWED_FOLDERS.includes(body.folder) ? body.folder : "images";
  const ext = String(body.ext ?? "bin").replace(/[^a-z0-9]/gi, "").slice(0, 8) || "bin";
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;

  const supabase = createAdminClient();
  const { data, error } = await supabase.storage.from(PORTFOLIO_BUCKET).createSignedUploadUrl(path);
  if (error || !data) {
    return NextResponse.json({ error: error?.message ?? "Could not create upload URL." }, { status: 500 });
  }

  const publicUrl = supabase.storage.from(PORTFOLIO_BUCKET).getPublicUrl(path).data.publicUrl;

  return NextResponse.json({ path: data.path, token: data.token, publicUrl });
}
