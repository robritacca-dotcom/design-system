# CLAUDE.md — Design System

## What This Is

A React component library + design system + documentation website. It has two interconnected parts:

1. **Component Library** (`/src`) — 44 React components built with Vite + TypeScript. Each component has its own folder with implementation, scoped CSS, and Storybook stories. Components are consumed by the website via the `@design-system` path alias.
2. **Documentation Website** (`/website`) — A separate Next.js app that showcases every component with live, interactive examples. Each component has its own page under `website/src/app/components/[component-name]/`.

The design spec lives in [`design.md`](design.md) — read it before touching tokens, colors, or typography.

---

## Quick Start

```bash
# Component library dev server
npm run dev                    # http://localhost:5173

# Storybook (interactive component showcase)
npm run storybook              # http://localhost:6006

# Documentation website (separate project)
cd website && npm install && npm run dev   # http://localhost:3000
```

Other useful commands:
```bash
npm run build           # type-check + build library
npm run lint            # ESLint
npm run build-storybook # export static Storybook
```

---

## Project Structure

```
/
├── design.md                  # Design spec — source of truth for tokens, colors, typography
├── src/
│   ├── components/            # 44 component folders (each self-contained)
│   ├── tokens/
│   │   ├── tokens-primitives.css    # Raw hex/px values — never use directly in components
│   │   ├── tokens-light.css         # Semantic tokens, light theme
│   │   ├── tokens-dark.css          # Semantic tokens, dark theme
│   │   └── tokens-typography.css    # Font size/weight/line-height scale
│   ├── fonts/                 # Material Symbols icon font (self-hosted); Nunito Sans is loaded via Google Fonts
│   └── App.tsx                # Dev sandbox (generic; components are imported via @design-system)
├── .storybook/                # Storybook config
└── website/                   # Next.js docs site (separate npm project)
    ├── src/app/
    │   ├── components/        # One folder per component, each with page.tsx + page.module.css
    │   ├── foundations/       # Design tokens & layout doc pages
    │   └── about/             # About/work pages
    └── src/components/        # Shared Next.js UI (Header, Sidebar, Footer, etc.)
```

---

## Token Architecture

Three tiers — **never skip a tier**:

```
tokens-primitives.css       --primitive-teal-07: #118AB2
        ↓
tokens-light/dark.css       --color-action-primary-bg: var(--primitive-teal-07)
        ↓
Component CSS               background-color: var(--color-action-primary-bg)
```

- **Primitives** (`--primitive-*`) — raw values. Source of truth. Never referenced in components.
- **Semantic tokens** (`--color-*`, `--radius-*`, `--gap-*`, `--padding-*`, `--font-*`) — always use these in components.
- **Dark mode** is driven by `data-theme="dark"` on the root element. Every semantic token has a light and dark value — no `prefers-color-scheme` queries in components.

Key invariants:
- Teal `--color-action-primary-bg` (#118AB2) is **only** for primary CTA buttons and focus rings. Never decorative.
- Never hardcode hex values in component CSS — always a semantic token.
- Buttons are always `--radius-full` (pill). Inputs and cards are always `--radius-md` (12px).

---

## Component Anatomy

Every component lives in its own folder under `src/components/`:

```
src/components/Button/
├── Button.tsx            # TypeScript implementation + exported interface
├── Button.css            # Scoped CSS using semantic token vars
└── Button.stories.ts     # Storybook stories (Meta + named Story exports)
```

Components are imported in the website using the `@design-system` alias:
```tsx
import { Button } from '@design-system/components/Button/Button';
```

CSS class naming: `ds-{component}` base class, `ds-{component}--{modifier}` for variants. Example: `ds-button`, `ds-button--primary`, `ds-button--compact`.

---

## How to Add a New Component

1. **Create the folder**: `src/components/MyComponent/`
2. **Write `MyComponent.tsx`**: Export a named component + a TypeScript interface for props. Use semantic tokens in class names, never inline styles.
3. **Write `MyComponent.css`**: All CSS vars must be from `tokens-light/dark.css`. No hardcoded hex, px values from primitives, or magic numbers.
4. **Write `MyComponent.stories.ts`**: Export a `meta` (with `title: 'Components/MyComponent'`, `tags: ['autodocs']`) and at least a `Default` story plus one per meaningful variant.
5. **Add a website page**: Create `website/src/app/components/my-component/page.tsx` + `page.module.css`. Follow the pattern in an existing page (e.g., `website/src/app/components/button/page.tsx`).
6. **Register in navigation** if needed: check `website/src/config/navigation.ts`.

Checklist before shipping a component:
- [ ] All colors via semantic tokens
- [ ] Dark mode verified (toggle `data-theme="dark"` in Storybook)
- [ ] Disabled state at `opacity: 0.4`, `cursor: not-allowed`
- [ ] Interactive elements have ARIA roles and keyboard navigation
- [ ] At least one Storybook story per variant
- [ ] Website showcase page added

---

## Design Principles (distilled from design.md)

- **Single typeface**: Nunito Sans only. Weight 300 for display/marketing, 600 for in-app headings, 500/400 for body. Inter is an acceptable prototype substitute; avoid Arial/Helvetica.
- **White-floor UI**: page background is pure white (#FFFFFF light / #050505 dark). Depth comes from the container color ramp (`container-primary` → `secondary` → `tertiary`) — not shadows.
- **Teal (#118AB2) is the action color**: primary buttons, focus rings, active input borders. Using it decoratively on text or illustrations dilutes its CTA signal.
- **Five status variants — no more**: `info` (blue), `positive` (green), `warning` (orange), `error` (red), `neutral` (gray). Badge, Alert, Toast, and ProgressBar all share the same `--color-status-*` token set.
- **No box shadows on standard containers**: the elevation system is color-based. The only shadow in the system is on floating surfaces (popovers, dropdowns): `0 2px 8px rgba(5,5,5,0.08)`.
- **Material Symbols Rounded** for all icons — 24px default, 20px compact.
- **Weight contrast is the heading hierarchy rule**: `h2` is 30px/300 (light), `h3` is 22px/600 (bold). Never use the same weight for consecutive heading levels.

---

## Key Files

| File | Purpose |
|---|---|
| [`design.md`](design.md) | Full design spec — colors, typography, spacing, all component rules |
| [`src/tokens/tokens-primitives.css`](src/tokens/tokens-primitives.css) | Raw hex/px values |
| [`src/tokens/tokens-light.css`](src/tokens/tokens-light.css) | Semantic token definitions (light) |
| [`src/tokens/tokens-dark.css`](src/tokens/tokens-dark.css) | Semantic token overrides (dark) |
| [`src/tokens/tokens-typography.css`](src/tokens/tokens-typography.css) | Font size/weight/line-height scale |
| [`src/components/Button/Button.tsx`](src/components/Button/Button.tsx) | Reference implementation for a component |
| [`src/components/Button/Button.stories.ts`](src/components/Button/Button.stories.ts) | Reference for Storybook story structure |
| [`website/src/app/components/button/page.tsx`](website/src/app/components/button/page.tsx) | Reference for a website showcase page |
| [`website/src/config/navigation.ts`](website/src/config/navigation.ts) | Nav links — update when adding pages |
| [`.storybook/main.ts`](.storybook/main.ts) | Storybook config (addons, stories glob) |

---

## Known Gaps (from design.md)

- No `--motion-*` token for animation timings — transitions are hardcoded `0.2s ease`
- No `--icon-size-*` tokens — icon sizes are hardcoded per component
- No `--chart-series-{n}` formal token set for ordered chart series colors
- Figma source file documented: [robr0-ds26](https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/robr0-ds26) — foundation/component pages deep-link to specific frames via `figmaUrl`
- No GitHub Actions CI — no automated lint/test/Storybook build on push
