import { createClient } from "@supabase/supabase-js";

/**
 * Cookie-free anon Supabase client. Safe to use at build time
 * (generateStaticParams, static rendering) where there is no request scope,
 * unlike the cookie-based server client. Only reads public data (RLS applies).
 */
export function createPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}

export function hasSupabaseEnv(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
