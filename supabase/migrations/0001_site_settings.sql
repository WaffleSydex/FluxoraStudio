-- ============================================================
-- 0001_site_settings.sql
-- Singleton table holding editable footer / contact / social content.
-- Exactly one row (id = 1) is ever stored.
-- ============================================================

create table if not exists public.site_settings (
  id            smallint primary key default 1,
  company_name  text        not null default 'Fluxora Studio',
  tagline       text        not null default 'Marketing in motion.',
  footer_blurb  text        not null default '',
  contact_email text        not null default 'info@fluxorastudio.com',
  contact_phone text        not null default '',
  contact_address text      not null default '',
  -- socials is an array of objects: [{ "platform": "instagram", "url": "https://..." }, ...]
  socials       jsonb       not null default '[]'::jsonb,
  updated_at    timestamptz not null default now(),
  -- guarantee a single row
  constraint site_settings_singleton check (id = 1)
);

comment on table public.site_settings is 'Editable site-wide content (footer, contact, social links). Single row, id = 1.';

-- Keep updated_at fresh on every write.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_site_settings_updated_at on public.site_settings;
create trigger trg_site_settings_updated_at
  before update on public.site_settings
  for each row execute function public.set_updated_at();
