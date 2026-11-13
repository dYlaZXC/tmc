import type { NextConfig } from "next";

/**
 * The site is fully static: `next build` emits plain HTML/CSS/JS into `out/`,
 * which can be uploaded to any web server (the current host is Plesk + nginx).
 */
const nextConfig: NextConfig = {
  output: "export",
  // `/kk` -> `/kk/index.html`, so nginx serves locale pages without rewrites.
  trailingSlash: true,
  images: {
    // Static export has no image-optimization server; images are pre-optimized
    // by `npm run images` (scripts/optimize-images.mjs).
    unoptimized: true,
  },
  experimental: {
    // Two root layouts (ru at `/`, kk/en under `/[lang]/`) need a global 404.
    globalNotFound: true,
  },
};

export default nextConfig;
