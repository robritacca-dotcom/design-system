# robr0 — Portfolio + Design System

A personal portfolio site built on a custom React design system I designed and engineered from scratch. The DS isn't a side project — it's the backbone every portfolio page is built on, ensuring the work is presented consistently and with the same craft standards I apply professionally.

**[→ View the live site](https://design-system-iota-one.vercel.app)**

---

## Two things, one repo

| Part | Description |
|---|---|
| **Portfolio website** (`/website`) | Next.js app with case studies, work history, skills, and about pages — all built exclusively with the design system components below. |
| **Design system** (`/src`) | 42+ React components, a three-tier token architecture, dark mode, and a full documentation site. Built to production standards. |

---

## Design system

### Components

Accordion · Alert · Alert dialog · App sidebar · Avatar · Badge · Breadcrumb · Button · Button group · Card · Carousel · Chart · Checkbox · Circular button · Date input · Date picker · Dropdown · Dropdown menu · Input · Instructions · Navigation · Popover · Progress bar · Radio button · Section title · Selection card · Segmented control · Skeleton · Slider · Spinner · Table · Tabs · Textarea · Toast · Toggle group · Toggle switch · Tooltip

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

- **React 18 + TypeScript** — component library
- **Vite** — dev server and library build
- **Next.js 14** — portfolio site and DS documentation
- **Storybook 8** — component explorer
- **CSS custom properties** — all theming via semantic tokens, no CSS-in-JS

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
