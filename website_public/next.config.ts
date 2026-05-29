import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // GitHub Pages serves from repository root: https://greatgleb.github.io/amedia-studio/
  basePath: "/amedia-studio",
  // GitHub Pages ignores folders starting with _ (like _next).
  // We set assetPrefix so Next.js generates /amedia-studio/next/... paths,
  // then deploy.js renames _next -> next to match.
  assetPrefix: "/amedia-studio",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
