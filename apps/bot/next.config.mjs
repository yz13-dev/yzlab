/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  serverExternalPackages: ["grammy", "@yzlab/api"],
  compress: true,
};

export default nextConfig;
