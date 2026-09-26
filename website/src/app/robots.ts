import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/site";

/**
 * Crawl rules.
 *
 * The noindex routes already carry `robots: { index: false, follow: false }`
 * in their own metadata, which is what actually keeps them out of an index.
 * Disallowing them here as well is belt and braces: a crawler that never
 * fetches the page never has to be trusted to honour the meta tag.
 *
 * /api is disallowed because route handlers are not pages. Nothing links to
 * them, but a crawler that finds one has nothing to gain and the endpoints
 * cost real money to answer.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/covers", "/covers/render", "/rr-animated"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
