/* ============================================
   SHARED NAVIGATION CONFIG
   Single source of truth for all nav, sidebar,
   and subnav links across the site.
   ============================================ */

export interface NavLink {
  href: string;
  label: string;
  active?: boolean;
}

/* ============================================
   TOP NAV — shared across every page
   ============================================ */

export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/components", label: "Components" },
  { href: "/foundations", label: "Foundations" },
];

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

export const aboutSidebarLinks: NavLink[] = [
  { href: "/about", label: "About robr0 DS" },
  { href: "/about/me", label: "About me" },
  { href: "/about/work", label: "Work" },
];

/* ============================================
   HELPERS
   ============================================ */

/**
 * Returns navLinks with the correct section marked active.
 * @param section — "Home" | "About" | "Components" | "Foundations"
 */
export function getNavLinks(section: string): NavLink[] {
  return navLinks.map((link) => ({
    ...link,
    active: link.label === section ? true : undefined,
  }));
}

/**
 * Returns sidebar links with the matching href marked active,
 * plus derives subnavLinks for the Header component.
 */
export function getSidebarLinks(links: NavLink[], activeHref: string) {
  const sidebarLinks = links.map((link) => ({
    ...link,
    active: link.href === activeHref ? true : undefined,
  }));

  const subnavLinks = sidebarLinks.map((l) => ({
    href: l.href,
    label: l.label,
    active: l.active,
  }));

  return { sidebarLinks, subnavLinks };
}
