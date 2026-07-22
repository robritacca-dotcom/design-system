import {
  componentsSidebarLinks,
  docsSidebarLinks,
  foundationsSidebarLinks,
  workSidebarLinks,
  type NavLink,
} from "@/config/navigation";
import { SITE_URL } from "@/lib/structuredData";

/**
 * /llms.txt — a markdown index of the site for AI agents, per llmstxt.org.
 * Link lists are derived from the shared navigation config so they can never
 * drift from what the site actually serves.
 */

export const dynamic = "force-static";

function section(title: string, intro: string, links: NavLink[]): string {
  const items = links
    .filter((link) => !link.disabled && link.label !== "Contents")
    .map((link) => `- [${link.label}](${SITE_URL}${link.href})`)
    .join("\n");
  return `## ${title}\n\n${intro}\n\n${items}`;
}

export function GET() {
  const body = [
    "# Robert Ritacca",
    "",
    "> Portfolio of Robert Ritacca, Principal Product Designer — AI product case studies (Intuit, Meta, Augmenta) and robr0 DS, a fully documented one-person design system with an open React component library.",
    "",
    section(
      "Work",
      `Case studies. Index at ${SITE_URL}/work.`,
      workSidebarLinks
    ),
    "",
    section(
      "Design system docs",
      `How robr0 DS works and the artifacts you can reuse. Index at ${SITE_URL}/docs.`,
      docsSidebarLinks
    ),
    "",
    section(
      "Foundations",
      `Design tokens and language. Index at ${SITE_URL}/foundations.`,
      foundationsSidebarLinks
    ),
    "",
    section(
      "Components",
      `React component documentation with live examples. Index at ${SITE_URL}/components.`,
      componentsSidebarLinks
    ),
    "",
    "## Optional",
    "",
    "Raw markdown sources and machine-readable indexes.",
    "",
    `- [CLAUDE.md](${SITE_URL}/CLAUDE.md): the repo's agent instructions — architecture, registries, and workflows`,
    `- [design.md](${SITE_URL}/design.md): the full design specification — tokens, colours, typography, component rules`,
    `- [Sitemap](${SITE_URL}/sitemap.xml)`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
