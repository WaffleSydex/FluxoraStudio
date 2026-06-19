// Public Turnstile site key (safe to expose to the browser).
// Override via NEXT_PUBLIC_TURNSTILE_SITE_KEY; falls back to the project's key.
export const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "0x4AAAAAADn16_5KwKyWuIQc";

export const TURNSTILE_ENABLED = Boolean(TURNSTILE_SITE_KEY);
