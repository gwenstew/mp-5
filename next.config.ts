import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
      return [
          {
              source: '/:alias',
              destination: '/api/:alias',
          },
      ];
  },
};

export default nextConfig;
