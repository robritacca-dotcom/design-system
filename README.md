# robr0 — Portfolio + Design System

[![CI](https://github.com/robritacca-dotcom/design-system/actions/workflows/ci.yml/badge.svg)](https://github.com/robritacca-dotcom/design-system/actions/workflows/ci.yml)

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
npm run verify   # lint + library build + story tests + Storybook build + website build
```

CI also guards against documentation drift: generated surfaces (this README's component count and list, the website's skills pages, the published CLAUDE.md/design.md blueprints) are rebuilt from their source registries on every build, and CI fails if the committed copies are stale. The numbers on the site are never hand-written.

---

## Running locally

```bash
# Component library (Vite dev sandbox)
npm run dev              # http://localhost:5173

# Storybook
npm run storybook        # http://localhost:6006

# Portfolio + documentation website
cd website
npm install
npm run dev              # http://localhost:3000
```
