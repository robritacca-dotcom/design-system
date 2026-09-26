import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/substack";
import { workSidebarLinks } from "@/config/navigation";
import { SITE_URL } from "@/config/site";

const baseUrl = SITE_URL;

type ChangeFrequency = MetadataRoute.Sitemap[number]["changeFrequency"];

function changeFrequency(route: string): ChangeFrequency {
  if (route === "") return "monthly";
  if (route.startsWith("/writing") || route === "/project-journal" || route === "/loops")
    return "weekly";
  if (route.startsWith("/work")) return "yearly"; // case studies are evergreen
  return "monthly";
}

function priority(route: string): number {
  if (route === "") return 1;
  return route.split("/").length === 2 ? 0.8 : 0.6;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Writing articles are pulled from the Substack feed, so the sitemap stays in
  // sync as posts are published.
  const articles = await getArticles();

  // Section clusters derive from the shared sidebar configs in navigation.ts —
  // the single source of truth for these routes — so the sitemap can't drift
  // when a page is added there.
  //
  // The design-system clusters (components, foundations, templates, docs,
  // blueprints, overview, playground, graph, skills, loops, project-journal) are
  // deliberately absent: they are permanent redirects to rift-ds.com as of
  // 2026-09-26. A sitemap should list pages that answer 200, not redirects —
  // otherwise Search Console reports every one of them as "page with redirect".
  //
  // /design-system stays. It is no longer the documentation landing page; it is
  // the page about having built the thing, and it still lives here.
  const staticRoutes = [
    "",
    "/about",
    "/writing",
    "/contact",
    "/privacy",
    "/design-system",
    ...workSidebarLinks.map((l) => l.href),
  ];

  // No lastModified on these. It used to come from `git log` per source file,
  // which reads well locally and degrades to one identical build date on
  // Vercel's shallow clone, so every URL claimed to change whenever the site
  // deployed. Google ignores a lastmod it does not trust, and an omitted date
  // is honest where a wrong one is noise. Articles below keep theirs, because
  // a publish date is a real date.
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: changeFrequency(route),
    priority: priority(route),
  }));

  // Articles use their real publish date, not a source-file commit time.
  const articleEntries: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${baseUrl}/writing/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticEntries, ...articleEntries];
}
