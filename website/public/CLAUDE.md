# CLAUDE.md — Design System

## What This Is

A React component library + design system + documentation website. It has two interconnected parts:

1. **Component Library** (`/src`) — React components built with Vite + TypeScript. Each component has its own folder with implementation, scoped CSS, and Storybook stories. Components are consumed by the website via the `@design-system` path alias. The official component list and count live in `src/components/registry.json` — see **Registries** below; never hardcode a count.
2. **Documentation Website** (`/website`) — A separate Next.js app that showcases every component with live, interactive examples. Each component has its own page under `website/src/app/components/[component-name]/`.

The design spec lives in [`design.md`](design.md) — read it before touching tokens, colors, or typography.

---

## Registries — counts are never hardcoded

**General rule:** any count of items displayed anywhere (components, skills, tokens, loops — anything countable) must derive from a registry that is the single source of truth for that collection, kept in sync with reality by a build-time validator. Never write a literal number (or a hand-maintained list that implies one) into page copy, stats, or docs.

Existing registries:

| Collection | Registry | Count export | Validator |
|---|---|---|---|
| Components | `src/components/registry.json` (`components` + `docOnlyHelpers`) | `COMPONENT_COUNT` from `src/components/registry.ts` | `scripts/validate-component-registry.mjs` — every folder registered, every entry has a folder |
| Skills | `.claude/skills/registry.json` (`displayed` + `external` + `unlisted`) | `SKILL_COUNT` from `website/src/data/skills-registry.ts` | `scripts/validate-skills-registry.mjs` — every `.md` registered, every entry has a file, page list matches `displayed` + `external` |
| Project journal | `website/src/data/site-updates.json` (curated timeline entries + `asOf` commit bookmark) | `SITE_UPDATE_COUNT` from `website/src/data/site-updates.ts` | `scripts/validate-site-updates.mjs` — structure only (complete stories, valid bookmark, no commit-hash dumps); freshness is the biweekly `site-updates` skill's job, never the build's |

The `/project-journal` page renders this data as the build-progression timeline; entries are agent-curated stories (one theme consolidating many commits — what/why/outcome prose), appended by the `site-updates` skill. All validators run before every build (`npm run validate-registry`, wired into `prebuild`/`prestorybook`/`prebuild-storybook` and the website's `prebuild`).

**README.md is a generated surface for registry data.** `scripts/generate-readme-content.mjs` (also in the `validate-registry` chain) rewrites the README's component count and component list from `src/components/registry.json` between `<!-- component-count -->` / `<!-- component-list:start/end -->` markers — never hand-edit inside the markers, and commit README.md when a build regenerates it. The same script fails the build if the README's Tech section names a different major version of React, Next.js, Storybook, or Vite than package.json.

When a new countable collection appears on the site (tokens, loops, case studies…): create a registry file next to the collection, export the count from a small accessor module, add a validator script chained into `validate-registry`, and pull every displayed number from the export. When adding a skill: register it in `.claude/skills/registry.json` (`displayed` if it appears on `/skills`, `unlisted` if internal) and, if displayed, add its card to `website/src/app/skills/page.tsx` — the build fails if the three drift.

**The website's /blueprints pages are a generated surface too.** `scripts/sync-blueprints.mjs` (in the `validate-registry` chain) copies the root `CLAUDE.md` and `design.md` into `website/public/` on every build — never hand-edit those copies; edit the root files.

**Self-descriptions stay in sync.** The repo describes itself in prose in several places — `README.md`, `design.md`, this file, and the website's foundations/about pages. Whenever a change makes a statement in any of them false (a new component category, a dropped dependency, a renamed part, a changed principle), update that prose in the same change — don't leave it for a future audit. If the drifting fact is *countable or mechanically checkable* (a count, a list, a version number), don't just fix the prose: route it through a registry + generator/validator in the `validate-registry` chain so it can never drift again (the README component section and Tech versions are the reference example).

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
npm run test            # run every Storybook story as a render test (headless Chromium)
npm run verify          # full local quality gate: lint + tests + all three builds (mirrors CI)
```

---

## CI & Local Verify

Every push to `main` and every PR runs `.github/workflows/ci.yml` (four jobs: library lint + build, story tests, Storybook build, website build). The library job ends with a **drift guard** — `git diff --exit-code` after the generators run — so a registry change that lands without its regenerated README/skills/blueprint content fails CI.

**Story tests**: `npm run test` runs every Storybook story as a render test in headless Chromium (Vitest + `@storybook/addon-vitest`, configured in `vite.config.ts`). A story that throws on render fails the suite — so every component variant is smoke-tested on every change. A11y checks run alongside in `'todo'` mode (report-only; see `.storybook/preview.ts`).

`npm run verify` is the **single local mirror of CI**: lint, library build, story tests, Storybook build, website build, in that order. The rule that keeps them in sync: **when CI gains a check (a11y, visual regression), add it to `verify` in the same change** — skills and docs reference `verify`, never individual commands, so nothing else needs updating.

---

## Project Structure

```
/
├── design.md                  # Design spec — source of truth for tokens, colors, typography
├── src/
│   ├── components/            # Component folders (each self-contained) + registry.json (official list/count)
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

A new component is not done until it appears in **every** place the system documents itself: the library, Storybook, and all relevant sections of the showcase website. Do not skip registration steps.

1. **Create the folder**: `src/components/MyComponent/`
2. **Write `MyComponent.tsx`**: Export a named component + a TypeScript interface for props. Use semantic tokens in class names, never inline styles.
3. **Write `MyComponent.css`**: All CSS vars must be from `tokens-light/dark.css`. No hardcoded hex, px values from primitives, or magic numbers.
4. **Write `MyComponent.stories.tsx`**: Export a `meta` (with `title: 'Components/MyComponent'`, `tags: ['autodocs']`) and at least a `Default` story plus one per meaningful variant. (`.stories.ts` also works for stories with no JSX, but `.tsx` is the convention across the library.)
5. **Add a website showcase page**: Create `website/src/app/components/my-component/page.tsx` + `page.module.css`. Follow the pattern in an existing page (e.g., `website/src/app/components/button/page.tsx`).
6. **Register it everywhere the website lists components** (all four):
   - `src/components/registry.json` — add the folder name to `components` (the official count everywhere derives from this; the build fails if you forget)
   - `website/src/config/navigation.ts` — add to `componentsSidebarLinks` (alphabetical)
   - `website/src/app/components/page.tsx` — add a `TocCard` with a small live preview to the components index grid (alphabetical)
   - `website/src/app/sitemap.ts` — add the new route (alphabetical)
7. **Document it in `design.md`**: add a short component spec section (class name, tokens used, key behaviours).

Checklist before shipping a component:
- [ ] All colors via semantic tokens
- [ ] Dark mode verified (toggle `data-theme="dark"` in Storybook)
- [ ] Disabled state at `opacity: 0.4`, `cursor: not-allowed`
- [ ] Interactive elements have ARIA roles and keyboard navigation
- [ ] At least one Storybook story per variant
- [ ] Website showcase page added
- [ ] Added to `src/components/registry.json` (build-enforced)
- [ ] Registered in sidebar nav, components index `TocCard` grid, and sitemap
- [ ] Spec section added to `design.md`

---

## How to Add a New Token

Tokens also have multiple homes — a token that exists only in CSS is incomplete. When adding or changing a token:

1. **Both theme files, always**: define it in `src/tokens/tokens-light.css` **and** `src/tokens/tokens-dark.css` (every semantic token needs a value in each). Add a primitive to `tokens-primitives.css` first if no suitable one exists; semantic tokens should reference primitives.
2. **Document it in `design.md`**: it's the source of truth for the design language — record the token's role and its light/dark values.
3. **Add it to the foundations doc pages** on the website, in the section matching its type:
   - Semantic colors → `website/src/app/foundations/colour-mode/page.tsx` (add a swatch data entry with per-theme primitive name/hex/RGB, and a new `SectionTitle` group if it's a new category)
   - New primitives → `website/src/app/foundations/colour-primitives/page.tsx`
   - Spacing/radius/border → `website/src/app/foundations/spatial/page.tsx`
   - Typography → `website/src/app/foundations/typography/page.tsx`
4. **Update the Storybook token docs**: `src/stories/Tokens.stories.tsx` documents semantic tokens by category (colors, status, chart, spacing) — add the new token to the matching story, or a new story if it's a new category. (`src/stories/` also holds `Typography`, `Icons`, and `Logos` foundation docs.)

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

## Known Gaps

- No `--motion-*` token for animation timings — transitions are hardcoded `0.2s ease`
- No `--icon-size-*` tokens — icon sizes are hardcoded per component
- No `--chart-series-{n}` formal token set for ordered chart series colors
- Figma source file documented: [robr0-ds26](https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/robr0-ds26) — foundation/component pages deep-link to specific frames via `figmaUrl`
- A11y checks are report-only — story tests run axe per story, but `a11y.test` in `.storybook/preview.ts` is `'todo'`, so violations warn instead of failing CI; no visual-regression coverage yet either (Chromatic planned)
