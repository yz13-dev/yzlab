import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@yzlab/ui"],
  compress: true,
  experimental: {
    inlineCss: true,
    reactCompiler: true,
    optimizeCss: true,
    optimizeServerReact: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
