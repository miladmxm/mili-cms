import type { NextConfig } from "next";

import env from "@/config/env";

const nextConfig: NextConfig = {
  typedRoutes: true,
  reactCompiler: true,
  cacheComponents: true,
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
