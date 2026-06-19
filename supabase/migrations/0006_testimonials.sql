-- ============================================================
-- 0006_testimonials.sql
-- Add testimonials JSONB column to site_settings.
-- Each entry: { quote, name, role, company? }
-- ============================================================

alter table public.site_settings
  add column if not exists testimonials jsonb not null default '[]'::jsonb;
