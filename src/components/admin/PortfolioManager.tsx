"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { PortfolioItem } from "@/lib/types";
import { getThumb, isVideo } from "@/lib/portfolio";
import PortfolioForm from "./PortfolioForm";

export default function PortfolioManager() {
  const supabase = createClient();
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<PortfolioItem | null>(null);
  const [creating, setCreating] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("portfolio_items")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    setItems((data as PortfolioItem[]) ?? []);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function remove(item: PortfolioItem) {
    if (!confirm(`Delete "${item.title}"? This can't be undone.`)) return;
    const res = await fetch(`/api/admin/portfolio?id=${encodeURIComponent(item.id)}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setItems((list) => list.filter((i) => i.id !== item.id));
    } else {
      const data = await res.json().catch(() => ({}));
      alert(data.error || "Could not delete item.");
    }
  }

  function onSaved() {
    setCreating(false);
    setEditing(null);
    load();
  }

  if (creating) return <PortfolioForm onSaved={onSaved} onCancel={() => setCreating(false)} />;
  if (editing)
    return <PortfolioForm initial={editing} onSaved={onSaved} onCancel={() => setEditing(null)} />;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-medium uppercase tracking-tight">Portfolio</h2>
          <p className="mt-1 text-sm text-ink/50">{items.length} item(s)</p>
        </div>
        <button
          onClick={() => setCreating(true)}
          className="rounded-full bg-ink px-6 py-3 text-sm uppercase tracking-[0.18em] text-bone transition-opacity hover:opacity-90"
        >
          + New item
        </button>
      </div>

      {loading ? (
        <p className="mt-10 text-ink/50">Loading…</p>
      ) : items.length === 0 ? (
        <p className="mt-10 text-ink/50">No items yet. Click “New item” to add your first project.</p>
      ) : (
        <ul className="mt-8 space-y-3">
          {items.map((item) => {
            const thumb = getThumb(item);
            return (
              <li
                key={item.id}
                className="flex items-center gap-4 rounded-xl border border-ink/10 bg-white p-3"
              >
                <div className="h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-ink/10">
                  {thumb ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={thumb} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[10px] uppercase tracking-widest text-ink/40">
                      {isVideo(item) ? "Video" : "—"}
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-display font-medium uppercase tracking-tight">
                      {item.title}
                    </p>
                    {item.featured && (
                      <span className="rounded-full bg-ink px-2 py-0.5 text-[10px] uppercase tracking-widest text-bone">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="truncate text-sm text-ink/50">
                    {item.category}
                    {item.client ? ` · ${item.client}` : ""} · {item.media_type.replace("_", " ")}
                  </p>
                </div>

                <div className="flex shrink-0 gap-2">
                  <button
                    onClick={() => setEditing(item)}
                    className="rounded-lg border border-ink/15 px-4 py-2 text-xs uppercase tracking-[0.16em] hover:bg-ink hover:text-bone"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => remove(item)}
                    className="rounded-lg border border-ink/15 px-4 py-2 text-xs uppercase tracking-[0.16em] text-ink/60 hover:border-red-400 hover:text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
