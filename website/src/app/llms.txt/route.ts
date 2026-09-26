import { workSidebarLinks, type NavLink } from "@/config/navigation";
import { SITE_URL } from "@/lib/structuredData";

/**
 * /llms.txt — a markdown index of the site for AI agents, per llmstxt.org.
 * Link lists are derived from the shared navigation config so they can never
 * drift from what the site actually serves.
 *
 * This index covers the portfolio only. The design system used to be
 * documented here and is now its own site, so it gets a pointer rather than a
 * section: an agent that wants component or token detail should read
 * rift-ds.com/llms.txt, which indexes it properly and stays current with it.
 */

export const dynamic = "force-static";

/** Where the design system lives now. Also stated in next.config.ts. */
const DESIGN_SYSTEM_URL = "https://rift-ds.com";

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
    "> Portfolio of Robert Ritacca, Principal Product Designer in Toronto: AI product case studies from Intuit, Meta and Augmenta, essays on design and AI, and Rift DS, an open React design system he designed and built.",
    "",
    section(
      "Work",
      `Case studies. Index at ${SITE_URL}/work.`,
      workSidebarLinks
    ),
    "",
    "## About & writing",
    "",
    "The person behind the work, and long-form writing on design and AI.",
    "",
    `- [About](${SITE_URL}/about): background, principles, and career history`,
    `- [Writing](${SITE_URL}/writing): essays on design and AI (mirrored from Substack)`,
    `- [Contact](${SITE_URL}/contact): ways to get in touch, and to book a paid one-hour consultation`,
    "",
    "## Rift DS",
    "",
    "The design system this site is built on. Designed and built by Robert Ritacca, published as an open npm package with its own documentation site.",
    "",
    `- [About Rift DS](${SITE_URL}/design-system): what it is and what building it involved`,
    `- [Building Rift DS](${SITE_URL}/work/robr0-ds): the case study, on what makes a design system rule actually hold`,
    `- [Documentation](${DESIGN_SYSTEM_URL}): components, tokens, templates and the playground`,
    `- [llms.txt](${DESIGN_SYSTEM_URL}/llms.txt): the agent index for the system itself, including its MCP endpoint and per-component prop contracts`,
    `- [npm package](https://www.npmjs.com/package/rift-ds): \`npm install rift-ds\``,
    "",
    "## Optional",
    "",
    `- [Sitemap](${SITE_URL}/sitemap.xml)`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
