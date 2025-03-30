import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Removed invalid property 'appDir'
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co', // the domain hosting your images
      },
    ],
  },
};

export default nextConfig;
