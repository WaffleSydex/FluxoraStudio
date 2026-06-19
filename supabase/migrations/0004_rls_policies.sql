-- ============================================================
-- 0004_rls_policies.sql
-- Row Level Security: the public can READ content; only a
-- signed-in admin (any authenticated user) can WRITE.
--
-- Because the admin account is created manually and sign-ups are
-- disabled in the Supabase dashboard, "authenticated" == you.
-- ============================================================

-- ---------- site_settings ----------
alter table public.site_settings enable row level security;

drop policy if exists "site_settings public read"   on public.site_settings;
drop policy if exists "site_settings admin write"    on public.site_settings;
drop policy if exists "site_settings admin update"   on public.site_settings;

create policy "site_settings public read"
  on public.site_settings for select
  using (true);

create policy "site_settings admin write"
  on public.site_settings for insert
  to authenticated
  with check (true);

create policy "site_settings admin update"
  on public.site_settings for update
  to authenticated
  using (true)
  with check (true);

-- ---------- portfolio_items ----------
alter table public.portfolio_items enable row level security;

drop policy if exists "portfolio public read"  on public.portfolio_items;
drop policy if exists "portfolio admin insert" on public.portfolio_items;
drop policy if exists "portfolio admin update" on public.portfolio_items;
drop policy if exists "portfolio admin delete" on public.portfolio_items;

create policy "portfolio public read"
  on public.portfolio_items for select
  using (true);

create policy "portfolio admin insert"
  on public.portfolio_items for insert
  to authenticated
  with check (true);

create policy "portfolio admin update"
  on public.portfolio_items for update
  to authenticated
  using (true)
  with check (true);

create policy "portfolio admin delete"
  on public.portfolio_items for delete
  to authenticated
  using (true);

-- ---------- storage.objects (portfolio-media bucket) ----------
drop policy if exists "portfolio media public read"   on storage.objects;
drop policy if exists "portfolio media admin insert"  on storage.objects;
drop policy if exists "portfolio media admin update"  on storage.objects;
drop policy if exists "portfolio media admin delete"  on storage.objects;

create policy "portfolio media public read"
  on storage.objects for select
  using (bucket_id = 'portfolio-media');

create policy "portfolio media admin insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'portfolio-media');

create policy "portfolio media admin update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'portfolio-media')
  with check (bucket_id = 'portfolio-media');

create policy "portfolio media admin delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'portfolio-media');
