/**
 * Lightweight admin auth: username + password checked against env vars,
 * with an HMAC-signed, http-only session cookie. Works in both the Edge
 * middleware and Node route handlers (uses Web Crypto only).
 */

export const ADMIN_COOKIE = "fx_admin";
const MAX_AGE_DAYS = 30;

const encoder = new TextEncoder();

function getSecret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.ADMIN_PASSWORD ||
    "fluxora-dev-secret-change-me"
  );
}

function b64url(bytes: ArrayBuffer): string {
  const arr = new Uint8Array(bytes);
  let s = "";
  for (const b of arr) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function hmac(message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return b64url(sig);
}

/** Constant-time-ish string comparison. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function createSessionToken(): Promise<string> {
  const exp = Date.now() + MAX_AGE_DAYS * 86_400_000;
  const sig = await hmac(String(exp));
  return `${exp}.${sig}`;
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const [expStr, sig] = token.split(".");
  if (!expStr || !sig) return false;
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp < Date.now()) return false;
  const expected = await hmac(expStr);
  return safeEqual(expected, sig);
}

export function checkCredentials(username: string, password: string): boolean {
  const u = process.env.ADMIN_USERNAME;
  const p = process.env.ADMIN_PASSWORD;
  if (!u || !p) return false;
  return safeEqual(username, u) && safeEqual(password, p);
}

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: MAX_AGE_DAYS * 86_400,
};
