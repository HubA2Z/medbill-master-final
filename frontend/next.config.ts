import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Local development only: forward /api to the Express server (in production Vercel routes /api via vercel.json).
  async rewrites() {
    return process.env.API_DEV_PROXY ? [{ source: '/api/:path*', destination: `${process.env.API_DEV_PROXY}/api/:path*` }] : [];
  },
  async redirects() {
    return [
      // These two URLs were listed in the old sitemap but never existed (404).
      // Permanently point them at the real pages so any link equity is kept.
      { source: '/icd-10-search', destination: '/icd10-intelligence', permanent: true },
      { source: '/revenue-audit', destination: '/audit', permanent: true },
    ];
  },
};

export default nextConfig;
