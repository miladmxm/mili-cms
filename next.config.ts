import type { NextConfig } from "next";

import env from "@/config/env";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.147.247.187"],
  typedRoutes: true,
  reactCompiler: true,
  cacheComponents: true,
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  images: {
    minimumCacheTTL: 60,
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: env.S3_PORT,
      },
    ],
  },
};

export default nextConfig;
