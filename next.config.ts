import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 420, 640, 750, 828, 1024, 1200, 1600],
    imageSizes: [16, 32, 48, 64, 96, 128, 184, 245, 256, 276, 300, 412, 549],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },
};

export default nextConfig;
