import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Turbopack configuration for Next.js 16+
  turbopack: {},
  webpack: (config) => {
    // Allow importing from design system
    config.resolve.alias = {
      ...config.resolve.alias,
      '@design-system': path.resolve(__dirname, '../src'),
    };
    return config;
  },
};

export default nextConfig;
