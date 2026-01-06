import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export a static site so it can be served by nginx
  output: "export",
  // Avoid using the default image optimizer, which requires the Next.js server
  images: { unoptimized: true },
};

export default nextConfig;
