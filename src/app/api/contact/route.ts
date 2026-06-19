import { NextResponse } from "next/server";
import { Resend } from "resend";
import { verifyTurnstile, getClientIp } from "@/lib/turnstile";

/**
 * Contact form handler. Sends the enquiry via Resend to info@fluxorastudio.com.
 *
 * Requires env vars (see SETUP.md):
 *   RESEND_API_KEY      — from https://resend.com/api-keys
 *   CONTACT_TO_EMAIL    — defaults to info@fluxorastudio.com
 *   CONTACT_FROM_EMAIL  — a verified sender on your Resend domain, e.g.
 *                         "Fluxora Studio <noreply@fluxorastudio.com>"
 *                         (until your domain is verified you can use
 *                          "Fluxora Studio <onboarding@resend.dev>")
 */
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));

  // Honeypot — silently accept bots without sending.
  if (body.company) return NextResponse.json({ ok: true });

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const service = String(body.service ?? "").trim();
  const budget = String(body.budget ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Please fill in your name, email and message." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  // Cloudflare Turnstile (anti-spam). No-op if TURNSTILE_SECRET_KEY isn't set.
  const human = await verifyTurnstile(body.turnstileToken, getClientIp(req));
  if (!human) {
    return NextResponse.json({ error: "Verification failed. Please try again." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email is not configured yet. Please email us directly." },
      { status: 503 }
    );
  }

  const to = process.env.CONTACT_TO_EMAIL || "info@fluxorastudio.com";
  const from = process.env.CONTACT_FROM_EMAIL || "Fluxora Studio <onboarding@resend.dev>";

  const html = `
    <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#0a0a0a">
      <h2 style="margin:0 0 16px">New project enquiry</h2>
      <table style="border-collapse:collapse">
        <tr><td style="padding:4px 16px 4px 0;color:#666">Name</td><td>${escapeHtml(name)}</td></tr>
        <tr><td style="padding:4px 16px 4px 0;color:#666">Email</td><td>${escapeHtml(email)}</td></tr>
        <tr><td style="padding:4px 16px 4px 0;color:#666">Service</td><td>${escapeHtml(service)}</td></tr>
        ${budget ? `<tr><td style="padding:4px 16px 4px 0;color:#666">Budget</td><td>${escapeHtml(budget)}</td></tr>` : ""}
      </table>
      <p style="margin-top:20px;white-space:pre-wrap">${escapeHtml(message)}</p>
    </div>
  `;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New enquiry${service ? ` — ${service}` : ""} (${name})`,
      html,
    });
    if (error) {
      return NextResponse.json({ error: "Could not send your message. Try again later." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not send your message. Try again later." }, { status: 502 });
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
