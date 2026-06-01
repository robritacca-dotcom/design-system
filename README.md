# robr0 Design System

A personal design system and React component library — 42 components, a three-tier token architecture, dark mode, and a full documentation website.

**[→ View the live docs site](https://design-system-iota-one.vercel.app)**

---

## What's inside

| Layer | Description |
|---|---|
| **Component library** (`/src`) | 42+ React components built with Vite + TypeScript. Each component has its own scoped CSS, TypeScript props interface, and Storybook stories. |
| **Design tokens** (`/src/tokens`) | Three-tier token system: primitives → semantic light/dark → component CSS vars. Dark mode is driven by `data-theme="dark"` — no media queries in components. |
| **Documentation website** (`/website`) | Next.js app with live interactive examples for every component, plus foundations pages for colour, typography, spacing, and icons. |
| **Storybook** | Interactive component playground with autodocs and per-variant stories. |

### Components

Accordion · Alert · Alert dialog · App sidebar · Avatar · Badge · Breadcrumb · Button · Button group · Card · Carousel · Chart · Checkbox · Circular button · Date input · Date picker · Dropdown · Dropdown menu · Input · Instructions · Navigation · Popover · Progress bar · Radio button · Section title · Selection card · Segmented control · Skeleton · Slider · Spinner · Table · Tabs · Textarea · Toast · Toggle group · Toggle switch · Tooltip

---

## Tech

- **React 18 + TypeScript** — component library
- **Vite** — dev server and library build
- **Next.js 14** — documentation site
- **Storybook 8** — component explorer
- **CSS custom properties** — all theming via semantic tokens, no CSS-in-JS

---

## Running locally

```bash
# Component library (Vite dev sandbox)
npm run dev              # http://localhost:5173

# Storybook
npm run storybook        # http://localhost:6006

# Documentation website
cd website
npm install
npm run dev              # http://localhost:3000
```

---

## Token architecture

Tokens flow in one direction — primitives are never used directly in components:

```
tokens-primitives.css      --primitive-teal-07: #118AB2
        ↓
tokens-light/dark.css      --color-action-primary-bg: var(--primitive-teal-07)
        ↓
Component CSS              background-color: var(--color-action-primary-bg)
```

---

## Design principles

- **Single typeface**: Nunito Sans (weight 300 for display, 600 for headings, 400/500 for body)
- **White-floor UI**: depth comes from a container color ramp, not box shadows
- **Teal is the action color**: primary buttons and focus rings only — never decorative
- **Five status variants**: info, positive, warning, error, neutral — shared tokens across Badge, Alert, Toast, ProgressBar
- **Material Symbols Rounded** for all icons

Full spec in [`design.md`](design.md).
