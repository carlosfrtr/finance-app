/** @type {import('next').NextConfig} */

const nextConfig = {
    env: {
        PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    },
    output: 'export',
    images: {
        unoptimized: true,
    },
    // basePath: isProd ? '/finance' : '',
    // assetPrefix: isProd ? "https://finance.torres.fortal.br" : "",
};

export default nextConfig;
