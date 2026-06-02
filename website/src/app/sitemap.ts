import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://robertritacca.com";

  const routes = [
    // Home + personal
    "",
    "/about/me",
    "/work",
    "/work/embedded-ai-turbotax",
    "/work/robr0-ds",
    "/work/cibc-firstcaribbean",
    "/work/meta-career-profile",
    "/work/meta-offers",
    "/work/augmenta-ai",
    "/work/intuit-agent-chat",
    "/contact",

    // Design system cluster (About is the landing)
    "/about",
    "/blueprints/claude",
    "/blueprints/design",
    "/skills",

    // Foundations
    "/foundations",
    "/foundations/colour-mode",
    "/foundations/colour-primitives",
    "/foundations/icons",
    "/foundations/logos",
    "/foundations/spatial",
    "/foundations/typography",

    // Components — every page in the library
    "/components",
    "/components/accordion",
    "/components/alert",
    "/components/alert-dialog",
    "/components/app-sidebar",
    "/components/avatar",
    "/components/badge",
    "/components/breadcrumb",
    "/components/button",
    "/components/button-group",
    "/components/card",
    "/components/carousel",
    "/components/chart",
    "/components/checkbox",
    "/components/circular-button",
    "/components/date-input",
    "/components/date-picker",
    "/components/dropdown",
    "/components/dropdown-menu",
    "/components/input",
    "/components/instructions",
    "/components/navigation",
    "/components/popover",
    "/components/progress-bar",
    "/components/radio-button",
    "/components/section-title",
    "/components/segmented-control",
    "/components/selection-card",
    "/components/skeleton",
    "/components/slider",
    "/components/spinner",
    "/components/table",
    "/components/tabs",
    "/components/textarea",
    "/components/toast",
    "/components/toggle-group",
    "/components/toggle-switch",
    "/components/tooltip",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : route.split("/").length === 2 ? 0.8 : 0.6,
  }));
}
