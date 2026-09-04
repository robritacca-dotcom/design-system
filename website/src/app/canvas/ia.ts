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

/**
 * What the board shows: the landing page of every top-level branch of the
 * site's IA, in nav order, and nothing below. Every frame is a live page,
 * and a live page costs what a browser tab costs, so the board stops at the
 * front doors: the case studies, the essays, the docs, the foundations and
 * the component pages are a click away inside their section's frame, not
 * frames of their own.
 */
export function siteSections(): CanvasSection[] {
  return [
    { id: "home", label: "Home", pages: [{ href: "/", label: "Home" }] },
    { id: "about", label: "About", pages: [{ href: "/about", label: "About" }] },
    { id: "work", label: "Work", pages: [{ href: "/work", label: "Work" }] },
    { id: "writing", label: "Writing", pages: [{ href: "/writing", label: "Writing" }] },
    {
      id: "design-system",
      label: "Design system",
      pages: [{ href: "/design-system", label: "Design system" }],
    },
    { id: "contact", label: "Contact", pages: [{ href: "/contact", label: "Contact" }] },
  ];
}
