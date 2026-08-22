---
name: content-audit
description: Audit prose against content-design.md for AI-writing tells, voice violations, and register mismatches. Use when asked to audit copy, check content quality, review prose for AI slop, or check writing against the content guide.
icon: spellcheck
displayDescription: "Scans shipped prose against content-design.md: banned words, em dashes, promotional register, first person where the system should be the subject, and rhythm problems no word list catches. Reports each finding with its location, the offending text, and a suggested rewrite. Accepts a page, a data file, or a whole surface as scope."
invoke: ["content audit","audit the copy on [page]","check this prose against the content guide","any AI slop in [file]"]
---

# content-audit

Audit prose against `content-design.md`, and report violations with suggested rewrites.

## When invoked

Use this skill when asked to audit copy, check prose quality, find AI-writing tells, or review text against the content guide — phrases like "content audit", "audit the copy on the homepage", "does this read like AI", "check this against content-design.md".

## Instructions

1. **Determine scope.** Accept one of:
   - A specific file path (a page, a data file, a markdown doc)
   - `site-updates` → `website/src/data/site-updates.json` (titles + story bodies)
   - `registry` → the `description` fields in `src/components/registry.json`
   - `case-studies` → the `title` and `dek` fields in `website/src/data/case-studies.json` (shipped copy on /work and the home page)
   - `readme` → `README.md` prose plus `src/stories/Configure.mdx`. README's marked regions (`component-count`, `component-list`, `npm-badge`) are **generated** from `src/components/registry.json` — a rewrite inside them silently reverts on the next build, so fix that copy through the `registry` scope instead; the `/blueprints` page copies under `website/public/` are generated too (synced from the root specs by `scripts/sync-blueprints.mjs` on every build), so edit the root file, never the copy
   - `skills` → the `displayDescription` frontmatter strings across `.claude/skills/` (they render on /skills, so they are published copy; skill instruction *bodies* are out of scope)
   - `website` → user-visible strings in `website/src/app/**` page files; a page slug (e.g. `about`) scopes to that page folder
   - `chat` → the site chat's shipped prose: the greeting and starter-suggestion copy in `website/src/components/SiteChat/`, the persona and easter-egg strings in `website/src/app/api/chat/`, and the playground sim's scripted story — the turns and chip labels in `website/src/lib/chat-sim.ts` and the event-rail copy in `website/src/app/playground/ChatDirector.tsx` (all visitor-visible but not "page files", so the `website` scope misses them; the chips' register row lives in the guide's Register by Surface table). The em-dash half is split: `scripts/validate-shipped-prose.mjs` build-scans the two story modules' string literals, so this scope's em-dash job there is done by the build — but the SiteChat and api/chat strings stay unscanned, and every judgement-level rule (register, voice, banned words) stays this scope's across all of it
   - `footer` → the sitemap footer's shipped copy: the column titles and copyright in `website/src/components/SiteFooter/SiteFooter.tsx`, and the link labels in `website/src/config/social.ts` (visible on every non-chromeless page, but outside `app/**`, so the `website` scope misses them — the same gap the `chat` scope closes for the panel)

2. **Read `content-design.md` first — it is the only rule source.** The Words to Avoid and Patterns to Avoid tables, the Voice rules, the Register by Surface table, and the Microcopy section are the checklist. This skill deliberately maintains no word list and no pattern list of its own: when the guide changes, the audit changes with it. If a rule seems missing, the fix is an entry in `content-design.md` (per its Iteration Guide), never a rule added here.

3. **Scan the scoped prose** and classify every finding at one of three severities:

   **Banned** (the guide allows no use in shipped copy):
   - Hard-ban words and phrases from the Words to Avoid table
   - Em dashes anywhere in shipped copy. `scripts/validate-shipped-prose.mjs` already fails the build on these, so a clean tree means the surfaces it reads are clear and you are checking the ones it cannot judge: the chat's persona and greeting strings, and any prose outside its scope (its doc block is authoritative). Report a hit there as Banned exactly as before
   - Title Case in shipped headings, buttons, or labels
   - First person in surfaces whose register says "None" (check the Register by Surface table for the scoped surface)
   - Emoji, exclamation marks in UI copy, unsourced statistics

   **Rationed** (legitimate in a narrow sense; flag for a density check):
   - Words from the Rationed table — flag every use, note which look literal, and count per page
   - American spellings in prose (colour/color and friends) — never flag code identifiers, token names, CSS properties, or file paths

   **Judgment** (needs a reader, not a regex — quote the passage and say why):
   - Rhythm uniformity: three or more similar-length sentences in a row
   - Rule-of-three adjective stacks, copula avoidance, participial tails, negative parallelism, hedge stacking, elegant variation, bolded-label bullets, summary closers, throat-clearing openers
   - Register mismatches: promotional tone in a neutral surface, a tagline restating its section name, an empty state describing absence instead of the next action

4. **Never flag:**
   - `content-design.md` itself, and quoted examples anywhere (a rule must be able to name what it bans)
   - Skill instruction bodies, `design.md`, `CLAUDE.md` — agent-facing references, out of scope by design (see the guide's Overview)
   - Code, identifiers, token names, class names, and anything inside backticks or code fences
   - Text authored by third parties (external-skill copies keep their upstream voice)

5. **For each finding**, output:
   - File path (repo-relative) and line number, or the entry label for JSON surfaces
   - Severity, the offending text, and the guide rule it breaks
   - A suggested rewrite that keeps the sentence's meaning and any links intact

   Format: `website/src/app/example/page.tsx:42 — banned — "a seamless theming journey" → "theming by overriding one primitive"`

6. **Summarise** at the end:
   - Counts per severity, then the strongest single finding
   - If nothing is found: "No content violations found. Prose follows content-design.md."
   - Run the guide's three Self-Review Tests over the longest passage in scope and report the result, pass or fail
