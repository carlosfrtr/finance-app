/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
    env: {
        PUBLIC_SERVER_URL: isProd ? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:8080',
    },
    output: 'export',
    images: {
        unoptimized: true,
    },
    // basePath: isProd ? '/finance' : '',
    // assetPrefix: isProd ? "https://finance.torres.fortal.br" : "",
};

export default nextConfig;
