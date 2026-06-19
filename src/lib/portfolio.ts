import type { PortfolioItem } from "@/lib/types";
import { getVideoLinkThumbnail } from "@/lib/video";

/** Best available still image to represent an item in a grid. */
export function getThumb(item: PortfolioItem): string | null {
  if (item.thumbnail_url) return item.thumbnail_url;
  if (item.media_type === "image") return item.media_url;
  if (item.media_type === "video_link") return getVideoLinkThumbnail(item.media_url);
  return null; // uploaded video with no poster -> render <video> as thumb
}

export function isVideo(item: PortfolioItem): boolean {
  return item.media_type === "video_upload" || item.media_type === "video_link";
}
