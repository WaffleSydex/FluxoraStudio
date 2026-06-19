// Turnstile is opt-in: only enabled when NEXT_PUBLIC_TURNSTILE_SITE_KEY is
// explicitly set. Without it the widget is hidden and the server skips
// verification (server-side turnstile.ts already no-ops when TURNSTILE_SECRET_KEY is absent).
export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

export const TURNSTILE_ENABLED = Boolean(TURNSTILE_SITE_KEY);
