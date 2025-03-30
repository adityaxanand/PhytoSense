import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Removed invalid property 'appDir'
    // serverComponentsExternalPackages: ['@google/generative-ai'],
  },
  serverExternalPackages: ['@google/generative-ai'],
  productionBrowserSourceMaps: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co', // the domain hosting your images
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, max-age=0' }
        ],
      },
    ];
  },
};

export default nextConfig;
