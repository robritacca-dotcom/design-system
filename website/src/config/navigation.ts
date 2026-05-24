/* ============================================
   SHARED NAVIGATION CONFIG
   Single source of truth for all nav, sidebar,
   and subnav links across the site.
   ============================================ */

export interface NavLink {
  href: string;
  label: string;
  active?: boolean;
  disabled?: boolean;
  /** Optional logo path (e.g. "/logos/Intuit.svg") rendered to the left of the label in Sidebar */
  logo?: string;
}

/** A row in the Design system mega menu */
export interface MegaItem {
  href: string;
  label: string;
  description: string;
  icon: string; // Material Symbols name
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
    href: "/about",
    label: "About",
    description: "How robr0 DS works, plus the artifacts you can take and reuse",
    icon: "info",
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
    description: "42 React components with full Storybook docs",
    icon: "widgets",
  },
];

/** URL prefixes that should mark the "Design system" mega trigger as active */
export const dsActiveMatchers = [
  (path: string) => path === "/about", // exact — /about/me is NOT under Design system
  (path: string) => path.startsWith("/blueprints"),
  (path: string) => path.startsWith("/skills"),
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
  { href: "/components", label: "Contents" },
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
  { href: "/components/carousel", label: "Carousel" },
  { href: "/components/chart", label: "Chart" },
  { href: "/components/checkbox", label: "Checkbox" },
  { href: "/components/circular-button", label: "Circular button" },
  { href: "/components/date-input", label: "Date input" },
  { href: "/components/date-picker", label: "Date picker" },
  { href: "/components/dropdown", label: "Dropdown" },
  { href: "/components/dropdown-menu", label: "Dropdown menu" },
  { href: "/components/input", label: "Input" },
  { href: "/components/instructions", label: "Instructions" },
  { href: "/components/navigation", label: "Navigation" },
  { href: "/components/popover", label: "Popover" },
  { href: "/components/progress-bar", label: "Progress bar" },
  { href: "/components/radio-button", label: "Radio button" },
  { href: "/components/section-title", label: "Section title" },
  { href: "/components/selection-card", label: "Selection card" },
  { href: "/components/segmented-control", label: "Segmented control" },
  { href: "/components/skeleton", label: "Skeleton" },
  { href: "/components/slider", label: "Slider" },
  { href: "/components/spinner", label: "Spinner" },
  { href: "/components/table", label: "Table" },
  { href: "/components/tabs", label: "Tabs" },
  { href: "/components/textarea", label: "Textarea" },
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
 * Sidebar for the About cluster — the landing page + the artifacts
 * (Claude MD, Design MD, Skills) that visitors can take and reuse.
 */
export const aboutSidebarLinks: NavLink[] = [
  { href: "/about", label: "About" },
  { href: "/blueprints/claude", label: "Claude MD" },
  { href: "/blueprints/design", label: "Design MD" },
  { href: "/skills", label: "Skills" },
];

export const workSidebarLinks: NavLink[] = [
  { href: "/work", label: "Overview" },
  { href: "/work/embedded-ai-turbotax", label: "Embedded AI Experiences", logo: "/logos/Intuit.svg" },
  { href: "/work/robr0-ds", label: "Building robr0 DS", logo: "/logos/rr.svg" },
  { href: "/work/cibc-firstcaribbean", label: "FirstCaribbean", logo: "/logos/CIBC.svg" },
  { href: "/work/meta-career-profile", label: "Career Profile", logo: "/logos/meta.svg" },
  { href: "/work/augmenta-ai", label: "Construction Platform", logo: "/logos/Augmenta.svg" },
  { href: "#", label: "Agent chat", disabled: true, logo: "/logos/Intuit.svg" },
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
  // About cluster — all four pages share the same parent breadcrumb
  { base: "/about", label: "About", parent: "Design system", sidebar: null },
  { base: "/blueprints/claude", label: "Claude MD", parent: "Design system", sidebar: null },
  { base: "/blueprints/design", label: "Design MD", parent: "Design system", sidebar: null },
  { base: "/skills", label: "Skills", parent: "Design system", sidebar: null },
  // Other DS sections
  { base: "/foundations", label: "Foundations", parent: "Design system", sidebar: foundationsSidebarLinks },
  { base: "/components", label: "Components", parent: "Design system", sidebar: componentsSidebarLinks },
  { base: "/work", label: "Work", parent: null, sidebar: workSidebarLinks },
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
  if (path === "/" || path === "/contact" || path === "/about/me" || path === "/about/work") {
    return [];
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
