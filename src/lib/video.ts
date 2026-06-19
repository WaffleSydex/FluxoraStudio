/**
 * Helpers for turning a pasted YouTube / Vimeo URL into an embeddable iframe
 * src and a fallback thumbnail.
 */

export function getYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([\w-]{11})/,
    /(?:youtu\.be\/)([\w-]{11})/,
    /(?:youtube\.com\/embed\/)([\w-]{11})/,
    /(?:youtube\.com\/shorts\/)([\w-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

export function getVimeoId(url: string): string | null {
  const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return m ? m[1] : null;
}

export function getEmbedUrl(url: string): string | null {
  const yt = getYouTubeId(url);
  if (yt) return `https://www.youtube.com/embed/${yt}?rel=0&modestbranding=1`;

  const vimeo = getVimeoId(url);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo}`;

  return null;
}

export function getVideoLinkThumbnail(url: string): string | null {
  const yt = getYouTubeId(url);
  if (yt) return `https://img.youtube.com/vi/${yt}/hqdefault.jpg`;
  return null;
}
