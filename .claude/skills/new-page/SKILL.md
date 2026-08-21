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

For a **component documentation page**, use the `component-doc-page` skill instead — it covers the variant showcase and component-specific registrations.

## Instructions

1. **Gather requirements** if not already provided:
   - Page URL path (e.g. `/foundations/motion`)
   - Which section it belongs to — the sidebar arrays in `website/src/config/navigation.ts` are the authoritative list of sections (foundations, the docs cluster, work; writing is fed dynamically from Substack; standalone pages like `/playground` and `/contact` live in no sidebar array and declare their metadata as a literal). **Components are the exception**: `componentsSidebarLinks` is derived from `src/components/registry.json`, so a component page is registered by adding a registry entry, not by editing the array — use the `component-doc-page` skill for those. Component categories have no pages of their own; a registry category entry becomes an index section and a sidebar accordion automatically.
   - Page title, a short `subDisplay` tagline, and a 1–2 sentence description (for metadata and the intro block)
   - Figma URL and Storybook path (optional) — for `PageLinks`

2. **Read the exemplars before writing anything.** The live pages are the source of truth for structure — mirror them rather than writing a shell from memory:
   - `website/src/app/skills/page.tsx` — a standard content page (layout shell, sidebar wiring, header/intro blocks, entry animations)
   - `website/src/app/components/button/page.tsx` + `page.module.css` + `layout.tsx` — the richest example, with `PageLinks` and per-page CSS
   - `website/src/config/navigation.ts` — nav config (single source of truth for sidebars, mega menu, and breadcrumbs; the sitemap derives its routes from the sidebar configs)

3. **Create the directory** `website/src/app/<path>/` with three files, mirroring the exemplar:

### File 1: `page.tsx`
- Copy the exemplar's shell exactly — same components, same nesting, same class names. Don't improvise structure.
- Invariants the exemplar can't teach:
  - `subDisplay` is a *tagline* inside the intro block (e.g. the Skills page's "Reusable AI instructions, tuned for this project") — not the section name; the breadcrumb already shows where you are
  - All copy on the page (tagline, intro, body, metadata description) follows `content-design.md` — voice, register, and the words-to-avoid tables
  - Sidebar links come from `getSidebarLinks(<section>SidebarLinks, "<your path>")`
  - Include `PageLinks` only if Figma/Storybook URLs exist
  - **Do not render a background.** `BlurBackground` is mounted once in the root layout and covers every route; adding it per page would build a second canvas and a second GL context on top of the first. `scripts/validate-single-background-mount.mjs` fails the build if you do

### File 2: `page.module.css`
- Copy the exemplar's layout classes; add page-specific classes as needed
- Semantic design tokens only — no hardcoded colours or magic values
- Page assembly is a spec, not taste: design.md's **Composition** section owns the rhythm ladder and the assembly rules (parent owns spacing, one level of chrome, dividers last, prose never width-capped) — read it before laying out sections; the exemplar shows the pattern, the spec owns the rules
- No `ch`-based `max-width` on prose — doc paragraphs run the full content column; the layout column is the only width constraint (build-enforced by `scripts/validate-page-titles.mjs`)
- Mobile type and section rhythm collapse at the **token layer** (display sizes and section-gap tokens step down at 768px system-wide) — do not add per-page `@media` overrides for tokenized values; when a page genuinely needs a breakpoint, use the canonical set in `design.md`'s responsive spec

### File 3: `layout.tsx`
- Sidebar-registered pages export `metadata` via the shared helper: `export const metadata = pageMetadata("<your path>", "<one-line description>")` (import from `@/config/navigation`)
- Standalone pages (`/playground`, `/contact` — pages in no sidebar array) export a literal `Metadata` object instead, with an explicit `alternates.canonical` — see `website/src/app/playground/layout.tsx`
- **Deliberately hidden pages are the exception to both rules**: a test bench or scratch page that must stay dark sets `robots: { index: false, follow: false }`, skips the canonical *and* the sitemap entirely, and records why in a comment beside that metadata — in its `layout.tsx`, or in the `page.tsx` itself when the page needs no layout of its own (`/covers` is the precedent for the simpler shape). A full-viewport or immersive page that should also render none of the shared chrome (the layout-mounted footer and chat panel) additionally adds its route to `CHROMELESS_ROUTES` in `website/src/config/chromeless.ts` — the set in that file is the authoritative list of what has taken the exception. A hidden page also needs an entry in `EXCLUDED_ROUTES` in `scripts/generate-site-corpus.mjs` with a written reason, or `validate-chat-coverage.mjs` fails the build for an uncovered route. Suppressing chrome does **not** make the background full-bleed: by default every page gets the 450px band that fades into the page floor. An immersive page must also render `<FullBleedBackground />` (exported from `website/src/components/BlurBackground/BlurBackground.tsx`), a hidden marker that CSS in `globals.css` reads to drop the fade and fill the viewport. Skip it and the page is chrome-free but band-limited, which looks wrong with nothing to explain why
- Only **component** pages are build-enforced (`scripts/validate-page-titles.mjs` requires `componentPageMetadata("<slug>")` there); for everything else the helper is convention, not a gate — follow it anyway
- Default export wraps `{children}` in a fragment

4. **Register the page everywhere the site tracks pages:**
   - **Sidebar** (only if the page belongs to a section): add `{ href, label }` to the section's array in `website/src/config/navigation.ts`, matching that array's existing order convention (foundations and docs are curated in reading order; work is curated newest-first; components are derived from the registry — see the exception in step 1)
   - **Work pages are a second exception**: a `/work/<slug>` page must also be registered in `website/src/data/case-studies.json` (top of the list if it is the newest — `/work` and the home page both derive from that order), with every field `scripts/validate-case-studies.mjs` requires (its `REQUIRED` list is authoritative — read it rather than trusting any copy) and the logo/cover assets in `website/public`. The validator fails the build for an unregistered case-study folder, so this is a gate, not a convention. A study with a vector cover has a second gate: `scripts/validate-cover-rasters.mjs` holds `website/src/data/cover-renders.json`, the drawing map in `website/src/components/covers/case-study-covers.tsx`, and the rendered webp files under `website/public/covers/rendered` to each other in both directions — register the cover in all three (shoot the rasters with `npm run covers:render` against a running dev server) or the build fails
   - **Standalone pages** (no sidebar section): no array to edit — but the sitemap then knows nothing about the route, so add it as a top-level literal in `website/src/app/sitemap.ts` (the `/playground` entry is the pattern), and extend `dsActiveMatchers`/`dsMegaItems` only if it belongs under the Design system umbrella. If it is a top-level site page a visitor should reach from anywhere, also add it to the `siteLinks` array in `website/src/components/SiteFooter/SiteFooter.tsx` — the one footer column that is hand-maintained (of the other four, three derive from the nav config and Elsewhere from `PROJECT_LINKS` in `website/src/config/social.ts`). Deliberately hidden pages (see File 3) register nowhere — no sitemap, no nav, no matchers, no footer
   - **Sitemap** for sidebar-registered pages: automatic — it derives from the sidebar configs, so the entry above covers it
   - **Breadcrumbs**: sub-pages of an existing section resolve automatically from the sidebar entry. Only if the page starts a *new* section: add a `breadcrumbSections` entry, and if it lives under the Design system umbrella, extend `dsActiveMatchers` (and `dsMegaItems` if it should appear in the mega menu)

5. **Verify**: load the page in the browser and confirm the sidebar highlights it, the breadcrumb trail is correct, and both themes render properly.
