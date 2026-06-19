import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getPublishedPosts, formatDate } from "@/lib/blog";
import JsonLd from "@/components/ui/JsonLd";
import { canonical, SITE_URL } from "@/lib/seo";

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};

  const title = post.seo_title || `${post.title} | Fluxora Studio Blog`;
  const description =
    post.seo_description ||
    post.excerpt ||
    "Marketing insights from Fluxora Studio.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.published_at || post.created_at,
      ...(post.thumbnail_url ? { images: [{ url: post.thumbnail_url, width: 1200, height: 630, alt: post.title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(post.thumbnail_url ? { images: [post.thumbnail_url] } : {}),
    },
    ...canonical(`/blog/${post.slug}`),
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const date = post.published_at ? formatDate(post.published_at) : formatDate(post.created_at);
  const paragraphs = (post.content ?? "").split(/\n\n+/).filter(Boolean);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seo_description || post.excerpt || "",
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.published_at || post.created_at,
    dateModified: post.updated_at,
    author: { "@type": "Organization", name: "Fluxora Studio", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "Fluxora Studio",
      url: SITE_URL,
    },
    ...(post.thumbnail_url ? { image: post.thumbnail_url } : {}),
  };

  return (
    <>
      <JsonLd data={[articleSchema]} />

      {/* Hero */}
      <section className="max-w-site container-px pt-36 pb-10 md:pt-44 md:pb-14">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-ink/50 transition-colors hover:text-ink"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M10 6H2M6 10L2 6l4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          All posts
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <span className="chip text-ink/50">{post.category}</span>
          <span className="text-xs uppercase tracking-[0.18em] text-ink/40">{date}</span>
        </div>

        <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold uppercase leading-tight tracking-tight md:text-6xl">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink/60">
            {post.excerpt}
          </p>
        )}
      </section>

      {/* Thumbnail */}
      {post.thumbnail_url && (
        <div className="max-w-site container-px pb-12 md:pb-16">
          <div className="overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.thumbnail_url}
              alt={post.title}
              className="aspect-[16/7] w-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Content */}
      {paragraphs.length > 0 && (
        <article className="max-w-site container-px pb-16 md:pb-24">
          <div className="mx-auto max-w-2xl space-y-6 text-lg leading-relaxed text-ink/75">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </article>
      )}

      {/* Back + CTA */}
      <section className="bg-ink py-16 text-bone md:py-20">
        <div className="max-w-site container-px flex flex-col items-center gap-8 text-center md:flex-row md:items-start md:justify-between md:text-left">
          <div>
            <p className="chip text-bone/50">More reading</p>
            <h2 className="mt-4 font-display text-3xl font-semibold uppercase tracking-tight md:text-4xl">
              Read more on the blog
            </h2>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/blog"
              className="rounded-full border border-bone/25 px-7 py-3.5 text-xs uppercase tracking-[0.18em] text-bone/80 transition-colors hover:border-bone hover:text-bone"
            >
              All posts
            </Link>
            <Link
              href="/contact"
              className="rounded-full bg-bone px-7 py-3.5 text-xs uppercase tracking-[0.18em] text-ink transition-colors hover:bg-bone/90"
            >
              Start a project
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
