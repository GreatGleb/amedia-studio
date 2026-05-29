import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/amedia-studio",
  // GitHub Pages ignores folders starting with _ (like _next).
  // We set assetPrefix so Next.js generates /amedia-studio/next/... paths,
  // then in deploy.yml we rename _next -> next to match.
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
