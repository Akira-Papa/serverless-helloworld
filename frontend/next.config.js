/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.API_URL || 'https://e0wq7990z1.execute-api.ap-northeast-1.amazonaws.com/dev/hello',
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: {
      enabled: true
    },
  },
};

module.exports = nextConfig;
