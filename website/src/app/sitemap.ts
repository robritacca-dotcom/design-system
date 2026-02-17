import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://robr0-ds.vercel.app";

  const routes = [
    "",
    "/about",
    "/about/me",
    "/components",
    "/components/accordion",
    "/components/alert",
    "/components/badge",
    "/components/breadcrumb",
    "/components/button",
    "/components/button-group",
    "/components/card",
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
    "/components/skeleton",
    "/components/slider",
    "/components/spinner",
    "/components/table",
    "/components/tabs",
    "/components/textarea",
    "/components/toggle-group",
    "/components/toggle-switch",
    "/foundations",
    "/foundations/colour-mode",
    "/foundations/colour-primitives",
    "/foundations/icons",
    "/foundations/logos",
    "/foundations/spatial",
    "/foundations/typography",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : route.split("/").length === 2 ? 0.8 : 0.6,
  }));
}
