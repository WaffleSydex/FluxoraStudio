-- ============================================================
-- 0003_storage.sql
-- Public storage bucket for portfolio images, video files and
-- thumbnails. Files are uploaded directly from the admin panel.
-- ============================================================

-- Create the bucket (idempotent). 'public = true' makes read URLs public;
-- writes are still gated by the storage RLS policies in 0004.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'portfolio-media',
  'portfolio-media',
  true,
  524288000, -- 500 MB per file
  array[
    'image/png','image/jpeg','image/jpg','image/webp','image/avif','image/gif',
    'video/mp4','video/quicktime','video/webm'
  ]
)
on conflict (id) do update
  set public             = excluded.public,
      file_size_limit    = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;
