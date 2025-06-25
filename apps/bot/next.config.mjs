/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  transpilePackages: ["@yzlab/api"],
  compress: true,
  experimental: {
    serverComponentsExternalPackages: ["grammy"],
  },
};

export default nextConfig;
