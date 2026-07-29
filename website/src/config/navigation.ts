/* ============================================
   SHARED NAVIGATION CONFIG
   Single source of truth for all nav, sidebar,
   and subnav links across the site.
   ============================================ */

import type { Metadata } from "next";
import {
  COMPONENT_COUNT,
  componentMetadata,
} from "@robr0/design-system/components/registry";

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

/** A row in a mega menu — provide either an `icon` (Material Symbol) or a `logo` (image path) */
export interface MegaItem {
  href: string;
  label: string;
  description: string;
  icon?: string; // Material Symbols name
  logo?: string; // Path to logo SVG/image — rendered in the icon slot when set
}

/** One step in a breadcrumb trail; omit href for the current page (last item) */
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/* ============================================
   TOP NAV — shared across every page
   ============================================ */

/* ============================================
   DESIGN SYSTEM MEGA MENU
   Drives the dropdown panel on the "Design system" trigger.
   Add a new item here and it appears in the mega.
   ============================================ */

export const dsMegaItems: MegaItem[] = [
  {
    href: "/docs",
    label: "Docs",
    description: "How robr0 DS works, plus the artifacts you can take and reuse",
    icon: "menu_book",
  },
  {
    href: "/foundations",
    label: "Foundations",
    description: "Colours, type, spacing, motion, icons, and logos",
    icon: "category",
  },
  {
    href: "/components",
    label: "Components",
    description: `${COMPONENT_COUNT} React components with full Storybook docs`,
    icon: "widgets",
  },
  {
    href: "/playground",
    label: "Playground",
    description: "Re-theme the whole system live and copy the CSS it generates",
    icon: "tune",
  },
];

/** URL prefixes that should mark the "Design system" mega trigger as active */
export const dsActiveMatchers = [
  (path: string) => path === "/design-system", // the DS landing the mega trigger links to
  (path: string) => path.startsWith("/docs"),
  (path: string) => path === "/overview", // the DS overview; /about (personal bio) is NOT under Design system
  (path: string) => path.startsWith("/blueprints"),
  (path: string) => path.startsWith("/skills"),
  (path: string) => path.startsWith("/loops"),
  (path: string) => path.startsWith("/project-journal"),
  (path: string) => path.startsWith("/foundations"),
  (path: string) => path.startsWith("/components"),
  (path: string) => path === "/playground",
];

export function isDesignSystemPath(pathname: string): boolean {
  return dsActiveMatchers.some((match) => match(pathname));
}

/* ============================================
   SECTION SIDEBAR LINKS
   ============================================ */

/**
 * Derived from the component registry — never hand-maintained.
 *
 * Every entry's label, slug and description live in
 * src/components/registry.json, so adding a component to the registry puts it
 * in the sidebar, the sitemap, the mega-nav and the breadcrumbs at once. The
 * alphabetical order and the nav entry itself used to be checked by
 * validate-website-surfaces.mjs; both are now structurally guaranteed.
 */
export const componentsSidebarLinks: NavLink[] = [
  { href: "/components", label: "Components overview" },
  ...[...componentMetadata]
    .sort((a, b) => a.label.localeCompare(b.label))
    .map((c) => ({
      href: `/components/${c.slug}`,
      label: c.label,
      description: c.description,
    })),
];

export const foundationsSidebarLinks: NavLink[] = [
  { href: "/foundations", label: "Contents" },
  { href: "/foundations/elevation", label: "Elevation" },
  { href: "/foundations/icons", label: "Icons" },
  { href: "/foundations/logos", label: "Logos" },
  { href: "/foundations/motion", label: "Motion" },
  { href: "/foundations/colour-primitives", label: "Primitive colours" },
  { href: "/foundations/colour-mode", label: "Semantic colours" },
  { href: "/foundations/spatial", label: "Semantic spacing" },
  { href: "/foundations/typography", label: "Typography" },
];

/**
 * Sidebar for the Docs cluster — the /docs index page, the system overview,
 * and the artifacts (Claude MD, Design MD, Content MD, Skills, Loops)
 * visitors can take and reuse. (Sub-pages keep their original URLs; /docs
 * is the landing.)
 */
export const docsSidebarLinks: NavLink[] = [
  { href: "/docs", label: "Contents" },
  { href: "/overview", label: "Overview" },
  { href: "/docs/get-started", label: "Get started" },
  { href: "/blueprints/claude", label: "Claude MD" },
  { href: "/blueprints/design", label: "Design MD" },
  { href: "/blueprints/content-design", label: "Content MD" },
  { href: "/skills", label: "Skills" },
  { href: "/loops", label: "Loops" },
  { href: "/project-journal", label: "Project journal" },
];

/**
 * Sidebar for the Writing cluster. Built dynamically from the articles
 * synced off the Substack feed, so it always reflects what's published.
 */
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
  { href: "/work/augmenta-ai", label: "Construction Platform", logo: "/logos/logo/Augmenta.png" },
  { href: "/work/meta-career-profile", label: "Career Profile", logo: "/logos/meta.svg" },
  { href: "/work/meta-offers", label: "Offer Creation Flow", logo: "/logos/meta.svg" },
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
const allSidebarLinks: NavLink[] = [
  ...componentsSidebarLinks,
  ...foundationsSidebarLinks,
  ...docsSidebarLinks,
  ...workSidebarLinks,
];

/** The canonical label for a route, taken from the nav config (or undefined). */
export function getNavLabel(href: string): string | undefined {
  return allSidebarLinks.find((link) => link.href === href)?.label;
}

/** The brand suffix appended to every page's browser-tab title. */
export const TITLE_SUFFIX = "Robert Ritacca";
/** Next.js title template — applied to child route segments' titles. */
export const TITLE_TEMPLATE = `%s · ${TITLE_SUFFIX}`;

/**
 * Metadata for a section landing layout (Components, Foundations, Work). Sets
 * the section's own suffixed title AND re-declares the title template so the
 * suffix cascades to the section's sub-pages — Next only applies a template to
 * direct children, so intermediate layouts must carry it or grandchildren would
 * render bare, unsuffixed titles.
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
  return description ? { title, description } : { title };
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
  return description ? { title, description, alternates } : { title, alternates };
}

/**
 * Metadata for a component showcase page, resolved entirely from the registry.
 *
 * Replaces hand-writing the same one-line description in both registry.json and
 * the page's layout.tsx — the registry is the only place it lives now.
 */
export function componentPageMetadata(slug: string): Metadata {
  const meta = componentMetadata.find((c) => c.slug === slug);
  if (!meta) {
    throw new Error(
      `componentPageMetadata: no component registered with slug "${slug}". ` +
        `Add it to src/components/registry.json.`
    );
  }
  return pageMetadata(`/components/${slug}`, meta.description);
}

/* ============================================
   BREADCRUMBS
   Builds a trail based on pathname, walking the
   IA: Design system > <Section> > <Page>, or
   Work > <Case study>. Returns [] for top-level
   landing pages that don't need a breadcrumb.
   ============================================ */

interface SectionConfig {
  base: string;
  label: string;
  parent: string | null;
  sidebar: NavLink[] | null;
}

const breadcrumbSections: SectionConfig[] = [
  // Docs cluster pages are handled directly in getBreadcrumbs (driven by
  // docsSidebarLinks) since their URLs don't share a /docs prefix.
  // Other DS sections
  { base: "/foundations", label: "Foundations", parent: "Design system", sidebar: foundationsSidebarLinks },
  { base: "/components", label: "Components", parent: "Design system", sidebar: componentsSidebarLinks },
  { base: "/work", label: "Work", parent: null, sidebar: workSidebarLinks },
  // Writing — article sub-labels resolve from the slug (feed is dynamic)
  { base: "/writing", label: "Writing", parent: null, sidebar: null },
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

  // Top-level pages with no breadcrumb (/design-system is the DS landing —
  // it opens with a full-bleed hero, not a doc shell)
  if (path === "/" || path === "/contact" || path === "/about" || path === "/design-system") {
    return [];
  }

  // Playground — a standalone page under the Design system umbrella (it lives
  // in no sidebar array, so the generic section loop can't resolve it).
  if (path === "/playground") {
    return [{ label: "Design system" }, { label: "Playground" }];
  }

  // Docs cluster — the landing lives at /docs but sub-pages keep their
  // original URLs, so match against the sidebar links (no shared prefix).
  if (path === "/docs") {
    return [{ label: "Design system" }, { label: "Docs" }];
  }
  const docsLink = docsSidebarLinks.find((l) => l.href === path && l.href !== "/docs");
  if (docsLink) {
    return [
      { label: "Design system" },
      { label: "Docs", href: "/docs" },
      { label: docsLink.label },
    ];
  }

  for (const section of breadcrumbSections) {
    // Exact match → section landing (e.g. /components, /about)
    if (path === section.base) {
      const items: BreadcrumbItem[] = [];
      if (section.parent) items.push({ label: section.parent });
      items.push({ label: section.label });
      // Skip if only one item — no real hierarchy
      return items.length >= 2 ? items : [];
    }

    // Sub-page within a section (e.g. /components/button)
    if (path.startsWith(section.base + "/")) {
      const items: BreadcrumbItem[] = [];
      if (section.parent) items.push({ label: section.parent });
      items.push({ label: section.label, href: section.base });

      const subLink = section.sidebar?.find((l) => l.href === path);
      const subLabel = subLink?.label ?? slugToTitle(path.slice(section.base.length + 1));
      items.push({ label: subLabel });
      return items;
    }
  }

  return [];
}
