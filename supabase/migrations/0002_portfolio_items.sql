-- ============================================================
-- 0002_portfolio_items.sql
-- Portfolio / case-study entries. Each item is an image, an
-- uploaded video file, or an embedded video link (YouTube/Vimeo).
-- ============================================================

create table if not exists public.portfolio_items (
  id            uuid primary key default gen_random_uuid(),
  title         text        not null,
  client        text        not null default '',
  description   text        not null default '',
  category      text        not null default 'Web',          -- Web | Social | Video | Branding | Content | SEO | Email | Ads
  media_type    text        not null default 'image'
                  check (media_type in ('image', 'video_upload', 'video_link')),
  media_url     text        not null,                          -- image URL, uploaded video URL, or YouTube/Vimeo link
  thumbnail_url text,                                          -- optional poster image (recommended for videos)
  featured      boolean     not null default false,
  sort_order    integer     not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

comment on table public.portfolio_items is 'Portfolio entries shown on /work. media_type drives how media_url is rendered.';

create index if not exists portfolio_items_sort_idx     on public.portfolio_items (sort_order asc, created_at desc);
create index if not exists portfolio_items_category_idx on public.portfolio_items (category);
create index if not exists portfolio_items_featured_idx on public.portfolio_items (featured) where featured = true;

drop trigger if exists trg_portfolio_items_updated_at on public.portfolio_items;
create trigger trg_portfolio_items_updated_at
  before update on public.portfolio_items
  for each row execute function public.set_updated_at();
