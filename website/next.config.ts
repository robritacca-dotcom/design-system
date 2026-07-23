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
  // substackcdn.com serves the article cover images and in-post images
  // surfaced on /writing from the Substack RSS feed.
  "img-src 'self' data: https://substackcdn.com https://www.googletagmanager.com https://*.google-analytics.com",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
  // The /work case-study pages embed YouTube videos in iframes.
  "frame-src https://www.youtube.com https://www.youtube-nocookie.com",
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
  // Preserve inbound links after the IA cleanup: the DS overview moved to
  // /overview (so /about now serves the personal bio, formerly /about/me), and
  // the /design-system, /design-md, and bare /blueprints stub pages were retired.
  async redirects() {
    return [
      { source: "/about/me", destination: "/about", permanent: true },
      { source: "/design-system", destination: "/foundations", permanent: true },
      { source: "/design-md", destination: "/blueprints/design", permanent: true },
      { source: "/blueprints", destination: "/docs", permanent: true },
    ];
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
