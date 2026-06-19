import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-guard";
import { createAdminClient, hasServiceRole } from "@/lib/supabase/admin";
import type { SocialLink, Testimonial } from "@/lib/types";

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasServiceRole()) {
    return NextResponse.json(
      { error: "SUPABASE_SERVICE_ROLE_KEY is not configured." },
      { status: 500 }
    );
  }

  const body = await req.json().catch(() => ({}));

  const socials: SocialLink[] = Array.isArray(body.socials)
    ? body.socials
        .filter((s: SocialLink) => s && typeof s.url === "string" && s.url.trim() !== "")
        .map((s: SocialLink) => ({ platform: String(s.platform || "").trim(), url: String(s.url).trim() }))
    : [];

  const testimonials: Testimonial[] = Array.isArray(body.testimonials)
    ? body.testimonials
        .filter((t: Testimonial) => t && typeof t.quote === "string" && t.quote.trim() !== "")
        .map((t: Testimonial) => ({
          quote: String(t.quote).trim(),
          name: String(t.name ?? "").trim(),
          role: String(t.role ?? "").trim(),
          company: t.company ? String(t.company).trim() : undefined,
        }))
    : [];

  const payload = {
    id: 1,
    company_name: String(body.company_name ?? "Fluxora Studio"),
    tagline: String(body.tagline ?? ""),
    footer_blurb: String(body.footer_blurb ?? ""),
    contact_email: String(body.contact_email ?? ""),
    contact_address: String(body.contact_address ?? ""),
    socials,
    testimonials,
  };

  const supabase = createAdminClient();
  const { error } = await supabase.from("site_settings").upsert(payload, { onConflict: "id" });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
