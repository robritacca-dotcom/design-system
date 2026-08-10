# robr0: portfolio + AI-ready design system

[![CI](https://github.com/robritacca-dotcom/design-system/actions/workflows/ci.yml/badge.svg)](https://github.com/robritacca-dotcom/design-system/actions/workflows/ci.yml)
<!-- npm-badge:start -->
[![npm](https://img.shields.io/npm/v/@robr0%2Fdesign-system?logo=npm&color=CB3837)](https://www.npmjs.com/package/@robr0/design-system)
<!-- npm-badge:end -->

A personal portfolio site, the AI-ready React design system behind it, and the AI layer that lets the site answer questions about itself. Claude Code builds all of it from the written specs in this repo (`CLAUDE.md` for the rules, `design.md` for the design language, `content-design.md` for how every word reads), and generated registries keep this README and the docs site from drifting. The design system is the backbone every portfolio page is built on, so the work is presented consistently and to the same craft standards throughout.

**[→ Live site](https://robertritacca.com/)** · **[→ Storybook](https://design-system-iota-one.vercel.app/?path=/docs/robr0-ds--docs)**

The **live site** is the portfolio built on the design system. **Storybook** is the interactive component explorer for the design system itself. They deploy separately: two Vercel projects from one repo.

---

## Three parts, one repo

| Part | Description |
|---|---|
| **Portfolio website** (`/website`) | Next.js app with case studies, work history, writing, and about pages, all built exclusively with the design system components below. **[Live site →](https://robertritacca.com/)** |
| **Design system** (`/src`) | <!-- component-count -->78<!-- /component-count --> React components, a three-tier token architecture, dark mode, and a full documentation site. Built to production standards. **[Storybook →](https://design-system-iota-one.vercel.app/?path=/docs/robr0-ds--docs)** |
| **AI layer** (`ai` components in `/src`, chat in `/website`, `/evals`) | A site-wide chat that answers questions about the work: built from the library's own `ai` components, grounded in a corpus generated from the site's published content, and scored by a golden-set eval. |

---

## Design system

### Components

<!-- component-list:start -->
Accordion · Agent status · AI button · Alert · Alert dialog · App layout · App sidebar · Avatar · Badge · Breadcrumb · Button · Button group · Card · Carousel · Chart · Chat header · Chat marker · Chat message · Chat thread · Checkbox · Chip · Circular button · Code block · Colour picker · Combobox · Command palette · Composer · Contact card · Context menu · Contribution graph · Date input · Date picker · Dialog · Divider · Document chip · Drawer · Dropdown · Dropdown menu · Empty state · Entity card · Field · Figure · File input · Input · Instructions · Interrupt card · Kbd · Link list · Message actions · Message card · Navigation · Nav list · Pagination · Popover · Progress bar · Prompt suggestions · Prose · Quote · Radio button · Reasoning · Section title · Segmented control · Selection card · Skeleton · Slider · Source chip · Spinner · Stat · Swatch · Table · Tabs · Textarea · Timeline · Toast · Toggle group · Toggle switch · Tool call · Tooltip
<!-- component-list:end -->

### Using the package

The design system is published as [`@robr0/design-system`](https://www.npmjs.com/package/@robr0/design-system) (React 19+ is a peer dependency). The **[full setup guide](https://robertritacca.com/docs/get-started)** covers install, dark mode, fonts, and re-theming:

```bash
npm install @robr0/design-system
```

The package is ESM-only and resolved via `exports` subpaths: use a bundler that handles CSS and font imports from `node_modules` (Vite, Next.js, webpack), and set TypeScript's `moduleResolution` to `"bundler"` (or `"nodenext"`).

Import the token stylesheet once (it carries the primitives, semantic tokens, and both themes), then use components:

```tsx
import '@robr0/design-system/tokens/tokens.css';
import { Button, Card, Badge } from '@robr0/design-system';
```

Deep imports work too (`@robr0/design-system/components/Button/Button`). Chart components live behind a separate entry so the optional `recharts` peer dependency is only needed if you use them:

```tsx
import { BarChart, LineChart } from '@robr0/design-system/charts';
```

**Theming and customisation** happen through CSS variables; there is no configuration API. Components are provider-free, with one exception: wrap your tree in `ToastProvider` if (and only if) you use the toast queue via `useToast`.

- **Dark mode**: set `data-theme="dark"` on the root element (light is the default).
- **Font**: the whole type scale chains to one token. Load any font you like and override it:
  ```css
  :root { --font-family-primary: 'Inter', sans-serif; }
  ```
- **Colours, radius, spacing**: every semantic token chains to a primitive, so overriding a primitive re-themes everything built on it:
  ```css
  :root {
    --primitive-teal-07: #7C3AED;  /* your brand color becomes the action color */
    --primitive-radius-full: 12px; /* pill buttons become rounded rectangles */
  }
  ```

Icons use a bundled Material Symbols Rounded variable font (woff2), with no extra setup. Nunito Sans, the system's default typeface, is intentionally *not* bundled: load it yourself (e.g. Google Fonts or `next/font`) or override `--font-family-primary`.

### Token architecture

Tokens flow in one direction, and primitives are never referenced directly in components:

```
tokens-primitives.css      --primitive-teal-07: #118AB2
        ↓
tokens-light/dark.css      --color-action-primary-bg: var(--primitive-teal-07)
        ↓
Component CSS              background-color: var(--color-action-primary-bg)
```

Dark mode is driven by `data-theme="dark"` on the root element, with no `prefers-color-scheme` queries in components.

### Design principles

Stated as token roles on purpose. What each role resolves to is the theme, and yours to override:

- **Style with semantic tokens, never raw values**: that is what makes one primitive override cascade through everything
- **One typeface**, hierarchy carried by weight contrast
- **The primary-action token means "click here"**: CTAs and focus only, never decoration
- **Shape is a per-element-type token**, not a per-instance choice
- **Five status roles** (info, positive, warning, error, neutral) shared by every status-bearing component
- **Depth is token-owned**: the container ramp plus the system's elevation tokens, and components don't bring their own shadows

The defaults behind each role, and every component spec, live in [`design.md`](design.md).

---

## AI layer

The library's `ai` category is the interface half: chat primitives (Chat thread, Chat message, Composer) and agent-state components (Tool call, Reasoning, Agent status) that ship in the npm package like any other category. The site's own chat, robr0 GPT, is built from them, so it doubles as a live demo of the components it is made of.

The answering half is a Claude-backed route (`website/src/app/api/chat/route.ts`) with a persona and guardrails. There is no retrieval step: `scripts/generate-site-corpus.mjs` compiles every published page's prose, the data registries, and the root specs into one corpus at build time, and the model reads it whole. The corpus is public-only, and a validator enforces that boundary. Nothing reaches the model that is not already on the site, so a prompt injection has nothing private to leak. The route also deploys ahead of its keys, so an unconfigured deploy answers with a polite notice rather than throwing.

Answers are measured, not assumed. `evals/chat` holds a golden set that runs through the real route (persona, corpus, guardrails, all of it) with `npm run eval:chat`; it costs real API calls, so it runs on demand and never in CI. A second validator fails the build when a golden-set fact is missing from the corpus, which keeps the eval and the site describing the same system.

---

## Tech

- **React 19 + TypeScript**: component library
- **Vite 7**: dev server and library build
- **Next.js 16**: portfolio site and design system documentation
- **Storybook 10**: component explorer
- **Vitest + Playwright**: every Storybook story runs as a render test in headless Chromium
- **CSS custom properties**: all theming via semantic tokens, no CSS-in-JS

---

## Quality & CI

Every push and pull request runs a GitHub Actions pipeline ([`ci.yml`](.github/workflows/ci.yml)) with four jobs: lint + library build, story tests (every Storybook story rendered in headless Chromium via Vitest), Storybook build, and website lint + build. The same checklist runs locally with one command:

```bash
npm run verify   # lint + library type-check + package build + story tests + Storybook build + website lint + build
```

CI also guards against documentation drift: generated surfaces (this README's component count and list, the website's skills pages, the published blueprint copies of the root markdown specs) are rebuilt from their source registries on every build, and CI fails if the committed copies are stale. The numbers on the site are never hand-written.

---

## Running locally

```bash
# Storybook (the library's dev sandbox)
npm run storybook        # http://localhost:6006

# Portfolio + documentation website (npm workspace: install once at the root)
npm install
npm run dev --workspace website   # http://localhost:3000
```
