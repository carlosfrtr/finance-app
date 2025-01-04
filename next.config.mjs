/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8080',
    },
    output: 'export',
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
