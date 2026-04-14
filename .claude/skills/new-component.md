# new-component

Scaffold a new design system component with all three required files.

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
- Section comments grouping related rules (e.g. `/* Base */`, `/* Variants */`, `/* States */`, `/* Dark theme */`)
- Dark theme overrides use `:root[data-theme="dark"] .ds-componentname { }` selector

### File 3: `ComponentName.stories.tsx`
- Import: `import type { Meta, StoryObj } from "@storybook/react-vite"`
- Meta uses `satisfies Meta<typeof ComponentName>`
- `title: "Components/ComponentName"`
- `tags: ["autodocs"]`
- `parameters: { layout: "centered" }`
- One named `StoryObj` export per meaningful variant or state combination
- Story names are descriptive (e.g. `Default`, `WithIcon`, `Disabled`, `Small`)

4. **After creating files**, ask Rob: "Should I also add a documentation page for this component on the website? (invokes the `component-doc-page` skill)"
