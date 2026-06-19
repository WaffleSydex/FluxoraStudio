import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import EndCTA from "@/components/layout/EndCTA";
import JsonLd from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { getPublishedPosts, formatDate, type BlogPost } from "@/lib/blog";
import { canonical, SITE_URL } from "@/lib/seo";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Marketing Blog — Insights & Strategy | Fluxora Studio",
  description:
    "Marketing insights, brand strategy, social media tips, web design guides and creative studio thinking from Fluxora Studio.",
  keywords: [
    "marketing blog",
    "brand strategy tips",
    "social media marketing guide",
    "web design insights",
    "content marketing",
    "creative studio blog",
    "fluxora studio blog",
  ],
  ...canonical("/blog"),
};

const blogListSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Fluxora Studio Blog",
  url: `${SITE_URL}/blog`,
  description: "Marketing insights and strategy from Fluxora Studio.",
  publisher: {
    "@type": "Organization",
    name: "Fluxora Studio",
    url: SITE_URL,
  },
};

function PostCard({ post, i }: { post: BlogPost; i: number }) {
  const date = post.published_at ? formatDate(post.published_at) : formatDate(post.created_at);
  return (
    <Reveal delay={i % 3} as="div">
      <Link
        href={`/blog/${post.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-ink/20 hover:shadow-lg"
      >
        {/* Thumbnail */}
        <div className="relative aspect-[16/9] overflow-hidden bg-ink/5">
          {post.thumbnail_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.thumbnail_url}
              alt={post.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-expo group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-ink/5">
              <span className="font-display text-5xl font-bold uppercase text-ink/15">
                {post.category.charAt(0)}
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-ink/30">{post.category}</span>
            </div>
          )}
          <div className="absolute left-4 top-4">
            <span className="rounded-full bg-ink/80 px-3 py-1 text-xs uppercase tracking-[0.15em] text-bone/90 backdrop-blur-sm">
              {post.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-ink/40">{date}</p>
          <h2 className="mt-3 font-display text-xl font-semibold uppercase leading-tight tracking-tight transition-colors group-hover:text-accent">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/60 line-clamp-3">
              {post.excerpt}
            </p>
          )}
          <div className="mt-5 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-ink/50 transition-colors group-hover:text-ink">
            Read post
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <JsonLd data={[blogListSchema]} />

      <PageHero
        label="Blog"
        title="Insights & strategy"
        intro="Marketing thinking from the Fluxora team — on brand, web, social, video, growth and everything in between."
      />

      {posts.length === 0 ? (
        <section className="max-w-site container-px py-20 text-center">
          <p className="font-display text-3xl uppercase tracking-tight text-ink/25">No posts yet</p>
          <p className="mt-3 text-ink/45">Check back soon — articles are coming.</p>
        </section>
      ) : (
        <section className="max-w-site container-px py-10 md:py-14">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <PostCard key={post.id} post={post} i={i} />
            ))}
          </div>
        </section>
      )}

      <EndCTA
        eyebrow="Ready to start?"
        title="Let's build your marketing engine"
        sub="From the first idea to the thousandth impression. One studio, every channel."
      />
    </>
  );
}
