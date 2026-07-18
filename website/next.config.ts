import type { NextConfig } from "next";
import path from "path";

const worktreeRoot = path.resolve(__dirname, '..');
const designSystemPath = path.resolve(worktreeRoot, 'src');

// The GA tag and the inline theme-bootstrap script in layout.tsx require
// 'unsafe-inline'; tighten to nonces only if those become external scripts.
// React dev mode needs eval() for its debugging features; never allowed in prod.
const scriptEval =
  process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : "";

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${scriptEval} https://www.googletagmanager.com`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: https://www.googletagmanager.com https://*.google-analytics.com",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
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
