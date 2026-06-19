-- ============================================================
-- 0005_seed.sql
-- Initial content so the site renders before you log in and edit.
-- Safe to re-run: uses upsert / guarded inserts.
-- ============================================================

-- Default footer / contact / social content.
insert into public.site_settings (id, company_name, tagline, footer_blurb, contact_email, contact_phone, contact_address, socials)
values (
  1,
  'Fluxora Studio',
  'Marketing in motion.',
  'A creative marketing studio building brands, content and momentum. Websites, social, video and everything in between.',
  'hello@fluxorastudio.com',
  '+1 (000) 000-0000',
  'Remote / Worldwide',
  '[
    {"platform": "instagram", "url": "https://instagram.com/fluxorastudio"},
    {"platform": "tiktok",    "url": "https://tiktok.com/@fluxorastudio"},
    {"platform": "youtube",   "url": "https://youtube.com/@fluxorastudio"},
    {"platform": "linkedin",  "url": "https://linkedin.com/company/fluxorastudio"},
    {"platform": "x",         "url": "https://x.com/fluxorastudio"}
  ]'::jsonb
)
on conflict (id) do nothing;

-- A few sample portfolio items (only if the table is empty).
insert into public.portfolio_items (title, client, description, category, media_type, media_url, thumbnail_url, featured, sort_order)
select * from (values
  ('Neon Atlas Rebrand', 'Atlas Co.', 'Full identity system, motion language and launch campaign for a fintech challenger.', 'Branding', 'image', 'https://images.unsplash.com/photo-1634942537034-2531766767d1?q=80&w=1600&auto=format&fit=crop', null, true, 1),
  ('Pulse Commerce Site', 'Pulse', 'High-converting headless storefront with custom motion and a 2.1s LCP.', 'Web', 'image', 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=1600&auto=format&fit=crop', null, true, 2),
  ('Drift Social Engine', 'Drift', 'Always-on Instagram + TikTok content engine. 4.2M organic views in 90 days.', 'Social', 'image', 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1600&auto=format&fit=crop', null, true, 3),
  ('Voltage Brand Film', 'Voltage', 'Hero brand film and a library of short-form cutdowns for paid + organic.', 'Video', 'video_link', 'https://www.youtube.com/watch?v=ScMzIvxBSi4', 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?q=80&w=1600&auto=format&fit=crop', false, 4),
  ('Harvest Content Series', 'Harvest', 'Editorial content system and photography direction across 6 markets.', 'Content', 'image', 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1600&auto=format&fit=crop', null, false, 5),
  ('Summit SEO Overhaul', 'Summit', 'Technical SEO + content strategy that tripled non-brand organic traffic.', 'SEO', 'image', 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?q=80&w=1600&auto=format&fit=crop', null, false, 6)
) as seed(title, client, description, category, media_type, media_url, thumbnail_url, featured, sort_order)
where not exists (select 1 from public.portfolio_items);
