import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
    domains: ['ajmal.tech'], // Add any specific domains you're loading images from
  },
  // Enable static exports if needed
  // output: 'export',
  // distDir: 'dist',
  typescript: {
    // Temporarily disable type checking during build if needed
    ignoreBuildErrors: true,
  },
  eslint: {
    // Temporarily disable eslint during build if needed
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
