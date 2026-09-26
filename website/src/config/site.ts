/**
 * The site's own identity: one home for the facts that would otherwise be
 * retyped across metadata, structured data, the agent index and the scripts.
 *
 * SITE_URL is the canonical apex. The www host redirects to it, so nothing
 * here should ever state the www form: a canonical pointing at a redirect
 * makes every page's self-reference an extra hop.
 *
 * Scripts read these through `scripts/site-config.mjs`, which parses this
 * file rather than keeping a second copy.
 */

/** Canonical origin, no trailing slash. */
export const SITE_URL = "https://robertritacca.com";

/** The brand suffix on every page title, and og:site_name. */
export const SITE_NAME = "Robert Ritacca";

/** Where the design system lives now. Also stated in next.config.ts, which
    redirects the documentation URLs this site used to serve. */
export const DESIGN_SYSTEM_URL = "https://rift-ds.com";
