/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Strict Mode for development
  reactStrictMode: true,

  // Optimize images from popular image hosting services
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
    // More aggressive image optimization
    minimumCacheTTL: 60,
  },

  // Enable SWC minification instead of Terser for faster builds
  swcMinify: true,

  // Configure compiler options
  compiler: {
    // Remove console.log statements in production build
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Configure performance optimizations
  experimental: {
    // Enable optimizeCss for production builds
    optimizeCss: process.env.NODE_ENV === 'production',
    // Faster builds in development
    webpackBuildWorker: process.env.NODE_ENV === 'development',
  },

  // Configure headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default nextConfig; 