/**
 * Routes for the site-wide floating anchor nav (SiteAnchorRail in the root
 * layout). Every page gets the rail automatically — it reads the page's h2
 * headings after render, so a new page needs no wiring — except:
 *
 * - ANCHOR_NAV_EXCLUDED_ROUTES: pages that should not carry one. The index
 *   and landing pages are doors, not documents: a reader is choosing a
 *   destination, not scanning sections.
 * - ANCHOR_NAV_SELF_MANAGED_ROUTES: pages that mount FloatingAnchorNav
 *   themselves with server-derived items (markdown-extracted sections, or
 *   anchors whose labels are not headings). The global rail must skip them
 *   or the page would carry two. No page does this any more — the three that
 *   did were the design system's blueprint, skills and get-started pages —
 *   but the mechanism stays, because the next page with server-derived
 *   anchors needs it and the rail already branches on it.
 *
 * Chromeless routes (src/config/chromeless.ts) are skipped as well.
 * Matching is exact, so a nested route needs its own entry — which is what
 * lets an index be excluded while its children keep the rail.
 * scripts/validate-route-config.mjs holds every entry to a route that exists.
 */
export const ANCHOR_NAV_EXCLUDED_ROUTES = new Set([
  "/",
  "/about",
  "/work",
  "/writing",
  "/design-system",
]);

export const ANCHOR_NAV_SELF_MANAGED_ROUTES = new Set<string>([]);
