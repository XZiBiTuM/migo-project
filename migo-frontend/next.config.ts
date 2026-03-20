import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
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

export default nextConfig;
