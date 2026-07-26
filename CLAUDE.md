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
| Component website surfaces | `src/components/registry.json` (same registry) | — | `scripts/validate-website-surfaces.mjs` — every public component has a showcase page, sidebar nav entry (alphabetical), index-grid `TocCard`, and a `###` spec section in `design.md` |
| Skills | `.claude/skills/registry.json` (`displayed` + `external` + `unlisted`) | `SKILL_COUNT` from `website/src/data/skills-registry.ts` | `scripts/validate-skills-registry.mjs` — every `.md` registered, every entry has a file, page list matches `displayed` + `external` |
| Project journal | `website/src/data/site-updates.json` (curated timeline entries + `asOf` commit bookmark) | `SITE_UPDATE_COUNT` from `website/src/data/site-updates.ts` | `scripts/validate-site-updates.mjs` — structure only (complete stories, valid bookmark, no commit-hash dumps); freshness is the biweekly `site-updates` skill's job, never the build's |
| Semantic tokens | `src/tokens/registry.json` — **generated** from the semantic token CSS (`tokens-light.css` + `tokens-typography.css` + `tokens-motion.css`) by `scripts/generate-token-registry.mjs`, never hand-edited | `TOKEN_COUNT` + `TOKEN_COUNTS` (per category) from `src/tokens/registry.ts` | `scripts/validate-token-registry.mjs` — registry matches the CSS, light/dark colour parity; a token with an unknown prefix fails generation until its category is added deliberately |

The `/project-journal` page renders this data as the build-progression timeline; entries are agent-curated stories (one theme consolidating many commits — what/why/outcome prose), appended by the `site-updates` skill. All validators run before every build (`npm run validate-registry`, wired into `prebuild`/`prestorybook`/`prebuild-storybook` and the website's `prebuild`).

**README.md is a generated surface for registry data.** `scripts/generate-readme-content.mjs` (also in the `validate-registry` chain) rewrites the README's component count and component list from `src/components/registry.json` between `<!-- component-count -->` / `<!-- component-list:start/end -->` markers — never hand-edit inside the markers, and commit README.md when a build regenerates it. The same script fails the build if the README's Tech section names a different major version of React, Next.js, Storybook, or Vite than package.json.

When a new countable collection appears on the site (tokens, loops, case studies…): create a registry file next to the collection, export the count from a small accessor module, add a validator script chained into `validate-registry`, and pull every displayed number from the export. When adding a skill: register it in `.claude/skills/registry.json` (`displayed` if it appears on `/skills`, `unlisted` if internal) and, if displayed, add its card to `website/src/app/skills/page.tsx` — the build fails if the three drift.

**The website's /blueprints pages are a generated surface too.** `scripts/sync-blueprints.mjs` (in the `validate-registry` chain) copies the root `CLAUDE.md` and `design.md` into `website/public/` on every build — never hand-edit those copies; edit the root files.

**Self-descriptions stay in sync.** The repo describes itself in prose in several places — `README.md`, `design.md`, this file, and the website's foundations/overview pages. Whenever a change makes a statement in any of them false (a new component category, a dropped dependency, a renamed part, a changed principle), update that prose in the same change — don't leave it for a future audit. If the drifting fact is *countable or mechanically checkable* (a count, a list, a version number), don't just fix the prose: route it through a registry + generator/validator in the `validate-registry` chain so it can never drift again (the README component section and Tech versions are the reference example).

---

## Quick Start

```bash
# Storybook (interactive component showcase — the library's dev sandbox)
npm run storybook              # http://localhost:6006

# Documentation website (separate project)
cd website && npm install && npm run dev   # http://localhost:3000
```

Other useful commands:
```bash
npm run build           # type-check the library
npm run lint            # ESLint
npm run build-storybook # export static Storybook
npm run test            # run every Storybook story as a render test (headless Chromium)
npm run verify          # full local quality gate: lint + tests + all three builds (mirrors CI)
```

---

## CI & Local Verify

Every push to `main` and every PR runs `.github/workflows/ci.yml` (four jobs: library lint + build, story tests, Storybook build, website lint + build). The library job ends with a **drift guard** — `git diff --exit-code` after the generators run — so a registry change that lands without its regenerated README/skills/blueprint content fails CI.

**Story tests**: `npm run test` runs every Storybook story as a render test in headless Chromium (Vitest + `@storybook/addon-vitest`, configured in `vite.config.ts`). A story that throws on render fails the suite — so every component variant is smoke-tested on every change. A11y checks run alongside in `'todo'` mode (report-only; see `.storybook/preview.ts`).

`npm run verify` is the **single local mirror of CI**: lint, library build, story tests, Storybook build, website lint, website build, in that order. The rule that keeps them in sync: **when CI gains a check (a11y, visual regression), add it to `verify` in the same change** — skills and docs reference `verify`, never individual commands, so nothing else needs updating.

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
│   │   ├── tokens-typography.css    # Font size/weight/line-height scale
│   │   └── tokens-motion.css        # Duration/easing scale + reduced-motion guard
│   └── fonts/                 # Material Symbols icon font (self-hosted); Nunito Sans is loaded via Google Fonts
├── .storybook/                # Storybook config (Storybook is the library's dev sandbox)
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
- **Semantic tokens** (`--color-*`, `--radius-*`, `--gap-*`, `--padding-*`, `--font-*`, `--motion-*`, `--icon-size-*`, `--shadow-*`) — always use these in components.
- **Dark mode** is driven by `data-theme="dark"` on the root element. Every semantic token has a light and dark value — no `prefers-color-scheme` queries in components.

Key invariants:
- Teal `--color-action-primary-bg` (#118AB2) is **only** for primary CTA buttons and focus rings. Never decorative.
- Never hardcode hex values in component CSS — always a semantic token.
- Never hardcode hex values in semantic colour tokens either: every `--color-*` value in `tokens-light/dark.css` must be a `var(--primitive-*)` (or `var(--color-*)`) reference — build-enforced by `scripts/validate-token-references.mjs`. This is what lets a consumer override a primitive and have it cascade through the whole system.
- Buttons are always `--radius-full` (pill). Inputs are always `--radius-md` (12px). Card/EntityCard navigation tiles are the exception: `--radius-xl` (24px).

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
5. **Add a website showcase page**: Create `website/src/app/components/my-component/page.tsx` + `page.module.css` + `layout.tsx`. Follow the pattern in an existing page (e.g., `website/src/app/components/button/page.tsx`). The `layout.tsx` must resolve its title through `pageMetadata("/components/my-component", "<one-line description>")` — without it the tab title silently falls back to the site-wide default.
6. **Register it everywhere the website lists components** (all three — the sitemap derives from the sidebar config automatically):
   - `src/components/registry.json` — add the folder name to `components` (the official count everywhere derives from this)
   - `website/src/config/navigation.ts` — add to `componentsSidebarLinks` (alphabetical)
   - `website/src/app/components/page.tsx` — add a `TocCard` with a small live preview to the components index grid (alphabetical)
7. **Document it in `design.md`**: add a short component spec section (class name, tokens used, key behaviours).

Steps 5–7 are build-enforced by two validators: `scripts/validate-website-surfaces.mjs` fails the build if any public component is missing its showcase page, nav entry, `TocCard`, or `design.md` spec, or if the sidebar falls out of alphabetical order; `scripts/validate-page-titles.mjs` fails it if the page has no `layout.tsx`, or if that layout does not derive its title from `pageMetadata()`.

Checklist before shipping a component:
- [ ] All colors via semantic tokens
- [ ] Dark mode verified (toggle `data-theme="dark"` in Storybook)
- [ ] Disabled state at `opacity: 0.4`, `cursor: not-allowed`
- [ ] Interactive elements have ARIA roles and keyboard navigation
- [ ] At least one Storybook story per variant
- [ ] Website showcase page added, with a `layout.tsx` title via `pageMetadata()` (build-enforced)
- [ ] Added to `src/components/registry.json` (build-enforced)
- [ ] Registered in sidebar nav and components index `TocCard` grid (build-enforced; sitemap derives from the nav)
- [ ] Spec section added to `design.md` (build-enforced)

---

## How to Add a New Token

Tokens also have multiple homes — a token that exists only in CSS is incomplete. When adding or changing a token:

1. **Both theme files, always**: define it in `src/tokens/tokens-light.css` **and** `src/tokens/tokens-dark.css` (every semantic token needs a value in each). Add a primitive to `tokens-primitives.css` first if no suitable one exists; semantic colour tokens **must** reference primitives via `var()` (build-enforced by `scripts/validate-token-references.mjs`).
2. **Document it in `design.md`**: it's the source of truth for the design language — record the token's role and its light/dark values.
3. **Add it to the foundations doc pages** on the website, in the section matching its type:
   - Semantic colors → `website/src/app/foundations/colour-mode/page.tsx` (add a swatch data entry with per-theme primitive name/hex/RGB, and a new `SectionTitle` group if it's a new category)
   - New primitives → `website/src/app/foundations/colour-primitives/page.tsx`
   - Spacing/radius/border → `website/src/app/foundations/spatial/page.tsx`
   - Shadows/depth → `website/src/app/foundations/elevation/page.tsx`
   - Typography → `website/src/app/foundations/typography/page.tsx`
   - Icon sizes → `website/src/app/foundations/icons/page.tsx` (the `--icon-size-*` scale table)
   - Motion (durations/easings) → `website/src/app/foundations/motion/page.tsx` (add a `MotionSwatch` entry to the matching token array)
4. **Update the Storybook token docs**: `src/stories/Tokens.stories.tsx` documents semantic tokens by category (colors, status, chart, spacing) — add the new token to the matching story, or a new story if it's a new category. (`src/stories/` also holds `Typography`, `Icons`, and `Logos` foundation docs.)
5. **Counts take care of themselves**: `src/tokens/registry.json` is regenerated from the token CSS on every build (see **Registries**), so displayed token counts update automatically — never hardcode one. If the token introduces a *new prefix*, generation fails until you add the prefix to `CATEGORY_PREFIXES` in `scripts/generate-token-registry.mjs` and give the category a home wherever counts are shown.

---

## Design Principles (distilled from design.md)

- **Single typeface**: Nunito Sans only. Weight 300 for display/marketing, 600 for in-app headings, 500/400 for body. Inter is an acceptable prototype substitute; avoid Arial/Helvetica.
- **White-floor UI**: page background is pure white (#FFFFFF light / #050505 dark). Depth comes from the container color ramp (`container-primary` → `secondary` → `tertiary`) — not shadows.
- **Teal (#118AB2) is the action color**: primary buttons, focus rings, active input borders. Using it decoratively on text or illustrations dilutes its CTA signal.
- **Five status variants — no more**: `info` (blue), `positive` (green), `warning` (orange), `error` (red), `neutral` (gray). Badge, Alert, Toast, and ProgressBar all share the same `--color-status-*` token set.
- **No box shadows on standard containers**: the elevation system is color-based. The only shadows are the semantic tokens `--shadow-floating` (popovers, dropdowns, chart tooltips, toasts) and `--shadow-modal` (Dialog/AlertDialog, paired with `--color-scrim`), plus one sanctioned exception: interactive Card tiles lift on hover (see design.md).
- **Material Symbols Rounded** for all icons, on the four-step `--icon-size-*` scale (20/24/32/48px; 24px default, 20px compact). Components set `--icon-size` to a scale step — never `font-size` directly on an icon.
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
| [`src/tokens/tokens-motion.css`](src/tokens/tokens-motion.css) | Duration/easing tokens + reduced-motion guard |
| [`src/components/Button/Button.tsx`](src/components/Button/Button.tsx) | Reference implementation for a component |
| [`src/components/Button/Button.stories.ts`](src/components/Button/Button.stories.ts) | Reference for Storybook story structure |
| [`website/src/app/components/button/page.tsx`](website/src/app/components/button/page.tsx) | Reference for a website showcase page |
| [`website/src/config/navigation.ts`](website/src/config/navigation.ts) | Nav links — update when adding pages |
| [`.storybook/main.ts`](.storybook/main.ts) | Storybook config (addons, stories glob) |

---

## Known Gaps

- CSS motion is fully tokenized (`--motion-*`), but JS-driven timings (Tooltip delays, Toast auto-dismiss, Carousel autoplay) remain hardcoded TS constants — tokenizing them is a pending follow-up
- No `--chart-series-{n}` formal token set for ordered chart series colors
- Figma source file documented: [robr0-ds26](https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/robr0-ds26) — foundation/component pages deep-link to specific frames via `figmaUrl`
- A11y checks are report-only — story tests run axe per story, but `a11y.test` in `.storybook/preview.ts` is `'todo'`, so violations warn instead of failing CI; no visual-regression coverage yet either (Chromatic planned)
