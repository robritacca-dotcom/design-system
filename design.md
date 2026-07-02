# Design System — design.md

## Overview

This design system is a **cool-professional, teal-anchored** component library and documentation website. The base atmosphere is a **pure white page floor** (`--color-bg-page-primary` — #FFFFFF) lifted by a **neutral container hierarchy** (light gray #F1F1F1 → mid gray #D6D6D6 → deep gray #BCBCBC) — clinical, precise, never warm. The brand voltage comes from **signature teal** (`--color-action-primary-bg` — #118AB2), a mid-depth cyan-blue that reads trustworthy and technical without corporate-blue flatness.

The system runs a **single typeface throughout**: **Nunito Sans** at weight 300 (display/hero) → 600 (headings) → 500/400 (body/UI). There is no serif face and no monospace split — the typographic personality is clean, rounded, and approachable rather than editorial.

The **three-tier token architecture** is the defining structural rule:
1. **Primitives** (`--primitive-*`) — raw hex/px values. Source of truth. Never used directly in components.
2. **Semantic tokens** (`--color-*`, `--radius-*`, `--gap-*`, `--padding-*`, `--font-*`) — usage-intent variables consumed by components. Always use these.
3. **Component CSS classes** (`.ds-button`, `.ds-badge`, etc.) — per-component scope, referencing semantic tokens.

The system is **light/dark-first**: every semantic color token has a light-theme value and a dark-theme override. The switch is driven by `data-theme="dark"` on the root element. Status colors (positive, warning, error, info) stay perceptually stable across themes; surfaces and text invert.

**Key Characteristics:**
- White page floor (`--color-bg-page-primary` — #FFFFFF) with near-black primary text (`--color-text-primary` — #050505 light / #F1F1F1 dark).
- Teal primary action (`--color-action-primary-bg` — #118AB2). Used exclusively on primary CTA buttons and focus rings. Never decorative.
- Nunito Sans single-family system. Weight 300 for Mega/Display (marketing), 600 for headings, 500/400 for body and UI labels.
- Container hierarchy as depth signal — no drop shadows. Depth is conveyed by stepping through `--color-bg-container-primary` → `secondary` → `tertiary`.
- Five semantic status variants running through every feedback component: `info` (blue), `positive` (green), `warning` (orange), `error` (red), `neutral` (gray).
- Border radius is hierarchical: `--radius-xs` (4px) for badges, `--radius-md` (12px) for inputs and cards, `--radius-full` (999px) for buttons.
- Material Symbols Rounded for all iconography — 24px default, 20px compact.
- Accessibility-first: ARIA roles, semantic HTML, and keyboard navigation in every interactive component.

---

## Colors

### Token Tiers

Never reference `--primitive-*` tokens inside components. Always use the semantic layer (`--color-*`).

### Action / Brand
- **Primary bg** (`--color-action-primary-bg` — #118AB2): Teal. Every primary CTA button fill, focus rings, active input borders. The most-recognized brand color.
- **Primary bg hover** (`--color-action-primary-bg-hover` — #0E6E8F): Pressed/hover darken on primary buttons.
- **Primary bg active** (`--color-action-primary-bg-active` — #0A4E66): Press/active darken on primary buttons.
- **Primary text** (`--color-action-primary-text` — #CFEAF3): Text/icon color on primary teal fill (light teal for contrast).
- **Primary text active** (`--color-action-primary-text-active` — #F1F1F1): Text on hovered/active primary button.
- **Secondary border** (`--color-action-primary-border-secondary` — #2C9AB9): Outline on secondary (outlined) buttons.
- **Tertiary text** (`--color-action-primary-text-tertiary` — #118AB2): Teal-coloured text for tertiary/ghost button labels.
- **Passive bg** (`--color-action-passive-bg` — rgba(241,241,241,0.01)): Near-transparent ghost button fill.
- **Passive bg hover** (`--color-action-passive-bg-hover` — rgba(214,214,214,0.8)): Gray hover on ghost/tertiary buttons.
- **Passive text** (`--color-action-passive-text` — #050505 light / #F1F1F1 dark): Ghost button label color.

### Surfaces
- **Page primary** (`--color-bg-page-primary` — #FFFFFF light / #050505 dark): The floor of every screen.
- **Container primary** (`--color-bg-container-primary` — #F1F1F1 light / rgba(14,14,14,0.8) dark): First elevation above page — sidebars, section bands, card fills.
- **Container secondary** (`--color-bg-container-secondary` — #D6D6D6 light / #303030 dark): Second elevation — nested containers, divider fills.
- **Container tertiary** (`--color-bg-container-tertiary` — #BCBCBC light / #232323 dark): Third elevation — pressed states, deepest nesting.
- **Container border** (`--color-bg-container-border` — #D6D6D6 light / #232323 dark): Hairline borders on containers.
- **Divider** (`--color-divider` — rgba(214,214,214,0.8) light / rgba(35,35,35,0.8) dark): Horizontal/vertical rule between sections.

### Text
- **Primary** (`--color-text-primary` — #050505 light / #F1F1F1 dark): Headlines and primary content.
- **Secondary** (`--color-text-secondary` — #303030 light / #BCBCBC dark): Emphasized body, card subheadings.
- **Tertiary** (`--color-text-tertiary` — #6D6D6D light / #A2A2A2 dark): Labels, helper text, captions.
- **Inverse** (`--color-text-inverse` — #A2A2A2 light / #303030 dark): De-emphasized secondary labels; inverts in dark mode.

### Icons
- **Primary** (`--color-icon-primary` — #6D6D6D light / #D6D6D6 dark): Default icon fill — tertiary buttons, input icons, nav icons.
- **Secondary** (`--color-icon-secondary` — #A2A2A2 light / #A2A2A2 dark): De-emphasized icons.

### Status (stable across themes — backgrounds invert, borders and text swap to their dark-mode pairs)
| Variant | bg (light) | border | text (light) | bg (dark) | text (dark) |
|---|---|---|---|---|---|
| `positive` | #ECFCF7 | `#06D6A0` | #024336 | #024336 | #ECFCF7 |
| `warning` | #FFF3EC | `#EF8247` | #552716 | #552716 | #FFF3EC |
| `error` | #FDEFF3 | `#EF476F` | #571727 | #571727 | #FDEFF3 |
| `info` | #EEF3FD | `#1E47B0` | #081633 | #081633 | #EEF3FD |
| `neutral` | #D6D6D6 | `#303030` | #232323 | #232323 | #F1F1F1 |

### Core Accents (data-viz, decorative — not for semantic status)
- Coral: `--color-core-accent-coral` #EF476F
- Amber: `--color-core-accent-amber` #EF8247
- Gold: `--color-core-accent-gold` #FFD166
- Mint: `--color-core-accent-mint` #06D6A0
- Cobalt: `--color-core-accent-cobalt` #1E47B0
- Violet: `--color-core-accent-violet` #9E47EF

---

## Typography

### Font Family
The system uses **Nunito Sans** exclusively. No serif face. No monospace face. The font stack is `'Nunito Sans', sans-serif` via `--font-family-primary`.

Nunito Sans is a rounded humanist sans-serif. The rounded terminals give UI elements a friendly, approachable quality without sacrificing technical clarity. Inter is an acceptable substitute for prototyping; avoid Helvetica or Arial, which strip the rounded character.

### Hierarchy

| Token prefix | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `--font-mega-1-*` | 132px | 300 | 0.85 | +2% | Marketing hero — never in app UI |
| `--font-mega-2-*` | 116px | 300 | 0.85 | +2% | Marketing hero — never in app UI |
| `--font-display-1-*` | 96px | 300 | 1.0 | +2% | Large marketing section heads |
| `--font-display-2-*` | 64px | 300 | 1.0 | +1.5% | Marketing section heads |
| `--font-sub-display-*` | 30px | 300 | 44px | +1.5% | Sub-section heads on marketing pages |
| `--font-heading-1-*` | 30px | 600 | 44px | +1.5% | Page-level h1 in app/docs |
| `--font-heading-2-*` | 26px | 600 | 32px | +1.5% | Section headings in app/docs |
| `--font-heading-3-*` | 22px | 600 | 28px | +1.5% | Sub-section headings in app/docs |
| `--font-title-body-*` | 16px | 600 | 24px | −1% | Card titles, table column heads, bold labels |
| `--font-paragraph-em-*` | 16px | 500 | 24px | −1% | Emphasized body, button labels, input labels |
| `--font-paragraph-*` | 16px | 400 | 24px | 0 | Default running text |
| `--font-paragraph-sm-em-*` | 14px | 500 | 20px | 0 | Compact button labels, badge text, form helpers (emphasized) |
| `--font-paragraph-sm-*` | 14px | 400 | 20px | 0 | Secondary body, helper text, captions |

### Principles
- Mega and Display sizes (Mega 1/2, Display 1/2, Sub Display) are **marketing-only** — they belong on the documentation homepage and landing pages, never inside application UI or component pages.
- Headings 1–3 use weight 600. Display styles use weight 300. **Never bold a display size** — the lightness is intentional and gives the system its modern, airy character.
- Positive letter-spacing (+1.5–2%) applies to all display and heading sizes. Negative letter-spacing (−1%) applies to title-body and paragraph-em — this tightening is what makes UI labels feel crisp.
- Buttons use `--font-paragraph-em-*` (default) and `--font-paragraph-sm-em-*` (compact). Always weight 500 on interactive controls.

---

## Page Layout & Heading Hierarchy

This section documents how to apply the typographic scale when building new pages in the documentation website. Following these rules ensures every page reads with the same visual hierarchy.

### Heading Roles

| Level | Token | Size | Weight | Role |
|---|---|---|---|---|
| Page title (`h1`) | `--font-display-2-*` | 64px | 300 | Route title — rendered once per page at the top, outside the markdown body |
| Major section (`h2`) | `--font-sub-display-*` | 30px | 300 | Top-level content sections (e.g. Colors, Typography) |
| Sub-section (`h3`) | `--font-heading-3-*` | 22px | 600 | Named groupings within a section (e.g. Token Tiers, Action / Brand) |
| Minor heading (`h4`) | `--font-title-body-*` | 16px | 600 | Inline labels or additional sub-groups |

### The Weight-Contrast Rule

**Weight contrast is the primary differentiator between adjacent heading levels — not size alone.**

- `h2` is 30px / weight 300 (light). `h3` is 22px / weight 600 (bold). The 8px size gap alone is not enough — the jump from 300 → 600 is what makes the hierarchy unmistakable at a glance.
- Never use the same weight for two consecutive heading levels. A heading that is only slightly smaller than the one above it, at the same weight, will look like a duplicate rather than a sub-item.
- The correct pairing is always: **light heading above, bold heading below** at the major → minor transition.

### Section Dividers

`h2` elements carry a `border-bottom: 1px solid var(--color-divider)` by default to visually close the preceding section. Do not insert `<hr>` elements between sections — they duplicate the divider. The border on `h2` is the only section separator needed.

### Applying to Markdown Pages

When a page renders markdown (via `react-markdown` or similar), apply these heading styles using `:global()` selectors scoped to the markdown body container:

```css
/* h2 — major section, light and airy */
.markdownBody :global(h2) {
  font-size: var(--font-sub-display-size);      /* 30px */
  font-weight: var(--font-sub-display-weight);  /* 300 */
  border-bottom: 1px solid var(--color-divider);
  margin-top: var(--primitive-gap-xxl);         /* 60px above */
  margin-bottom: var(--primitive-gap-md);       /* 16px below */
}

/* h3 — sub-section, bold contrast */
.markdownBody :global(h3) {
  font-size: var(--font-heading-3-size);        /* 22px */
  font-weight: var(--font-heading-3-weight);    /* 600 */
  margin-top: var(--primitive-gap-xl);          /* 40px above */
  margin-bottom: var(--primitive-gap-sm);       /* 8px below */
}

/* h4 — minor heading, same weight as h3, smaller size */
.markdownBody :global(h4) {
  font-size: var(--font-title-body-size);       /* 16px */
  font-weight: var(--font-title-body-weight);   /* 600 */
  margin-top: var(--primitive-gap-md);
  margin-bottom: var(--primitive-gap-xs);
}
```

### Responsive Collapse

Below 959px:
- `h2` → 26px (from 30px)
- `h3` → 18px (from 22px)
- The weight contrast rule still applies; do not change weights at any breakpoint.

---

## Spacing & Layout

### Base Units
- **Gap (flex/grid spacing):** 4px-based scale via `--gap-*` tokens.
- **Padding (internal element padding):** 2px-based micro scale via `--padding-*` tokens.
- **Borders:** 1px hairline (`--border-xs`) and 2px emphasis (`--border-md`).

### Gap Scale
| Token | Value | Typical Use |
|---|---|---|
| `--gap-xxs` | 2px | Tightest inline spacing (icon + label micro-gap) |
| `--gap-xs` | 4px | Compact component internals |
| `--gap-sm` | 8px | Standard icon-to-label gap, button icon spacing |
| `--gap-sm-md` | 12px | Form field stack spacing |
| `--gap-md` | 16px | Card internal element spacing |
| `--gap-lg` | 20px | Section element spacing |
| `--gap-xl` | 40px | Card-to-card spacing, major internal gaps |
| `--gap-xxl` | 60px | Between component groups |
| `--gap-xxxl` | 80px | Between major page sections |
| `--gap-xxxxl` | 120px | Page-level section breaks |

### Padding Scale
| Token | Value | Typical Use |
|---|---|---|
| `--padding-xxxs` | 2px | Badge vertical padding |
| `--padding-xxs` | 4px | Micro insets |
| `--padding-xs` | 6px | Compact button/input vertical |
| `--padding-sm` | 8px | Standard button vertical, badge horizontal |
| `--padding-sm-md` | 12px | Compact button horizontal, compact input horizontal |
| `--padding-md` | 16px | Standard input horizontal, card inner padding baseline |
| `--padding-lg` | 20px | Standard button horizontal |
| `--padding-xl` | 40px | Large card insets |
| `--padding-xxl` | 60px | Section-level insets |

### Layout Philosophy
Whitespace communicates hierarchy. Dense elements use micro-gaps (2–8px); comfortable reading areas use md/lg gaps (16–20px); major layout regions use xl–xxxxl (40–120px). The system relies on spacing contrast rather than dividers — overuse of `--color-divider` is a design smell.

---

## Shapes

### Border Radius Scale
| Token | Value | Use |
|---|---|---|
| `--radius-xxs` | 2px | Reserved — rare micro elements |
| `--radius-xs` | 4px | Badges (`ds-badge`) |
| `--radius-sm` | 8px | Small sub-elements, inner nested surfaces |
| `--radius-md` | 12px | Inputs, cards (standard), modals |
| `--radius-lg` | 16px | Large feature cards, hero containers |
| `--radius-xl` | 24px | Oversized hero containers, page-level sections |
| `--radius-xxl` | 48px | Pill containers, oversized decorative elements |
| `--radius-full` | 999px | All buttons (primary, secondary, tertiary, destructive), toggle thumbs |

**Key rule:** Buttons are always `--radius-full` (pill shape). Inputs are always `--radius-md` (12px). This contrast — rounded pill CTAs vs softer-cornered inputs — is intentional and consistent.

---

## Elevation & Depth

The system uses **color-block first, shadow rare** philosophy. Depth is communicated through the container background hierarchy, not box shadows.

| Level | Treatment | Use |
|---|---|---|
| Page floor | `--color-bg-page-primary` — no border, no shadow | Body background, app root |
| Container primary | `--color-bg-container-primary` — no border | Sidebars, card fills, section bands |
| Container secondary | `--color-bg-container-secondary` — optional `--color-bg-container-border` border | Nested cards, inner panels |
| Container tertiary | `--color-bg-container-tertiary` — no shadow | Pressed/active states, deepest UI surfaces |
| Input | `--color-input-bg-primary` with `--color-input-border-primary` hairline | Text inputs, textareas, dropdowns |
| Status containers | Colored bg + colored border per variant | Alerts, toasts, badges |

No drop shadows in the default component library. If a shadow is needed for a floating surface (a popover, a dropdown menu), keep it minimal: `0 2px 8px rgba(5,5,5,0.08)`.

---

## Components

### Button

**`ds-button`** — The primary interactive element. Always pill-shaped (`--radius-full`). Text uses `--font-paragraph-em-*` (default) or `--font-paragraph-sm-em-*` (compact). Icon size: 24px (default), 20px (compact). Transitions: `background-color 0.2s ease, border-color 0.2s ease, opacity 0.2s ease`. Disabled state: `opacity: 0.4`, `cursor: not-allowed` — never hidden.

| Variant | Fill | Border | Text |
|---|---|---|---|
| `primary` | `--color-action-primary-bg` (#118AB2) | none | `--color-action-primary-text` (#CFEAF3) |
| `secondary` | transparent | `--color-action-primary-border` (#0A4E66) 1px | `--color-text-primary` |
| `tertiary` | `--color-action-passive-bg` (near-transparent) | none | `--color-action-passive-text` |
| `destructive` | transparent | `--color-core-accent-coral` (#EF476F) 1px | `--color-core-accent-coral` |

Hover: primary → `--color-action-primary-bg-hover`; secondary/destructive → fill with their respective border color. Active: primary → `--color-action-primary-bg-active`.

Sizes: `default` (padding 8px × 20px), `compact` (padding 6px × 12px).

### Badge

**`ds-badge`** — Inline status label. Radius `--radius-xs` (4px) — notably tighter than buttons and inputs. Text: `--font-paragraph-sm-em-*` (14px/500). Padding: 2px vertical × 8px horizontal. Each of the five status variants (`info`, `positive`, `warning`, `error`, `neutral`) maps directly to its `--color-status-*-bg`, `--color-status-*-border`, and `--color-status-*-text` tokens. Renders with `role="status"` for accessibility.

### Alert

**`ds-alert`** — Container for inline status messages. Same five variants as Badge. Wider form — carries an icon, title, and description block. References same `--color-status-*` tokens. Use when message needs to persist in the layout (vs Toast which is ephemeral).

### Input / Textarea

**`ds-input`** — Label + field + helper text stack with 8px (`--gap-sm`) vertical gap. Field: `--radius-md` (12px), `--color-input-bg-primary` fill, `--color-input-border-primary` (#D6D6D6 light / #232323 dark) hairline. Label: `--font-paragraph-em-*`. Body: `--font-paragraph-*`. Helper: `--font-paragraph-sm-*` in `--color-text-tertiary`.

States:
- **Default**: `--color-input-border-primary`
- **Hover**: `--color-input-border-hover` (#6DBCD6 — teal tint)
- **Focus**: `--color-input-border-selected` (#2C9AB9 — brighter teal)
- **Error**: `--color-status-error-border` (#EF476F) on border and helper text
- **Disabled**: `--color-input-bg-disabled` fill, `--color-input-border-disabled`, `--color-input-text-disabled` on label/text

Icon slots (Material Symbols Rounded): left icon at 16px from edge, right icon at 16px from edge. Compact size: padding 6px × 12px, icon 20px.

### Toast

**`ds-toast`** — Ephemeral notification via `ToastProvider` + `useToast()` hook. Rendered via React portal into `document.body`. Default duration: 5000ms. Pauses on hover/focus. Progress bar animates across bottom. Position: configurable (`top-right`, `bottom-right`, etc.), defaults to `bottom-right`. Max stack: 5 toasts. Five variants share the same `--color-status-*` token mapping as Badge/Alert.

Default icons (Material Symbols Rounded): `info`, `check_circle`, `warning`, `error`, `info` for each variant. Override via `icon` prop.

### Card

**`ds-card`** — Table-of-contents navigation tile. Two parts: `.ds-card__preview` (content/component preview area) + `.ds-card__title` (h3 label below). Used in component/foundations index grids. When `interactive`, gains `role="button"` and keyboard support. Background: `--color-bg-container-primary`.

### EntityCard

**`ds-entity-card`** — Compact icon-or-image + label card. Used specifically on Icons and Logos pages in the Foundations section. Takes a Material Symbol name (`icon`) or image path (`imageSrc`). Centered layout with label beneath. Not interactive — display-only.

### SelectionCard

**`ds-selection-card`** — Card-based form control for selecting from a list. Three modes: `radio` (single select), `checkbox` (multi-select), `toggle` (per-card on/off). Each card renders the option label, optional description, and an indicator (radio dot / checkbox / toggle switch). Full keyboard navigation and ARIA roles. Selected state: teal border and background. Use when options need more space or explanation than a standard radio/checkbox group.

**When to use which card:**
- `Card` → navigational tile in a documentation index grid
- `EntityCard` → icon or logo display in a foundations catalog
- `SelectionCard` → form input when options need card-style layout

### AppLayout / AppSidebar

**`ds-app-layout`** — Full-page shell: header + collapsible sidebar + main content area. **`ds-app-sidebar`** — The side navigation component. Used as the outer wrapper for every documentation page on the website. Sidebar background: `--color-bg-container-primary`.

### Tabs

**`ds-tabs`** — Tabbed interface with `TabsList`, `TabsTrigger`, and `TabsContent`. Active tab trigger: teal border-bottom or teal fill depending on variant. Use for grouping related content on a single page (e.g., component page showing Light/Dark/Mobile views).

### Table

**`ds-table`** — Data table with header row, body rows, optional sorting. Header: `--font-title-body-*` (weight 600). Body: `--font-paragraph-*`. Row dividers: `--color-divider`. Background: `--color-bg-page-primary` or `--color-bg-container-primary` depending on context.

### Chart

Recharts wrapper exposing: `AreaChart`, `BarChart`, `LineChart`, `PieChart`, `RadarChart`, `RadialChart`, `ScatterChart`, `StackedBarChart`, `Treemap`. Uses core accent colors for data series. Tooltips and legends use system typography tokens. Axes text in `--color-text-tertiary`.

---

## Light / Dark Theme Contract

The theme is activated by `data-theme="dark"` on the HTML root element. The `tokens-light.css` applies under `[data-theme="light"], :root`. The `tokens-dark.css` applies under `[data-theme="dark"]`.

**Tokens that invert:**
- `--color-bg-page-primary` #FFFFFF → #050505
- `--color-bg-container-*` (light grays → dark grays)
- `--color-text-primary` #050505 → #F1F1F1
- `--color-text-secondary`, `--color-text-tertiary` (dark grays → light grays)
- `--color-divider` (light semi → dark semi)
- `--color-input-bg-primary`, `--color-input-border-primary`, `--color-input-text-primary`
- `--color-action-passive-*` (near-transparent fills swap to dark semi-transparent)

**Tokens that stay stable:**
- `--color-action-primary-bg` #118AB2 — teal does not change in dark mode
- `--color-action-primary-bg-hover`, `--color-action-primary-bg-active` — same
- `--color-action-primary-text`, `--color-action-primary-text-active` — same
- Status border colors (`--color-status-*-border`) — same in both themes
- Status background/text invert to their dark counterparts for contrast

**Rule:** Never hardcode `color` or `background-color` with a hex value in a component. Always use a semantic token — the theme swap is the only mechanism for dark mode, no manual `prefers-color-scheme` queries in components.

---

## Do's and Don'ts

### Do
- Use semantic tokens (`--color-*`, `--radius-*`, `--gap-*`, `--padding-*`, `--font-*`) in every component. Never use `--primitive-*` tokens directly.
- Reserve `--color-action-primary-bg` (teal) for primary CTA buttons, focus rings, and active input states. Nowhere else.
- Use Nunito Sans weight 300 for display/marketing text and weight 600 for in-app headings. The weight split is intentional.
- Apply `--radius-full` to all buttons and `--radius-md` to all inputs and cards. This contrast is the system's shape signature.
- Map all feedback UI to the five-variant status system (`info`/`positive`/`warning`/`error`/`neutral`) — Badge, Alert, Toast, ProgressBar all share the same semantic tokens.
- Prefer `--color-divider` for rule lines over custom border colors.
- Use Material Symbols Rounded for icons. 24px default, 20px compact.
- Always wrap your app in `ToastProvider` before calling `useToast()`.

### Don't
- Don't use primitive tokens (`--primitive-neutral-05`, `--primitive-teal-07`, etc.) in components or page styles.
- Don't use teal decoratively — it is the primary action color. Using it on text or illustrations dilutes its CTA signal.
- Don't set `display` size typography (Mega/Display tokens) inside app UI pages — reserve them for the marketing homepage hero only.
- Don't bold display sizes. Weight 300 is non-negotiable for Mega/Display; weight 600 is the max for in-app headings.
- Don't invent a fourth surface tone outside page / container-primary / container-secondary / container-tertiary. The neutral ramp is intentionally short.
- Don't add `box-shadow` to standard cards and containers. Depth comes from background steps, not shadows.
- Don't hardcode colors. Every color must be a semantic token so dark mode works without extra code.
- Don't break the five-status system by adding a sixth variant (e.g. "brand") to Badge or Alert. Use `neutral` and customize within the component page if needed.
- Don't disable the `data-theme` swap on any subtree — all components must participate in theme switching.

---

## Responsive Behavior

### Breakpoints
The website uses standard breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px – 1024px
- **Desktop**: 1024px – 1440px
- **Wide**: > 1440px

### Typography Collapse
- Mega / Display sizes are marketing-only and should scale down significantly on mobile (e.g. Display 2 at 64px → ~36–40px).
- In-app headings (H1–H3, 30–22px) generally hold; avoid reducing below 20px for H3.

### Layout Collapse
- `AppLayout` sidebar collapses to off-canvas/drawer on mobile.
- Component index grids reflow from 3-up (desktop) → 2-up (tablet) → 1-up (mobile).
- `SelectionCard` groups reflow from side-by-side to stacked on narrow viewports.
- Table components allow horizontal scroll on mobile rather than reflowing columns.

### Touch Targets
- All interactive elements minimum 44 × 44px effective touch area (WCAG 2.5.5).
- Button default height: ~36px from padding + line-height. Add `min-height: 44px` if used as standalone tappable button on mobile.

---

## Iteration Guide

1. **Adding a new component variant** — Add a modifier class (e.g. `.ds-badge--brand`) and reference only `--color-*` semantic tokens. Add corresponding light and dark values to `tokens-light.css` and `tokens-dark.css` if a new semantic meaning is needed.
2. **Adding a new status** — Add `--color-status-{name}-bg`, `--color-status-{name}-border`, `--color-status-{name}-text` to both theme files. Then add the variant to Badge, Alert, Toast, and any other status-bearing components.
3. **Adding a new spacing step** — Add to `tokens-primitives.css` first, then alias in `tokens-light.css` and `tokens-dark.css`.
4. **New typography style** — Add to `tokens-typography.css` following the `--font-{name}-{property}` naming pattern.
5. **Reference a component token** — Always use the full CSS variable, e.g. `var(--font-heading-1-size)`. Never inline the resolved value.
6. **Storybook stories** — Each component must have a `.stories.tsx` file with a Default story and one story per meaningful variant. Use `data-theme` Storybook theme toggle to verify dark mode.

---

## Known Gaps

- **Animation / transition timings** — Component transitions use hardcoded `0.2s ease`. No token exists for easing curves or durations. If the system needs animated loading states or page transitions, a `--motion-*` token layer should be added.
- **Icon sizing tokens** — Material Symbols sizes (24px default, 20px compact) are hardcoded in component CSS. No `--icon-size-*` token exists. Formalising this would help consistency across new components.
- **Figma parity** — The system originates in Figma ([robr0-ds26](https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/robr0-ds26)), and foundation/component pages deep-link to specific frames via `figmaUrl`. Keeping the Figma file and the coded tokens in sync is still a manual process — there is no automated export pipeline.
- **Breakpoint tokens** — Responsive breakpoints are not tokenized. They exist as raw media-query values in component CSS.
- **Form validation patterns** — Error state on Input is documented, but multi-field form-level validation patterns (inline error summaries, field grouping) are not in scope here.
- **Code/monospace** — No monospace font or `--font-code-*` token is defined. If code blocks are needed on the documentation site, add a JetBrains Mono or Fira Code entry to the typography token layer.
- **Chart theming** — Recharts chart components use `--color-core-accent-*` tokens for data series, but a formal `--chart-series-{n}` token set for ordered series colors has not been codified.
