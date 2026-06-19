"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { PORTFOLIO_CATEGORIES, type MediaType, type PortfolioItem } from "@/lib/types";

const BUCKET = "portfolio-media";

type Draft = {
  title: string;
  client: string;
  description: string;
  category: string;
  media_type: MediaType;
  media_url: string;
  thumbnail_url: string | null;
  featured: boolean;
  sort_order: number;
};

function emptyDraft(): Draft {
  return {
    title: "",
    client: "",
    description: "",
    category: "Web",
    media_type: "image",
    media_url: "",
    thumbnail_url: null,
    featured: false,
    sort_order: 0,
  };
}

export default function PortfolioForm({
  initial,
  onSaved,
  onCancel,
}: {
  initial?: PortfolioItem;
  onSaved: () => void;
  onCancel: () => void;
}) {
  const supabase = createClient();
  const [draft, setDraft] = useState<Draft>(initial ? { ...initial } : emptyDraft());
  const [imageMode, setImageMode] = useState<"upload" | "url">(
    initial?.media_type === "image" && initial?.media_url ? "url" : "upload"
  );
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  async function uploadFile(file: File, folder: string): Promise<string> {
    const ext = file.name.split(".").pop() || "bin";
    const res = await fetch("/api/admin/upload-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ folder, ext, contentType: file.type }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "Could not start upload.");

    const { error } = await supabase.storage
      .from(BUCKET)
      .uploadToSignedUrl(data.path, data.token, file, {
        contentType: file.type || undefined,
      });
    if (error) throw error;
    return data.publicUrl as string;
  }

  async function onMediaFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setBusy(true);
    setProgress(`Uploading ${file.name}…`);
    try {
      const folder = draft.media_type === "video_upload" ? "videos" : "images";
      const url = await uploadFile(file, folder);
      set("media_url", url);
      setProgress("Upload complete ✓");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Upload failed");
      setProgress(null);
    } finally {
      setBusy(false);
    }
  }

  async function onThumbFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setBusy(true);
    setProgress("Uploading thumbnail…");
    try {
      const url = await uploadFile(file, "thumbnails");
      set("thumbnail_url", url);
      setProgress("Thumbnail uploaded ✓");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  async function save() {
    setError(null);
    if (!draft.title.trim()) return setError("Title is required.");
    if (!draft.media_url.trim())
      return setError(
        draft.media_type === "video_link"
          ? "Paste a YouTube or Vimeo link."
          : draft.media_type === "image" && imageMode === "url"
          ? "Paste an image URL."
          : "Upload a file first."
      );

    setBusy(true);
    const payload = {
      ...(initial ? { id: initial.id } : {}),
      title: draft.title.trim(),
      client: draft.client.trim(),
      description: draft.description.trim(),
      category: draft.category,
      media_type: draft.media_type,
      media_url: draft.media_url.trim(),
      thumbnail_url: draft.thumbnail_url,
      featured: draft.featured,
      sort_order: Number(draft.sort_order) || 0,
    };

    try {
      const res = await fetch("/api/admin/portfolio", {
        method: initial ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      setBusy(false);
      if (!res.ok) return setError(data.error || "Save failed.");
      onSaved();
    } catch {
      setBusy(false);
      setError("Network problem. Please try again.");
    }
  }

  const field =
    "mt-2 w-full rounded-lg border border-ink/15 bg-white px-4 py-3 outline-none transition-colors focus:border-accent";
  const labelCls = "block text-xs uppercase tracking-[0.18em] text-ink/45";
  const tabBtn = (active: boolean) =>
    `rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.18em] transition-colors ${
      active ? "bg-ink text-bone" : "border border-ink/20 text-ink/55 hover:text-ink"
    }`;

  return (
    <div className="rounded-xl border border-ink/15 bg-white p-6">
      <h3 className="font-display text-xl font-medium uppercase tracking-tight">
        {initial ? "Edit item" : "New item"}
      </h3>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <label>
          <span className={labelCls}>Title *</span>
          <input className={field} value={draft.title} onChange={(e) => set("title", e.target.value)} />
        </label>
        <label>
          <span className={labelCls}>Client</span>
          <input className={field} value={draft.client} onChange={(e) => set("client", e.target.value)} />
        </label>
        <label className="sm:col-span-2">
          <span className={labelCls}>Description</span>
          <textarea
            rows={3}
            className={`${field} resize-none`}
            value={draft.description}
            onChange={(e) => set("description", e.target.value)}
          />
        </label>
        <label>
          <span className={labelCls}>Category</span>
          <select className={field} value={draft.category} onChange={(e) => set("category", e.target.value)}>
            {PORTFOLIO_CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label>
          <span className={labelCls}>Sort order</span>
          <input
            type="number"
            className={field}
            value={draft.sort_order}
            onChange={(e) => set("sort_order", Number(e.target.value))}
          />
        </label>
      </div>

      {/* Media type */}
      <div className="mt-8">
        <span className={labelCls}>Media type</span>
        <div className="mt-3 flex flex-wrap gap-2">
          {(
            [
              { k: "image", label: "Image" },
              { k: "video_upload", label: "Upload video" },
              { k: "video_link", label: "Video link (YouTube/Vimeo)" },
            ] as { k: MediaType; label: string }[]
          ).map((opt) => (
            <button
              key={opt.k}
              type="button"
              onClick={() => {
                set("media_type", opt.k);
                set("media_url", "");
                if (opt.k === "image") setImageMode("upload");
              }}
              className={tabBtn(draft.media_type === opt.k)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Image: toggle between upload and URL */}
        {draft.media_type === "image" && (
          <div className="mt-4 flex gap-2">
            <button type="button" onClick={() => { setImageMode("upload"); set("media_url", ""); }} className={tabBtn(imageMode === "upload")}>
              Upload file
            </button>
            <button type="button" onClick={() => { setImageMode("url"); set("media_url", ""); }} className={tabBtn(imageMode === "url")}>
              Paste image URL
            </button>
          </div>
        )}

        <div className="mt-4">
          {draft.media_type === "image" && imageMode === "url" ? (
            <div>
              <input
                placeholder="https://example.com/photo.jpg"
                className={field}
                value={draft.media_url}
                onChange={(e) => set("media_url", e.target.value)}
              />
              {draft.media_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={draft.media_url}
                  alt="preview"
                  className="mt-3 h-32 w-full rounded-lg object-cover"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                  onLoad={(e) => (e.currentTarget.style.display = "block")}
                />
              )}
            </div>
          ) : draft.media_type === "video_link" ? (
            <input
              placeholder="https://youtube.com/watch?v=…  or  https://vimeo.com/…"
              className={field}
              value={draft.media_url}
              onChange={(e) => set("media_url", e.target.value)}
            />
          ) : (
            <input
              type="file"
              accept={draft.media_type === "video_upload" ? "video/*" : "image/*"}
              onChange={onMediaFile}
              className="block w-full text-sm text-ink/70 file:mr-4 file:rounded-full file:border-0 file:bg-ink file:px-5 file:py-2.5 file:text-xs file:uppercase file:tracking-[0.18em] file:text-bone hover:file:opacity-90"
            />
          )}

          {draft.media_url && imageMode !== "url" && (
            <p className="mt-2 break-all text-xs text-ink/45">Current: {draft.media_url}</p>
          )}
        </div>

        {/* Thumbnail for videos */}
        {draft.media_type !== "image" && (
          <div className="mt-6">
            <span className={labelCls}>Thumbnail / poster (recommended)</span>
            <input
              type="file"
              accept="image/*"
              onChange={onThumbFile}
              className="mt-2 block w-full text-sm text-ink/70 file:mr-4 file:rounded-full file:border-0 file:bg-ink/80 file:px-5 file:py-2.5 file:text-xs file:uppercase file:tracking-[0.18em] file:text-bone hover:file:opacity-90"
            />
            {draft.thumbnail_url && (
              <p className="mt-2 break-all text-xs text-ink/45">Thumb: {draft.thumbnail_url}</p>
            )}
          </div>
        )}
      </div>

      <label className="mt-8 flex items-center gap-3">
        <input
          type="checkbox"
          checked={draft.featured}
          onChange={(e) => set("featured", e.target.checked)}
          className="h-4 w-4 accent-ink"
        />
        <span className="text-sm">Feature on homepage</span>
      </label>

      {progress && <p className="mt-4 text-sm text-ink/55">{progress}</p>}
      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

      <div className="mt-8 flex gap-3">
        <button
          onClick={save}
          disabled={busy}
          className="rounded-full bg-ink px-7 py-3.5 text-sm uppercase tracking-[0.18em] text-bone transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {busy ? "Working…" : initial ? "Update item" : "Add item"}
        </button>
        <button
          onClick={onCancel}
          disabled={busy}
          className="rounded-full border border-ink/20 px-7 py-3.5 text-sm uppercase tracking-[0.18em] transition-colors hover:bg-ink hover:text-bone disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
