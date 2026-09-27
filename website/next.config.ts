import type { NextConfig } from "next";
import path from "path";

const worktreeRoot = path.resolve(__dirname, '..');

// Where the design system lives now. It was published from this repo until
// 2026-09-26; it is now Rift DS, a separate repo, package and domain, and the
// documentation URLs that used to be served here redirect there permanently.
// One constant so a future domain change is a single edit, not a sweep of 26
// redirect rules. (/canvas is deliberately absent from those rules: it was an
// internal, noindexed board with 5 views in 90 days and Rift DS has no
// equivalent, so inventing a destination for it would be worse than a 404.)
const DESIGN_SYSTEM_URL = "https://rift-ds.com";

// The GA tag and the inline theme-bootstrap script in layout.tsx require
// 'unsafe-inline'; tighten to nonces only if those become external scripts.
// React dev mode needs eval() for its debugging features; never allowed in prod.
const scriptEval =
  process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : "";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  `script-src 'self' 'unsafe-inline'${scriptEval} https://www.googletagmanager.com`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  // substackcdn.com serves the article cover images and in-post images
  // surfaced on /writing from the Substack RSS feed.
  "img-src 'self' data: https://substackcdn.com https://www.googletagmanager.com https://*.google-analytics.com",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
  // The /work case-study pages embed YouTube videos in iframes, and /canvas
  // frames the site's own pages.
  "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com",
  // Same-origin only: /canvas shows every page live inside a frame, so the
  // site must be allowed to frame itself. No other origin may, which is all
  // the clickjacking protection was ever for.
  "frame-ancestors 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  // The legacy form of frame-ancestors 'self' above, for the same reason.
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // No page uses the camera, microphone, or geolocation; deny them outright.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  // Don't advertise the framework in an X-Powered-By response header.
  poweredByHeader: false,
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  // Preserve inbound links after the IA cleanup: the DS overview moved to
  // /overview (so /about now serves the personal bio, formerly /about/me), and
  // the /design-md and bare /blueprints stub pages were retired.
  // /design-system used to redirect to /foundations after its stub was retired;
  // that redirect is gone because the path is a real page again (the DS landing).
  async redirects() {
    // The design system left this site on 2026-09-26. It is now Rift DS, with its
    // own repo, package and domain, so ~160 documentation URLs that used to live
    // here are permanent redirects to their exact counterparts there. Every
    // destination below was probed and returns 200 before this shipped.
    //
    // Bare index paths are listed before their wildcards deliberately: ":path*"
    // matches zero segments too, so the wildcard alone would send /components to
    // ".../components/" with a trailing slash and an extra hop.
    const ds = (p: string) => `${DESIGN_SYSTEM_URL}${p}`;
    return [
      { source: "/about/me", destination: "/about", permanent: true },

      // The design system's case study was published under the system's old
      // name. The article stays; only its slug moved.
      { source: "/work/robr0-ds", destination: "/work/rift-ds", permanent: true },

      // The design system's agent-facing files were served from this site's
      // public folder: the specs, one markdown prop contract per component,
      // and the consumer agent skill. Nothing linked to them, which is why
      // they outlived the pages, but agents fetch them by path and /design.md
      // was being served from both domains at once. They live at rift-ds.com
      // now, under the same paths (the skill folder renamed with the package).
      { source: "/CLAUDE.md", destination: ds("/CLAUDE.md"), permanent: true },
      { source: "/design.md", destination: ds("/design.md"), permanent: true },
      { source: "/content-design.md", destination: ds("/content-design.md"), permanent: true },
      { source: "/components/:slug.md", destination: ds("/components/:slug.md"), permanent: true },
      { source: "/skill/robr0-design-system/:path*", destination: ds("/skill/rift-design-system/:path*"), permanent: true },

      // --- The design system's documentation, now at Rift DS ---
      { source: "/components", destination: ds("/components"), permanent: true },
      { source: "/components/:path*", destination: ds("/components/:path*"), permanent: true },
      { source: "/foundations", destination: ds("/foundations"), permanent: true },
      { source: "/foundations/:path*", destination: ds("/foundations/:path*"), permanent: true },
      { source: "/templates", destination: ds("/templates"), permanent: true },
      { source: "/templates/:path*", destination: ds("/templates/:path*"), permanent: true },
      { source: "/docs", destination: ds("/docs"), permanent: true },
      { source: "/docs/:path*", destination: ds("/docs/:path*"), permanent: true },
      { source: "/overview", destination: ds("/overview"), permanent: true },
      { source: "/playground", destination: ds("/playground"), permanent: true },
      { source: "/graph", destination: ds("/graph"), permanent: true },
      { source: "/skills", destination: ds("/skills"), permanent: true },
      { source: "/loops", destination: ds("/loops"), permanent: true },
      { source: "/labs/:path*", destination: ds("/labs/:path*"), permanent: true },

      // The build journal was a design-system record. Rift DS keeps a release log
      // rather than a journal, which is the nearest thing a reader is looking for.
      // The journal's full text is archived in that repo's HISTORY.md.
      { source: "/project-journal", destination: ds("/releases"), permanent: true },

      // The porting guide was unpublished from /blueprints in August 2026 and its
      // source deleted from the repo soon after. The URL was public, so the
      // redirect outlives the page. Both bare-/blueprints rules land on Rift DS's
      // docs hub, matching where they used to land here, so nothing chains.
      { source: "/blueprints", destination: ds("/docs"), permanent: true },
      { source: "/blueprints/porting-guide", destination: ds("/docs"), permanent: true },
      { source: "/blueprints/:path*", destination: ds("/blueprints/:path*"), permanent: true },
      { source: "/design-md", destination: ds("/blueprints/design"), permanent: true },

      // The Customization section became the top-level playground, and its install
      // guide moved into the Docs cluster. Both now point at Rift DS directly
      // rather than hopping through a local URL that is itself a redirect.
      { source: "/customization", destination: ds("/playground"), permanent: true },
      { source: "/customization/playground", destination: ds("/playground"), permanent: true },
      { source: "/customization/get-started", destination: ds("/docs/get-started"), permanent: true },

      // The chat bench merged into the playground as its Chat view (August 2026).
      // /chat-widget-test is older still and has been returning 404 for some time,
      // yet it drew 72 views in the 90 days to 2026-09-26, so it earns a target
      // rather than staying broken.
      { source: "/robr0-gpt", destination: ds("/playground?view=chat"), permanent: true },
      { source: "/chat-widget-test", destination: ds("/playground?view=chat"), permanent: true },
    ];
  },
  // No transpilePackages entry for rift-ds. It used to be a workspace link
  // whose exports pointed at TypeScript source, so Next had to compile it as
  // first-party code. It now installs from npm as built JavaScript with its
  // own type declarations, which is what every other consumer gets.
  turbopack: {
    root: worktreeRoot,
  },
};

export default nextConfig;
