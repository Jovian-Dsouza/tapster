/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["placehold.co","source.unsplash.com","aggregator.walrus-testnet.walrus.space","ozgrozer.github.io"]
    },
    eslint:{
        ignoreDuringBuilds: true
    },
    typescript:{
        ignoreBuildErrors: true
    }
};

export default nextConfig;
