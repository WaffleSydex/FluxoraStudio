"use client";

import { useEffect, useState, useCallback } from "react";
import type { BlogPost } from "@/lib/blog-types";
import { generateSlug, formatDate } from "@/lib/blog-types";

const CATEGORIES = ["Insights", "Strategy", "Social Media", "Web Design", "Video", "Branding", "SEO", "Email", "Paid Ads"];

type Mode = "list" | "edit";

const EMPTY: Omit<BlogPost, "id" | "created_at" | "updated_at"> = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  thumbnail_url: "",
  category: "Insights",
  seo_title: "",
  seo_description: "",
  published: false,
  published_at: null,
};

export default function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<Mode>("list");
  const [current, setCurrent] = useState<Partial<BlogPost> & typeof EMPTY>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [slugEdited, setSlugEdited] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/blog");
    const data = await res.json().catch(() => ({}));
    setPosts(data.posts ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function newPost() {
    setCurrent({ ...EMPTY });
    setSlugEdited(false);
    setMode("edit");
    setStatus(null);
  }

  function editPost(post: BlogPost) {
    setCurrent({ ...post });
    setSlugEdited(true);
    setMode("edit");
    setStatus(null);
  }

  function set<K extends keyof typeof EMPTY>(key: K, value: (typeof EMPTY)[K]) {
    setCurrent((s) => ({ ...s, [key]: value }));
  }

  function onTitleChange(val: string) {
    set("title", val);
    if (!slugEdited) {
      set("slug", generateSlug(val));
    }
  }

  async function save() {
    if (!current.title?.trim()) { setStatus("Title is required."); return; }
    if (!current.slug?.trim()) { setStatus("Slug is required."); return; }
    setSaving(true);
    setStatus(null);
    const res = await fetch("/api/admin/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(current),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      setStatus("Saved ✓");
      await load();
      setTimeout(() => { setStatus(null); setMode("list"); }, 1200);
    } else {
      setStatus(`Error: ${data.error ?? "Save failed"}`);
    }
    setSaving(false);
  }

  async function deletePost(id: string) {
    if (!confirm("Delete this post?")) return;
    await fetch(`/api/admin/blog?id=${id}`, { method: "DELETE" });
    await load();
  }

  const field = "mt-2 w-full rounded-lg border border-ink/15 bg-white px-4 py-3 outline-none transition-colors focus:border-accent text-sm";
  const labelCls = "block text-xs uppercase tracking-[0.18em] text-ink/45";

  if (mode === "edit") {
    const seoTitleLen = (current.seo_title ?? "").length;
    const seoDescLen = (current.seo_description ?? "").length;

    return (
      <div className="space-y-10">
        <div className="flex items-center gap-4">
          <button onClick={() => setMode("list")} className="text-xs uppercase tracking-[0.18em] text-ink/50 hover:text-ink">
            ← Back
          </button>
          <h2 className="font-display text-2xl font-medium uppercase tracking-tight">
            {current.id ? "Edit post" : "New post"}
          </h2>
        </div>

        {/* Basic info */}
        <section className="space-y-5">
          <h3 className="font-display text-lg font-medium uppercase tracking-tight text-ink/60">Content</h3>
          <label>
            <span className={labelCls}>Title *</span>
            <input className={field} value={current.title} onChange={(e) => onTitleChange(e.target.value)} placeholder="Post title" />
          </label>
          <label>
            <span className={labelCls}>Slug * (URL: /blog/{current.slug || "…"})</span>
            <input
              className={field}
              value={current.slug ?? ""}
              onChange={(e) => { setSlugEdited(true); set("slug", e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")); }}
              placeholder="post-slug"
            />
          </label>
          <div className="grid gap-5 sm:grid-cols-2">
            <label>
              <span className={labelCls}>Category</span>
              <select className={field} value={current.category} onChange={(e) => set("category", e.target.value)}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </label>
            <label>
              <span className={labelCls}>Thumbnail URL (image link)</span>
              <input className={field} value={current.thumbnail_url ?? ""} onChange={(e) => set("thumbnail_url", e.target.value)} placeholder="https://…" />
            </label>
          </div>
          {current.thumbnail_url && (
            <div className="overflow-hidden rounded-xl border border-ink/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={current.thumbnail_url} alt="Thumbnail preview" className="aspect-[16/9] w-full object-cover" onError={(e) => { e.currentTarget.style.display = "none"; }} />
            </div>
          )}
          <label>
            <span className={labelCls}>Excerpt (shown on blog listing)</span>
            <textarea rows={3} className={`${field} resize-none`} value={current.excerpt ?? ""} onChange={(e) => set("excerpt", e.target.value)} placeholder="Short summary of the post…" />
          </label>
          <label>
            <span className={labelCls}>Content (separate paragraphs with a blank line)</span>
            <textarea rows={16} className={`${field} resize-y font-mono text-xs`} value={current.content ?? ""} onChange={(e) => set("content", e.target.value)} placeholder="Write your post here…&#10;&#10;Start a new paragraph by leaving a blank line between them." />
          </label>
        </section>

        {/* SEO */}
        <section className="space-y-5 rounded-xl border border-ink/10 bg-white p-6">
          <h3 className="font-display text-lg font-medium uppercase tracking-tight">SEO</h3>
          <label>
            <span className={labelCls}>
              Meta title ({seoTitleLen}/60 chars) {seoTitleLen > 60 && <span className="text-red-500">— too long</span>}
            </span>
            <input className={field} value={current.seo_title ?? ""} onChange={(e) => set("seo_title", e.target.value)} placeholder={current.title ? `${current.title} | Fluxora Studio Blog` : "SEO title…"} />
            <p className="mt-1 text-xs text-ink/40">Leave blank to auto-generate from title.</p>
          </label>
          <label>
            <span className={labelCls}>
              Meta description ({seoDescLen}/160 chars) {seoDescLen > 160 && <span className="text-red-500">— too long</span>}
            </span>
            <textarea rows={3} className={`${field} resize-none`} value={current.seo_description ?? ""} onChange={(e) => set("seo_description", e.target.value)} placeholder={current.excerpt ?? "Describe this post for search engines…"} />
            <p className="mt-1 text-xs text-ink/40">Leave blank to use excerpt.</p>
          </label>
        </section>

        {/* Publish */}
        <section className="flex items-center gap-5 rounded-xl border border-ink/10 bg-white p-6">
          <label className="flex cursor-pointer items-center gap-3">
            <div
              onClick={() => set("published", !current.published)}
              className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${current.published ? "bg-accent" : "bg-ink/20"}`}
            >
              <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${current.published ? "translate-x-5" : "translate-x-0.5"}`} />
            </div>
            <span className="text-sm font-medium">{current.published ? "Published" : "Draft"}</span>
          </label>
          <p className="text-xs text-ink/45">
            {current.published ? "Live on /blog once saved." : "Not visible to readers until published."}
          </p>
        </section>

        <div className="sticky bottom-4 flex items-center gap-4">
          <button onClick={save} disabled={saving} className="rounded-full bg-ink px-8 py-4 text-sm uppercase tracking-[0.18em] text-bone hover:opacity-90 disabled:opacity-50">
            {saving ? "Saving…" : "Save post"}
          </button>
          {status && <span className={`text-sm ${status.startsWith("Error") ? "text-red-500" : "text-ink/60"}`}>{status}</span>}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-medium uppercase tracking-tight">Blog posts</h2>
          <p className="mt-1 text-sm text-ink/50">Manage articles shown on /blog</p>
        </div>
        <button onClick={newPost} className="rounded-full bg-ink px-5 py-2.5 text-xs uppercase tracking-[0.18em] text-bone hover:opacity-90">
          + New post
        </button>
      </div>

      {loading ? (
        <p className="text-ink/50">Loading…</p>
      ) : posts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-ink/20 py-16 text-center">
          <p className="font-display text-xl uppercase tracking-tight text-ink/30">No posts yet</p>
          <button onClick={newPost} className="mt-5 text-sm uppercase tracking-[0.18em] text-ink/50 underline hover:text-ink">
            Create your first post
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((p) => (
            <div key={p.id} className="flex items-center gap-4 rounded-xl border border-ink/10 bg-white p-4">
              {p.thumbnail_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.thumbnail_url} alt="" className="h-14 w-20 shrink-0 rounded-lg object-cover" />
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate font-display font-medium uppercase tracking-tight">{p.title}</p>
                <p className="mt-0.5 text-xs text-ink/45">
                  <span className={`mr-2 rounded-full px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] ${p.published ? "bg-green-100 text-green-700" : "bg-ink/8 text-ink/50"}`}>
                    {p.published ? "Published" : "Draft"}
                  </span>
                  {p.category} · {p.published_at ? formatDate(p.published_at) : formatDate(p.created_at)}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {p.published && (
                  <a href={`/blog/${p.slug}`} target="_blank" rel="noopener noreferrer" className="text-xs text-ink/40 hover:text-ink" aria-label="View post">
                    ↗
                  </a>
                )}
                <button onClick={() => editPost(p)} className="rounded-lg border border-ink/15 px-3 py-1.5 text-xs uppercase tracking-[0.15em] hover:bg-ink hover:text-bone">
                  Edit
                </button>
                <button onClick={() => deletePost(p.id)} className="rounded-lg border border-ink/15 px-3 py-1.5 text-xs uppercase tracking-[0.15em] text-ink/50 hover:border-red-400 hover:text-red-500">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
