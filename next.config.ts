import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "public/sw.ts",
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
    ],
  },
});

export default nextConfig;
