import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // GitHub Pages is configured to serve from /website_public/out/
  basePath: "/amedia-studio/website_public/out",
  // GitHub Pages ignores folders starting with _ (like _next).
  // We set assetPrefix so Next.js generates /amedia-studio/website_public/out/next/... paths,
  // then in deploy.yml we rename _next -> next to match.
  assetPrefix: "/amedia-studio/website_public/out",
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
