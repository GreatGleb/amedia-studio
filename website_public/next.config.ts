import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/amedia-studio",
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
