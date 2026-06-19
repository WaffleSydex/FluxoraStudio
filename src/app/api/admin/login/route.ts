import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  checkCredentials,
  cookieOptions,
  createSessionToken,
} from "@/lib/admin-auth";
import { verifyTurnstile, getClientIp } from "@/lib/turnstile";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const username = String(body.username ?? "");
  const password = String(body.password ?? "");

  if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Admin credentials are not configured on the server." },
      { status: 500 }
    );
  }

  // Cloudflare Turnstile — no-op if TURNSTILE_SECRET_KEY isn't set.
  const human = await verifyTurnstile(body.turnstileToken, getClientIp(req));
  if (!human) {
    return NextResponse.json({ error: "Verification failed. Please try again." }, { status: 400 });
  }

  if (!checkCredentials(username, password)) {
    return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
  }

  const token = await createSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, cookieOptions);
  return res;
}
