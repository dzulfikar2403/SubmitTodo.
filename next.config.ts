import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com"
      }
    ]
  },
  experimental: {
    serverActions:{
      bodySizeLimit: '2mb'
    }
  },
  eslint:{
    ignoreDuringBuilds: true
  },
  typescript:{
    ignoreBuildErrors: true
  }
};

export default nextConfig;
