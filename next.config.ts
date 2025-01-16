import type { NextConfig } from "next";

const withPWA = require('next-pwa')({
  dest: 'public'
})

const nextConfig: NextConfig = withPWA({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/u/**',
        search: '',
      },
    ],
  },
});

export default nextConfig;
