# Design System — design.md

## Overview

This design system is a **cool-professional, teal-anchored** component library and documentation website. The base atmosphere is a **pure white page floor** (`--color-bg-page-primary` — #FFFFFF) lifted by a **neutral container hierarchy** (light gray #F1F1F1 → mid gray #D6D6D6 → deep gray #BCBCBC) — clinical, precise, never warm. The brand voltage comes from **signature teal** (`--color-action-primary-bg` — #118AB2), a mid-depth cyan-blue that reads trustworthy and technical without corporate-blue flatness.

The system runs a **single typeface throughout**: **Nunito Sans** at weight 300 (display/hero) → 600 (headings) → 500/400 (body/UI). There is no serif face, and monospace appears only in sanctioned code contexts through `--font-family-code` — the typographic personality is clean, rounded, and approachable rather than editorial.

The **three-tier token architecture** is the defining structural rule:
1. **Primitives** (`--primitive-*`) — raw hex/px values. Source of truth. Never used directly in components.
2. **Semantic tokens** (`--color-*`, `--radius-*`, `--gap-*`, `--padding-*`, `--border-*`, `--font-*`, `--motion-*`, `--icon-size-*`, `--shadow-*` — `CATEGORY_PREFIXES` in `scripts/generate-token-registry.mjs` is the authoritative list) — usage-intent variables consumed by components. Always use these.
3. **Component CSS classes** (`.ds-button`, `.ds-badge`, etc.) — per-component scope, referencing semantic tokens.

The system is **light/dark-first**: every semantic color token has a light-theme value and a dark-theme override. The switch is driven by `data-theme="dark"` on the root element. Status colors (positive, warning, error, info) stay perceptually stable across themes; surfaces and text invert.

**Key Characteristics:**
- White page floor (`--color-bg-page-primary` — #FFFFFF) with near-black primary text (`--color-text-primary` — #050505 light / #F1F1F1 dark).
- Teal primary action (`--color-action-primary-bg` — #118AB2). Used exclusively on primary CTA buttons and focus rings, with one sanctioned data-viz exception: teal leads the default chart series palette. Never decorative elsewhere.
- Nunito Sans single-family system. Weight 300 for Mega/Display (marketing), 600 for headings, 500/400 for body and UI labels.
- Container hierarchy as depth signal — standard containers carry no drop shadows. Depth is conveyed by stepping through `--color-bg-container-primary` → `secondary` → `tertiary`; the only shadows are the `--shadow-floating`/`--shadow-modal` tokens on floating surfaces and the interactive-card hover lift.
- Five semantic status variants running through every feedback component: `info` (blue), `positive` (green), `warning` (orange), `error` (red), `neutral` (gray).
- Border radius is hierarchical: `--radius-xs` (4px) for badges, `--radius-md` (12px) for inputs and standard containers, `--radius-xl` (24px) for Card/EntityCard navigation tiles, `--radius-full` (999px) for buttons.
- Material Symbols Rounded for all iconography, on a four-step size scale — `--icon-size-sm` (20px) / `md` (24px, default) / `lg` (32px) / `xl` (48px). Optical size tracks the step automatically.
- Accessibility-first: ARIA roles, semantic HTML, and keyboard navigation in every interactive component.

---

## Colors

### Token Tiers

Never reference `--primitive-*` tokens inside components. Always use the semantic layer (`--color-*`). The chain is enforced in the other direction too: every semantic colour token's value must be a `var(--primitive-*)` reference — never a raw hex/rgba literal — so that overriding a primitive re-themes everything built on it (`scripts/validate-token-references.mjs` fails the build otherwise). The hex values noted throughout this section are the resolved values of those primitives.

### Action / Brand
- **Primary bg** (`--color-action-primary-bg` — #118AB2): Teal. Every primary CTA button fill, focus rings, active input borders. The most-recognized brand color.
- **Primary bg hover** (`--color-action-primary-bg-hover` — #0E6E8F): Pressed/hover darken on primary buttons.
- **Primary bg active** (`--color-action-primary-bg-active` — #0A4E66): Press/active darken on primary buttons.
- **Primary text** (`--color-action-primary-text` — #CFEAF3): Text/icon color on primary teal fill (light teal for contrast).
- **Primary text active** (`--color-action-primary-text-active` — #F1F1F1): Text on hovered/active primary button.
- **Primary border** (`--color-action-primary-border` — #0A4E66): Outline on secondary (outlined) Buttons and CircularButtons.
- **Secondary border** (`--color-action-primary-border-secondary` — #2C9AB9): Reserved brighter border step — defined in both themes but not yet consumed by any component.
- **Tertiary border** (`--color-action-primary-border-tertiary` — #6DBCD6): Hover ring on RadioButton.
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

### Chat bubbles
Message bubbles get their own colour roles so chat surfaces can be re-themed without touching the container ramp. All four currently alias the container-secondary / text-primary pair — deliberately identical today, separable later.
- **Sent bg** (`--color-chat-bubble-sent-bg` → `--color-bg-container-secondary`): Fill of the person's outgoing bubble.
- **Sent text** (`--color-chat-bubble-sent-text` → `--color-text-primary`): Text inside the sent bubble.
- **Received bg** (`--color-chat-bubble-received-bg` → `--color-bg-container-secondary`): Fill of a received bubble, when the agent's turn renders as a bubble at all.
- **Received text** (`--color-chat-bubble-received-text` → `--color-text-primary`): Text inside the received bubble.

ChatMessage consumes only these four — never the container tokens directly. Teal is never a bubble fill; the action colour keeps its CTA meaning.

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
The system uses **Nunito Sans** exclusively. No serif face, and no bundled monospace face — code contexts (CodeBlock, ToolCall names, Prose inline code) use the system mono stack codified as `--font-family-code`. The main font stack is `'Nunito Sans', sans-serif` via `--font-family-primary`.

Nunito Sans is a rounded humanist sans-serif. The rounded terminals give UI elements a friendly, approachable quality without sacrificing technical clarity. Inter is an acceptable substitute for prototyping; avoid Helvetica or Arial, which strip the rounded character.

**Sourcing.** The typeface is deliberately not bundled with the npm package. The website self-hosts it via `next/font/google` (fetched from Google Fonts at build time and served first-party), Storybook loads it with a Google Fonts `<link>`, and package consumers load it however their stack prefers — or swap the whole system to another face by overriding `--font-family-primary`, the single token every type-scale step chains to. Material Symbols Rounded, by contrast, ships inside the package as a self-hosted woff2, so icons need no external setup.

### Hierarchy

| Token prefix | Size | ≤768px | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|---|
| `--font-mega-1-*` | 132px | 64px | 300 | 0.85 | +2% | Marketing hero — never in app UI |
| `--font-mega-2-*` | 116px | 56px | 300 | 0.85 | +2% | Marketing hero — never in app UI |
| `--font-display-1-*` | 96px | 48px | 300 | 1.0 | +2% | Large marketing section heads |
| `--font-display-2-*` | 64px | 40px | 300 | 1.0 (1.05 ≤768px) | +1.5% | Marketing section heads |
| `--font-sub-display-*` | 30px | 24px | 300 | 44px (36px ≤768px) | +1.5% | Sub-section heads on marketing pages |
| `--font-heading-1-*` | 30px | — | 600 | 44px | +1.5% | Page-level h1 in app/docs |
| `--font-heading-2-*` | 26px | — | 600 | 32px | +1.5% | Section headings in app/docs |
| `--font-heading-3-*` | 22px | — | 600 | 28px | +1.5% | Sub-section headings in app/docs |
| `--font-title-body-*` | 16px | — | 600 | 24px | −1% | Card titles, table column heads, bold labels |
| `--font-paragraph-em-*` | 16px | — | 500 | 24px | −1% | Emphasized body, button labels, input labels |
| `--font-paragraph-*` | 16px | — | 400 | 24px | 0 | Default running text |
| `--font-paragraph-sm-em-*` | 14px | — | 500 | 20px | 0 | Compact button labels, badge text, form helpers (emphasized) |
| `--font-paragraph-sm-*` | 14px | — | 400 | 20px | 0 | Secondary body, helper text, captions |

The ≤768px column is not a separate token set: the same `--font-*-size` tokens re-resolve inside a single `@media (max-width: 768px)` block at the bottom of `tokens-typography.css`. Anything set in display-tier tokens collapses automatically on mobile; the heading and body tiers never step (marked —).

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

The display tier collapses **in the token layer**, once, at 768px (see the Hierarchy table): page titles (`--font-display-2-*`) go 64px → 40px and section heads (`--font-sub-display-*`) go 30px → 24px with no per-page CSS. Pages that reference the tokens are responsive by default — never re-hardcode a mobile font size in a page module.

- Headings 1–3 and the body tiers do **not** step; 22–30px headings stay readable on phones.
- The weight contrast rule still applies; do not change weights at any breakpoint.
- The one sanctioned exception: a mega-1 hero (home page, 404) may keep a hand-tuned two-stage ramp (132 → 64 → 40) in its own module, commented as a deliberate override.

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
| `--gap-xxl` | 60px (40px ≤768px) | Between component groups |
| `--gap-xxxl` | 80px (60px ≤768px) | Between major page sections |
| `--gap-xxxxl` | 120px (80px ≤768px) | Page-level section breaks |

The three section-rhythm steps (`xxl`–`xxxxl`) compress one notch down the primitive scale below 768px, in a `@media` block at the bottom of `tokens-light.css` — the same single token-layer breakpoint typography uses. Steps `xl` and below never change.

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
| `--padding-xxl` | 60px (40px ≤768px) | Section-level insets |

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

### Icon Size Scale

| Token | Value | Use |
|---|---|---|
| `--icon-size-sm` | 20px | Compact controls, inline affordances, chips, list chevrons |
| `--icon-size-md` | 24px | Default — the size an icon is unless told otherwise |
| `--icon-size-lg` | 32px | Feature icons — EntityCard, section headers |
| `--icon-size-xl` | 48px | Marketing and empty-state illustration icons |

Components set **`--icon-size`**, never `font-size`:

```css
.ds-thing__icon { --icon-size: var(--icon-size-sm); }
```

`.material-symbols-rounded` reads that one property for `font-size`, `width`, and `height` together, so the glyph and its layout box can never disagree. It *consumes* the variable and never declares it — which is what keeps a component rule from colliding with the icon font's own styles. Setting `font-size` directly on an icon is a bug: it changes the glyph without changing the box.

**The scale starts at 20px, and that floor is not arbitrary.** Material Symbols is a variable font whose `opsz` (optical size) axis ranges 20–48. Optical sizing thickens strokes as an icon gets smaller; below 20 the axis clamps, so a 14px icon would be drawn with 20px-tuned strokes and scaled down, reading thin and fragile. Every step therefore sits inside the axis range, and `font-optical-sizing: auto` lets the browser track the step automatically — `opsz` is deliberately omitted from `font-variation-settings`, because an explicit axis value there would override the automatic behaviour.

**Documented exceptions.** Glyphs that live *inside* a control's geometry rather than acting as icons stay off the scale: the check inside ToggleSwitch's 20×20 thumb and SelectionCard's toggle (14px, 12px compact), and the miniature component mock-ups in the website's component index cards. Each is commented in place.

**Dark mode** applies `GRAD: -25` to counter the optical bloom of light glyphs on dark surfaces — it thins strokes without changing glyph width, which is what `wght` would do.

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

- **`--shadow-floating`** (`0 4px 16px rgba(0,0,0,0.12)` light / `0.55` dark) — anchored floating surfaces: Popover, Dropdown menus, DropdownMenu, ContextMenu, Combobox's list, the ColorPicker panel, chart tooltips, Toast.
- **`--shadow-modal`** (`0 8px 32px rgba(0,0,0,0.2)` light / `0.6` dark) — modal surfaces: Dialog, AlertDialog, Drawer, and CommandPalette panels, paired with the `--color-scrim` backdrop.

Never write a literal *elevation* shadow in component CSS — use one of these two tokens or no shadow at all. Hairline inset rings and focus halos built with `box-shadow` are not elevation and are permitted: Swatch and ColorPicker use inset rings to keep pale swatches legible, and Slider's thumb carries a `box-shadow` focus halo. (One documented elevation exception: the interactive Card hover lift — see Do's and Don'ts.)

---

## Motion

Motion is quiet and functional — it confirms an interaction, reveals structure, or signals loading, never decorates. The whole vocabulary is defined in `tokens-motion.css` (theme-agnostic, single `:root` like typography): eight `--motion-duration-*` tokens and five `--motion-ease-*` curves. Compose a duration with an easing instead of writing literal values — never hardcode `0.2s ease` in component CSS.

**Durations — core scale** (day-to-day UI):

| Token | Value | Use |
|---|---|---|
| `--motion-duration-fast` | 150ms | Quick feedback: hovers, icons, tooltips, nav links |
| `--motion-duration-base` | 200ms | The default — color/opacity/border transitions |
| `--motion-duration-slow` | 300ms | Structural change: accordion, sidebar width, toast enter |
| `--motion-duration-slower` | 600ms | Deliberate page-entrance reveals |

**Durations — extended** (special-purpose; named so they stop being magic numbers, but reach for the core four first): `--motion-duration-deliberate` (400ms, carousel slide), `--motion-duration-loop-spin` (1000ms, spinner rotation), `--motion-duration-loop-shimmer` (1800ms, skeleton shimmer and the agent label sweep), `--motion-duration-loop-matrix` (1400ms, the twelve-slot cycle every AgentStatus dot pattern shares).

**Easings:**

| Token | Value | Use |
|---|---|---|
| `--motion-ease-standard` | `ease` | General default for color/opacity transitions |
| `--motion-ease-emphasized` | `cubic-bezier(0.4, 0, 0.2, 1)` | Size/layout changes (sidebar width, accordion height) |
| `--motion-ease-entrance` | `cubic-bezier(0.16, 1, 0.3, 1)` | Expressive decelerate for enter animations (modals, dropdowns, toasts) |
| `--motion-ease-linear` | `linear` | Continuous motion (spinner, progress bars) |
| `--motion-ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful overshoot (toggle switch thumb) |

**Reduced motion contract:** `tokens-motion.css` collapses every duration token to 0.01ms under `prefers-reduced-motion: reduce`, and a universal guard flattens remaining hardcoded transitions/animations. Components that consume the tokens respect the preference automatically — never write component-level `prefers-reduced-motion` queries.

**Migration status:** all component and website CSS composes the tokens — no literal durations or easings remain (the two sanctioned exceptions: Skeleton's shimmer keeps a literal `ease-in-out`, which has no token curve, and the website's decorative 14–22s background floats stay bespoke). JS-driven timings (Tooltip show/hide delays, Toast auto-dismiss, Carousel autoplay) are still hardcoded constants — see Known Gaps.

---

## Components

### Button

**`ds-button`** — The primary interactive element. Always pill-shaped (`--radius-full`). Text uses `--font-paragraph-em-*` (default) or `--font-paragraph-sm-em-*` (compact). Icon size: 24px (default), 20px (compact). Transitions: background-color, border-color, and opacity at `--motion-duration-base` / `--motion-ease-standard`. Disabled state: `opacity: 0.4`, `cursor: not-allowed` — never hidden.

| Variant | Fill | Border | Text |
|---|---|---|---|
| `primary` | `--color-action-primary-bg` (#118AB2) | none | `--color-action-primary-text` (#CFEAF3) |
| `secondary` | transparent | `--color-action-primary-border` (#0A4E66) 1px | `--color-text-primary` |
| `tertiary` | `--color-action-passive-bg` (near-transparent) | none | `--color-action-passive-text` |
| `destructive` | transparent | `--color-core-accent-coral` (#EF476F) 1px | `--color-core-accent-coral` |

Hover: primary → `--color-action-primary-bg-hover`; secondary/destructive → fill with their respective border color. Active: primary → `--color-action-primary-bg-active`.

Sizes: `default` (padding 8px × 20px), `compact` (padding 6px × 12px).

Loading state: `loading` puts a `variant="inherit"` Spinner in the left icon slot (24px default / 16px compact), keeps the variant's full-colour appearance (no disabled dim), blocks interaction (`pointer-events: none`, `cursor: progress`, `disabled` attribute), and sets `aria-busy`. A loading `href` button renders the `<button>` branch so the link is truly inert.

### ButtonGroup

**`ds-button-group`** — Inline container that composes Buttons for nav and subnav contexts. Two orientations: `horizontal` (default — `--gap-lg` between buttons, used in top navigation) and `vertical` (`--gap-xxs`, left-aligned hug-content column for subnav/mobile). Purely compositional: each entry is a full `ButtonProps` config passed straight through to Button, so variants and disabled states mix freely — except that an entry with no `variant` defaults to `tertiary`, not Button's own `primary`, so nav groups read as passive by default. `role="group"` with an optional `ariaLabel`.

### CircularButton

**`ds-circular-button`** — Round icon-only button, 40px (default) or 32px (compact), always `--radius-full`. The same variants as Button minus `destructive` — `primary` (`--color-action-primary-bg` fill), `secondary` (outlined, `--border-xs` + action border tokens), `tertiary` (ghost, `--color-action-passive-bg-hover` on hover) — with the same state set (`default`/`hover`/`active`/`disabled`). Icon is a single Material Symbol at 24px default / 20px compact. Renders as `<a>` when `href` is set. `ariaLabel` is required — there is no visible label. `loading` swaps the icon for a `variant="inherit"` Spinner, keeps full-colour appearance, blocks interaction, and sets `aria-busy` — same contract as Button.

### SegmentedControl

**`ds-segmented-control`** — Horizontal set of mutually exclusive options on a `--color-bg-container-primary` track with a `--radius-full` pill silhouette. The active segment takes `--color-action-primary-bg` with `--color-action-primary-text`; idle segments use `--font-paragraph-em-*` in `--color-text-secondary` with `--color-action-passive-bg-hover` on hover. Segments accept an optional Material Symbol icon and per-segment `disabled`. The track carries a `--border-xs` `--color-bg-container-border` hairline. Sizes: `default`, `compact`; `fullWidth` stretches segments across the container. Announces as a tablist (`role="tablist"`, segments are `role="tab"` with `aria-selected`). Keyboard: Arrow keys cycle enabled segments, Home/End jump to the ends.

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

### Swatch

**`ds-swatch`** — Clickable colour tile: a 24px `<button>` (20px `compact`) whose background is the `value` colour, passed through the `--ds-swatch-color` custom property so the stylesheet stays data-free. Shapes: `circle` (default, `--radius-full`) and `square` (`--radius-sm`). A hairline `--color-bg-container-border` inset keeps light colours visible on the white floor; `selected` draws the theme-aware ring (`--color-bg-page-primary` gap + `--color-text-primary` outline) and sets `aria-pressed`. Purely presentational — no `'use client'`, so it renders from Server Components. Disabled: `opacity: 0.4`.

### ColorPicker

**`ds-colorpicker`** — Colour picker composed in `Field`: a bordered trigger (`--radius-md`, input border tokens) holding a checkerboard-backed swatch and optional hex text (`showText`), opening a `--shadow-floating` panel with a saturation/brightness area (2D `role="slider"`, pointer + arrow keys), a hue slider, an optional alpha slider (`showAlpha`, emits 8-digit hex below 100%), and a hex field. Works controlled (`value` + `onValueChange`, fires live while dragging) or uncontrolled (`defaultValue`); `name` renders a hidden input for native form submission. The white/black overlay gradients and hue spectrum are colour-space constants written as `hsl()` literals — the one sanctioned departure from hex-free component CSS, since no theme token can represent them. Sizes: `default`, `compact`. Disabled: `opacity: 0.4`.

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

**`ds-spinner`** — Indeterminate loading indicator: an SVG circle with a `--color-bg-container-secondary` track and a rotating arc in `--color-action-primary-bg` (`variant="primary"`) or `--color-text-secondary` (`variant="neutral"`); `variant="inherit"` draws both circles in `currentColor` (track at 0.25 opacity) so the spinner matches the surrounding control — it's what Button and CircularButton use for their `loading` state. Sizes `sm`/`md`/`lg` (16/24/36px). `role="status"` with a configurable `label`. Use Spinner for indeterminate waits and ProgressBar when the completion fraction is known.

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

### NavList

**`ds-nav-list`** — Vertical navigation link list for drawers and side menus, up to three levels deep. Every row is a real link rendered as a full-width, left-aligned **tertiary Button** (level 1 at the default size, deeper levels compact), so shape, padding, typography, and hover/pressed states have one home in the Button spec and stay identical to every other button. The current page gets `aria-current="page"` plus the tertiary active background (`--color-action-passive-bg-active`) — the same treatment the showcase sidebar uses. A collapsible item adds a separate 40px `--radius-full` chevron toggle (`expand_more` at `--icon-size-sm`, rotating 180° when open) wired with `aria-expanded`/`aria-controls` — tapping the label navigates, tapping the chevron expands. Every row reserves that same 40px height, so leaf rows and toggle rows sit on one vertical rhythm at the list's `--gap-xxs` spacing. Sublists indent one `--padding-xl` step (then `--gap-lg`), take the same `--gap-xxs` below their parent row, animate open via `grid-template-rows: 0fr → 1fr` at `--motion-duration-slow` / `--motion-ease-emphasized`, and are `inert` while collapsed so their links leave the tab order. Expansion is uncontrolled (`defaultExpandedIds`) or controlled (`expandedIds` + `onExpandedChange`), single-open by default; `collapsible: false` renders a permanent, always-visible group.

### Breadcrumb

**`ds-breadcrumb`** — Location trail as a `<nav aria-label="Breadcrumb">` ordered list. Items are links in `--font-paragraph-sm-*` `--color-text-secondary` separated by `chevron_right` Material Symbols at `--icon-size-sm` in `--color-text-tertiary` (the 20px step matches the 20px line-height of the labels either side, so the chevron centres on the trail); the current (last) item is plain text in `--color-text-primary` at the `-em` weight. `maxItems` collapses the middle of long trails to an ellipsis, always keeping the first and the trailing items. Link focus rings use `--color-action-primary-bg`.

### Tabs

**`ds-tabs`** — Tabbed interface with `TabsList`, `TabsTrigger`, and `TabsContent`. Active tab trigger: teal border-bottom or teal fill depending on variant. Use for grouping related content on a single page (e.g., component page showing Light/Dark/Mobile views).

### Accordion

**`ds-accordion`** — Collapsible content sections in a single `--radius-sm` bordered container (`--border-xs` on `--color-bg-container-border`, row dividers inside). Headers are `--font-paragraph-em-*` buttons with a rotating `expand_more` chevron and `--color-action-passive-bg-hover` on hover; panels hold arbitrary content at `--font-paragraph-*`. Single-open by default, `multiple` allows several; `defaultExpanded` seeds initial state. Headers carry `aria-expanded` and are wired to their panels.

### Carousel

**`ds-carousel`** — Sliding content viewport. Navigation arrows are 36px `--radius-full` bordered buttons on `--color-bg-page-primary` (no shadow — the arrows are not floating surfaces); dot indicators mark the active slide with `--color-action-primary-bg`. Supports `autoPlay` with configurable interval (pauses on hover), `loop`, keyboard navigation (arrow keys), and an `onSlideChange` callback. Slides are the component's children.

### Table

**`ds-table`** — Data table with header row and body rows; presentational only (no sorting, selection, or row expansion). Header: `--font-title-body-*` (weight 600). Body: `--font-paragraph-*`. Row dividers: `--color-divider`. Background: `--color-bg-page-primary` or `--color-bg-container-primary` depending on context. `bordered` wraps the table in a `--color-bg-container-border` container with `--radius-md`.

### Dialog

**`ds-dialog`** — General-purpose modal for arbitrary content; for confirm/cancel prompts use AlertDialog. Panel: `--radius-md`, `--color-bg-page-primary`, hairline `--color-bg-container-border` border, `--shadow-modal`, over a `--color-scrim` backdrop; opens with the standard base-duration scale + fade (`--motion-duration-base` / `--motion-ease-standard`). Header: `--font-heading-3-*` title with optional `--font-paragraph-sm-*` tertiary description and a 32px ghost close button. Body slot scrolls (`overflow-y: auto`) when content exceeds the viewport-capped panel height; optional footer slot right-aligns consumer-provided Buttons. Sizes: `sm` 400px / `md` 560px (default) / `lg` 720px max-width. Behaviour: portal to `<body>`, focus trap with Tab cycling, focus restore on close, body scroll lock, `role="dialog" aria-modal="true"`; `dismissible={false}` disables ESC, backdrop click, and hides the close button.

### AlertDialog

**`ds-alert-dialog`** — Modal confirmation for important or destructive actions. A portal-rendered overlay: `--color-scrim` backdrop behind a `--radius-md` panel on `--color-bg-page-primary` with `--border-xs` border and `--shadow-modal`, title + description text, and a Cancel/Confirm Button pair. `variant="destructive"` styles the confirm action with the error tokens. Focus is trapped while open and restored on close; ESC dismisses; the panel wires `aria-labelledby`/`aria-describedby` to the generated title/description ids. SSR-safe (portal only mounts client-side). For general-purpose modal content use Dialog; AlertDialog is only for confirm/cancel decisions.

### Drawer

**`ds-drawer`** — Edge-anchored modal panel. Shares Dialog's modal contract (portal to `<body>`, focus trap with Tab cycling, focus restore on close, body scroll lock, `role="dialog" aria-modal="true"`, `dismissible={false}` to disable ESC/scrim/close) but slides in from a viewport edge instead of scaling from centre. `side` picks the edge (`left`/`right`/`top`/`bottom`); the panel rests off-screen via a `translate` transform and returns to zero when open, over a `--color-scrim` backdrop that cross-fades. Surface: `--color-bg-page-primary` with `--shadow-modal` and a hairline `--color-bg-container-border` on the edge facing the page. Header is a `--font-heading-3-*` title with optional `--font-paragraph-sm-*` tertiary description and a 32px ghost close button; the body scrolls independently so header and footer stay pinned; the footer right-aligns consumer Buttons. Sizes measure along the slide axis — `sm`/`md`/`lg` are 320/420/560px for side drawers and 30/50/75vh for top and bottom. Side drawers go full-width under 480px. Use Dialog for centred, self-contained prompts; Drawer for filter panels, detail views, and mobile navigation.

### CommandPalette

**`ds-command-palette`** — Modal Cmd+K launcher over a grouped command list. Panel is a 560px `--radius-md` surface on `--color-bg-page-primary` with `--shadow-modal`, pinned 10vh from the top over a `--color-scrim` backdrop, capped at 60vh. A search row (24px `search` icon, borderless input, 32px ghost close) sits above a scrolling list of `--radius-sm` command rows; each row takes an optional 20px icon, a `--font-paragraph-em-*` label, an optional tertiary description line, and a `shortcut` array rendered as compact Kbd keycaps (see Kbd). Group headings use `--font-paragraph-sm-*` tertiary; the active row takes `--color-action-passive-bg-hover`. Filtering matches label, description, and `keywords`; disabled commands stay visible but are skipped by the highlight. Keyboard: arrows wrap through the flattened list, Home/End jump to the ends, Enter runs, Escape closes, and `hotkey` binds Cmd/Ctrl+K globally (set false when the host app owns the shortcut). A footer hint row documents those keys and hides under 480px. Closed state uses `visibility: hidden` so the input never enters the tab order.

### Popover

**`ds-popover`** — Anchored contextual overlay. Wraps a trigger and positions a `--radius-sm` panel (min-width 200px, `--padding-md`, `--color-bg-container-primary`, `--border-xs` border, `--shadow-floating`) on the chosen side (`top`/`bottom`/`left`/`right`). Trigger mode is `click` (outside-click and ESC dismiss) or `hover`; open state can be controlled via `open`/`onOpenChange`. Content is arbitrary ReactNode — unlike Tooltip, which is text-only. Sizes: `default`, `compact`.

### DropdownMenu

**`ds-dropdown-menu`** — Action menu opened from a trigger element (contrast with Dropdown, which is a form select). The panel is `--radius-md` on `--color-bg-page-primary` with a `--border-xs` `--color-input-border-primary` hairline and `--shadow-floating`, `--padding-xxs` inset, aligned `start` or `end`. Entries are a typed tree: items (label, optional Material Symbol icon, keyboard `shortcut` hint, `disabled`, `destructive` — red via the error/coral tokens), `separator`s, labelled `group`s, and nested sub-menus via `children`. Full keyboard navigation across the flattened item list; hover uses `--color-action-passive-bg-hover`. Sizes: `default`, `compact`.

### ContextMenu

**`ds-context-menu`** — Right-click (and keyboard ContextMenu / Shift+F10) menu anchored at the pointer position. Wraps its `children` as the right-clickable area; the panel is `position: fixed` at the event coordinates, clamped inside the viewport, and closes on outside click, scroll, resize, Escape, or item activation. Entries reuse DropdownMenu's typed tree (`DropdownMenuEntry`: items with icon/`shortcut`/`disabled`/`destructive`, `separator`s, labelled `group`s, one level of `children` sub-menus) and the exact same panel recipe — `--radius-md` on `--color-bg-page-primary`, `--border-xs` `--color-input-border-primary` hairline, `--shadow-floating`, `--padding-xxs` inset, `--motion-duration-fast` appear. Keyboard: the panel takes focus on open; Arrow keys move, Enter activates, Escape closes. Sizes: `default`, `compact`. Use DropdownMenu when the menu opens from a visible trigger; ContextMenu when it opens on the content itself.

### Tooltip

**`ds-tooltip`** — Text-only contextual label on hover or focus. The bubble is the system's inverse surface: `--color-bg-container-inverse` with `--color-text-on-inverse` at `--radius-xs`, `--font-paragraph-sm-*`, with a rotated-square arrow in the same fill. Four positions (`top`/`bottom`/`left`/`right`) with a 4px slide-in transition; `showDelay`/`hideDelay` control timing (300/150ms default). The panel has `role="tooltip"` and an id; Tooltip clones its child element with `aria-describedby` pointing at that id — host elements get it automatically, and Button/CircularButton accept the attribute natively. Content is a string; anything richer belongs in Popover.

### Divider

**`ds-divider`** — Thin rule separating stacked content: `--border-xs` (1px) in `--color-divider`. Plain horizontal renders a semantic `<hr>`; a `label` variant sets text inline in the line (`--font-paragraph-sm-*` in `--color-text-secondary`, `center` or `start` position, `role="separator"`); `vertical` stretches to container height inside flex rows (`aria-orientation="vertical"`). Spacing prop maps to the gap scale: `none`/`sm` (8px)/`md` (16px, default)/`lg` (20px) — block margin when horizontal, inline when vertical. Not for separating page sections under `h2` headings — the `h2` bottom border already does that (see Section Dividers above); Divider is for forms, lists, toolbars, and card interiors.

### Pagination

**`ds-pagination`** — Page navigation for long datasets; pairs with Table. A `<nav>` of pill page buttons (40px, `--radius-full`) with chevron arrows at each end; first and last pages always visible, ellipses cover the gaps (`siblingCount` controls the window, default 1). Current page takes the SegmentedControl active treatment: `--color-action-primary-bg` fill with `--color-action-primary-text`, `aria-current="page"`. Idle buttons: `--font-paragraph-em-*` in `--color-text-secondary`, hover `--color-action-passive-bg-hover`. Arrows disable at the ends (`opacity: 0.4`, `cursor: not-allowed`). `size="compact"` swaps the numbers for a "Page X of Y" readout (`--font-paragraph-sm-*`) between 32px arrows.

### Stat

**`ds-stat`** — A single headline metric: display-weight numeral over a quiet label, with an optional trend delta. Value uses `--font-sub-display-*` (30px/300) by default, `--font-display-2-*` (64px/300) at `large` — the weight-contrast rule applied to numerals. Label: `--font-paragraph-sm-*` in `--color-text-tertiary`. Delta: `--font-paragraph-sm-em-*` with a 16px Material arrow; colours by trend — `up` → `--color-core-accent-mint`, `down` → `--color-core-accent-coral` (the vivid accents, stable across themes — the muted status text tokens read too subtle at this size), `neutral` → `--color-text-tertiary`. Compose several in a flex row for a case-study metrics band.

### CodeBlock

**`ds-code-block`** — Monospace code in a `--color-bg-container-primary` container with `--radius-md` and a hairline border. The original sanctioned monospace context in the system, set in `--font-family-code` (Nunito Sans everywhere outside code contexts). Optional header row: filename (mono, `--color-text-secondary`), uppercase language tag (`--color-text-tertiary`, 0.08em tracking), and a copy button that confirms with a check for 2s. Code text is 14px/20px, `--color-text-primary`; long lines scroll horizontally. An optional `maxHeight` prop caps the block: the code area scrolls vertically inside while the header stays pinned. An optional `collapsible` prop adds a chevron beside the filename (`--color-icon-primary`, 20px, rotates −90° when closed) that collapses the code area with the same 0fr/1fr grid animation as Accordion; `defaultCollapsed` starts it closed. No syntax highlighting — monochrome by design, no dependencies.

### Kbd

**`ds-kbd`** — A single keyboard key rendered as a keycap, for shortcut hints in menus and docs prose. A semantic `<kbd>` on a `--color-bg-container-primary` chip with a `--border-xs` `--color-bg-container-border` border at `--radius-xs`; legend in `--font-paragraph-sm-*` at em weight, `--color-text-tertiary`, centred with a min-width so single letters stay square-ish (24px default, 20px compact). Sizes: `default`, `compact` (the compact size matches CommandPalette's shortcut hints, which render through Kbd). Purely presentational — no `'use client'`; compose several for a chord: `⌘` + `K`.

### Quote

**`ds-quote`** — Blockquote with optional attribution, two registers. `default`: body-size text in `--color-text-secondary` behind a `--border-md` left rule in `--color-bg-container-tertiary`. `pull`: `--font-sub-display-*` (30px/300) in `--color-text-primary`, no rule — the scale is the emphasis. Attribution: em-dash + `--font-paragraph-sm-em-*` primary; detail line: `--font-paragraph-sm-*` tertiary. Renders semantic `<figure>/<blockquote>/<figcaption>`.

### Field

**`ds-field`** — The scaffolding shared by every labelled form control, so the wiring exists once rather than per component. Renders the `<label>` (`--font-paragraph-em-*`, `--color-text-primary`) with its `htmlFor`, the required marker (`ds-field__required`, `--color-core-accent-coral`, `aria-hidden` — the control's real `required` attribute is what gets announced), the control itself as children, the helper/error `<p>` (`ds-field__helper`, `--font-paragraph-sm-*`, `--color-text-tertiary`), and an optional `aside` slot (character counters, units) in a `ds-field__footer` wrapper. Modifiers: `--error` recolours the helper to `--color-status-error-border`; `--disabled` dims the label to `--color-input-text-disabled`; `--compact` drops the label to `--font-paragraph-sm-*`.

Field deliberately owns **no layout** — the flex column and gap stay on the consuming component's own root class, so adopting it changes no spacing. It generates the control id when one isn't supplied, derives the helper id from it, and exposes `{ controlId, labelId, describedBy, invalid, required, disabled }` through `useField()`, which returns `null` outside a Field so a control still renders standalone. Input, Textarea, DateInput, Dropdown, Combobox, FileInput and ColorPicker compose inside it.

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

Recharts wrapper exposing: `AreaChart`, `BarChart`, `LineChart`, `PieChart`, `RadarChart`, `RadialChart`, `ScatterChart`, `StackedBarChart`, `Treemap`. Series colours: teal (`--color-action-primary-bg`) leads the default palette — the sanctioned data-viz exception to the action-only rule — with `--color-core-accent-*` tokens filling the remaining slots. Tooltips and legends use system typography tokens. Axes text in `--color-text-tertiary`.

### Contribution graph

**`ds-contribution-graph`** — GitHub-style activity heatmap: weeks as columns, weekdays as rows, one 12px cell per day at `--radius-xxs`. Cell colour comes from the five-step contribution ramp, defined in both themes:

- `--color-chart-contribution-0` — no activity (`--color-bg-container-primary` light / #232323 dark)
- `--color-chart-contribution-1` → `-4` — increasing activity, green primitives (light: green-02 → 04 → 07 → 09; dark: green-10 → 09 → 08 → 07, so the brightest cell is mint #06D6A0)

Month labels, caption, and Less→More legend use `--font-paragraph-sm-*` in `--color-text-tertiary`/`--color-text-secondary`. The grid scrolls horizontally inside its own container on narrow screens. This ramp is for activity intensity only — ordered multi-series chart colors remain an open gap (see below).

### AgentStatus

**`ds-agent-status`** — What an agent is doing right now: a dot-matrix indicator beside a line of status text. The matrix is a 4×3 grid of 12 `--radius-full` dots sized off the icon scale (`--icon-size-sm` wide at `sm`, `--icon-size-md` at `md`) with `--gap-xxs` between them, so the dots derive their size from the grid rather than carrying pixel values of their own.

Fifteen named patterns — `braille`, `orbit`, `breathe`, `snake`, `fill-sweep`, `pulse`, `columns`, `checkerboard`, `scan`, `rain`, `cascade`, `sparkle`, `wave-rows`, `helix`, `diagonal-swipe` — are choreography over that one grid. Every pattern runs on the same twelve-slot cycle (`--motion-duration-loop-matrix`, 1400ms): each dot is told which slot it lights in via `--ds-agent-step`, and dots a pattern never lights opt out of the animation. One grid and one cycle length means changing pattern never changes the indicator's footprint or its rhythm.

Six states: `idle`, `thinking`, `working`, `waiting`, `done`, `error`. The three working states are deliberately monochrome (`--color-text-secondary`, `--color-text-tertiary` when idle) — colour is reserved for the states where it carries meaning, taking `--color-status-warning-text`, `--color-status-positive-text` and `--color-status-error-text` respectively. The terminal states fill the matrix solid so the shape itself reads as finished. While active, a sweep walks the label left to right (`--motion-duration-loop-shimmer` over a `background-clip: text` gradient from `--ds-agent-shimmer-base`, default `--color-text-primary`, through `--ds-agent-shimmer-sweep`, default `--color-text-tertiary`; `waiting` keeps its warning base and sweeps `--color-text-primary`); `shimmer` overrides the default. Every colour on the component routes through custom properties — `--ds-agent-color` for the dots, `--ds-agent-label-color` for the text, plus the shimmer pair — so a consumer can tint a row (e.g. one `--color-core-accent-*` per agent when several share a surface; the showcase page demos one variation per core accent).

`variant="bar"` wraps the row in a full-width `--color-bg-container-secondary` container at `--radius-md` for the top of a panel. The root is a `role="status"` live region, and the matrix is `aria-hidden`, so the state change is announced once as text rather than as twelve dots. Under `prefers-reduced-motion` the matrix parks at a legible static opacity and the shimmer resolves to flat text — the global guard would otherwise collapse every dot to its dark final frame.

### ChatMarker

**`ds-chat-marker`** — The inline separator a conversation uses for anything that is not a turn: date breaks, joins, mode changes, system notes. A `--font-paragraph-sm-*` label in `--color-text-tertiary` sits between two flanking `--border-xs` lines in `--color-divider` (`--gap-sm-md` off the text), so the row reads as furniture rather than as a message. An optional leading Material Symbol renders at `--icon-size-sm` and is `aria-hidden` — the label carries the meaning. `line={false}` keeps the flanking segments as transparent spacers, so a bare note stays centred on the same geometry.

The root is `role="separator"` with the label as its content: screen readers treat it as a boundary, not a message, matching how the eye skips it while scanning turns. System *events* belong here; system *messages* with content are ChatMessage's job.

### ChatMessage

**`ds-chat-message`** — A single chat turn: avatar, author, timestamp, and the content itself, aligned by role. User turns are right-aligned bubbles; assistant turns are surface-less full-width text in `--color-text-primary`, so a transcript keeps its question-and-answer rhythm without every row wearing a surface. The `bubble` prop overrides the role default in either direction: an assistant turn can take a received bubble for classic messenger layouts, a user turn can go plain. Bubble surfaces come *only* from the four chat tokens — sent bubbles pair `--color-chat-bubble-sent-bg` with `--color-chat-bubble-sent-text`, received bubbles the matching received pair — never the container ramp directly, so re-theming a chat means repointing those four tokens and nothing else. The action colour never appears as a bubble fill: a teal bubble would spend the "click here" signal on something that is not clickable.

Bubbles sit at `--radius-xl` with `--padding-sm` `--padding-md` padding and cap at `--ds-chat-message-max-width` (default 75%), a consumer-override hook; `tail` squares the speaker-side bottom corner to `--radius-xs` — bottom-right on sent, bottom-left on received — a corner treatment only, with no pseudo-element pointer. Content sits on the `--font-paragraph-*` set; `size="compact"` drops it to `--font-paragraph-sm-*` and tightens bubble padding. The meta row is the author in `--font-paragraph-sm-em-*` `--color-text-secondary` beside a free-text tabular-nums timestamp in `--color-text-tertiary`. The avatar gutter is a fixed `--ds-chat-message-gutter` (default `--icon-size-lg`, matching Avatar's small size): `showAvatar={false}` and `grouped` hide the avatar but keep the gutter, so consecutive rows in a run stay aligned; `grouped` also drops the meta row and pulls the row up towards the one above.

`pending` replaces the content with three `--color-text-tertiary` dots pulsing in a staggered wave on `--motion-duration-loop-matrix`, wrapped in `role="status"` with a visually hidden `pendingLabel` and the dots `aria-hidden`; under `prefers-reduced-motion` the dots park at a legible static opacity rather than freezing at the loop's dim frame. `actions` renders under the content, revealed on hover and `:focus-within` over `--motion-duration-fast` — and always visible where hover does not exist (`hover: none`), so touch users are never locked out. `footer` is an always-visible slot for sources or an edited note. The package ships no markdown renderer: render markdown yourself, ideally wrapped in Prose, and pass the result as children.

### DocumentChip

**`ds-document-chip`** — A compact file reference: a two-line tile with a type icon, name, metadata line, upload progress, and an optional remove button, for documents attached to chat messages or queued above a composer. The tile is `--color-bg-container-primary` behind a `--border-xs` border at `--radius-md`, with the border colour routed through a local `--ds-document-chip-border` custom property so the error state repoints one variable to `--color-status-error-border` instead of restyling parts. A module-level map picks the Material Symbol for each of the eight `fileType` values (pdf, doc, sheet, slide, image, code, archive, generic) at `--icon-size-md`, overridable via `icon`; the name truncates with an ellipsis at a consumer-overridable `--ds-document-chip-max-width`, in `--font-paragraph-sm-em-*`. `meta` is free text in `--font-paragraph-sm-*` `--color-text-tertiary` ("1.2 MB", "12 pages"), so callers keep their own formatting. `progress` swaps the metadata line for a composed compact ProgressBar with its percentage label; `error` replaces it with a `--color-status-error-text` message and colours the border and icon with the error pair. `size="compact"` tightens the padding and drops to one line — name only — for dense composer rows.

Passing `onClick` turns the body (icon + text) into a `<button>` inside the root `<div>`, so click and remove coexist without nesting interactive controls; the remove button carries `removeLabel` as its accessible name and every icon is `aria-hidden`. Chip stays the one-line `--radius-full` pill for attributes and filters; FileInput stays the form control that owns selection — DocumentChip only references a file the host already holds.

### MessageActions

**`ds-message-actions`** — The icon-button row for message-level actions: copy, retry, feedback. Built to slot into ChatMessage's `actions` prop, which reveals it on hover and keyboard focus, so the row's own job is just the buttons. Each item is a ghost button — no border, transparent at rest, `--radius-sm` with `var(--padding-xxs)` padding around a Material Symbol at `--icon-size-sm` in `--color-icon-primary` — hovering onto `--color-action-passive-bg-hover` and `--color-text-primary` over `--motion-duration-fast` `--motion-ease-standard`. The row itself is a flex line at `--gap-xxs`. An `active` item (the chosen feedback thumb) holds `--color-action-passive-bg-active`; focus takes the house ring inset (`outline-offset: -2px`), disabled the house 0.4 opacity. These stay ghost buttons rather than CircularButtons because a resting surface per icon would give a quiet utility row four competing pills.

Every button carries its item's `label` as `aria-label`, and by default a composed Tooltip shows the same label on hover and focus (`showTooltips={false}` drops the tooltip, never the name). `aria-pressed` renders only when an item sets `active` — a toggle-like action announces its state, a plain command like copy stays a plain button. The row is stateless beyond hover: copy feedback is the consumer swapping the item's `icon` to `check` (and its `label` to match) for a moment, so the component never owns a timer or a clipboard call — `onActionClick` fires with the item's stable `id` and the consumer decides everything else.

### MessageCard

**`ds-message-card`** — A structured rich-content card embedded in a chat message: media, title, body, and an actions row, for link previews, search results, and booking-style rich responses inside an assistant turn or bubble. Card is the `--radius-xl` navigation tile; MessageCard is `--radius-md` content furniture inside a conversation. The container is `--color-bg-container-primary` behind a `--border-xs` `--color-bg-container-border` border with `overflow: hidden`, so the optional media slot runs flush to the card edges and the clip rounds its corners (images inside render block at full width). The body stacks at `--gap-xs` inside `--padding-sm-md`/`--padding-md` padding: an optional Material Symbol at `--icon-size-sm` `--color-icon-primary` beside a `--font-title-body-*` title, a free-text `meta` line ("transit.example", a date) in `--font-paragraph-sm-*` `--color-text-tertiary`, a description in `--color-text-secondary`, then any children — a Prose block, a DocumentChip row. The card claims no width of its own: the bubble or turn constrains it, with `--ds-message-card-max-width` as the consumer-overridable cap.

The `actions` footer mirrors ToolCall's actions footer exactly — `--color-bg-container-secondary` behind a `--border-xs` `--color-divider` border-top, flex-end at `--gap-sm` — so approvals on a tool call and link actions on a card read as the same row across the ai components.

### Prose

**`ds-prose`** — Token-styled typography for rendered markdown and rich agent output. The package ships no markdown renderer: consumers render markdown with whatever library they already use and wrap the output in Prose, which styles the descendant elements through scoped selectors. Body text sits on the `--font-paragraph-*` scale in `--color-text-primary` with `--gap-md` between blocks, edges trimmed (`first-child`/`last-child` margins zeroed) so it slots into bubbles and cards cleanly. Headings step down the token tiers — `--font-heading-1-*` through `--font-heading-3-*`, then `--font-title-body-*` for `h4` — each applying its full five-property set, so the weight-contrast principle holds without Prose restating it. Links use `--color-action-primary-text-tertiary` with an underline; `strong` takes `--font-paragraph-em-weight`; lists indent by `--padding-md` with `--gap-xs` between items.

Inline code and `pre` both use `--font-family-code`: inline code sits on `--color-bg-container-secondary` at `--radius-xxs` with `--padding-xxxs` horizontal padding, one size step down; `pre` is a `--color-bg-container-primary` panel with a `--border-xs` `--color-bg-container-border` border at `--radius-md`, `--padding-md`, scrolling horizontally rather than wrapping, and `pre code` drops the inline chrome. Blockquotes take a `--border-md` `--color-divider` left rail with `--padding-md` inset in `--color-text-secondary`, mirroring Reasoning's trace rail. Tables are full-width with collapsed borders, `--font-title-body-*` headers on `--color-bg-container-secondary`, and `--border-xs` `--color-divider` row rules; `hr` is the same hairline; images cap at `max-width: 100%` under `--radius-md`.

`size="sm"` moves the body scale to `--font-paragraph-sm-*` for dense chat contexts while headings keep their tiers. Prose adds no roles or behaviour of its own — the semantics are the consumer's markup — and its `pre` is the plain fallback: CodeBlock remains the richer choice for standalone code.

### Reasoning

**`ds-reasoning`** — A model's thinking, disclosed behind a one-line summary. The trigger is a borderless `--font-paragraph-sm-*` button in `--color-text-tertiary` with an `expand_more` chevron *after* the summary — trailing, like ToolCall's, so the summary line starts at the same left edge as everything around it — rotating 180° when open. The panel collapses with the `grid-template-rows: 0fr → 1fr` technique over `--motion-duration-slow`, and toggles `visibility` alongside it so collapsed content leaves the accessibility tree. The trace sits on a `--border-md` `--color-divider` rail in `--color-text-secondary`, the rail flush with the summary's left edge, quiet enough never to compete with the answer beside it.

`streaming` opens the panel and shimmers the summary with the same treatment AgentStatus uses, so "the model is working" looks the same wherever it appears; when the stream ends the panel collapses to `Thought for {duration}s`. That auto-collapse yields to the reader — once someone has toggled the panel themselves, the stream ending no longer moves it. Only the summary is a `role="status"` live region: a trace announced token by token floods a screen reader, so the body stays ordinary expandable content and the announcement covers the boundaries.

### SourceChip

**`ds-source-chip`** — A numbered citation pill linking a claim to its source: a borderless `--radius-full` pill on `--color-bg-container-secondary` holding a leading slot and a source title in `--font-paragraph-sm-*` `--color-text-secondary`, the title truncating with an ellipsis at `24ch`. The leading slot is either the citation number — a `--font-paragraph-sm-em-*` `tabular-nums` numeral in `--color-text-tertiary`, centred in its own `--icon-size-sm` `--color-bg-container-tertiary` circle — or a Material Symbol at `--icon-size-sm` `--color-icon-primary`; when both `index` and `icon` are passed, the index wins.

The root is an `<a>` when `href` is set and a plain `<span>` otherwise. Only the link gets interaction styling: on hover the background steps to `--color-bg-container-tertiary` and the text to `--color-text-primary` over `--motion-duration-fast` `--motion-ease-standard`, with `text-decoration: none` throughout — the pill shape is the affordance — and focus draws the house `--color-action-primary-bg` ring. The non-link span keeps `cursor: default` and no hover. It renders inline after a sentence or in a wrapping sources row under an assistant answer, pairing with ChatMessage's footer slot once that ships.

### ToolCall

**`ds-tool-call`** — The record of one tool invocation. A skimmable header row — status indicator, monospace tool name (`--font-family-code`, the same sanctioned monospace context CodeBlock uses), summary, status word, `tabular-nums` duration, chevron — over a collapsible body holding the arguments and result. Container is `--color-bg-container-primary` at `--radius-md` with a `--border-xs` `--color-bg-container-border`; the panel uses the same `0fr → 1fr` collapse and `visibility` handling as Reasoning.

Four statuses: `pending`, `running`, `success`, `error`, mapping to the warning, info, positive and error `--color-status-*-text` tokens. The container stays neutral so a long run reads as a list rather than a wall of tinted cards; only the two states a person has to act on — `pending` and `error` — also take a coloured border. `running` renders a `Spinner` at `variant="inherit"`, the rest a Material Symbol (`pause_circle`, `check_circle`, `error`) at `--icon-size-sm`.

The `actions` slot — allow, deny, always allow — renders in a `--color-bg-container-secondary` footer *outside* the collapsible panel, so answering an approval request never requires expanding the call first. With no children the header renders as a plain `div` rather than a button, so a row with nothing to disclose does not look pressable.

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

**Rule:** Never hardcode `color` or `background-color` with a hex value in a component. Always use a semantic token — the theme swap is the only mechanism for dark mode, no manual `prefers-color-scheme` queries in components. One sanctioned exception: ColorPicker's colour-mixing constants (the white/black overlay gradients, the hue spectrum, the picker-handle white) are colour-space physics no theme token can represent — they are written as `hsl()` literals, commented in place, and documented in the ColorPicker spec.

---

## Do's and Don'ts

### Do
- Use semantic tokens (every `CATEGORY_PREFIXES` category — `--color-*`, `--radius-*`, `--gap-*`, `--padding-*`, `--border-*`, `--font-*`, `--motion-*`, `--icon-size-*`, `--shadow-*`) in every component. Never use `--primitive-*` tokens directly.
- Reserve `--color-action-primary-bg` (teal) for primary CTA buttons, focus rings, and active input states. The one other sanctioned use is as the lead series colour in charts; nowhere else.
- Use Nunito Sans weight 300 for display/marketing text and weight 600 for in-app headings. The weight split is intentional.
- Apply `--radius-full` to all buttons, `--radius-md` to all inputs and standard containers, and `--radius-xl` to Card/EntityCard navigation tiles. This contrast is the system's shape signature.
- Map all feedback UI to the five-variant status system (`info`/`positive`/`warning`/`error`/`neutral`) — Badge, Alert, Toast, ProgressBar all share the same semantic tokens.
- Prefer `--color-divider` for rule lines over custom border colors.
- Use Material Symbols Rounded for icons, sized with `--icon-size` set to a scale step (`sm` 20 / `md` 24 / `lg` 32 / `xl` 48). Never set `font-size` on an icon directly.
- Always wrap your app in `ToastProvider` before calling `useToast()`.

### Don't
- Don't use primitive tokens (`--primitive-neutral-05`, `--primitive-teal-07`, etc.) in components or page styles.
- Don't use teal decoratively — it is the primary action color. Using it on text or illustrations dilutes its CTA signal. (Chart series are the one sanctioned exception: teal leads the default palette.)
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
The canonical set is **1279 / 1151 / 959 / 768 / 600**, all `max-width`. The rail widths and column gap live as `--layout-*` custom properties in `globals.css`, so the mid-breakpoint narrowing applies to every page at once:
- **≥ 1280px** — full shell: 291px left nav (`--layout-sidebar-width`), 320px right rail (`--layout-rail-width`), 60px column gaps (`--layout-column-gap`).
- **≤ 1279px (mid)** — both rails narrow (nav 240px, rail 280px) and the column gap tightens to 40px, keeping the center column at a readable measure.
- **≤ 1151px** — the right details rail stacks below the main content (per-page media query on the `resumeLayout`/`updatesLayout` flex row); the left nav stays.
- **≤ 959px (tablet)** — the left nav hides (its links move into the header drawer's section accordions) and pages collapse to a single column.
- **≤ 768px (mobile)** — **the token layer's only breakpoint**: display-tier typography and section-rhythm spacing collapse (see Typography → Hierarchy and Spacing → Gap Scale).
- **≤ 600px (phone)** — body side gutters tighten; dense grids switch to horizontal scroll inside their own blocks.

A section-specific threshold outside this set is allowed only when it is content-driven (a bespoke grid that breaks at its own natural width) and commented in place; everything else uses the canonical five.

### Typography Collapse
- Handled by the token layer at ≤768px — Display 2 64px → 40px, Sub Display 30px → 24px, Mega/Display 1 proportional. No per-page overrides.
- In-app headings (H1–H3, 30–22px) hold at every viewport; never reduce H3 below 20px.

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

- **Motion (JS timings)** — CSS motion is fully tokenized, but JS-driven timings (Tooltip's 300/150ms show/hide delays, Toast's 5000ms auto-dismiss, Carousel's autoplay interval) remain hardcoded constants in component TypeScript — tokenizing them needs shared TS constants, a separate follow-up.
- **Figma parity** — The system originates in Figma ([robr0-ds26](https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/robr0-ds26)), and foundation/component pages deep-link to specific frames via `figmaUrl`. Keeping the Figma file and the coded tokens in sync is still a manual process — there is no automated export pipeline.
- **Breakpoint tokens** — The docs-shell column widths are tokenized (`--layout-*` in the website's `globals.css`), but the media-query thresholds themselves (the canonical 1279 / 1151 / 959 / 768 / 600px set) remain raw values repeated across CSS files by design — CSS custom properties cannot drive `@media` conditions, and a preprocessor dependency isn't worth it for five documented literals.
- **Form validation patterns** — Error state on Input is documented, but multi-field form-level validation patterns (inline error summaries, field grouping) are not in scope here.
- **Chart theming** — chart series colours are hardcoded per component (teal first, then `--color-core-accent-*` values); a formal `--chart-series-{n}` token set for ordered series colors has not been codified.
