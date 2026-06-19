/** @type {import('next').NextConfig} */
const supabaseHost = (() => {
  try {
    return process.env.NEXT_PUBLIC_SUPABASE_URL
      ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
      : undefined;
  } catch {
    return undefined;
  }
})();

const remotePatterns = [
  { protocol: "https", hostname: "img.youtube.com" },
  { protocol: "https", hostname: "i.vimeocdn.com" },
];

if (supabaseHost) {
  remotePatterns.push({ protocol: "https", hostname: supabaseHost });
}

const nextConfig = {
  // We're not at the filesystem root; pin tracing to this project to avoid
  // Next picking up an unrelated parent lockfile.
  outputFileTracingRoot: process.cwd(),
  images: {
    remotePatterns,
  },
};

export default nextConfig;
