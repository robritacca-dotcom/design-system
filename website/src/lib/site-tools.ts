/**
 * Corpus search, the one deterministic lookup the site chat still needs.
 *
 * This module used to serve two surfaces, the public MCP endpoint and the
 * chat, with three tools between them: the component prop API, the token
 * registry and this. The design system took the first two with it when it
 * moved to its own site, and the MCP endpoint went with them.
 *
 * What remains is a cheap in-memory read over generated, already-published
 * prose. That is the security boundary, inherited from the corpus rule: the
 * worst case of any call is a stranger reading what was already public.
 * Never add a lookup that reads anything else.
 */
import { siteCorpus } from "@/data/site-corpus.generated";

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

export function searchCorpus(query: string): string[] {
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
