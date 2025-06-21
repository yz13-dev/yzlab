/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  transpilePackages: ["@yz13/api"],
  compress: true,
  experimental: {
    serverComponentsExternalPackages: ["grammy"],
  },
};

export default nextConfig;
