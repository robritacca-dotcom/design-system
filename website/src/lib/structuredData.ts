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
