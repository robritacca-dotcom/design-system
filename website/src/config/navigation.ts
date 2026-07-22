/* ============================================
   SHARED NAVIGATION CONFIG
   Single source of truth for all nav, sidebar,
   and subnav links across the site.
   ============================================ */

import { COMPONENT_COUNT } from "@design-system/components/registry";

export interface NavLink {
  href: string;
  label: string;
  active?: boolean;
  disabled?: boolean;
  /** Optional logo path (e.g. "/logos/Intuit.svg") rendered to the left of the label in Sidebar */
  logo?: string;
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
    description: "Colours, type, spacing, icons, and logos",
    icon: "category",
  },
  {
    href: "/components",
    label: "Components",
    description: `${COMPONENT_COUNT} React components with full Storybook docs`,
    icon: "widgets",
  },
];

/** URL prefixes that should mark the "Design system" mega trigger as active */
export const dsActiveMatchers = [
  (path: string) => path === "/docs",
  (path: string) => path === "/about", // exact — /about/me is NOT under Design system
  (path: string) => path.startsWith("/blueprints"),
  (path: string) => path.startsWith("/skills"),
  (path: string) => path.startsWith("/loops"),
  (path: string) => path.startsWith("/project-journal"),
  (path: string) => path.startsWith("/foundations"),
  (path: string) => path.startsWith("/components"),
];

export function isDesignSystemPath(pathname: string): boolean {
  return dsActiveMatchers.some((match) => match(pathname));
}

/* ============================================
   SECTION SIDEBAR LINKS
   ============================================ */

export const componentsSidebarLinks: NavLink[] = [
  { href: "/components", label: "Components overview" },
  { href: "/components/accordion", label: "Accordion" },
  { href: "/components/alert", label: "Alert" },
  { href: "/components/alert-dialog", label: "Alert dialog" },
  { href: "/components/app-sidebar", label: "App sidebar" },
  { href: "/components/avatar", label: "Avatar" },
  { href: "/components/badge", label: "Badge" },
  { href: "/components/breadcrumb", label: "Breadcrumb" },
  { href: "/components/button", label: "Button" },
  { href: "/components/button-group", label: "Button group" },
  { href: "/components/card", label: "Card" },
  { href: "/components/contact-card", label: "Contact card" },
  { href: "/components/carousel", label: "Carousel" },
  { href: "/components/chart", label: "Chart" },
  { href: "/components/checkbox", label: "Checkbox" },
  { href: "/components/chip", label: "Chip" },
  { href: "/components/circular-button", label: "Circular button" },
  { href: "/components/code-block", label: "Code block" },
  { href: "/components/contribution-graph", label: "Contribution graph" },
  { href: "/components/date-input", label: "Date input" },
  { href: "/components/date-picker", label: "Date picker" },
  { href: "/components/dialog", label: "Dialog" },
  { href: "/components/divider", label: "Divider" },
  { href: "/components/dropdown", label: "Dropdown" },
  { href: "/components/dropdown-menu", label: "Dropdown menu" },
  { href: "/components/figure", label: "Figure" },
  { href: "/components/input", label: "Input" },
  { href: "/components/instructions", label: "Instructions" },
  { href: "/components/link-list", label: "Link list" },
  { href: "/components/navigation", label: "Navigation" },
  { href: "/components/pagination", label: "Pagination" },
  { href: "/components/popover", label: "Popover" },
  { href: "/components/progress-bar", label: "Progress bar" },
  { href: "/components/quote", label: "Quote" },
  { href: "/components/radio-button", label: "Radio button" },
  { href: "/components/section-title", label: "Section title" },
  { href: "/components/selection-card", label: "Selection card" },
  { href: "/components/segmented-control", label: "Segmented control" },
  { href: "/components/skeleton", label: "Skeleton" },
  { href: "/components/slider", label: "Slider" },
  { href: "/components/spinner", label: "Spinner" },
  { href: "/components/stat", label: "Stat" },
  { href: "/components/table", label: "Table" },
  { href: "/components/tabs", label: "Tabs" },
  { href: "/components/textarea", label: "Textarea" },
  { href: "/components/timeline", label: "Timeline" },
  { href: "/components/toast", label: "Toast" },
  { href: "/components/toggle-group", label: "Toggle group" },
  { href: "/components/toggle-switch", label: "Toggle switch" },
  { href: "/components/tooltip", label: "Tooltip" },
];

export const foundationsSidebarLinks: NavLink[] = [
  { href: "/foundations", label: "Contents" },
  { href: "/foundations/icons", label: "Icons" },
  { href: "/foundations/logos", label: "Logos" },
  { href: "/foundations/colour-primitives", label: "Primitive colours" },
  { href: "/foundations/colour-mode", label: "Semantic colours" },
  { href: "/foundations/spatial", label: "Semantic spacing" },
  { href: "/foundations/typography", label: "Typography" },
];

/**
 * Sidebar for the Docs cluster — the /docs index page, the system overview,
 * and the artifacts (Claude MD, Design MD, Skills, Loops) visitors can take
 * and reuse. (Sub-pages keep their original URLs; /docs is the landing.)
 */
export const docsSidebarLinks: NavLink[] = [
  { href: "/docs", label: "Contents" },
  { href: "/about", label: "Overview" },
  { href: "/blueprints/claude", label: "Claude MD" },
  { href: "/blueprints/design", label: "Design MD" },
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
  { href: "/work/augmenta-ai", label: "AI Construction Platform", logo: "/logos/logo/Augmenta.png" },
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

  // Top-level pages with no breadcrumb
  if (path === "/" || path === "/contact" || path === "/about/me") {
    return [];
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
