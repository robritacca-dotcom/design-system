import type { NextConfig } from "next";
import path from "path";

const worktreeRoot = path.resolve(__dirname, '..');
const designSystemPath = path.resolve(worktreeRoot, 'src');

const nextConfig: NextConfig = {
  turbopack: {
    root: worktreeRoot,
    resolveAlias: {
      '@design-system': designSystemPath,
    },
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@design-system': designSystemPath,
    };
    return config;
  },
};

export default nextConfig;
