create table if not exists public.blog_posts (
  id          uuid         primary key default gen_random_uuid(),
  title       text         not null,
  slug        text         not null unique,
  excerpt     text,
  content     text,
  thumbnail_url text,
  category    text         not null default 'Insights',
  seo_title   text,
  seo_description text,
  published   boolean      not null default false,
  published_at timestamptz,
  created_at  timestamptz  not null default now(),
  updated_at  timestamptz  not null default now()
);

alter table public.blog_posts enable row level security;

-- Public can read published posts only
create policy "Public can read published blog posts"
  on public.blog_posts for select
  using (published = true);

-- Service role can manage all posts (used by admin routes)
create policy "Service role full access to blog_posts"
  on public.blog_posts for all
  using (true)
  with check (true);
