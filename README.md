# robr0 — Portfolio + Design System

[![CI](https://github.com/robritacca-dotcom/design-system/actions/workflows/ci.yml/badge.svg)](https://github.com/robritacca-dotcom/design-system/actions/workflows/ci.yml)
<!-- npm-badge:start -->
[![npm](https://img.shields.io/npm/v/@robr0%2Fdesign-system?logo=npm&color=CB3837)](https://www.npmjs.com/package/@robr0/design-system)
<!-- npm-badge:end -->

A personal portfolio site built on a custom React design system I designed and engineered from scratch. The DS isn't a side project — it's the backbone every portfolio page is built on, ensuring the work is presented consistently and with the same craft standards I apply professionally.

**[→ Live site](https://robertritacca.com/)** · **[→ Storybook](https://design-system-iota-one.vercel.app/?path=/docs/robr0-ds--docs)**

The **live site** is the portfolio built on the design system. **Storybook** is the interactive component explorer for the design system itself — two separate parts of this repo.

---

## Two things, one repo

| Part | Description |
|---|---|
| **Portfolio website** (`/website`) | Next.js app with case studies, work history, writing, and about pages — all built exclusively with the design system components below. **[Live site →](https://robertritacca.com/)** |
| **Design system** (`/src`) | <!-- component-count -->56<!-- /component-count --> React components, a three-tier token architecture, dark mode, and a full documentation site. Built to production standards. **[Storybook →](https://design-system-iota-one.vercel.app/?path=/docs/robr0-ds--docs)** |

---

## Design system

### Components

<!-- component-list:start -->
Accordion · Alert · Alert dialog · App layout · App sidebar · Avatar · Badge · Breadcrumb · Button · Button group · Card · Carousel · Chart · Checkbox · Chip · Circular button · Code block · Combobox · Command palette · Contact card · Contribution graph · Date input · Date picker · Dialog · Divider · Drawer · Dropdown · Dropdown menu · Empty state · Entity card · Figure · File input · Input · Instructions · Link list · Nav · Pagination · Popover · Progress bar · Quote · Radio button · Section title · Segmented control · Selection card · Skeleton · Slider · Spinner · Stat · Table · Tabs · Textarea · Timeline · Toast · Toggle group · Toggle switch · Tooltip
<!-- component-list:end -->

### Using the package

The design system is published as [`@robr0/design-system`](https://www.npmjs.com/package/@robr0/design-system) (React 19+ is a peer dependency):

```bash
npm install @robr0/design-system
```

Import the token stylesheet once (it carries the primitives, semantic tokens, and both themes), then use components:

```tsx
import '@robr0/design-system/tokens/tokens.css';
import { Button, Card, Badge } from '@robr0/design-system';
```

Deep imports work too (`@robr0/design-system/components/Button/Button`). Chart components live behind a separate entry so the optional `recharts` peer dependency is only needed if you use them:

```tsx
import { BarChart, LineChart } from '@robr0/design-system/charts';
```

**Theming and customization** happen through CSS variables — no configuration API:

- **Dark mode**: set `data-theme="dark"` on the root element (light is the default).
- **Font**: the whole type scale chains to one token. Load any font you like and override it:
  ```css
  :root { --font-family-primary: 'Inter', sans-serif; }
  ```
- **Colors, radius, spacing**: every semantic token chains to a primitive, so overriding a primitive re-themes everything built on it:
  ```css
  :root {
    --primitive-teal-07: #7C3AED;  /* your brand color becomes the action color */
    --primitive-radius-full: 12px; /* pill buttons become rounded rectangles */
  }
  ```

Icons use a bundled Material Symbols Rounded variable font (woff2) — no extra setup. Nunito Sans, the system's default typeface, is intentionally *not* bundled: load it yourself (e.g. Google Fonts or `next/font`) or override `--font-family-primary`.

### Token architecture

Tokens flow in one direction — primitives are never referenced directly in components:

```
tokens-primitives.css      --primitive-teal-07: #118AB2
        ↓
tokens-light/dark.css      --color-action-primary-bg: var(--primitive-teal-07)
        ↓
Component CSS              background-color: var(--color-action-primary-bg)
```

Dark mode is driven by `data-theme="dark"` on the root element — no `prefers-color-scheme` queries in components.

### Design principles

- **Single typeface**: Nunito Sans (weight 300 for display, 600 for headings, 400/500 for body)
- **White-floor UI**: depth comes from a container color ramp, not box shadows
- **Teal is the action color**: primary buttons and focus rings only — never decorative
- **Five status variants**: info, positive, warning, error, neutral — shared tokens across Badge, Alert, Toast, ProgressBar
- **Material Symbols Rounded** for all icons

Full spec in [`design.md`](design.md).

---

## Tech

- **React 19 + TypeScript** — component library
- **Vite 7** — dev server and library build
- **Next.js 16** — portfolio site and DS documentation
- **Storybook 10** — component explorer
- **Vitest + Playwright** — every Storybook story runs as a render test in headless Chromium
- **CSS custom properties** — all theming via semantic tokens, no CSS-in-JS

---

## Quality & CI

Every push and pull request runs a GitHub Actions pipeline ([`ci.yml`](.github/workflows/ci.yml)) with four jobs: **lint + library build**, **story tests** (every Storybook story rendered in headless Chromium via Vitest), **Storybook build**, and **website build**. The same checklist runs locally with one command:

```bash
npm run verify   # lint + library type-check + package build + story tests + Storybook build + website build
```

CI also guards against documentation drift: generated surfaces (this README's component count and list, the website's skills pages, the published CLAUDE.md/design.md blueprints) are rebuilt from their source registries on every build, and CI fails if the committed copies are stale. The numbers on the site are never hand-written.

---

## Running locally

```bash
# Storybook (the library's dev sandbox)
npm run storybook        # http://localhost:6006

# Portfolio + documentation website (npm workspace — install once at the root)
npm install
npm run dev --workspace website   # http://localhost:3000
```
