/**
 * Server-side Cloudflare Turnstile verification.
 * Secret key lives ONLY in the TURNSTILE_SECRET_KEY env var — never in code.
 */

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export function isTurnstileConfigured(): boolean {
  return Boolean(process.env.TURNSTILE_SECRET_KEY);
}

export async function verifyTurnstile(
  token: string | undefined,
  ip?: string | null
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  // If no secret is configured (e.g. local dev), don't block submissions.
  if (!secret) return true;
  if (!token) return false;

  const body = new URLSearchParams();
  body.append("secret", secret);
  body.append("response", token);
  if (ip) body.append("remoteip", ip);

  try {
    const res = await fetch(VERIFY_URL, { method: "POST", body });
    const data = (await res.json()) as { success?: boolean };
    return Boolean(data.success);
  } catch {
    return false;
  }
}

/** Best-effort client IP from common proxy headers. */
export function getClientIp(req: Request): string | null {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("cf-connecting-ip") || null;
}
