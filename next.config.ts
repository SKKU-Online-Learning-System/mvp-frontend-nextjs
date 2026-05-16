import type { NextConfig } from 'next';

const normalizeApiBaseUrl = (url: string) => {
  const normalized = url.replace(/\/+$/, '');

  return normalized.endsWith('/api') ? normalized : `${normalized}/api`;
};

const apiBaseUrl = normalizeApiBaseUrl(
  process.env.NEXT_PUBLIC_API_BASE_URL ??
    process.env.NEXT_PUBLIC_BASE_URL ??
    'https://mrdang.cs.skku.edu'
);

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${apiBaseUrl}/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'cdn.inflearn.com' },
      { protocol: 'https', hostname: 'skb.skku.edu' },
    ],
  },
};

export default nextConfig;
