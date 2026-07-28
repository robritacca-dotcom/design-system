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
    .map(
      (link) =>
        `- [${link.label}](${SITE_URL}${link.href})${link.description ? `: ${link.description}` : ""}`
    )
    .join("\n");
  return `## ${title}\n\n${intro}\n\n${items}`;
}

export function GET() {
  const body = [
    "# Robert Ritacca",
    "",
    "> Portfolio of Robert Ritacca, Principal Product Designer: AI product case studies (Intuit, Meta, Augmenta) and robr0 DS, a fully documented one-person design system with an open React component library.",
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
    "## Playground",
    "",
    "Interactive theming for the design system.",
    "",
    `- [Playground](${SITE_URL}/playground): re-theme the design system live and copy the generated CSS`,
    "",
    "## About & writing",
    "",
    "The person behind the work, and long-form writing on design and AI.",
    "",
    `- [About](${SITE_URL}/about): background, principles, and career history`,
    `- [Writing](${SITE_URL}/writing): essays on design and AI (mirrored from Substack)`,
    `- [Contact](${SITE_URL}/contact): ways to get in touch`,
    "",
    "## Optional",
    "",
    "Raw markdown sources and machine-readable indexes.",
    "",
    `- [CLAUDE.md](${SITE_URL}/CLAUDE.md): the repo's agent instructions (architecture, registries, and workflows)`,
    `- [GitHub source](https://github.com/robritacca-dotcom/design-system): exact TypeScript prop types live in src/components/<Name>/<Name>.tsx`,
    `- [npm package](https://www.npmjs.com/package/@robr0/design-system): \`npm install @robr0/design-system\` ships complete .d.ts type declarations for every component`,
    `- [design.md](${SITE_URL}/design.md): the full design specification (tokens, colours, typography, component rules)`,
    `- [content-design.md](${SITE_URL}/content-design.md): the writing rules (voice, register by surface, words and patterns the project never ships)`,
    `- [Sitemap](${SITE_URL}/sitemap.xml)`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
