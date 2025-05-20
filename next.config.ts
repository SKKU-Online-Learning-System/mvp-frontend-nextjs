import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.inflearn.com',
      },
      {
        protocol: 'https',
        hostname: 'skb.skku.edu',
      },
    ],
  },
};

export default nextConfig;
