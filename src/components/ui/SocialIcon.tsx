type IconProps = { className?: string };

const paths: Record<string, React.ReactNode> = {
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  tiktok: (
    <path d="M16 3c.4 2.4 1.9 4 4 4.3v3c-1.5 0-3-.5-4-1.2V15a5.5 5.5 0 1 1-5.5-5.5c.3 0 .7 0 1 .1v3.1a2.5 2.5 0 1 0 1.5 2.3V3H16Z" />
  ),
  youtube: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="M10 9.2v5.6L15 12l-5-2.8Z" fill="currentColor" stroke="none" />
    </>
  ),
  linkedin: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="3" />
      <path d="M6.5 9.5V17M6.5 6.6v.01M10.5 17v-4a2.5 2.5 0 0 1 5 0v4M10.5 9.5V17" />
    </>
  ),
  x: <path d="M4 4l16 16M20 4L4 20" />,
  twitter: <path d="M4 4l16 16M20 4L4 20" />,
  facebook: <path d="M14 8h2.5M14 8V6.5a2 2 0 0 1 2-2H17M14 8v12M14 12h-3" />,
  behance: <path d="M3 8h4a2 2 0 0 1 0 4H3V8Zm0 4h4.5a2 2 0 0 1 0 4H3v-4Zm11-3h5M14 14c0-2 1.5-3 3.2-3S20 12 20 14h-6c0 1.6 1.2 2.4 2.5 2.4 1 0 1.7-.4 2.1-1" />,
  dribbble: (
    <>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M4 9c5 .5 11 .2 15-2M3 14c5-1.5 11-.5 15 4M9 3c4 4 6 11 6 18" />
    </>
  ),
};

export default function SocialIcon({
  platform,
  className = "h-5 w-5",
}: IconProps & { platform: string }) {
  const key = platform.trim().toLowerCase();
  const content = paths[key] ?? (
    // generic link icon fallback
    <path d="M9 15l6-6M10 6h6a2 2 0 0 1 2 2v6M8 18H6a2 2 0 0 1-2-2v-2" />
  );

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {content}
    </svg>
  );
}
