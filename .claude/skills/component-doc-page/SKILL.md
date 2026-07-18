---
name: component-doc-page
description: Create a full-quality documentation page for a design system component on the website. Use when asked to document a component on the website, add a component docs page, or create the website page for a component.
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
   - Storybook path (optional — usually `Components-ComponentName--docs`)

2. **Read the source component** `src/components/ComponentName/ComponentName.tsx`:
   - Extract all props from the TypeScript interface
   - Identify all variant enumerations (e.g. `type`, `size`, `status` props with union types)
   - Understand the component's states (default, hover, active, disabled, loading, etc.)
   - Note the BEM class names used for each variant/state

3. **Read the gold-standard reference:**
   - `website/src/app/components/button/page.tsx` — study the variant showcase grid structure (rows = states, columns = variants), the `pageHeader` block, `introSection`, and how `PageLinks` is used
   - `website/src/app/components/button/page.module.css` — CSS module structure

4. **Create `website/src/app/components/<component-slug>/page.tsx`:**
   - `"use client"` directive
   - Standard layout shell: `Header`, `Sidebar`, `BlurBackground`, `Footer`, `PageLinks`
   - `pageHeader` block with `subDisplay` ("Components") and `pageTitle` (component name)
   - `introSection` with an `introBody` paragraph — write a clear 1–2 sentence description of the component's purpose, inferred from its props and JSDoc if available
   - **Variant showcase grid**: render the component in every meaningful combination of its variants and states. For components with discrete variants × states (like Button), render a proper grid. For simpler components, render one example per meaningful state/variant.
   - Import the component: `import { ComponentName } from "@design-system/components/ComponentName/ComponentName"`
   - Include `<PageLinks figmaUrl={...} storybookPath={...} />` if URLs provided

5. **Create `website/src/app/components/<component-slug>/page.module.css`:**
   - Standard layout classes: `dsLayout`, `dsContent`, `pageHeader`, `pageTitle`, `subDisplay`, `introSection`, `introBody`
   - Any additional classes needed for the variant showcase grid
   - CSS custom properties only

6. **Create `website/src/app/components/<component-slug>/layout.tsx`:**
   - `metadata.title`: `"ComponentName | robr0 DS"`
   - `metadata.description`: same as `introBody` text

7. **Update `website/src/config/navigation.ts`:**
   - Find `componentsSidebarLinks` array
   - Add entry in alphabetical order: `{ label: "Component Name", href: "/components/component-slug" }`
   - If entry already exists, skip this step

8. **Check `website/src/app/components/page.tsx`** (the component gallery):
   - If the component is not already in the preview card grid, add it following the existing card pattern
