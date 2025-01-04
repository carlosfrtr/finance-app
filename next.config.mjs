/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8080',
    },
    output: 'export',
    images: {
        unoptimized: true,
    },
    basePath: '/finance-app',
    assetPrefix: '/finance-app/',
};

export default nextConfig;
