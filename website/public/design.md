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
- Container hierarchy as depth signal — standard containers carry no drop shadows. Depth is conveyed by stepping through `--color-bg-container-primary` → `secondary` → `tertiary`; the only shadows are the `--shadow-floating`/`--shadow-modal` tokens on floating surfaces and the interactive-card hover lift.
- Five semantic status variants running through every feedback component: `info` (blue), `positive` (green), `warning` (orange), `error` (red), `neutral` (gray).
- Border radius is hierarchical: `--radius-xs` (4px) for badges, `--radius-md` (12px) for inputs and standard containers, `--radius-xl` (24px) for Card/EntityCard navigation tiles, `--radius-full` (999px) for buttons.
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
- **Container inverse** (`--color-bg-container-inverse` — #0E0E0E light / #F1F1F1 dark): High-contrast inverted surface — the tooltip bubble. Always paired with `--color-text-on-inverse`.
- **Divider** (`--color-divider` — rgba(214,214,214,0.8) light / rgba(35,35,35,0.8) dark): Horizontal/vertical rule between sections.

### Overlay & Controls
- **Scrim** (`--color-scrim` — rgba(0,0,0,0.5) light / rgba(0,0,0,0.7) dark): Modal backdrop behind Dialog and AlertDialog. Darker in dark mode so the modal still separates from the near-black floor.
- **Control thumb** (`--color-control-thumb` — #FFFFFF light / #F1F1F1 dark): The circular thumb inside toggle switches (ToggleSwitch, SelectionCard's toggle indicator).

### Text
- **Primary** (`--color-text-primary` — #050505 light / #F1F1F1 dark): Headlines and primary content.
- **Secondary** (`--color-text-secondary` — #303030 light / #BCBCBC dark): Emphasized body, card subheadings.
- **Tertiary** (`--color-text-tertiary` — #6D6D6D light / #A2A2A2 dark): Labels, helper text, captions.
- **Inverse** (`--color-text-inverse` — #A2A2A2 light / #303030 dark): De-emphasized secondary labels; inverts in dark mode.
- **On inverse** (`--color-text-on-inverse` — #F1F1F1 light / #0E0E0E dark): Text sitting on `--color-bg-container-inverse` surfaces (tooltip labels).

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
| `--radius-xl` | 24px | Card/EntityCard navigation tiles, oversized hero containers, page-level sections |
| `--radius-xxl` | 48px | Pill containers, oversized decorative elements |
| `--radius-full` | 999px | All buttons (primary, secondary, tertiary, destructive), toggle thumbs |

**Key rule:** Buttons are always `--radius-full` (pill shape). Inputs are always `--radius-md` (12px). Card and EntityCard — the navigational tiles — use the larger `--radius-xl` (24px) to read as destinations rather than form surfaces. This contrast — rounded pill CTAs vs softer-cornered inputs vs generously rounded tiles — is intentional and consistent.

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

Standard containers never carry shadows. The only shadows in the system are two semantic elevation tokens, defined per theme (stronger opacity in dark mode so they read against the #050505 floor):

- **`--shadow-floating`** (`0 4px 16px rgba(0,0,0,0.12)` light / `0.55` dark) — anchored floating surfaces: Popover, Dropdown menus, DropdownMenu, chart tooltips, Toast.
- **`--shadow-modal`** (`0 8px 32px rgba(0,0,0,0.2)` light / `0.6` dark) — modal surfaces: Dialog and AlertDialog panels, paired with the `--color-scrim` backdrop.

Never write a literal `box-shadow` value in component CSS — use one of these two tokens or no shadow at all. (One documented exception: the interactive Card hover lift — see Do's and Don'ts.)

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

### ButtonGroup

**`ds-button-group`** — Inline container that composes Buttons for nav and subnav contexts. Two orientations: `horizontal` (default — `--gap-lg` between buttons, used in top navigation) and `vertical` (`--gap-xxs`, left-aligned hug-content column for subnav/mobile). Purely compositional: each entry is a full `ButtonProps` config passed straight through to Button, so priorities and states mix freely. `role="group"` with an optional `ariaLabel`.

### CircularButton

**`ds-circular-button`** — Round icon-only button, 40px (default) or 32px (compact), always `--radius-full`. Same three priorities as Button — `primary` (`--color-action-primary-bg` fill), `secondary` (outlined, `--border-xs` + action border tokens), `tertiary` (ghost, `--color-action-passive-bg-hover` on hover) — with the same state set (`default`/`hover`/`active`/`disabled`). Icon is a single Material Symbol at 24px default / 20px compact. Renders as `<a>` when `href` is set. `ariaLabel` is required — there is no visible label.

### SegmentedControl

**`ds-segmented-control`** — Horizontal set of mutually exclusive options on a `--color-bg-container-primary` track with a `--radius-full` pill silhouette. The active segment takes `--color-action-primary-bg` with `--color-action-primary-text`; idle segments use `--font-paragraph-em-*` in `--color-text-secondary` with `--color-action-passive-bg-hover` on hover. Segments accept an optional Material Symbol icon and per-segment `disabled`. Sizes: `default`, `compact`; `fullWidth` stretches segments across the container. Keyboard: Arrow keys cycle enabled segments, Home/End jump to the ends.

### ToggleGroup

**`ds-toggle-group`** — A row of two-state buttons sharing a bordered `--radius-sm` container (`--border-xs` on `--color-bg-container-border`). Single-select by default; `multiple` allows any combination. Active items fill with `--color-action-primary-bg` and `--color-action-primary-text`; items can be text labels or Material Symbol icons (`icon: true`). Sizes: `default`, `compact`. Group-level `disabled` applies the standard `opacity: 0.4` treatment. `role="group"` + `aria-pressed` per item.

### Badge

**`ds-badge`** — Inline status label. Radius `--radius-xs` (4px) — notably tighter than buttons and inputs. Text: `--font-paragraph-sm-em-*` (14px/500). Padding: 2px vertical × 8px horizontal. Each of the five status variants (`info`, `positive`, `warning`, `error`, `neutral`) maps directly to its `--color-status-*-bg`, `--color-status-*-border`, and `--color-status-*-text` tokens. Renders with `role="status"` for accessibility.

### Chip

**`ds-chip`** — Compact pill for attributes, filters, and inline metadata. Always pill-shaped (`--radius-full`) like Button. Neutral by default: `--color-bg-page-primary` fill, `--color-bg-container-border` hairline, `--color-text-secondary` text in `--font-paragraph-sm-em-*` (14px/500). Icon size: 20px (default), 16px (compact) — smaller than Button's because the chip is a tighter control.

Distinct from Badge: a Badge communicates *status* through the five status colours and is never interactive; a Chip is neutral and optionally interactive.

Renders as a `<span>` when non-clickable, a `<button>` when given `onClick` (with `aria-pressed` when `selected` is set). `onRemove` adds a trailing close button (Material Symbol `close`) with its own accessible label; when a chip is both clickable and removable the container stays a `<span>` and the main region becomes an inner button so buttons never nest.

States:
- **Hover** (clickable): `--color-action-passive-bg-hover` fill; **Active**: `--color-action-passive-bg-active`
- **Selected**: `--color-action-primary-bg` fill with `--color-action-primary-text` — same teal selection convention as SegmentedControl
- **Disabled**: `opacity: 0.4`, `cursor: not-allowed`
- **Focus**: standard 2px `--color-action-primary-bg` focus ring

Sizes: `default` (padding 6px × 12px — 32px tall), `compact` (padding 2px × 8px — 24px tall).

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

### Checkbox

**`ds-checkbox`** — Custom checkbox with an inline SVG check (and minus for `indeterminate`) instead of font glyphs, for pixel-perfect centring. The box is `--radius-sm` with a `--border-md` border; checked state fills `--color-action-primary-bg` with `--color-action-primary-text-active` stroke, hover darkens to `--color-action-primary-bg-hover`. Sizes: `default`, `compact`. Disabled: `opacity: 0.4`, `cursor: not-allowed`. A `CheckboxGroup` wrapper renders a labelled list of checkboxes bound to a value array.

### RadioButton

**`ds-radio`** — Single-select control: a `--radius-full` circle with a `--border-md` ring and an inner dot that fills `--color-action-primary-bg` when checked; hover shifts the ring toward `--color-action-primary-border-tertiary`. Implemented as a `role="radio"` element with `aria-checked`, Space/Enter activation, and managed `tabIndex`; group radios by `name` (a `RadioGroup` wrapper exists alongside). Label uses `--font-paragraph-*`. Disabled: `opacity: 0.4`.

### ToggleSwitch

**`ds-toggle-switch`** — Binary on/off switch: a 42×24px `--radius-full` track filled with `--color-action-primary-bg` when on, holding a 20px `--color-control-thumb` circle that slides with a spring-curve transition and shows a check icon. Rendered as a `<button role="switch" aria-checked>`; the optional inline label uses `--font-paragraph-*`. Sizes: `default`, `compact`. Used for settings like the site's theme toggle. SelectionCard's `toggle` mode reuses this exact anatomy.

### Slider

**`ds-slider`** — Range input styled with a two-tone track: `--color-action-primary-bg` fill up to the current value, `--color-bg-container-secondary` beyond it, with a `--radius-full` thumb that gains a `--color-action-primary-bg-hover` focus ring. Native `<input type="range">` underneath, so keyboard and screen-reader behaviour come for free (`min`/`max`/`step` props). Sizes: `default`, `compact`. Disabled: `opacity: 0.4`.

### DateInput

**`ds-date-input`** — Form field wrapping the native date input with the standard input anatomy: label (`--font-paragraph-em-*`), `--radius-md` field on `--color-input-bg-primary` with `--color-input-border-primary`, hover/selected borders (`--color-input-border-hover` / `--color-input-border-selected`), calendar icon in `--color-icon-primary`, and helper/error text below (`--font-paragraph-sm-*`, error via `--color-status-error-border`). Supports `min`/`max`, `required`, `disabled` (input disabled tokens), and sizes `default`/`compact`. Value format is `YYYY-MM-DD`.

### DatePicker

**`ds-date-picker`** — Inline calendar: month header with `--radius-full` chevron nav buttons, `Su–Sa` day-header row, and a grid of day cells. The selected day fills `--color-action-primary-bg` with `--color-action-primary-text` at `--radius-full`; today is highlighted; out-of-range days (`min`/`max`) and the `disabled` state get the standard muted treatment. Container: `--radius-md` on `--color-input-bg-primary` with `--color-input-border-primary`. Sizes: `default`, `compact`. Emits `onDateSelect` with `YYYY-MM-DD`.

### Dropdown

**`ds-dropdown`** — Select-style form field. Closed state matches Input anatomy (label, `--radius-md`, input border/bg tokens, helper/error text); open state reveals a `--radius-md` listbox on `--color-bg-page-primary` elevated with `--shadow-floating`, max-height 240px with scroll. Options support disabled entries and grouped sections (`groups`) with headings and separators. The selected option is marked with `--color-action-primary-text-tertiary`; hover uses `--color-action-passive-bg-hover`. Listbox keyboard pattern (arrows, Escape, Enter) with `aria-expanded` wiring. Sizes: `default`, `compact`. For action menus (not form values) use DropdownMenu.

### Combobox

**`ds-combobox`** — Filterable select: a text field that narrows a listbox as the user types. Control matches Input anatomy (label, `--radius-md`, input border/bg tokens, helper/error text) with a leading 24px `search` icon and a trailing chevron that rotates when open; the menu is a `--radius-md` surface on `--color-bg-page-primary` elevated with `--shadow-floating`, max-height 280px with scroll. Options carry an optional `description` second line (`--font-paragraph-sm-*` tertiary) and support disabled entries plus grouped sections. `multiple` renders selections as `--radius-full` chips in `--color-bg-container-primary` inside the control, each with a remove button; Backspace on an empty query pops the last chip. `clearable` adds a clear button, `loading` swaps the list for a status row, and `emptyMessage` covers the no-match case. Async callers pair `onSearchChange` with `manualFiltering` to filter upstream. Full combobox keyboard pattern (arrows, Enter, Escape, Tab) with `aria-expanded`/`aria-activedescendant` wiring. Sizes: `default`, `compact`. Use Dropdown when the option list is short and static; Combobox is for long, searchable, or server-backed lists.

### FileInput

**`ds-file-input`** — Click-or-drop upload zone plus a list of chosen files. The dropzone is a dashed `--border-xs` `--color-input-border-primary` rectangle at `--radius-md` with a centred 24px `upload_file` icon and instruction copy; hovering moves the border to `--color-input-border-hover`, and an active drag fills `--color-bg-container-primary` with the selected border. The real `<input type="file">` stays in the DOM (visually hidden) for form semantics, with the zone exposed as `role="button"` and Enter/Space activation. The file list is fully controlled — each row is a `--radius-md` hairline container with a `description` icon, name, human-readable size, an optional 4px `--color-action-primary-bg` progress track, and a 32px ghost remove button. Per-file `error` swaps the row to the error tokens with an `error` icon and message in `--color-status-error-text`. Sizes: `default`, `compact`.

### Toast

**`ds-toast`** — Ephemeral notification via `ToastProvider` + `useToast()` hook. Rendered via React portal into `document.body`. Default duration: 5000ms. Pauses on hover/focus. Progress bar animates across bottom. Position: configurable (`top-right`, `bottom-right`, etc.), defaults to `bottom-right`. Max stack: 5 toasts. Five variants share the same `--color-status-*` token mapping as Badge/Alert.

Default icons (Material Symbols Rounded): `info`, `check_circle`, `warning`, `error`, `info` for each variant. Override via `icon` prop.

### ProgressBar

**`ds-progress-bar`** — Determinate progress as a horizontal `--radius-full` track in `--color-bg-container-secondary` with a `--color-core-accent-mint` fill scaled to the clamped 0–100 value. Optional percentage label (`showLabel`) in `--font-paragraph-sm-em-*`. `role="progressbar"` with `aria-valuenow`/`-valuemin`/`-valuemax` and an `ariaLabel` describing what is loading. Sizes: `default`, `compact` (bar height).

### Skeleton

**`ds-skeleton`** — Loading placeholder with a pulsing fill stepping between `--color-bg-container-primary` and `--color-bg-container-secondary`. Three shapes: `text` (`--radius-sm` line, multi-line via `lines` — the last line renders at 75% width), `circular` (`--radius-full`), and `rectangular`. `width`/`height` accept any CSS length. Announced as `role="status"` with `aria-label="Loading"` and `aria-busy`.

### Spinner

**`ds-spinner`** — Indeterminate loading indicator: an SVG circle with a `--color-bg-container-secondary` track and a rotating arc in `--color-action-primary-bg` (`variant="primary"`) or `--color-text-secondary` (`variant="neutral"`). Sizes `sm`/`md`/`lg` (16/24/36px). `role="status"` with a configurable `label`. Use Spinner for indeterminate waits and ProgressBar when the completion fraction is known.

### EmptyState

**`ds-empty-state`** — Placeholder for a list, table, search, or dashboard with nothing to show. Centred stack: a 48px `--radius-full` `--color-bg-container-primary` disc holding a 24px Material Symbol, a `--font-title-body-*` headline in `--color-text-primary`, supporting copy in `--font-paragraph-sm-*` tertiary capped at 420px, and an action slot that wraps consumer-provided Buttons. `variant="bordered"` adds a dashed `--color-bg-container-border` container at `--radius-md` — use it inside a card, table, or panel; `plain` sits directly on the page. `size="compact"` drops to a 36px icon disc, `--font-paragraph-em-*` headline, and `--padding-lg`, for dense sidebars. The `icon` prop takes a Material Symbol name or an arbitrary element for illustrations. Write the description as the next action, not just a statement of absence.

### Card

**`ds-card`** — Table-of-contents navigation tile. Two parts: `.ds-card__preview` (content/component preview area) + `.ds-card__title` (h3 label below). Used in component/foundations index grids. When `interactive`, gains `role="button"` and keyboard support. Background: `--color-bg-container-primary-semi`; radius: `--radius-xl` (24px). Interactive and case-study variants lift on hover with `0 8px 24px rgba(0,0,0,0.3)` — the system's one sanctioned container shadow (see Do's and Don'ts).

### EntityCard

**`ds-entity-card`** — Compact icon-or-image + label card. Used specifically on Icons and Logos pages in the Foundations section. Takes a Material Symbol name (`icon`) or image path (`imageSrc`). Centered layout with label beneath. Radius: `--radius-xl` (24px), matching Card. Not interactive — display-only.

### SelectionCard

**`ds-selection-card`** — Card-based form control for selecting from a list. Three modes: `radio` (single select), `checkbox` (multi-select), `toggle` (per-card on/off). Each card renders the option label, optional description, and an indicator (radio dot / checkbox / toggle switch). Full keyboard navigation and ARIA roles. Selected state: teal border and background. Use when options need more space or explanation than a standard radio/checkbox group.

**When to use which card:**
- `Card` → navigational tile in a documentation index grid
- `EntityCard` → icon or logo display in a foundations catalog
- `SelectionCard` → form input when options need card-style layout

### AppLayout / AppSidebar

**`ds-app-layout`** — Full-page shell: header + collapsible sidebar + main content area. **`ds-app-sidebar`** — The side navigation component. Used as the outer wrapper for every documentation page on the website. Sidebar background: `--color-bg-container-primary`.

### Nav

**`ds-nav`** — Top navigation bar: a 78px-tall, max-width 1440px flex row with a brand slot (icon + `--font-paragraph-em-*` text, `--gap-lg`) on the left and a horizontal ButtonGroup plus optional `trailing` content (e.g. the theme ToggleSwitch) on the right at `--gap-xl`. Purely compositional — active states come from the Button configs passed in.

### Breadcrumb

**`ds-breadcrumb`** — Location trail as a `<nav aria-label="Breadcrumb">` ordered list. Items are links in `--font-paragraph-sm-*` `--color-text-secondary` separated by `chevron_right` Material Symbols in `--color-text-tertiary`; the current (last) item is plain text in `--color-text-primary` at the `-em` weight. `maxItems` collapses the middle of long trails to an ellipsis, always keeping the first and the trailing items. Link focus rings use `--color-action-primary-bg`.

### Tabs

**`ds-tabs`** — Tabbed interface with `TabsList`, `TabsTrigger`, and `TabsContent`. Active tab trigger: teal border-bottom or teal fill depending on variant. Use for grouping related content on a single page (e.g., component page showing Light/Dark/Mobile views).

### Accordion

**`ds-accordion`** — Collapsible content sections in a single `--radius-sm` bordered container (`--border-xs` on `--color-bg-container-border`, row dividers inside). Headers are `--font-paragraph-em-*` buttons with a rotating `expand_more` chevron and `--color-action-passive-bg-hover` on hover; panels hold arbitrary content at `--font-paragraph-*`. Single-open by default, `multiple` allows several; `defaultExpanded` seeds initial state. Headers carry `aria-expanded` and are wired to their panels.

### Carousel

**`ds-carousel`** — Sliding content viewport. Navigation arrows are 36px `--radius-full` bordered buttons on `--color-bg-page-primary` (no shadow — the arrows are not floating surfaces); dot indicators mark the active slide with `--color-action-primary-bg`. Supports `autoPlay` with configurable interval (pauses on hover), `loop`, keyboard navigation (arrow keys), and an `onSlideChange` callback. Slides are the component's children.

### Table

**`ds-table`** — Data table with header row, body rows, optional sorting. Header: `--font-title-body-*` (weight 600). Body: `--font-paragraph-*`. Row dividers: `--color-divider`. Background: `--color-bg-page-primary` or `--color-bg-container-primary` depending on context.

### Dialog

**`ds-dialog`** — General-purpose modal for arbitrary content; for confirm/cancel prompts use AlertDialog. Panel: `--radius-md`, `--color-bg-page-primary`, hairline `--color-bg-container-border` border, `--shadow-modal`, over a `--color-scrim` backdrop; opens with the standard 0.2s scale + fade. Header: `--font-heading-6-*` title with optional `--font-paragraph-sm-*` tertiary description and a 32px ghost close button. Body slot scrolls (`overflow-y: auto`) when content exceeds the viewport-capped panel height; optional footer slot right-aligns consumer-provided Buttons. Sizes: `sm` 400px / `md` 560px (default) / `lg` 720px max-width. Behaviour: portal to `<body>`, focus trap with Tab cycling, focus restore on close, body scroll lock, `role="dialog" aria-modal="true"`; `dismissible={false}` disables ESC, backdrop click, and hides the close button.

### AlertDialog

**`ds-alert-dialog`** — Modal confirmation for important or destructive actions. A portal-rendered overlay: `--color-scrim` backdrop behind a `--radius-md` panel on `--color-bg-page-primary` with `--border-xs` border and `--shadow-modal`, title + description text, and a Cancel/Confirm Button pair. `variant="destructive"` styles the confirm action with the error tokens. Focus is trapped while open and restored on close; ESC dismisses; the panel wires `aria-labelledby`/`aria-describedby` to the generated title/description ids. SSR-safe (portal only mounts client-side). For general-purpose modal content use Dialog; AlertDialog is only for confirm/cancel decisions.

### Drawer

**`ds-drawer`** — Edge-anchored modal panel. Shares Dialog's modal contract (portal to `<body>`, focus trap with Tab cycling, focus restore on close, body scroll lock, `role="dialog" aria-modal="true"`, `dismissible={false}` to disable ESC/scrim/close) but slides in from a viewport edge instead of scaling from centre. `side` picks the edge (`left`/`right`/`top`/`bottom`); the panel rests off-screen via a `translate` transform and returns to zero when open, over a `--color-scrim` backdrop that cross-fades. Surface: `--color-bg-page-primary` with `--shadow-modal` and a hairline `--color-bg-container-border` on the edge facing the page. Header is a `--font-heading-3-*` title with optional `--font-paragraph-sm-*` tertiary description and a 32px ghost close button; the body scrolls independently so header and footer stay pinned; the footer right-aligns consumer Buttons. Sizes measure along the slide axis — `sm`/`md`/`lg` are 320/420/560px for side drawers and 30/50/75vh for top and bottom. Side drawers go full-width under 480px. Use Dialog for centred, self-contained prompts; Drawer for filter panels, detail views, and mobile navigation.

### CommandPalette

**`ds-command-palette`** — Modal Cmd+K launcher over a grouped command list. Panel is a 560px `--radius-md` surface on `--color-bg-page-primary` with `--shadow-modal`, pinned 10vh from the top over a `--color-scrim` backdrop, capped at 60vh. A search row (24px `search` icon, borderless input, 32px ghost close) sits above a scrolling list of `--radius-sm` command rows; each row takes an optional 20px icon, a `--font-paragraph-em-*` label, an optional tertiary description line, and a `shortcut` array rendered as `<kbd>` chips (`--radius-xs`, `--color-bg-container-primary`, hairline border). Group headings use `--font-paragraph-sm-*` tertiary; the active row takes `--color-action-passive-bg-hover`. Filtering matches label, description, and `keywords`; disabled commands stay visible but are skipped by the highlight. Keyboard: arrows wrap through the flattened list, Home/End jump to the ends, Enter runs, Escape closes, and `hotkey` binds Cmd/Ctrl+K globally (set false when the host app owns the shortcut). A footer hint row documents those keys and hides under 480px. Closed state uses `visibility: hidden` so the input never enters the tab order.

### Popover

**`ds-popover`** — Anchored contextual overlay. Wraps a trigger and positions a `--radius-sm` panel (min-width 200px, `--padding-md`, `--color-bg-container-primary`, `--border-xs` border, `--shadow-floating`) on the chosen side (`top`/`bottom`/`left`/`right`). Trigger mode is `click` (outside-click and ESC dismiss) or `hover`; open state can be controlled via `open`/`onOpenChange`. Content is arbitrary ReactNode — unlike Tooltip, which is text-only. Sizes: `default`, `compact`.

### DropdownMenu

**`ds-dropdown-menu`** — Action menu opened from a trigger element (contrast with Dropdown, which is a form select). The panel is `--radius-md` on `--color-bg-page-primary` with a `--border-xs` `--color-input-border-primary` hairline and `--shadow-floating`, `--padding-xxs` inset, aligned `start` or `end`. Entries are a typed tree: items (label, optional Material Symbol icon, keyboard `shortcut` hint, `disabled`, `destructive` — red via the error/coral tokens), `separator`s, labelled `group`s, and nested sub-menus via `children`. Full keyboard navigation across the flattened item list; hover uses `--color-action-passive-bg-hover`. Sizes: `default`, `compact`.

### Tooltip

**`ds-tooltip`** — Text-only contextual label on hover or focus. The bubble is the system's inverse surface: `--color-bg-container-inverse` with `--color-text-on-inverse` at `--radius-xs`, `--font-paragraph-sm-*`, with a rotated-square arrow in the same fill. Four positions (`top`/`bottom`/`left`/`right`) with a 4px slide-in transition; `showDelay`/`hideDelay` control timing (300/150ms default). The panel has `role="tooltip"` and an id; Tooltip clones its child element with `aria-describedby` pointing at that id — host elements get it automatically, and Button/CircularButton accept the attribute natively. Content is a string; anything richer belongs in Popover.

### Divider

**`ds-divider`** — Thin rule separating stacked content: `--border-xs` (1px) in `--color-divider`. Plain horizontal renders a semantic `<hr>`; a `label` variant sets text inline in the line (`--font-paragraph-sm-*` in `--color-text-secondary`, `center` or `start` position, `role="separator"`); `vertical` stretches to container height inside flex rows (`aria-orientation="vertical"`). Spacing prop maps to the gap scale: `none`/`sm` (8px)/`md` (16px, default)/`lg` (20px) — block margin when horizontal, inline when vertical. Not for separating page sections under `h2` headings — the `h2` bottom border already does that (see Section Dividers above); Divider is for forms, lists, toolbars, and card interiors.

### Pagination

**`ds-pagination`** — Page navigation for long datasets; pairs with Table. A `<nav>` of pill page buttons (40px, `--radius-full`) with chevron arrows at each end; first and last pages always visible, ellipses cover the gaps (`siblingCount` controls the window, default 1). Current page takes the SegmentedControl active treatment: `--color-action-primary-bg` fill with `--color-action-primary-text`, `aria-current="page"`. Idle buttons: `--font-paragraph-em-*` in `--color-text-secondary`, hover `--color-action-passive-bg-hover`. Arrows disable at the ends (`opacity: 0.4`, `cursor: not-allowed`). `size="compact"` swaps the numbers for a "Page X of Y" readout (`--font-paragraph-sm-*`) between 32px arrows.

### Stat

**`ds-stat`** — A single headline metric: display-weight numeral over a quiet label, with an optional trend delta. Value uses `--font-sub-display-*` (30px/300) by default, `--font-display-2-*` (64px/300) at `large` — the weight-contrast rule applied to numerals. Label: `--font-paragraph-sm-*` in `--color-text-tertiary`. Delta: `--font-paragraph-sm-em-*` with a 16px Material arrow; colours by trend — `up` → `--color-status-positive-text`, `down` → `--color-status-error-text`, `neutral` → `--color-text-tertiary`. Compose several in a flex row for a case-study metrics band.

### CodeBlock

**`ds-code-block`** — Monospace code in a `--color-bg-container-primary` container with `--radius-md` and a hairline border. The one sanctioned monospace context in the system (system mono stack — Nunito Sans everywhere else). Optional header row: filename (mono, `--color-text-secondary`), uppercase language tag (`--color-text-tertiary`, 0.08em tracking), and a copy button that confirms with a check for 2s. Code text is 14px/20px, `--color-text-primary`; long lines scroll horizontally. An optional `maxHeight` prop caps the block: the code area scrolls vertically inside while the header stays pinned. An optional `collapsible` prop adds a chevron beside the filename (`--color-icon-primary`, 20px, rotates −90° when closed) that collapses the code area with the same 0fr/1fr grid animation as Accordion; `defaultCollapsed` starts it closed. No syntax highlighting — monochrome by design, no dependencies.

### Quote

**`ds-quote`** — Blockquote with optional attribution, two registers. `default`: body-size text in `--color-text-secondary` behind a `--border-md` left rule in `--color-bg-container-tertiary`. `pull`: `--font-sub-display-*` (30px/300) in `--color-text-primary`, no rule — the scale is the emphasis. Attribution: em-dash + `--font-paragraph-sm-em-*` primary; detail line: `--font-paragraph-sm-*` tertiary. Renders semantic `<figure>/<blockquote>/<figcaption>`.

### Figure

**`ds-figure`** — Image + caption in a `--radius-md` container with `--color-bg-container-secondary` fill. Accepts any image element as children (plain `<img>` or `next/image`); the media slot stretches it full-width. Caption: `--font-paragraph-sm-*` tertiary, `--padding-md`/`--padding-lg`, hairline top border. Passing `onClick` makes it zoomable: `cursor: zoom-in`, hover dims the image to 0.88, `role="button"` + Enter/Space activation, standard teal focus ring.

### Avatar

**`ds-avatar`** — User identity circle (`--radius-full`) in three sizes — `sm` 32px, `md` 40px, `lg` 56px. Renders the image when `src` is provided, falls back to initials derived from `name` on `--color-bg-container-secondary`, then to a person icon. An optional `status` dot (`online`/`away`/`offline`/`busy`) sits on the rim, filled with the matching status border token and ringed in `--color-bg-page-primary`. `role="img"` with a label from `alt`/`name`. One of the components using the `sm/md/lg` size vocabulary (with Spinner and Dialog) — intentional for components with three or more sizes.

### ContactCard

**`ds-contact-card`** — Full-width contact row card: icon-or-logo slot, label (`--font-title-body-*`) with a truncating value line (`--font-paragraph-sm-*`, `--color-text-tertiary`), and a trailing affordance icon. `--radius-md` on `--color-bg-container-primary-semi` with a `--color-bg-container-border` hairline; hover deepens to `--color-bg-container-secondary`. Renders as an `<a>` (protocol links like `mailto:` never open a new tab even when `external`) or, in `copyOnClick` mode, as a `<button>` that copies the value — `copyable` instead adds a discrete copy button alongside. The trailing icon signals the behaviour: `arrow_forward`, `open_in_new`, or `content_copy`.

### LinkList

**`ds-link-list`** — Vertical list of external links at `--gap-lg`. Each row: a 28px logo image or Material Symbol, then a `--font-title-body-*` title with an inline `open_in_new` indicator and optional `--font-paragraph-sm-*` subtitle lines in `--color-text-tertiary`. Rows are `<a target="_blank">` with a hover opacity dim. Data-driven via an `items` array — lighter-weight than a stack of ContactCards; used for publication and award lists.

### SectionTitle

**`ds-section-title`** — The standard section heading used across the docs site: an `<h2>` in `--font-heading-2-*` `--color-text-secondary` with an optional `trailing` slot (count, badge, metadata) in `--font-paragraph-*` `--color-text-tertiary`, closed by a `--color-divider` bottom border with `--padding-xl` breathing room. This is the h2-carries-the-divider rule from the typography spec, packaged as a component.

### Instructions

**`ds-instructions`** — Step-by-step guidance list. Each step has a `--radius-full` indicator badge — the step number, or a Material Symbol when `icon` is set — connected by hairline lines (`--color-bg-container-border`), with a `--font-paragraph-em-*` label and optional `--font-paragraph-*` description. Renders as an `<ol>`; directions `vertical` (default) and `horizontal`; sizes `default`/`compact`.

### Timeline

**`ds-timeline`** — Ordered sequence (`<ol>`) with connected markers; `vertical` (default) for histories and process narratives, `horizontal` for compact steppers. Markers: 12px dot in `--color-bg-container-tertiary`; `numbered` upgrades to a 28px badge (`--color-bg-container-primary` fill, hairline border); a per-item `icon` renders as a bare 24px Material Symbol (no circle) centred in the same 28px box. Connector: `--border-md` line in `--color-divider`, hidden after the last item; it stands off below/after bare icon markers instead of passing behind them. Item anatomy: meta (`--font-paragraph-sm-*` tertiary) over title (`--font-heading-3-*`, 22px/600) over description (`--font-paragraph-*` primary, offset `--gap-sm` below the title).

**`ds-timeline--company`** — a résumé/pipeline variant (`variant="company"`, always vertical). The marker is a 32px logo image (`ds-timeline__marker--logo`, bare transparent box) instead of a dot/icon, and each entry carries a company/tool name (`ds-timeline__company-name`, `--font-title-body-*`, 16px/600) beside it. Under the name sits one or more roles (`ds-timeline__role`): a header row (`ds-timeline__role-header`) with the role title (`--font-heading-3-*`) on the left and a right-aligned, optional date (`ds-timeline__role-dates`, `--font-paragraph-*` tertiary) — a current role sets `present` to render a green "Present" (`ds-timeline__present`, `--color-status-positive-text`) in place of the end date. Roles may add an optional description (`--font-paragraph-*` secondary) and a disc bullet list (`ds-timeline__role-bullets`, links in `--color-action-primary-bg`). The connector is **segmented per entry** — centred under the 32px logo, starting just below it and stopping at that entry's own bottom (it does not bridge the gap to the next company, and every entry keeps its own bar).

### Chart

Recharts wrapper exposing: `AreaChart`, `BarChart`, `LineChart`, `PieChart`, `RadarChart`, `RadialChart`, `ScatterChart`, `StackedBarChart`, `Treemap`. Uses core accent colors for data series. Tooltips and legends use system typography tokens. Axes text in `--color-text-tertiary`.

### Contribution graph

**`ds-contribution-graph`** — GitHub-style activity heatmap: weeks as columns, weekdays as rows, one 12px cell per day at `--radius-xxs`. Cell colour comes from the five-step contribution ramp, defined in both themes:

- `--color-chart-contribution-0` — no activity (`--color-bg-container-primary` light / #232323 dark)
- `--color-chart-contribution-1` → `-4` — increasing activity, green primitives (light: green-02 → 04 → 07 → 09; dark: green-10 → 09 → 08 → 07, so the brightest cell is mint #06D6A0)

Month labels, caption, and Less→More legend use `--font-paragraph-sm-*` in `--color-text-tertiary`/`--color-text-secondary`. The grid scrolls horizontally inside its own container on narrow screens. This ramp is for activity intensity only — ordered multi-series chart colors remain an open gap (see below).

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
- `--color-bg-container-inverse` / `--color-text-on-inverse` (the tooltip surface flips from near-black to near-white)
- `--color-scrim` (0.5 → 0.7 black), `--color-control-thumb` (#FFFFFF → #F1F1F1)
- `--shadow-floating`, `--shadow-modal` (shadow opacity increases in dark mode)

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
- Apply `--radius-full` to all buttons, `--radius-md` to all inputs and standard containers, and `--radius-xl` to Card/EntityCard navigation tiles. This contrast is the system's shape signature.
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
- Don't add `box-shadow` to standard cards and containers. Depth comes from background steps, not shadows. The one exception: interactive Card tiles lift with `0 8px 24px rgba(0,0,0,0.3)` on hover — a deliberate navigational affordance, not an elevation pattern to copy elsewhere. Floating surfaces and modals use `--shadow-floating`/`--shadow-modal`.
- Don't hardcode colors. Every color must be a semantic token so dark mode works without extra code.
- Don't break the five-status system by adding a sixth variant (e.g. "brand") to Badge or Alert. Use `neutral` and customize within the component page if needed.
- Don't disable the `data-theme` swap on any subtree — all components must participate in theme switching.

---

## Responsive Behavior

### Breakpoints
The website's docs shell (left nav rail + main column + right details rail) steps down at four widths. The rail widths and column gap live as `--layout-*` custom properties in `globals.css`, so the mid-breakpoint narrowing applies to every page at once:
- **≥ 1280px** — full shell: 291px left nav (`--layout-sidebar-width`), 320px right rail (`--layout-rail-width`), 60px column gaps (`--layout-column-gap`).
- **≤ 1279px (mid)** — both rails narrow (nav 240px, rail 280px) and the column gap tightens to 40px, keeping the center column at a readable measure.
- **≤ 1151px** — the right details rail stacks below the main content (per-page media query on the `resumeLayout`/`updatesLayout` flex row); the left nav stays.
- **≤ 959px (mobile)** — the left nav hides and pages collapse to a single column.
- **≤ 768px** — typography collapse (page titles and sub-display sizes step down).

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
7. **Before shipping** — Run `npm run verify` (lint + story tests + library, Storybook, and website builds; every Storybook story renders in headless Chromium as a smoke test). The same checks run automatically in CI (`.github/workflows/ci.yml`) on every push and PR, including a drift guard that fails if generated documentation is stale.

---

## Known Gaps

- **Animation / transition timings** — Component transitions use hardcoded `0.2s ease`. No token exists for easing curves or durations. If the system needs animated loading states or page transitions, a `--motion-*` token layer should be added.
- **Icon sizing tokens** — Material Symbols sizes (24px default, 20px compact) are hardcoded in component CSS. No `--icon-size-*` token exists. Formalising this would help consistency across new components.
- **Figma parity** — The system originates in Figma ([robr0-ds26](https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/robr0-ds26)), and foundation/component pages deep-link to specific frames via `figmaUrl`. Keeping the Figma file and the coded tokens in sync is still a manual process — there is no automated export pipeline.
- **Breakpoint tokens** — The docs-shell column widths are tokenized (`--layout-*` in the website's `globals.css`), but the media-query thresholds themselves (1279 / 1151 / 959 / 768px) remain raw values repeated across CSS files — CSS custom properties cannot drive `@media` conditions.
- **Form validation patterns** — Error state on Input is documented, but multi-field form-level validation patterns (inline error summaries, field grouping) are not in scope here.
- **Code/monospace** — No monospace font or `--font-code-*` token is defined. If code blocks are needed on the documentation site, add a JetBrains Mono or Fira Code entry to the typography token layer.
- **Chart theming** — Recharts chart components use `--color-core-accent-*` tokens for data series, but a formal `--chart-series-{n}` token set for ordered series colors has not been codified.
