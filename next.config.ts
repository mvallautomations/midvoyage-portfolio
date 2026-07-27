import type { NextConfig } from "next";

/* ============================================================
   mid·voyage — Next.js Config
   - output: "export" — static site for Cloudflare Pages (handlit.app)
   - images unoptimized: required for static export (no image server)
   - No turbopack (per scaffold rules)
   ============================================================ */

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [],
  },
  // Trailing slash — consistent URLs
  trailingSlash: false,
};

export default nextConfig;
