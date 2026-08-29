/**
 * POST /api/mcp — the site's Model Context Protocol endpoint.
 *
 * A stateless Streamable HTTP server (mcp-handler on the MCP SDK v2) that
 * any MCP client can connect to with just this URL. The tools are
 * deterministic reads over generated registry data: the component prop API,
 * the component and token registries, and the site corpus. No model is
 * called, so there is no model spend to guard and no persona to defend; the
 * chat's guardrails deliberately do not apply here. Bandwidth and function
 * invocations are unmetered by choice — the tools are cheap in-memory reads,
 * and a limiter would cost more than the abuse it prevents. Revisit if a
 * tool ever stops being one.
 *
 * The security boundary is the corpus rule, inherited whole: everything
 * served is generated from already-published sources (component JSDoc that
 * ships in the npm tarball, the registries, the public site corpus), so the
 * worst case of any request is a stranger reading what was already public.
 * Never add a tool that reads anything else.
 */
import { createMcpHandler } from "mcp-handler";
import { z } from "zod";

import pkg from "@robr0/design-system/package.json";
import {
  COMPONENT_COUNT,
  componentCategoryMetadata,
} from "@robr0/design-system/components/registry";
import {
  TOKEN_COUNT,
  TOKEN_COUNTS,
  tokenRegistry,
} from "@robr0/design-system/tokens/registry";

import { componentApi } from "@/data/component-api.generated";
import { siteCorpus } from "@/data/site-corpus.generated";
import { SITE_URL } from "@/lib/structuredData";

export const runtime = "nodejs";
export const maxDuration = 30;

/** Every tool answers in one text block; JSON for data, markdown for prose. */
const text = (value: string) => ({ content: [{ type: "text" as const, text: value }] });
const json = (value: unknown) => text(JSON.stringify(value, null, 2));

/* ============================================
   search_site: the corpus, sectioned and scored
   ============================================ */

/** The corpus split at its headings (### and up), computed once per instance. */
const corpusSections: { heading: string; body: string }[] = siteCorpus
  .split(/\n(?=#{1,3} )/)
  .map((section) => {
    const newline = section.indexOf("\n");
    return newline === -1
      ? { heading: section.trim(), body: "" }
      : { heading: section.slice(0, newline).trim(), body: section.slice(newline + 1).trim() };
  })
  .filter((section) => section.body.length > 0);

const SEARCH_RESULTS = 3;
const SEARCH_SECTION_CHARS = 6000;

function searchCorpus(query: string) {
  const terms = query.toLowerCase().split(/\s+/).filter((term) => term.length > 1);
  if (terms.length === 0) return [];
  const scored = corpusSections
    .map((section) => {
      const haystack = `${section.heading}\n${section.body}`.toLowerCase();
      let score = 0;
      for (const term of terms) {
        let hits = 0;
        let index = haystack.indexOf(term);
        while (index !== -1) {
          hits += 1;
          index = haystack.indexOf(term, index + term.length);
        }
        // Every term present beats one term repeated.
        score += hits + (hits > 0 ? 5 : 0);
      }
      return { section, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, SEARCH_RESULTS).map(({ section }) => {
    const body =
      section.body.length > SEARCH_SECTION_CHARS
        ? `${section.body.slice(0, SEARCH_SECTION_CHARS)}\n[section truncated]`
        : section.body;
    return `${section.heading}\n${body}`;
  });
}

/* ============================================
   The handler
   ============================================ */

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      "list_components",
      {
        title: "List components",
        description:
          `List the ${COMPONENT_COUNT} public components in @robr0/design-system, ` +
          `with category, description and docs URL. Filter with the optional ` +
          `category argument. Use get_component for a component's full prop API.`,
        inputSchema: z.object({
          category: z
            .string()
            .optional()
            .describe("A category id from the categories list, to filter by"),
        }),
      },
      async ({ category }) => {
        const components = componentApi
          .filter((entry) => !category || entry.category === category)
          .map((entry) => ({
            name: entry.name,
            label: entry.label,
            category: entry.category,
            description: entry.description,
            docsUrl: `${SITE_URL}/components/${entry.slug}`,
          }));
        return json({
          package: pkg.name,
          version: pkg.version,
          categories: componentCategoryMetadata,
          count: components.length,
          components,
        });
      }
    );

    server.registerTool(
      "get_component",
      {
        title: "Get a component's prop API",
        description:
          "The full contract for one component: import paths, whether it needs " +
          "'use client', every exported component in its module, and every own " +
          "prop with its type, default, requiredness and JSDoc description. The " +
          "data is generated from the same source as the published .d.ts, so it " +
          "matches what npm ships.",
        inputSchema: z.object({
          name: z
            .string()
            .min(1)
            .describe("Component name, label or docs slug, e.g. Button or agent-plan"),
        }),
      },
      async ({ name }) => {
        const wanted = name.trim().toLowerCase();
        const entry = componentApi.find(
          (candidate) =>
            candidate.name.toLowerCase() === wanted ||
            candidate.label.toLowerCase() === wanted ||
            candidate.slug === wanted
        );
        if (!entry) {
          // A one-character name would "contain" its way to most of the list.
          const near =
            wanted.length > 1
              ? componentApi
                  .filter((candidate) => candidate.name.toLowerCase().includes(wanted))
                  .map((candidate) => candidate.name)
              : [];
          return json({
            error: `No component named ${JSON.stringify(name)}.`,
            didYouMean: near.length > 0 ? near : undefined,
            hint: "Call list_components for the full list.",
          });
        }
        return json({
          ...entry,
          docsUrl: `${SITE_URL}/components/${entry.slug}`,
          usage:
            entry.barrel === "charts"
              ? `import { ${entry.name} } from '${pkg.name}/charts'; // needs the optional recharts peer`
              : `import { ${entry.name} } from '${pkg.name}';`,
        });
      }
    );

    server.registerTool(
      "list_tokens",
      {
        title: "List design tokens",
        description:
          `List the ${TOKEN_COUNT} semantic design tokens by category ` +
          `(${Object.keys(TOKEN_COUNTS).join(", ")}). Components consume these as ` +
          `CSS custom properties; consumers re-theme by overriding them. Values ` +
          `and guidance live on ${SITE_URL}/foundations.`,
        inputSchema: z.object({
          category: z
            .string()
            .optional()
            .describe("A token category to filter by, e.g. colour or motion"),
        }),
      },
      async ({ category }) => {
        if (category && !(category in tokenRegistry)) {
          return json({
            error: `No token category named ${JSON.stringify(category)}.`,
            categories: Object.keys(TOKEN_COUNTS),
          });
        }
        const names = category
          ? { [category]: tokenRegistry[category as keyof typeof tokenRegistry] }
          : tokenRegistry;
        return json({ counts: TOKEN_COUNTS, tokens: names });
      }
    );

    server.registerTool(
      "search_site",
      {
        title: "Search the site",
        description:
          "Full-text search over everything published on robertritacca.com: the " +
          "design system docs and specs, case studies, essays, skills and the " +
          "project journal. Returns the most relevant sections as markdown.",
        inputSchema: z.object({
          query: z.string().min(2).max(200).describe("Words to look for"),
        }),
      },
      async ({ query }) => {
        const results = searchCorpus(query);
        if (results.length === 0) {
          return text(
            `Nothing matched ${JSON.stringify(query)}. The corpus covers the design ` +
              `system, Rob Ritacca's case studies and essays, and the site itself; ` +
              `try different words, or browse ${SITE_URL}/llms.txt for the index.`
          );
        }
        return text(results.join("\n\n---\n\n"));
      }
    );

    server.registerTool(
      "get_setup",
      {
        title: "Get install and theming setup",
        description:
          "How to install @robr0/design-system and wire up tokens, themes and " +
          "fonts in a consumer app.",
        inputSchema: z.object({}),
      },
      async () =>
        text(
          [
            `# Using ${pkg.name} ${pkg.version}`,
            "",
            "```bash",
            `npm install ${pkg.name}`,
            "```",
            "",
            "Import the token stylesheet once, then use components from the barrel or deep subpaths:",
            "",
            "```tsx",
            `import '${pkg.name}/tokens/tokens.css';`,
            `import { Button } from '${pkg.name}';`,
            "```",
            "",
            `Dark mode is data-theme="dark" on the root element; every semantic token has a light and a dark value. ` +
              `Re-theme by overriding the CSS custom properties (call list_tokens for the full set).`,
            "",
            `Fonts: the primary face is not bundled; set --font-family-primary to your own (the system ships with Nunito Sans in mind). ` +
              `The Material Symbols icon font ships inside the package.`,
            "",
            `Charts: components from '${pkg.name}/charts' need the optional recharts peer dependency; nothing else does.`,
            "",
            `Full guide: ${SITE_URL}/docs/get-started. Live docs: ${SITE_URL}/components. ` +
              `Design spec: ${SITE_URL}/design.md.`,
          ].join("\n")
        )
    );
  },
  {
    serverInfo: { name: "robr0-design-system", version: pkg.version },
    // Stateless for real: no subscriptions/listen SSE streams held open.
    maxSubscriptions: 0,
    instructions:
      `Documentation server for robertritacca.com and the ${pkg.name} React component ` +
      `library. Everything it serves is public. Start with list_components or ` +
      `search_site; get_component returns exact prop contracts for code generation.`,
  }
);

export { handler as GET, handler as POST };
