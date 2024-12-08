/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["aggregator.walrus-testnet.walrus.space","ozgrozer.github.io"]
    },
    eslint:{
        ignoreDuringBuilds: true
    },
    typescript:{
        ignoreBuildErrors: true
    }
};

export default nextConfig;
