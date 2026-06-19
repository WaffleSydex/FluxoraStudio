import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the service-role key. Bypasses RLS, so it
 * must NEVER be imported into client components. Used by /api/admin/* routes
 * after the admin session cookie has been verified.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}

export function hasServiceRole(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

export const PORTFOLIO_BUCKET = "portfolio-media";
