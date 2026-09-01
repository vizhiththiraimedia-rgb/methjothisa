/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.googleapis.com" },
      { protocol: "https", hostname: "**.google.com" },
      { protocol: "https", hostname: "**.amazonaws.com" },
      { protocol: "https", hostname: "**.cloudfront.net" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  serverExternalPackages: ["@node-jhora/core", "@node-jhora/analytics", "@node-jhora/prediction", "@node-jhora/ephe"],
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '../../../../de440s.bsp': false,
    };
    if (isServer) {
      config.externals.push({
        '@node-jhora/core': 'commonjs @node-jhora/core',
        '@node-jhora/ephe': 'commonjs @node-jhora/ephe',
      });
    }
    return config;
  }
};
export default nextConfig;
