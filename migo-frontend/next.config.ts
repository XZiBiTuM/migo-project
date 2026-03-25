import type { NextConfig } from "next";

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: process.env.NODE_ENV === 'development',
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'backend',
        port: '8000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.migohelp.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'migohelp.com',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/documents',
        destination: '/services',
      },
      {
        source: '/documents/:slug',
        destination: '/services/:slug',
      },
      { source: '/passport', destination: '/services/passport' },
      { source: '/sim', destination: '/services/sim' },
      { source: '/dms', destination: '/services/dms' },
      { source: '/loans', destination: '/services/loans' },
      { source: '/transfers', destination: '/services/transfers' },
      { source: '/biometrics', destination: '/services/biometrics' },
      { source: '/bank_card', destination: '/services/bank_card' },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
