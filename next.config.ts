import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },

  reactCompiler: true,

  cacheComponents: true, // ✅ move it here

  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
};

export default nextConfig;
