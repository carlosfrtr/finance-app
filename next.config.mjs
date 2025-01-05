/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
    env: {
        PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8080',
    },
    images: {
        unoptimized: true,
    },
    basePath: isProd ? '/finance-app' : '',
    assetPrefix: isProd ? process.env.NEXT_PUBLIC_SERVER_URL : '',
};

export default nextConfig;
