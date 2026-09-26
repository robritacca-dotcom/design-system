/* ============================================
   SHARED NAVIGATION CONFIG
   Single source of truth for all nav, sidebar,
   and subnav links across the site.
   ============================================ */

import type { Metadata } from "next";

export interface NavLink {
  href: string;
  label: string;
  active?: boolean;
  disabled?: boolean;
  /** Optional logo path (e.g. "/logos/Intuit.svg") rendered to the left of the label in Sidebar */
  logo?: string;
  /** One-line summary — Sidebar's `searchable` filter matches against it too */
  description?: string;
}

/** One step in a breadcrumb trail; omit href for the current page (last item) */
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/* ============================================
   SECTIONS
   ============================================ */

export function buildWritingSidebarLinks(
  articles: { slug: string; title: string }[]
): NavLink[] {
  return [
    { href: "/writing", label: "Contents" },
    ...articles.map((a) => ({ href: `/writing/${a.slug}`, label: a.title })),
  ];
}

export const workSidebarLinks: NavLink[] = [
  { href: "/work", label: "Contents" },
  { href: "/work/embedded-ai-turbotax", label: "TurboTax in ChatGPT & Claude", logo: "/logos/turbotax.svg" },
  { href: "/work/intuit-agent-chat", label: "Agent Chat Platform", logo: "/logos/Intuit.svg" },
  { href: "/work/augmenta-ai", label: "Construction Platform", logo: "/logos/Augmenta-2026.svg" },
  { href: "/work/meta-offers", label: "Structured comp capture", logo: "/logos/meta.svg" },
  { href: "/work/meta-immersive-offers", label: "Immersive Offers", logo: "/logos/meta.svg" },
  { href: "/work/meta-career-profile", label: "Career Profile", logo: "/logos/meta.svg" },
  { href: "/work/robr0-ds", label: "Building robr0 DS", logo: "/logos/rr.svg" },
  { href: "/work/cibc-firstcaribbean", label: "FirstCaribbean", logo: "/logos/CIBC.svg" },
];

/* ============================================
   HELPERS
   ============================================ */

/**
 * Returns sidebar links with the matching href marked active.
 */
export function getSidebarLinks(links: NavLink[], activeHref: string) {
  const sidebarLinks = links.map((link) => ({
    ...link,
    active: link.href === activeHref ? true : undefined,
  }));

  return { sidebarLinks };
}

/**
 * Every sidebar array, in one place, so a page's canonical name can be looked
 * up from its href. This is the single source of truth for page titles — the
 * nav label, the breadcrumb, and the browser-tab title all resolve from here.
 */
const allSidebarLinks: NavLink[] = [...workSidebarLinks];

/** The canonical label for a route, taken from the nav config (or undefined). */
export function getNavLabel(href: string): string | undefined {
  return allSidebarLinks.find((link) => link.href === href)?.label;
}

/** The brand suffix appended to every page's browser-tab title. */
export const TITLE_SUFFIX = "Robert Ritacca";
/** Next.js title template — applied to child route segments' titles. */
export const TITLE_TEMPLATE = `%s · ${TITLE_SUFFIX}`;

/**
 * Sections whose layout segment ships its own `opengraph-image.tsx`. Sub-pages
 * of these sections use the section's card, not the root one — a segment that
 * declares `openGraph` replaces the inherited block wholesale (images
 * included), so the nearest ancestor card has to be re-stated per page rather
 * than inherited. Checked against the filesystem by
 * scripts/validate-website-surfaces.mjs, so an added or removed section image
 * can't leave this list stale.
 *
 * Empty since the design system moved to rift-ds.com: /components and
 * /foundations were the only sections with their own cards, and both are gone.
 * Case studies keep per-page cards of their own, which outrank this anyway.
 */
export const SECTION_OG_IMAGE_SEGMENTS: string[] = [];

/** The og:image for a page: its section's own card when one exists, else the root card. */
function ogImageForPath(path?: string): string {
  const section = SECTION_OG_IMAGE_SEGMENTS.find((s) => path?.startsWith(`${s}/`));
  return `${section ?? ""}/opengraph-image`;
}

/**
 * Open Graph block for one page, so shares and link unfurls carry the page's
 * own title and description. Without this, every page inherits the root
 * layout's `openGraph` wholesale (Next merges metadata per top-level key, not
 * per nested field) and unfurls as the homepage. The bare title is deliberate:
 * `og:site_name` carries the brand, so unfurlers don't render the suffix twice.
 * `path` is resolved against `metadataBase`; omit it on section layouts, where
 * an inherited `og:url` would mislabel every sub-page (same reasoning as the
 * canonical rule on `sectionMetadata`).
 */
export function pageOpenGraph(
  title: string,
  description?: string,
  path?: string,
  type: "website" | "article" = "website"
): NonNullable<Metadata["openGraph"]> {
  return {
    title,
    ...(description ? { description } : {}),
    ...(path ? { url: path } : {}),
    siteName: TITLE_SUFFIX,
    locale: "en_US",
    type,
    // Branded card fallback — without this, pages that declare `openGraph`
    // would render no og:image at all (see SECTION_OG_IMAGE_SEGMENTS). A
    // file-convention image in the page's own segment (a case study's
    // opengraph-image.tsx) still outranks this field.
    images: ogImageForPath(path),
  };
}

/**
 * Metadata for a section landing layout (Work). Sets the section's own
 * suffixed title AND re-declares the title template so the suffix cascades to
 * the section's sub-pages — Next only applies a template to direct children,
 * so intermediate layouts must carry it or grandchildren would render bare,
 * unsuffixed titles.
 *
 * Deliberately sets NO canonical: this layout wraps the section's sub-pages, and
 * `alternates` inherits, so a canonical here would make every sub-page that
 * doesn't override it self-canonicalise to the section landing. The landing (and
 * any sub-page without its own canonical) self-canonicalises to its own URL by
 * default; leaf pages set explicit canonicals via `pageMetadata` or directly.
 */
export function sectionMetadata(label: string, description?: string): Metadata {
  // `default` is the bare label — the root layout's template adds the suffix to
  // it once. `template` carries the suffix down to this section's sub-pages.
  const title = { default: label, template: TITLE_TEMPLATE };
  // No `url` in the Open Graph block — see pageOpenGraph. Sub-pages override
  // the whole block via pageMetadata, so this only renders on the landing.
  const openGraph = pageOpenGraph(label, description);
  return description ? { title, description, openGraph } : { title, openGraph };
}

/**
 * Builds a page's Next.js `Metadata` with its `title` derived from the nav
 * label for `href`, so the browser-tab title can never drift from the sidebar
 * label or breadcrumb. Pass a `description` to keep the page's bespoke SEO copy.
 * Self-canonicalizes to `href` (resolved against `metadataBase`) so the page
 * owns its own canonical instead of inheriting one from a parent layout.
 * Throws at build time if `href` has no nav label — that surfaces a page whose
 * title source is missing rather than silently falling back to the site default.
 */
export function pageMetadata(href: string, description?: string): Metadata {
  const title = getNavLabel(href);
  if (!title) {
    throw new Error(
      `pageMetadata: no nav label found for "${href}". Add it to a sidebar links array in navigation.ts.`
    );
  }
  const alternates = { canonical: href };
  const openGraph = pageOpenGraph(title, description, href);
  return description
    ? { title, description, alternates, openGraph }
    : { title, alternates, openGraph };
}

/* ============================================
   BREADCRUMBS
   Builds a trail based on pathname: Work >
   <Case study>, or Writing > <Article>. Returns
   [] for top-level landing pages that don't need
   a breadcrumb.
   ============================================ */

interface SectionConfig {
  base: string;
  label: string;
  sidebar: NavLink[] | null;
}

const breadcrumbSections: SectionConfig[] = [
  { base: "/work", label: "Work", sidebar: workSidebarLinks },
  // Writing — article sub-labels resolve from the slug (feed is dynamic)
  { base: "/writing", label: "Writing", sidebar: null },
];

function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function getBreadcrumbs(pathname: string): BreadcrumbItem[] {
  // Strip trailing slash (but keep "/")
  const path = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;

  // Top-level pages with no breadcrumb. /design-system is the page about having
  // built Rift DS — a standalone page with a full-bleed hero, not a doc shell.
  if (path === "/" || path === "/contact" || path === "/about" || path === "/design-system") {
    return [];
  }

  for (const section of breadcrumbSections) {
    // Exact match → section landing. A single crumb is no hierarchy, so the
    // trail is omitted entirely rather than rendering one dead label.
    if (path === section.base) return [];

    // Sub-page within a section (e.g. /work/augmenta-ai)
    if (path.startsWith(section.base + "/")) {
      const subLink = section.sidebar?.find((l) => l.href === path);
      const subLabel = subLink?.label ?? slugToTitle(path.slice(section.base.length + 1));
      return [{ label: section.label, href: section.base }, { label: subLabel }];
    }
  }

  return [];
}
