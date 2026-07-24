---
name: component-doc-page
description: Create a full-quality documentation page for a design system component on the website. Use when asked to document a component on the website, add a component docs page, or create the website page for a component.
icon: article
displayDescription: "Creates a full-quality documentation page for a design system component on the website. Reads the component's props to generate a variant showcase grid (the Button page is the benchmark), writes all three page files, and wires navigation and the components index — the sitemap follows from the sidebar automatically."
invoke: ["document [X] on the website","add a docs page for [X]","create the website page for [X]"]
---

# component-doc-page

Create a full-quality documentation page for a design system component on the website.

## When invoked

Use this skill when asked to document a component on the website, add a component page, or create docs for a component — phrases like "document [X] on the website", "add a docs page for [X]", "create the website page for [X]".

This is a more thorough, component-specific version of `new-page`. The Button page is the quality benchmark.

## Instructions

1. **Gather requirements** if not already provided:
   - Component name (PascalCase)
   - Figma node URL (optional — ask Rob, or omit if unknown)
   - Storybook path (optional — format: `/?path=/docs/components-<slug>--docs`)

2. **Read the source component** `src/components/ComponentName/ComponentName.tsx`:
   - Extract all props from the TypeScript interface
   - Identify all variant enumerations (e.g. `type`, `size`, `status` props with union types)
   - Understand the component's states (default, hover, active, disabled, loading, etc.)
   - Note the BEM class names used for each variant/state

3. **Read the gold-standard reference:**
   - `website/src/app/components/button/page.tsx` — study the variant showcase grid structure (rows = states, columns = variants), the `pageHeader` block, `introSection`, and how `PageLinks` is used
   - `website/src/app/components/button/page.module.css` — CSS module structure

4. **Create `website/src/app/components/<component-slug>/page.tsx`:**
   - Mirror the Button page's layout shell exactly — same components, same nesting, same class names, with your slug in the `getSidebarLinks` call. Don't improvise structure.
   - Invariants the exemplar can't teach:
     - `subDisplay` is a *tagline* for the component (e.g. Button's "The main action element") — not the word "Components"; the breadcrumb already shows the section
     - `introBody` is a clear 1–2 sentence description of the component's purpose, inferred from its props and JSDoc if available
     - Import the component via the `@design-system` alias, never a relative path into `src/`
     - Include `PageLinks` with whichever Figma/Storybook URLs were provided
   - **Variant showcase grid**: render the component in every meaningful combination of its variants and states. For components with discrete variants × states (like Button), render a proper grid. For simpler components, render one example per meaningful state/variant.

5. **Create `website/src/app/components/<component-slug>/page.module.css`:**
   - Standard layout classes: `dsLayout`, `dsContent`, `pageHeader`, `pageTitle`, `subDisplay`, `introSection`, `introBody`
   - Any additional classes needed for the variant showcase grid
   - CSS custom properties only

6. **Create `website/src/app/components/<component-slug>/layout.tsx`:**
   - Export `metadata` via the shared helper: `export const metadata = pageMetadata("/components/<component-slug>", "<one-line description>")` (import from `@/config/navigation`; the Button page's `layout.tsx` is the exemplar)
   - The description doubles as `metadata.description` — use the same text as `introBody`
   - `scripts/validate-page-titles.mjs` fails the build if the layout is missing or doesn't derive its title from `pageMetadata()`

7. **Update `website/src/config/navigation.ts`:**
   - Find `componentsSidebarLinks` array
   - Add entry in alphabetical order: `{ href: "/components/component-slug", label: "Component Name" }`
   - If entry already exists, skip this step

8. **Update `website/src/app/components/page.tsx`** (the components index):
   - Add a `TocCard` in alphabetical order: `<TocCard href="/components/component-slug" title="Component Name">` wrapping a small preview — use the real component (imported via `@design-system`) where it reads well at miniature size, as most cards do, or a small inline-styled mockup where it doesn't (see the Accordion card)

9. **Sitemap is automatic** — `website/src/app/sitemap.ts` derives its routes from the shared sidebar configs, so the navigation entry from step 7 is what puts the page in the sitemap. Do not edit `sitemap.ts` by hand. (All of steps 7–8, plus the `design.md` spec section, are build-enforced by `scripts/validate-website-surfaces.mjs`.)
