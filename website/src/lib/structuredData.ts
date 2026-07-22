import type { BreadcrumbItem } from "@/config/navigation";

export const SITE_URL = "https://robertritacca.com";

export function buildPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Robert Ritacca",
    url: SITE_URL,
    jobTitle: "Principal Product Designer",
    sameAs: [
      "https://www.linkedin.com/in/robertritacca/",
      "https://x.com/robr0",
      "https://github.com/robritacca-dotcom",
    ],
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Robert Ritacca",
    url: SITE_URL,
  };
}

/**
 * Builds an Article schema for a /work case study. Pass the same headline and
 * description the page's `metadata` export declares so the two never disagree.
 */
export function buildCaseStudyJsonLd({
  slug,
  headline,
  description,
}: {
  slug: string;
  headline: string;
  description: string;
}) {
  const url = `${SITE_URL}/work/${slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: `${url}/opengraph-image`,
    author: {
      "@type": "Person",
      name: "Robert Ritacca",
      url: SITE_URL,
    },
  };
}

/** Builds a BreadcrumbList schema from the same trail PageBreadcrumb renders. */
export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };
}
