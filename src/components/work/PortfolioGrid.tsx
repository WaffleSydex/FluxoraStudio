"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
      <div className="max-w-site container-px py-24 text-center">
        <p className="font-display text-3xl uppercase tracking-tight text-ink/30">No work yet</p>
        <p className="mt-3 text-ink/50">Add portfolio items from the admin panel to see them here.</p>
      </div>
    );
  }

  return (
    <div className="max-w-site container-px">
      {/* Category filters */}
      {showFilters && categories.length > 2 && (
        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full px-5 py-2 text-xs uppercase tracking-[0.18em] transition-all duration-300 ${
                active === cat
                  ? "bg-ink text-bone shadow-sm"
                  : "border border-ink/20 text-ink/60 hover:border-ink/60 hover:text-ink"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Bento grid */}
      <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
        <AnimatePresence mode="popLayout">
          {filtered.map((item, i) => (
            <GridCard
              key={item.id}
              item={item}
              index={i}
              onOpen={() => setSelected(item)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      <Lightbox item={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

function getColSpan(item: PortfolioItem, index: number): string {
  // featured items and every 5th always span wide
  if (item.featured || index % 5 === 0) return "lg:col-span-8";
  // alternate between medium and narrow
  return index % 2 === 0 ? "lg:col-span-7" : "lg:col-span-5";
}

function getAspect(item: PortfolioItem, index: number): string {
  if (item.featured || index % 5 === 0) return "aspect-[16/9]";
  if (index % 3 === 1) return "aspect-[4/5]";
  return "aspect-[3/4]";
}

function GridCard({
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
  const colSpan = getColSpan(item, index);
  const aspect = getAspect(item, index);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: (index % 4) * 0.06 }}
      className={`sm:col-span-1 ${colSpan}`}
    >
      <button
        onClick={onOpen}
        className="group relative block w-full overflow-hidden rounded-2xl bg-ink/5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        {/* Media */}
        <div className={`relative w-full overflow-hidden ${aspect}`}>
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
            <div className="flex h-full w-full items-center justify-center bg-ink/10">
              <span className="font-display text-2xl uppercase tracking-[0.2em] text-ink/30">
                {item.category}
              </span>
            </div>
          )}

          {/* Gradient overlay — always visible at bottom */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />

          {/* Play icon for videos */}
          {video && (
            <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-bone/90 text-ink shadow-sm transition-transform duration-300 group-hover:scale-110">
              <svg viewBox="0 0 24 24" className="h-4 w-4 translate-x-[1px]" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          )}

          {/* Meta — always visible at bottom */}
          <div className="absolute inset-x-0 bottom-0 p-5">
            <div className="flex items-end justify-between gap-3">
              <div className="text-bone">
                <h3 className="font-display text-lg font-medium uppercase leading-tight tracking-tight md:text-xl">
                  {item.title}
                </h3>
                {item.client && (
                  <p className="mt-0.5 text-sm text-bone/60">{item.client}</p>
                )}
              </div>
              <span className="shrink-0 rounded-full border border-bone/30 px-3 py-1 text-xs uppercase tracking-[0.15em] text-bone/80">
                {item.category}
              </span>
            </div>

            {/* Description — reveals on hover */}
            {item.description && (
              <p className="mt-2 line-clamp-2 max-h-0 overflow-hidden text-sm text-bone/70 transition-all duration-500 ease-expo group-hover:max-h-20">
                {item.description}
              </p>
            )}
          </div>
        </div>
      </button>
    </motion.div>
  );
}
