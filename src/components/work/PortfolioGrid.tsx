"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { PortfolioItem } from "@/lib/types";
import { getThumb, isVideo } from "@/lib/portfolio";
import Lightbox from "./Lightbox";

export default function PortfolioGrid({
  items,
  showFilters = true,
}: {
  items: PortfolioItem[];
  showFilters?: boolean;
}) {
  const [active, setActive] = useState<string>("All");
  const [selected, setSelected] = useState<PortfolioItem | null>(null);

  const categories = useMemo(() => {
    const set = new Set(items.map((i) => i.category));
    return ["All", ...Array.from(set)];
  }, [items]);

  const filtered = active === "All" ? items : items.filter((i) => i.category === active);

  if (items.length === 0) {
    return (
      <div className="max-w-site container-px py-24 text-center text-ink/50">
        <p className="font-display text-2xl uppercase tracking-tight">No work yet</p>
        <p className="mt-2">Add portfolio items from the admin panel to see them here.</p>
      </div>
    );
  }

  return (
    <div className="max-w-site container-px">
      {showFilters && categories.length > 2 && (
        <div className="mb-12 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full border px-5 py-2 text-xs uppercase tracking-[0.18em] transition-colors duration-300 ${
                active === cat
                  ? "border-accent bg-accent text-white"
                  : "border-ink/20 text-ink/60 hover:border-ink"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item, i) => (
          <Card key={item.id} item={item} index={i} onOpen={() => setSelected(item)} />
        ))}
      </div>

      <Lightbox item={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

function Card({
  item,
  index,
  onOpen,
}: {
  item: PortfolioItem;
  index: number;
  onOpen: () => void;
}) {
  const thumb = getThumb(item);
  const video = isVideo(item);
  const big = index % 5 === 0; // editorial rhythm — every 5th spans wide

  return (
    <motion.button
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.08 }}
      onClick={onOpen}
      className={`group relative block overflow-hidden rounded-xl bg-ink/5 text-left ${
        big ? "sm:col-span-2 lg:col-span-2" : ""
      }`}
    >
      <div className={`relative w-full overflow-hidden ${big ? "aspect-[16/10]" : "aspect-[4/5]"}`}>
        {thumb ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumb}
            alt={item.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-expo group-hover:scale-105"
          />
        ) : item.media_type === "video_upload" ? (
          <video
            src={item.media_url}
            muted
            loop
            playsInline
            className="h-full w-full object-cover transition-transform duration-700 ease-expo group-hover:scale-105"
            onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
            onMouseLeave={(e) => {
              e.currentTarget.pause();
              e.currentTarget.currentTime = 0;
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-ink text-bone/60">
            <span className="font-display uppercase tracking-[0.2em]">{item.category}</span>
          </div>
        )}

        {/* overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {video && (
          <span className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-bone/90 text-ink">
            <svg viewBox="0 0 24 24" className="h-4 w-4 translate-x-[1px]" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-between gap-3 p-5 opacity-0 transition-all duration-500 ease-expo group-hover:translate-y-0 group-hover:opacity-100">
        <div className="text-bone">
          <h3 className="font-display text-lg font-medium uppercase tracking-tight">{item.title}</h3>
          {item.client && <p className="text-sm text-bone/70">{item.client}</p>}
        </div>
        <span className="chip border-bone/40 text-bone">{item.category}</span>
      </div>
    </motion.button>
  );
}
