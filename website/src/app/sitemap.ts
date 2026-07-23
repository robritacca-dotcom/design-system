import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/substack";
import {
  componentsSidebarLinks,
  docsSidebarLinks,
  foundationsSidebarLinks,
  workSidebarLinks,
} from "@/config/navigation";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://robertritacca.com";

  // Writing articles are pulled from the Substack feed, so the sitemap
  // stays in sync as posts are published.
  const articles = await getArticles();

  const routes = [
    // Home + personal
    "",
    "/about",
    "/writing",
    ...articles.map((a) => `/writing/${a.slug}`),
    "/contact",

    // Section clusters derive from the shared sidebar configs in
    // navigation.ts — the single source of truth for these routes —
    // so the sitemap can't drift when a page is added there.
    ...workSidebarLinks.map((l) => l.href),
    ...docsSidebarLinks.map((l) => l.href),
    ...foundationsSidebarLinks.map((l) => l.href),
    ...componentsSidebarLinks.map((l) => l.href),
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : route.split("/").length === 2 ? 0.8 : 0.6,
  }));
}
