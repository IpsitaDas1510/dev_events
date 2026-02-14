import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript:{
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

  experimental: {
    cacheComponents: true,
    turbopackFileSystemCacheForDev: true,
  },
};

export default nextConfig;
