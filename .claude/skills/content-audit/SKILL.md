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
   - `chat` → the site chat's shipped prose: the greeting, the starter-suggestion copy, the welcome tagline, the disclaimer line and the locked-model line in `website/src/components/SiteChat/` (inline literals in `SiteChat.tsx`, not data files, and no validator scans them), the model names and one-line descriptions in `website/src/lib/chat-model.ts` (rendered in the composer's picker; also unscanned by any validator), the persona and easter-egg strings in `website/src/app/api/chat/`, and the playground sim's scripted story — the turns and chip labels in `website/src/lib/chat-sim.ts` and the event-rail copy in `website/src/app/playground/ChatDirector.tsx` (all visitor-visible but not "page files", so the `website` scope misses them; the chips' register row lives in the guide's Register by Surface table). The em-dash half is split: `scripts/validate-shipped-prose.mjs` build-scans the two story modules' string literals, so this scope's em-dash job there is done by the build — but the SiteChat and api/chat strings stay unscanned, and every judgement-level rule (register, voice, banned words) stays this scope's across all of it
   - `covers` → the alt text in the two cover registries, `website/src/data/cover-renders.json` (the case-study covers) and `website/src/data/essay-covers.json` (the essay illustrations). Alt text is read aloud and indexed, so it is shipped copy, and its rule in the guide is its own: describe what the picture shows, never restate the title. Neither file is a page, so the `website` scope misses both
   - `footer` → the sitemap footer's shipped copy: the column titles and copyright in `website/src/components/SiteFooter/SiteFooter.tsx`, and the link labels in `website/src/config/social.ts` (visible on every non-chromeless page, but outside `app/**`, so the `website` scope misses them — the same gap the `chat` scope closes for the panel)
   - `palette` → the command palette's shipped copy: the group labels, per-item descriptions, search placeholder and empty state in `website/src/components/SitePalette/` (reachable from every non-chromeless page, but outside `app/**`, so the `website` scope misses it — the same gap the `chat` and `footer` scopes close for theirs; no validator scans it)
   - `nav` → the navigation config's shipped copy: the section and link descriptions, group labels and the mega showcase card's overline, title and description in `website/src/config/navigation.ts` (rendered in the mega panel, the sidebars, the footer's derived columns and the home and DS-landing cards — outside `app/**`, so the `website` scope misses it, the same gap the `chat`, `footer` and `palette` scopes close for theirs; no validator scans it)
   - `agent-skill` → the consumer agent skill's instructional prose, hand-written inside `scripts/generate-agent-skill.mjs` (its register row is in the guide's table). The published pair under `website/public/skill/robr0-design-system/` is generated and byte-compared, so fix the generator, never the files; its sibling surface, the per-component `.md` pages, deliberately has no scope — every sentence there derives from registry data
   - `page-summaries` → the FAB panel's per-page TLDR copy: the `title`, `text` and chip labels in `website/src/data/page-summaries.json` (`routes` and `essays` maps — rendered to every visitor on the chat FAB's summary panel, but a data file outside `app/**`, so the `website` scope misses it, the same gap the `covers` scope closes for alt text). `scripts/validate-page-summaries.mjs` build-covers length, the full stop and the em-dash ban; register, voice and banned words stay this scope's — its register row lives in the guide's table
   - `mcp` → the agent-facing routes' shipped copy: the tool blurbs and example prompts in `website/src/lib/mcp-tools.ts`, the connect snippets in `website/src/lib/mcp-clients.ts`, the server instructions and browser landing page in `website/src/app/api/mcp/route.ts`, and the `/llms.txt` section intros in `website/src/app/llms.txt/route.ts` (route handlers and `lib/` modules, not page files, so the `website` scope misses all of them — `scripts/validate-mcp-tools.mjs` holds the roster to the registered tools but judges no prose; their register rows live in the guide's table)

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
   - The labs rebuilds under `website/src/app/labs/**` and the template screens they graduate into (`website/src/components/templates/**`, served under `/templates/<slug>`) — their copy is fictional demo data reproducing a product screen, excluded from the chat corpus for the same reason, so register and voice rules do not apply to it. The `/templates` index page's own prose is ordinary page copy and stays in scope

5. **For each finding**, output:
   - File path (repo-relative) and line number, or the entry label for JSON surfaces
   - Severity, the offending text, and the guide rule it breaks
   - A suggested rewrite that keeps the sentence's meaning and any links intact

   Format: `website/src/app/example/page.tsx:42 — banned — "a seamless theming journey" → "theming by overriding one primitive"`

6. **Summarise** at the end:
   - Counts per severity, then the strongest single finding
   - If nothing is found: "No content violations found. Prose follows content-design.md."
   - Run the guide's three Self-Review Tests over the longest passage in scope and report the result, pass or fail
