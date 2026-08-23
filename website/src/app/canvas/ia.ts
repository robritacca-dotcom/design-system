import {
  docsSidebarLinks,
  foundationsSidebarLinks,
  workSidebarLinks,
  type NavLink,
} from "@/config/navigation";
import essays from "@/data/essays.json";

/** One page on the board: a route and the name it is labelled with. */
export interface CanvasPage {
  href: string;
  label: string;
}

/** One top-level branch of the site's IA; its pages sit together on the board. */
export interface CanvasSection {
  id: string;
  label: string;
  pages: CanvasPage[];
}

/** A sidebar array's pages, with its "Contents" index row renamed to the section. */
function sectionPages(links: NavLink[], indexLabel: string): CanvasPage[] {
  return links.map((link, i) => ({
    href: link.href,
    label: i === 0 ? indexLabel : link.label,
  }));
}

/**
 * The site's information architecture as the canvas lays it out: the same
 * top-level branches MegaNav draws, in nav order, each carrying the pages its
 * sidebar lists. Derived from navigation.ts rather than restated, so a page
 * added to a sidebar lands on the board with it. Writing's essays come from
 * the synced essays registry, the same source the site's own pages read.
 *
 * The component showcase pages are not here: they are demo shells, a
 * hundred of them, and belong to a component view of the board rather
 * than the page view.
 */
export function siteSections(): CanvasSection[] {
  return [
    { id: "home", label: "Home", pages: [{ href: "/", label: "Home" }] },
    { id: "about", label: "About", pages: [{ href: "/about", label: "About" }] },
    { id: "work", label: "Work", pages: sectionPages(workSidebarLinks, "Work") },
    {
      id: "writing",
      label: "Writing",
      pages: [
        { href: "/writing", label: "Writing" },
        ...essays.essays.map((essay) => ({
          href: `/writing/${essay.slug}`,
          label: essay.title,
        })),
      ],
    },
    {
      id: "design-system",
      label: "Design system",
      pages: [
        { href: "/design-system", label: "Design system" },
        ...sectionPages(docsSidebarLinks, "Docs"),
        ...sectionPages(foundationsSidebarLinks, "Foundations"),
        { href: "/components", label: "Components" },
        { href: "/playground", label: "Playground" },
      ],
    },
    { id: "contact", label: "Contact", pages: [{ href: "/contact", label: "Contact" }] },
  ];
}
