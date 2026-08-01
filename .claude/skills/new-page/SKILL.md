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
   - Which section it belongs to — the sidebar arrays in `website/src/config/navigation.ts` are the authoritative list of sections (foundations, the docs cluster, work; writing is fed dynamically from Substack; standalone pages like `/playground` and `/contact` live in no sidebar array and declare their metadata as a literal). **Components are the exception**: `componentsSidebarLinks` is derived from `src/components/registry.json`, so a component page is registered by adding a registry entry, not by editing the array — use the `component-doc-page` skill for those.
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

### File 2: `page.module.css`
- Copy the exemplar's layout classes; add page-specific classes as needed
- Semantic design tokens only — no hardcoded colours or magic values
- No `ch`-based `max-width` on prose — doc paragraphs run the full content column; the layout column is the only width constraint (build-enforced by `scripts/validate-page-titles.mjs`)

### File 3: `layout.tsx`
- Sidebar-registered pages export `metadata` via the shared helper: `export const metadata = pageMetadata("<your path>", "<one-line description>")` (import from `@/config/navigation`)
- Standalone pages (`/playground`, `/contact` — pages in no sidebar array) export a literal `Metadata` object instead, with an explicit `alternates.canonical` — see `website/src/app/playground/layout.tsx`
- Only **component** pages are build-enforced (`scripts/validate-page-titles.mjs` requires `componentPageMetadata("<slug>")` there); for everything else the helper is convention, not a gate — follow it anyway
- Default export wraps `{children}` in a fragment

4. **Register the page everywhere the site tracks pages:**
   - **Sidebar** (only if the page belongs to a section): add `{ href, label }` to the section's array in `website/src/config/navigation.ts`, matching that array's existing order convention (foundations and docs are curated in reading order; work is curated newest-first; components are derived from the registry — see the exception in step 1)
   - **Work pages are a second exception**: a `/work/<slug>` page must also be registered in `website/src/data/case-studies.json` (top of the list if it is the newest — `/work` and the home page both derive from that order), with every field `scripts/validate-case-studies.mjs` requires (its `REQUIRED` list is authoritative — `href`, `title`, `dek`, `companyName`, `companyLogo`, `coverSrc` today) and the logo/cover assets in `website/public`. The validator fails the build for an unregistered case-study folder, so this is a gate, not a convention
   - **Standalone pages** (no sidebar section): no array to edit — but the sitemap then knows nothing about the route, so add it as a top-level literal in `website/src/app/sitemap.ts` (the `/playground` entry is the pattern), and extend `dsActiveMatchers`/`dsMegaItems` only if it belongs under the Design system umbrella
   - **Sitemap** for sidebar-registered pages: automatic — it derives from the sidebar configs, so the entry above covers it
   - **Breadcrumbs**: sub-pages of an existing section resolve automatically from the sidebar entry. Only if the page starts a *new* section: add a `breadcrumbSections` entry, and if it lives under the Design system umbrella, extend `dsActiveMatchers` (and `dsMegaItems` if it should appear in the mega menu)

5. **Verify**: load the page in the browser and confirm the sidebar highlights it, the breadcrumb trail is correct, and both themes render properly.
