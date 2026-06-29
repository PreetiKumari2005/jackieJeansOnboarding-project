import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  // In Next.js 16, bypass rules are injected directly as build-time flags 
  // or explicitly passed through typescript parameters.
};

export default nextConfig;