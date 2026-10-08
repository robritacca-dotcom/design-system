---
name: new-page
description: Add a new page to the website with the standard layout shell and correct navigation wiring. Use when asked to add or create a new page on the site.
icon: insert_drive_file
displayDescription: "Creates a new website page by mirroring a live exemplar page's layout shell, then wires it into every place the site tracks pages: the section sidebar and breadcrumbs, with the sitemap deriving automatically. Prevents the common mistake of adding a route without registering it."
invoke: ["add a page for [X]","create a [section] page","add [X] to the site"]
---

# new-page

Add a new page to the website with the standard layout shell and correct navigation wiring.

## When invoked

Use this skill when asked to add or create a new page on the website — phrases like "add a page for [X]", "create a [section] page", "add [X] to the site".

Component documentation pages and template screens are not built here: they belong to the design system, which lives in its own repo and at rift-ds.com.

## Instructions

1. **Gather requirements** if not already provided:
   - Page URL path (e.g. `/work/<slug>`)
   - Which section it belongs to: the sidebar arrays in `website/src/config/navigation.ts` are the authoritative list of sections (work, writing; writing is fed dynamically from Substack; standalone pages like `/about` and `/contact` live in no sidebar array and declare their metadata as a literal).
   - Page title, a short `subDisplay` tagline, and a 1–2 sentence description (for metadata and the intro block)
   - Figma URL (optional), for `PageLinks`

2. **Read the exemplars before writing anything.** The live pages are the source of truth for structure — mirror them rather than writing a shell from memory:
   - `website/src/app/privacy/page.tsx` — a standard content page (layout shell, header and intro blocks)
   - `website/src/app/work/augmenta-ai/page.tsx` + `page.module.css` + `layout.tsx` — the richest example, with per-page CSS and its own share card
   - `website/src/config/navigation.ts` — nav config (single source of truth for sidebars, mega menu, and breadcrumbs; the sitemap derives its routes from the sidebar configs)

3. **Create the directory** `website/src/app/<path>/` with three files, mirroring the exemplar:

### File 1: `page.tsx`
- Copy the exemplar's shell exactly — same components, same nesting, same class names. Don't improvise structure.
- Invariants the exemplar can't teach:
  - `subDisplay` is a *tagline* inside the intro block — not the section name; the breadcrumb already shows where you are
  - All copy on the page (tagline, intro, body, metadata description) follows `content-design.md` — voice, register, and the words-to-avoid tables
  - Sidebar links come from `getSidebarLinks(<section>SidebarLinks, "<your path>")`
  - Include `PageLinks` only if the page has links to show (its props are the authoritative list of what it takes)
  - **The on-this-page rail is automatic, not part of the shell.** `SiteAnchorRail` in the root layout reads every page's h2 headings after navigation and floats the rail on the right viewport edge, so a new page gets one with no wiring — never mount an anchor nav of your own by default. The gates live in `website/src/config/anchor-nav.ts`, whose doc block owns the rules: an index or landing page registers in `ANCHOR_NAV_EXCLUDED_ROUTES`; a page whose items must be derived server-side (markdown-extracted sections, labels that are not headings) mounts `FloatingAnchorNav` itself and registers in `ANCHOR_NAV_SELF_MANAGED_ROUTES` so it never carries two (no page does today, so that set is empty). `scripts/validate-route-config.mjs` fails the build when either set names a path with no page behind it. Demo or furniture h2s that are not sections of the page sit inside `data-anchor-ignore` (or an `<aside>`); the discovery rules live in the doc block of `website/src/components/FloatingAnchorNav/SiteAnchorRail.tsx`
  - **Do not render a background.** `BlurBackground` is mounted once in the root layout and covers every route; adding it per page would build a second canvas and a second GL context on top of the first. `scripts/validate-single-background-mount.mjs` fails the build if you do

### File 2: `page.module.css`
- Copy the exemplar's layout classes; add page-specific classes as needed
- Semantic design tokens only — no hardcoded colours or magic values
- Page assembly is a spec, not taste: the design system's spec (in the rift-ds repo and at rift-ds.com) owns the rhythm ladder and the assembly rules (parent owns spacing, one level of chrome, dividers last, prose never width-capped) — read it before laying out sections; the exemplar shows the pattern, the spec owns the rules
- No `ch`-based `max-width` on prose — doc paragraphs run the full content column; the layout column is the only width constraint (build-enforced by `scripts/validate-copy-conventions.mjs`)
- Mobile type and section rhythm collapse at the **token layer** (display sizes and section-gap tokens step down system-wide — the design system's responsive spec owns the breakpoint) — do not add per-page `@media` overrides for tokenized values; when a page genuinely needs a breakpoint, use the canonical set in that same spec

### File 3: `layout.tsx`
- Export `metadata` as a literal `Metadata` object with an explicit `alternates.canonical`, as the exemplar's `layout.tsx` does
- Standalone pages (`/contact`, `/design-system`, pages in no sidebar array) do the same; see `website/src/app/design-system/layout.tsx`, whose comment records why it is a literal
- **Deliberately hidden pages are the exception** (`/covers` and `/rr-animated` are the precedent). A hidden page sets `robots: { index: false, follow: false }`, skips the canonical *and* the sitemap entirely, appears in no nav surface, and records why in a comment beside that metadata: in its `layout.tsx`, or in the `page.tsx` itself when the page needs no layout of its own (`/covers` is the precedent for the simpler shape). A full-viewport page that should also render none of the shared chrome (the layout-mounted footer, chat panel, and command palette) additionally adds its route to `CHROMELESS_ROUTES` in `website/src/config/chromeless.ts`; the set in that file is the authoritative list of what has taken the exception, and `scripts/validate-route-config.mjs` holds it to routes that exist. A hidden page also needs an entry in `EXCLUDED_ROUTES` in `scripts/generate-site-corpus.mjs` with a written reason, or `validate-chat-coverage.mjs` fails the build for an uncovered route. Suppressing chrome does **not** make the background full-bleed: by default every page gets the fixed-height band that fades into the page floor (the rules live in `website/src/app/globals.css`). An immersive page must also render `<FullBleedBackground />` (exported from `website/src/components/BlurBackground/BlurBackground.tsx`), a hidden marker that CSS in `globals.css` reads to drop the fade and fill the viewport. Skip it and the page is chrome-free but band-limited, which looks wrong with nothing to explain why. Pick exactly one: the default band or full-bleed ambient
- Default export wraps `{children}` in a fragment

4. **Register the page everywhere the site tracks pages:**
   - **Sidebar** (only if the page belongs to a section): add `{ href, label }` to the section's array in `website/src/config/navigation.ts`, matching that array's existing order convention (work is curated editorially, strongest first and roughly newest first)
   - **Work pages are a second exception**: a `/work/<slug>` page must also be registered in `website/src/data/case-studies.json` (near the top if it is the newest or the strongest — `/work` and the home page both derive from that order), with every field `scripts/validate-case-studies.mjs` requires (its `REQUIRED` list is authoritative — read it rather than trusting any copy) and the logo/cover assets in `website/public`. The validator fails the build for an unregistered case-study folder, so this is a gate, not a convention. A study with a vector cover has a second gate: `scripts/validate-cover-rasters.mjs` holds `website/src/data/cover-renders.json`, the drawing map in `website/src/components/covers/case-study-covers.tsx`, and the rendered webp files under `website/public/covers/rendered` to each other in both directions — register the cover in all three (shoot the rasters with `npm run covers:render` against a running dev server) or the build fails. A study also gets a TLDR entry in `website/src/data/case-study-tldrs.ts` (the key-claims block every /work page renders — that module's doc block owns why it lives outside the route folders, and content-design.md's register row owns its rules): **no validator guards this pairing**, so a missing entry fails silently unless the page's literal key lookup catches it
   - **Standalone pages** (no sidebar section): no array to edit, but the sitemap then knows nothing about the route, so add it to the `staticRoutes` list in `website/src/app/sitemap.ts`. If it is a top-level site page a visitor should reach from anywhere, also add it to the `siteLinks` array in `website/src/components/SiteFooter/SiteFooter.tsx` and to the command palette's hand-written `navigation` group in `website/src/components/SitePalette/SitePaletteMount.tsx`, or the page is unreachable from Cmd+K (no validator covers either). Hidden pages (see File 3) never enter the sitemap or the nav
   - **Sitemap** for sidebar-registered pages: automatic — it derives from the sidebar configs, so the entry above covers it
   - **Breadcrumbs**: sub-pages of an existing section resolve automatically from the sidebar entry. Only if the page starts a *new* section: add a `breadcrumbSections` entry in `website/src/config/navigation.ts`
   - **The site-chat corpus has a ceiling, and a visible page counts against it**: `scripts/generate-site-corpus.mjs` extracts every indexed page's prose automatically, so there is nothing to register — but a substantial page can push the corpus past `TOKEN_BUDGET` and fail the build with an over-budget error before any validator runs. That constant's own doc block owns the call between raising the budget and trimming a section; read it, and run `node scripts/generate-site-corpus.mjs --sizes` to see which section actually grew before deciding
   - **The AI-summary panel**: every page with the shared chrome gets the chat FAB, and hovering it opens a per-page summary with prompt chips. Add the page's entry to `website/src/data/page-summaries.json` (`routes` map: a `title`, a super-concise `text`, and 1 chip for a simple page, 2 for a dense one — the validator's field grammar is authoritative: text length and full stop, every chip carrying `id`/`label`/`prompt`, labels inside the suggestion budget, no em dashes) — `scripts/validate-page-summaries.mjs` fails the build for a route without one, so this cannot be skipped silently. Case-study pages derive theirs from their deks and need nothing here; an essay needs a hand-written entry under the `essays` map, keyed by its slug (written when `npm run sync:essays` brings the essay in); a chromeless page has no FAB and is exempt automatically

5. **Verify**: load the page in the browser and confirm the sidebar highlights it, the breadcrumb trail is correct, and both themes render properly.
