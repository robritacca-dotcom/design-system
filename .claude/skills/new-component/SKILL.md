---
name: new-component
description: Scaffold a new design system component with all required files and registration steps. Use when asked to add, create, or scaffold a new design system component.
icon: widgets
displayDescription: "Scaffolds a new design system component (a typed React component, a token-only CSS stylesheet, and a Storybook stories file), then registers it in the build-enforced component registry and design.md. Enforces the ds- BEM naming prefix, semantic token usage, and the correct stories format without needing reminders."
invoke: ["add a [Name] component","create a [Name] component","scaffold [Name]"]
---

# new-component

Scaffold a new design system component: the three component files plus the build-enforced registration steps.

## When invoked

Use this skill any time you are asked to add or create a new component to the design system — phrases like "add a [Name] component", "create a [Name] component", "scaffold [Name]".

## Instructions

1. **Ask** for the component name (PascalCase) and a one-sentence description of its purpose, if not already provided.

2. **Read these reference files before writing anything:**
   - `src/components/Button/Button.tsx` — structural reference for a button-or-anchor component (own-props split, forwardRef, rest spread, BEM class usage, conditional rendering)
   - `src/components/Input/Input.tsx` — structural reference for a form control (native `onChange` + `onValueChange` convenience callback, label/helper/error wiring)
   - `src/components/Badge/Badge.css` — CSS token reference (no raw hex/pixels, semantic token usage)
   - `src/components/Badge/Badge.stories.tsx` — stories file reference (`satisfies Meta`, `StoryObj`, autodocs)
   - `src/tokens/tokens-light.css` — full list of available semantic tokens

3. **Create the directory** `src/components/ComponentName/` and write exactly three files:

### File 1: `ComponentName.tsx`
- Named export (not default)
- BEM class naming with `ds-componentname` root prefix (e.g. `ds-button`, `ds-badge`)
- Modifier classes follow `ds-componentname--variant` pattern
- Imports CSS: `import "./ComponentName.css"`
- If the component renders as `<a>` when an `href` prop is passed, follow the Button pattern of conditional element rendering

**The component API contract — every one of these, no exceptions.** This package is published to npm, so the props interface is a public contract. Getting it wrong is a breaking change later. `src/components/Button/Button.tsx` (button-or-anchor) and `src/components/Input/Input.tsx` (form control) are the reference implementations.

1. **`'use client'` on the first line** — if and only if the component uses hooks, event handlers, or browser APIs. **Purely presentational components must NOT have it** (see `src/components/Table/Table.tsx`), or consumers lose the ability to render them from a React Server Component.

2. **Split the props type in two.** Own props as a `type`, then an exported `interface` that merges in the native element's props:
   ```ts
   type ComponentNameOwnProps = { /* ...props this component owns... */ };

   export interface ComponentNameProps
     extends ComponentNameOwnProps,
       Omit<React.ComponentPropsWithoutRef<'div'>, keyof ComponentNameOwnProps> {}
   ```
   Add `| 'type'` (or any other attribute the component hardcodes) to the `Omit` list.

3. **`React.forwardRef`** onto the primary DOM node, with `ComponentName.displayName = 'ComponentName'` after it. If the component already keeps an internal ref (focus trap, click-outside, picker trigger), merge them:
   ```ts
   const setRef = (node: HTMLDivElement | null) => {
     internalRef.current = node;
     if (typeof ref === 'function') ref(node); else if (ref) ref.current = node;
   };
   ```

4. **Spread `{...rest}` onto that same node**, placed *first* so the component's own attributes win. This is what makes `data-testid`, `aria-*`, `autoComplete`, `maxLength` and form-library registration work.

5. **Event handlers keep native React signatures.** `onChange` must be `React.ChangeEventHandler`, never `(value: string) => void` — that shape breaks react-hook-form, Formik and TanStack Form. Put the convenience callback under a name matching the value's shape, and fire both:

   | Value shape | Convenience prop |
   |---|---|
   | string / number | `onValueChange` |
   | boolean | `onCheckedChange` |
   | array | `onValuesChange` |

   ```ts
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     onChange?.(e);
     onValueChange?.(e.target.value);
   };
   ```

6. **Never invent a prop that shadows a native one with different semantics.** Prefer `variant` (not `priority`/`kind`) and `disabled` (a real boolean, never a value inside a `state` enum). **Figma variant properties are not code props** — `hover` and `active` belong to CSS pseudo-classes, so a `state` prop that includes them has two sources of truth. Where a collision is unavoidable and intentional (`size` vs the native character-width attribute, `title` vs the native tooltip), say so in the prop's JSDoc.

7. **Discard props that would be invalid on the rendered node** rather than spreading them — e.g. `name` on a `<div role="radio">`. Destructure with a `_` prefix (`name: _name`) and document why in the JSDoc; the ESLint config allows `^_`.

8. **Deprecate, never remove.** Keep the old prop working and mark it `@deprecated` with the replacement named. `className` stays wherever it already is (usually the wrapper) — moving it is a silent visual break.

**If the component is a labelled form control, compose it inside `Field`** (`src/components/Field/Field.tsx`) rather than re-implementing the scaffolding. Field owns the label and its `htmlFor`, the required marker, the helper/error text, the generated ids, and the `aria-describedby` / `aria-invalid` wiring — six components each rolled their own before it existed, and two of them silently diverged (Dropdown announced neither its helper text nor its error state). Pass `className` (your own root classes), `label`, `helperText`, `error`, `required`, `disabled`, `size` and `id`; render the control as children. Field owns no layout, so your root class keeps its own flex/gap.

Two details worth knowing before you reach for it:
- `htmlFor` only associates with **labelable** elements (input, select, textarea, button…). If your control is a composite built from a `div` — a `role="combobox"` trigger, say — point `aria-labelledby` at `` `${id}-label` `` instead, which is the id Field puts on its label.
- Content that belongs *opposite* the helper text (a character counter, a unit) goes in Field's `aside` prop, not a hand-rolled footer.

### File 2: `ComponentName.css`
- CSS custom properties exclusively — **no hardcoded hex colours**, no raw `rgb()`/`rgba()`
- Icons are sized by setting `--icon-size: var(--icon-size-sm|md|lg|xl)` (20/24/32/48px) on the icon element — never `font-size` or raw pixel dimensions on an icon
- Transitions/animations compose `--motion-duration-*` with `--motion-ease-*` from `tokens-motion.css` — never literal timings like `0.2s ease` (new code must use the motion tokens from the start)
- All other spacing, padding, gap, border-radius, font sizes must use semantic tokens from `tokens-light.css` / `tokens-typography.css`
- **If a value genuinely cannot use a token** (colour-space physics, a glyph inside a control's geometry, decorative timing tuned by eye), sanction it *at the site*: a `/* ds-allow(<category>): <reason> */` line inside a comment at the value (`ds-allow-file(...)` in the header for file-wide cases), plus a sentence in the component's design.md spec. The category set is the closed list in `scripts/validate-css-directives.mjs` (grammar is build-enforced). **Never add an exception to the token-audit skill** — it reads the directives; it maintains no list
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

4. **Register the component** in `src/components/registry.json` — add an **object** to the `components` array (alphabetical by `name`):

   ```json
   { "name": "MyComponent", "label": "My component", "slug": "my-component",
     "description": "One line, ending in a full stop, under 160 characters.",
     "category": "forms", "client": true }
   ```

   The `description` is shipped copy (it feeds the sidebar, page metadata, and README): a verbless one-line fragment ending in a full stop, written per the register table in `content-design.md`. `category` must be one of the registry's `categories` — add a new one deliberately rather than inventing one per component. `client` must match whether the file declares `'use client'`; the validator compares them and fails on a mismatch, so the registry can never document a component as server-renderable when it isn't. **The sidebar nav entry, sitemap, breadcrumbs, mega-nav and the page's title and description all derive from this entry** — never hand-add a nav link. This file is the single source of truth for the component count; `scripts/validate-component-registry.mjs` runs before every build and **fails if the folder is unregistered**. Run `npm run validate-registry` to confirm — this also regenerates the README's component count/list **and the package barrels** (`src/index.ts`, or `src/charts.ts` if the component imports recharts — the generator routes by detecting the import; never hand-edit either barrel). **Commit the updated `README.md` and regenerated barrel alongside the registration.** The component is then automatically part of the published `@robr0/design-system` API — both the barrel and the `./components/*` deep-import subpath. If the component needs a new runtime dependency, stop and ask: the package's only runtime deps are the react peer and the optional recharts peer, and adding one is a packaging decision.

   One exception: a **docs-only helper** (a component that exists purely for the website/Storybook docs, like the `*Swatch` components) goes in the registry's `docOnlyHelpers` array instead of `components` — it gets no showcase page, no barrel export, and doesn't count. Putting it in `components` fails the build for a missing website page.

5. **Document it in `design.md`** — add a short component spec section (class name, tokens used, key behaviours), following the format of the existing component sections.

6. **Hand off the website work.** A component is not done until it has a showcase page: a `page.tsx`, a `page.module.css`, a `layout.tsx` containing exactly `export const metadata = componentPageMetadata("<slug>");`, and a `TocCard` in the grid in `website/src/app/components/page.tsx`. The `TocCard` is the only surface still hand-maintained — each card holds a bespoke live preview. Everything else (sidebar, sitemap, breadcrumbs, title, description) derives from the registry entry. All of it is build-enforced by `scripts/validate-website-surfaces.mjs` and `scripts/validate-page-titles.mjs`. Ask Rob: "Should I add the website documentation page now? (invokes the `component-doc-page` skill)" — and whoever does that work must complete every registration above.
