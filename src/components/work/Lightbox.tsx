"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import type { PortfolioItem } from "@/lib/types";
import { getEmbedUrl } from "@/lib/video";

export default function Lightbox({
  item,
  onClose,
}: {
  item: PortfolioItem | null;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (item) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm sm:p-10"
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-5 top-5 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-bone/30 text-bone transition-colors hover:bg-bone hover:text-ink"
          >
            <span className="text-xl">&times;</span>
          </button>

          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl"
          >
            <MediaPlayer item={item} />
            <div className="mt-5 flex flex-wrap items-baseline justify-between gap-3 text-bone">
              <div>
                <h3 className="font-display text-2xl font-medium uppercase tracking-tight">
                  {item.title}
                </h3>
                {item.client && <p className="text-bone/50">{item.client}</p>}
              </div>
              <span className="chip border-bone/30 text-bone/60">{item.category}</span>
            </div>
            {item.description && (
              <p className="mt-3 max-w-2xl text-bone/70">{item.description}</p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MediaPlayer({ item }: { item: PortfolioItem }) {
  if (item.media_type === "image") {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={item.media_url}
        alt={item.title}
        className="max-h-[72vh] w-full rounded-xl object-contain"
      />
    );
  }

  if (item.media_type === "video_upload") {
    return (
      <video
        src={item.media_url}
        poster={item.thumbnail_url ?? undefined}
        controls
        autoPlay
        playsInline
        className="max-h-[72vh] w-full rounded-xl bg-black"
      />
    );
  }

  // video_link
  const embed = getEmbedUrl(item.media_url);
  if (embed) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
        <iframe
          src={embed}
          title={item.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  }

  return (
    <a
      href={item.media_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-xl border border-bone/30 p-10 text-center text-bone"
    >
      Open video &#8594;
    </a>
  );
}
