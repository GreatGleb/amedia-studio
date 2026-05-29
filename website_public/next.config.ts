import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // GitHub Pages serves from the repo root, but the project is in website_public/
  // and the build output is in website_public/out/.
  // So all assets are at /amedia-studio/out/...
  basePath: "/amedia-studio/out",
  // GitHub Pages ignores folders starting with _ (like _next).
  // We set assetPrefix so Next.js generates /amedia-studio/out/next/... paths,
  // then in deploy.yml we rename _next -> next to match.
  assetPrefix: "/amedia-studio/out",
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
