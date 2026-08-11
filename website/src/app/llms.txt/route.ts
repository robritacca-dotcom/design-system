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
    "> Portfolio of Robert Ritacca, Principal Product Designer: AI product case studies (Intuit, Meta, Augmenta) and robr0 DS, an AI-ready design system built by Claude Code from published specs (CLAUDE.md, design.md, content-design.md) and shipped to npm as an open React component library.",
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
    `- [Playground](${SITE_URL}/playground): re-theme the design system live (components, chat and all) and copy the generated CSS`,
    `- [Design system landing](${SITE_URL}/design-system): the whole system working on one page, with live component demos`,
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
    `- [Storybook](https://design-system-iota-one.vercel.app): the rendered API reference. Every component has a props table with types, defaults, and deprecations`,
    `- [npm package](https://www.npmjs.com/package/@robr0/design-system): \`npm install @robr0/design-system\` ships complete .d.ts type declarations for every component`,
    `- [CLAUDE.md](${SITE_URL}/CLAUDE.md): how this repository is *maintained* (architecture, registries, workflows). Written for contributors to the system itself, not for people using the package: for that, read design.md below and the README`,
    `- [GitHub source](https://github.com/robritacca-dotcom/design-system): the full source, if you want to read the implementation`,
    `- [design.md](${SITE_URL}/design.md): the full design specification (tokens, colours, typography, component rules)`,
    `- [content-design.md](${SITE_URL}/content-design.md): the writing rules (voice, register by surface, words and patterns the project never ships)`,
    `- [Sitemap](${SITE_URL}/sitemap.xml)`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
