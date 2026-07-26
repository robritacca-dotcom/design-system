import type { MetadataRoute } from "next";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { getArticles } from "@/lib/substack";
import {
  componentsSidebarLinks,
  customizationSidebarLinks,
  docsSidebarLinks,
  foundationsSidebarLinks,
  workSidebarLinks,
} from "@/config/navigation";

const baseUrl = "https://robertritacca.com";
const appDir = path.join(process.cwd(), "src", "app");

// Fallback when git history is unavailable. Evaluated once at module load —
// build time for the statically-generated sitemap.
const BUILD_DATE = new Date();

type ChangeFrequency = MetadataRoute.Sitemap[number]["changeFrequency"];

/**
 * Last commit time for a source file, memoized. Real per-file dates give
 * crawlers an honest freshness signal instead of a build-time "changed today"
 * on every URL. Falls back to the build date when git or history is missing
 * (e.g. Vercel's default shallow clone yields the HEAD date for every file, and
 * there is no git at runtime) — degraded but stable, never worse than before.
 */
const gitCache = new Map<string, Date>();
function lastCommit(file: string): Date {
  const cached = gitCache.get(file);
  if (cached) return cached;
  let when = BUILD_DATE;
  try {
    const iso = execFileSync(
      "git",
      ["log", "-1", "--format=%cI", "--", file],
      { cwd: appDir, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }
    ).trim();
    if (iso) when = new Date(iso);
  } catch {
    /* no git / no history — keep BUILD_DATE */
  }
  gitCache.set(file, when);
  return when;
}

/** Every route maps to its `src/app/<route>/page.tsx` source file. */
function fileForRoute(route: string): string {
  const rel = route === "" ? "page.tsx" : `${route.replace(/^\//, "")}/page.tsx`;
  return path.join(appDir, rel);
}

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
  const staticRoutes = [
    "",
    "/about",
    "/writing",
    "/contact",
    ...workSidebarLinks.map((l) => l.href),
    ...docsSidebarLinks.map((l) => l.href),
    ...foundationsSidebarLinks.map((l) => l.href),
    ...componentsSidebarLinks.map((l) => l.href),
    ...customizationSidebarLinks.map((l) => l.href),
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: lastCommit(fileForRoute(route)),
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
