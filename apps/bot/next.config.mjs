/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  transpilePackages: ["@yzlab/api"],
  serverExternalPackages: ["grammy"],
  compress: true,
};

export default nextConfig;
