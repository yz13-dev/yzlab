/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  transpilePackages: ["@yzlab/api"],
  serverExternalPackages: ["grammy", "@yzlab/api"],
  compress: true,
};

export default nextConfig;
