import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit( {
  cacheOnNavigation: true,
  swSrc: "app/_config/sw.ts",
  swDest: "public/sw.js",
  reloadOnOnline: true
});

const nextConfig: NextConfig = withSerwist( {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/u/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'observer-api-v2.tatweer-dev.com',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
  },
});

export default nextConfig;
