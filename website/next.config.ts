import type { NextConfig } from "next";
import path from "path";

const worktreeRoot = path.resolve(__dirname, '..');

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
  // the /design-md and bare /blueprints stub pages were retired.
  // /design-system used to redirect to /foundations after its stub was retired;
  // that redirect is gone because the path is a real page again (the DS landing).
  async redirects() {
    return [
      { source: "/about/me", destination: "/about", permanent: true },
      { source: "/design-md", destination: "/blueprints/design", permanent: true },
      { source: "/blueprints", destination: "/docs", permanent: true },
      // The porting guide was unpublished from /blueprints in August 2026 and
      // its source deleted from the repo soon after. The URL was public, so
      // the redirect outlives the page: straight to /docs, matching the bare
      // /blueprints redirect above, so no chain.
      { source: "/blueprints/porting-guide", destination: "/docs", permanent: true },
      // The Customization section became the top-level /playground, and its
      // install guide moved into the Docs cluster.
      { source: "/customization", destination: "/playground", permanent: true },
      { source: "/customization/playground", destination: "/playground", permanent: true },
      { source: "/customization/get-started", destination: "/docs/get-started", permanent: true },
      // The chat bench merged into the playground as its Chat view
      // (August 2026) — one tool, one link; the old QA URL lands there.
      { source: "/robr0-gpt", destination: "/playground?view=chat", permanent: true },
    ];
  },
  // The design system arrives as a real (workspace-linked) package whose
  // exports point at TypeScript source — Next compiles it like first-party
  // code. This keeps the website on the exact import surface consumers get.
  transpilePackages: ['@robr0/design-system'],
  turbopack: {
    root: worktreeRoot,
  },
};

export default nextConfig;
