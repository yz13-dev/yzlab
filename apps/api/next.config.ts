import withPlaiceholder from "@plaiceholder/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [],
  compress: true,
  experimental: {
    reactCompiler: true,
    optimizeServerReact: true,
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "/api/:path*",
      },
    ];
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

export default withPlaiceholder(nextConfig);
