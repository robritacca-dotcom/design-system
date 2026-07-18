---
name: new-component
description: Scaffold a new design system component with all required files and registration steps. Use when asked to add, create, or scaffold a new design system component.
icon: widgets
displayDescription: "Scaffolds a new design system component — a typed React component, a token-only CSS stylesheet, and a Storybook stories file — then registers it in the build-enforced component registry and design.md. Enforces the ds- BEM naming prefix, semantic token usage, and the correct stories format without needing reminders."
invoke: ["add a [Name] component","create a [Name] component","scaffold [Name]"]
---

# new-component

Scaffold a new design system component: the three component files plus the build-enforced registration steps.

## When invoked

Use this skill any time you are asked to add or create a new component to the design system — phrases like "add a [Name] component", "create a [Name] component", "scaffold [Name]".

## Instructions

1. **Ask** for the component name (PascalCase) and a one-sentence description of its purpose, if not already provided.

2. **Read these reference files before writing anything:**
   - `src/components/Button/Button.tsx` — structural reference (props interface, BEM class usage, conditional rendering)
   - `src/components/Badge/Badge.css` — CSS token reference (no raw hex/pixels, semantic token usage)
   - `src/components/Badge/Badge.stories.tsx` — stories file reference (`satisfies Meta`, `StoryObj`, autodocs)
   - `src/tokens/tokens-light.css` — full list of available semantic tokens

3. **Create the directory** `src/components/ComponentName/` and write exactly three files:

### File 1: `ComponentName.tsx`
- Named export (not default)
- Typed props interface (`ComponentNameProps`)
- BEM class naming with `ds-componentname` root prefix (e.g. `ds-button`, `ds-badge`)
- Modifier classes follow `ds-componentname--variant` pattern
- Imports CSS: `import "./ComponentName.css"`
- If the component renders as `<a>` when an `href` prop is passed, follow the Button pattern of conditional element rendering

### File 2: `ComponentName.css`
- CSS custom properties exclusively — **no hardcoded hex colours**, no raw `rgb()`/`rgba()`
- Acceptable raw pixel values: icon sizes only (20px, 24px) — these have no token equivalent
- All other spacing, padding, gap, border-radius, font sizes must use semantic tokens from `tokens-light.css` / `tokens-typography.css`
- Section comments grouping related rules (e.g. `/* Base */`, `/* Variants */`, `/* States */`)
- **No dark-theme overrides and no `prefers-color-scheme` queries** — dark mode comes entirely from the semantic tokens (every token has a light and dark value; no component CSS in the library contains a `data-theme` selector)

### File 3: `ComponentName.stories.tsx`
- Import: `import type { Meta, StoryObj } from '@storybook/react-vite'`
- Meta uses `satisfies Meta<typeof ComponentName>`
- `title: 'Components/ComponentName'`
- `tags: ['autodocs']`
- `parameters: { layout: 'centered' }` for compact components; `'padded'` for full-width ones (cards, layouts, nav)
- One named `StoryObj` export per meaningful variant or state combination
- Story names are descriptive (e.g. `Default`, `WithIcon`, `Disabled`, `Small`)

4. **Register the component** in `src/components/registry.json` — add the folder name to the `components` array (alphabetical). This file is the single source of truth for the component count; `scripts/validate-component-registry.mjs` runs before every build and **fails if the folder is unregistered**. Run `npm run validate-registry` to confirm.

5. **Document it in `design.md`** — add a short component spec section (class name, tokens used, key behaviours), following the format of the existing component sections.

6. **Hand off the website work.** A component is not done until it has a showcase page and appears everywhere the site lists components: `website/src/config/navigation.ts` (sidebar), the `TocCard` grid in `website/src/app/components/page.tsx`, and `website/src/app/sitemap.ts`. Ask Rob: "Should I add the website documentation page now? (invokes the `component-doc-page` skill)" — and whoever does that work must complete all three registrations above.
