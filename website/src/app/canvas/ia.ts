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
 * site's IA, in nav order, plus the landing pages of the design system's
 * own sub-sections. Every frame is a live page, and a live page costs what
 * a browser tab costs, so the board stops at the doors rather than walk
 * every room: the case studies, the essays, the docs, the foundations and
 * the hundred component pages are a click away inside their section's
 * frame, not frames of their own.
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
      pages: [
        { href: "/design-system", label: "Design system" },
        { href: "/docs", label: "Docs" },
        { href: "/foundations", label: "Foundations" },
        { href: "/components", label: "Components" },
        { href: "/playground", label: "Playground" },
      ],
    },
    { id: "contact", label: "Contact", pages: [{ href: "/contact", label: "Contact" }] },
  ];
}
