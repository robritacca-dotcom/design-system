# Design System — design.md

## Overview

This design system is a **cool-professional, teal-anchored** component library and documentation website. The base atmosphere is a **pure white page floor** (`--color-bg-page-primary` — #FFFFFF) lifted by a **neutral container hierarchy** (light gray #F1F1F1 → mid gray #D6D6D6 → deep gray #BCBCBC) — clinical, precise, never warm. The brand voltage comes from **signature teal** (`--color-action-primary-bg` — #0E6E8F light / #3CA5C6 dark), a cyan-blue that reads trustworthy and technical without corporate-blue flatness. The action colour is deliberately theme-dependent: no single teal step can clear 3:1 against both a white page and a near-black one while also carrying a 4.5:1 label, so light mode takes a deep fill under a light label and dark mode inverts to a light fill under a dark label.

The system runs a **single typeface throughout**: **Nunito Sans** at weight 300 (display/hero) → 600 (headings) → 500/400 (body/UI). There is no serif face, and monospace appears only in sanctioned code contexts through `--font-family-code` — the typographic personality is clean, rounded, and approachable rather than editorial.

The **three-tier token architecture** is the defining structural rule:
1. **Primitives** (`--primitive-*`) — raw hex/px values. Source of truth. Never used directly in components.
2. **Semantic tokens** (`--color-*`, `--radius-*`, `--gap-*`, `--padding-*`, `--border-*`, `--font-*`, `--motion-*`, `--icon-size-*`, `--shadow-*` — `CATEGORY_PREFIXES` in `scripts/generate-token-registry.mjs` is the authoritative list) — usage-intent variables consumed by components. Always use these.
3. **Component CSS classes** (`.ds-button`, `.ds-badge`, etc.) — per-component scope, referencing semantic tokens.

The system is **light/dark-first**: every semantic color token has a light-theme value and a dark-theme override. The switch is driven by `data-theme="dark"` on the root element. Status colors (positive, warning, error, info) stay perceptually stable across themes; surfaces and text invert.

**Key Characteristics:**
- White page floor (`--color-bg-page-primary` — #FFFFFF) with near-black primary text (`--color-text-primary` — #050505 light / #F1F1F1 dark).
- Teal primary action (`--color-action-primary-bg` — #0E6E8F light / #3CA5C6 dark). Used exclusively on primary CTA buttons and focus rings, with one sanctioned data-viz exception: teal leads the default chart series palette. Never decorative elsewhere.
- Nunito Sans single-family system. Weight 300 for Mega/Display (marketing), 600 for headings, 500/400 for body and UI labels.
- Container hierarchy as depth signal — standard containers carry no drop shadows. Depth is conveyed by stepping through `--color-bg-container-primary` → `secondary` → `tertiary`; the only shadows are the `--shadow-floating`/`--shadow-modal` tokens on floating surfaces and the interactive-card hover lift.
- Five semantic status variants running through every feedback component: `info` (blue), `positive` (green), `warning` (orange), `error` (red), `neutral` (gray).
- Border radius is hierarchical: `--radius-xs` (4px) for badges, `--radius-md` (12px) for inputs and standard containers, `--radius-xl` (24px) for Card/EntityCard navigation tiles, `--radius-full` (999px) for buttons.
- Material Symbols Rounded for all iconography, on a four-step size scale — `--icon-size-sm` (20px) / `md` (24px, default) / `lg` (32px) / `xl` (48px). Optical size tracks the step automatically.
- One GPU-rendered surface: **ShaderField**, an ambient field of soft light sources that sample the colour tokens at runtime, so it re-themes with everything else. It is scenery rather than interface, it reports how it resolved so a caller can keep a fallback painted, and its `prefers-reduced-motion` check lives in JavaScript, where the CSS guard cannot reach (Carousel's autoplay gate makes the same move).
- Accessibility-first: ARIA roles, semantic HTML, and keyboard navigation in every interactive component.

---

## Colors

### Token Tiers

Never reference `--primitive-*` tokens inside components. Always use the semantic layer (`--color-*`). The chain is enforced in the other direction too: every semantic colour token's value must be a `var(--primitive-*)` reference — never a raw hex/rgba literal — so that overriding a primitive re-themes everything built on it (`scripts/validate-token-references.mjs` fails the build otherwise). The hex values noted throughout this section are the resolved values of those primitives.

### Action / Brand

The action roles are the one token family that splits per theme by design (see Overview): light mode runs a deep fill under a light label, dark mode a light fill under a dark label, and hover/active walk away from the page — deepening in light, brightening in dark.

- **Primary bg** (`--color-action-primary-bg` — #0E6E8F light / #3CA5C6 dark): Teal. Every primary CTA button fill, focus rings, active input borders. The most-recognized brand color.
- **Primary bg hover** (`--color-action-primary-bg-hover` — #0A4E66 light / #6DBCD6 dark): Hover shift on primary buttons.
- **Primary bg active** (`--color-action-primary-bg-active` — #052F3E light / #9ED4E5 dark): Press/active shift on primary buttons.
- **Primary text** (`--color-action-primary-text` — #CFEAF3 light / #052F3E dark): Text/icon color on the primary fill — light teal on the deep light-mode fill, deep teal on the light dark-mode fill.
- **Primary text active** (`--color-action-primary-text-active` — #F1F1F1 light / #052F3E dark): Text on hovered/active primary button.
- **Primary border** (`--color-action-primary-border` — #052F3E light / #3CA5C6 dark): Outline on secondary (outlined) Buttons and CircularButtons.
- **Secondary border** (`--color-action-primary-border-secondary` — #0E6E8F light / #2C9AB9 dark): Brighter border step — the completed-step border and connector in Stepper.
- **Tertiary border** (`--color-action-primary-border-tertiary` — #0E6E8F light / #6DBCD6 dark): Hover ring on RadioButton.
- **Tertiary text** (`--color-action-primary-text-tertiary` — #0A4E66 light / #6DBCD6 dark): Teal-coloured text for tertiary/ghost button labels.
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

### AI Gradient (reserved for AI entry points and surfaces)
The red → blue → teal gradient is the system's "a model answers here" signal, the AI counterpart to the action teal: ordinary actions keep the flat `--color-action-primary-bg`, AI affordances carry the gradient, and neither is ever used for the other's job — or decoratively. Always used as gradient stops (AiButton's ring and glow are the reference), never as flat fills for ordinary chrome.

| Stop | Light | Dark |
|---|---|---|
| `--color-ai-gradient-start` | `red-06` #F16385 | `red-05` #F37F9B |
| `--color-ai-gradient-mid` | `blue-06` #345AC4 | `blue-05` #5475D4 |
| `--color-ai-gradient-end` | `teal-08` #0E6E8F | `teal-07` #118AB2 |

Dark mode runs one primitive step brighter so the gradient stays luminous on dark surfaces. The teal stop sits deeper than the red and blue ones so the gradient ends on the same weight the action colour carries.

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

## Composition

Tokens constrain values; this section constrains choices. Element-level rules (colors, radii, type) make components consistent — these rules make **pages** consistent. Every rule here is stated so that a page assembled from the components lands right on the first pass, without per-page taste decisions.

### The rhythm ladder

Page-level vertical space is a statement of relatedness: the gap between two things says how related they are. The ladder is exhaustive — these five roles are the *only* page-level gaps. A spacing value that is not on the ladder is component-internal spacing, and belongs to a component.

| Role | Token | Value | Meaning |
|---|---|---|---|
| Section break | `--gap-xxxl` | 80px (60px ≤768px) | Separates page regions. The only gap between sections. |
| Heading bind | `--gap-xl` | 40px, flat | Ties a heading to the content it introduces. |
| Intro bind | `--gap-lg` | 20px | Ties a tagline or lede to its body copy. |
| Group bind | `--gap-sm` | 8px | Ties a label to the items it names. |
| Column gutters | `--layout-*` | presets | Gutters and rail widths are facts of the layout, set once at the shell — never per-page choices. |

Because the ladder's meanings differ by a full visual step (80 / 40 / 20 / 8), a reader can recover the page structure from spacing alone. Never use an off-ladder gap to "fine-tune" a page-level relationship: if 40px feels wrong between a heading and its content, the content is wrong, not the gap.

### Composition rules

1. **Parent owns spacing.** Siblings are spaced by their container's `gap`, never by margins on the children. A child that carries its own outer margin breaks in every context except the one it was tuned for.
2. **One level of chrome.** Components that carry their own container (charts, tables, calendars) sit bare under a heading — never wrapped in a card. A card wrapper is only for content with no chrome of its own. Two levels of container on one element is always a bug.
3. **Dividers are the last resort.** Separation comes from whitespace (the ladder) and containers first; a divider is only for where spacing contrast cannot do the job — long uniform lists, table rows. A divider under a heading that whitespace already separates is decoration, and decoration is not a divider's job. Next to content that draws its own lines (bordered tables, calendars), a section heading always separates by whitespace alone — on a line-heavy page, every added line is noise.
4. **Constrain the column, not the content.** A page has one content max-width; anything wider than its column (tables, diagrams, code) scrolls inside its own container. Never cap the width of a paragraph — cap the column it sits in.
5. **A header is one region.** A page title and its tagline bind at the heading tier (40px), never separated by a section break. The first section break on a page sits *below* the complete header group.
6. **Page rhythm stops at a component's edge.** The ladder governs the space *between* components and headings; a component's internal spacing is its own spec's business. Composing a page never involves reaching into a component to adjust its insides.
7. **Sections stack.** A page is one column of full-width sections; side-by-side placement is for the items *inside* a band (a metrics row of Stats), not for sections themselves. Tiling sections into a grid is a template's decision to make, never a page-by-page one — tested both ways on a dense dashboard, the stack reads calmer and the grid reads cramped.

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
| `--radius-composer` | 29px | The Composer shell only — concentric with the 40px send button it wraps (half the button + the padding-sm ring + the border width), held as a resolved constant so consumer re-theming reaches it |

**Key rule:** Buttons are always `--radius-full` (pill shape). Inputs are always `--radius-md` (12px), with one sanctioned departure: the Composer shell uses `--radius-composer` for concentric geometry with its send button (see the Composer spec). Card and EntityCard — the navigational tiles — use the larger `--radius-xl` (24px) to read as destinations rather than form surfaces. This contrast — rounded pill CTAs vs softer-cornered inputs vs generously rounded tiles — is intentional and consistent.

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

Motion is quiet and functional — it confirms an interaction, reveals structure, or signals loading. Interface motion never decorates. The one sanctioned exception is the **ambient background**, which is scenery rather than interface: it belongs to no control, communicates no state, and sits behind everything at `z-index: -1` (see the Ambient background section below). The whole vocabulary is defined in `tokens-motion.css` (theme-agnostic, single `:root` like typography): nine `--motion-duration-*` tokens and five `--motion-ease-*` curves. Compose a duration with an easing instead of writing literal values — never hardcode `0.2s ease` in component CSS.

**Durations — core scale** (day-to-day UI):

| Token | Value | Use |
|---|---|---|
| `--motion-duration-fast` | 150ms | Quick feedback: hovers, icons, tooltips, nav links |
| `--motion-duration-base` | 200ms | The default — color/opacity/border transitions |
| `--motion-duration-slow` | 300ms | Structural change: accordion, sidebar width, toast enter |
| `--motion-duration-slower` | 600ms | Deliberate page-entrance reveals |

**Durations — extended** (special-purpose; named so they stop being magic numbers, but reach for the core four first): `--motion-duration-instant` (75ms, below the threshold where a change reads as motion — it takes the edge off the Composer growing a line, nothing more), `--motion-duration-deliberate` (400ms, carousel slide), `--motion-duration-loop-spin` (1000ms, spinner rotation), `--motion-duration-loop-shimmer` (1800ms, skeleton shimmer and the agent label sweep), `--motion-duration-loop-matrix` (1400ms, the twelve-slot cycle every AgentStatus dot pattern shares).

**Easings:**

| Token | Value | Use |
|---|---|---|
| `--motion-ease-standard` | `ease` | General default for color/opacity transitions |
| `--motion-ease-emphasized` | `cubic-bezier(0.4, 0, 0.2, 1)` | Size/layout changes (sidebar width, accordion height) |
| `--motion-ease-entrance` | `cubic-bezier(0.16, 1, 0.3, 1)` | Expressive decelerate for enter animations (modals, dropdowns, toasts) |
| `--motion-ease-linear` | `linear` | Continuous motion (spinner, progress bars) |
| `--motion-ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful overshoot (toggle switch thumb) |

**Reduced motion contract:** `tokens-motion.css` collapses every duration token to 0.01ms under `prefers-reduced-motion: reduce`, and a universal guard flattens remaining hardcoded transitions/animations. Components that consume the tokens respect the preference automatically — never write component-level `prefers-reduced-motion` queries.

**Migration status:** all component and website CSS composes the tokens — no literal durations or easings remain (the two sanctioned exceptions: Skeleton's shimmer keeps a literal `ease-in-out`, which has no token curve, and the website's decorative 14–22s background floats stay bespoke). JS-driven timings (hover show/hide delays, toast auto-dismiss, carousel autoplay, transient feedback resets, scroll settle) have their own single home: the shared constants in `src/tokens/motion.ts`, published as `@robr0/design-system/tokens/motion`. They are schedule timings rather than animation durations, so the reduced-motion guard deliberately does not touch them; components use them as defaults, overridable per instance through props. The one carve-out is Carousel, which checks the preference itself in JS: autoplay never starts under reduced motion.

### Ambient background

The website's background is **ShaderField** — the published component, not a bespoke site surface. Its rendering contract is specified in the Components chapter; what follows is only why a full-viewport animated surface is allowed at all, and how the site composes it.

Three properties make this an exception that does not erode the rule:

- **It is scenery, not interface.** Nothing about it is a signal, so its motion cannot be mistaken for feedback.
- **It degrades to the CSS blobs.** The site keeps eight blurred CSS discs painted underneath on every page — ported 1:1 to the shader's coordinate space, so the field and its fallback are the same picture, give or take the framing `crop` gives the field on a narrow viewport — and drives their visibility from the status ShaderField reports. No WebGL2, a lost GPU context, a renderer that stalls before its first frame, or the config's kill switch all land on the same quiet fallback. The blobs are hidden while the renderer is still resolving, rather than painted and then swapped. The deliberate cost is that a machine which cannot run the shader shows bare page floor for that first moment before the blobs fade in.
- **It honours reduced motion in JavaScript.** This is the part worth knowing, and it is the component's job rather than the site's: the guard in `tokens-motion.css` is CSS-only and cannot see a `requestAnimationFrame` loop. The rule against component-level `prefers-reduced-motion` queries still holds for everything that consumes the duration tokens; a JS animation loop is outside that contract by construction.

Each blob carries a 14–22s drift period inherited from the CSS blobs it replaced, scaled by the config's `speed` parameter — so the cycles you actually see are those periods divided by `speed`, not the raw numbers. Every tuneable value — the eight field parameters and the eight blob definitions — lives in `website/src/data/shader-background.json`, validated against the token registry so the field can never sample a token that does not exist.

---

## Components

### Button

**`ds-button`** — The primary interactive element. Always pill-shaped (`--radius-full`). Text uses `--font-paragraph-em-*` (default) or `--font-paragraph-sm-em-*` (compact). Icon size: 24px (default), 20px (compact). Transitions: background-color, border-color, and opacity at `--motion-duration-base` / `--motion-ease-standard`. Disabled state: `opacity: 0.4`, `cursor: not-allowed` — never hidden.

| Variant | Fill | Border | Text |
|---|---|---|---|
| `primary` | `--color-action-primary-bg` (#0E6E8F light / #3CA5C6 dark) | none | `--color-action-primary-text` (#CFEAF3 light / #052F3E dark) |
| `secondary` | transparent | `--color-action-primary-border` (#052F3E light / #3CA5C6 dark) 1px | `--color-text-primary` |
| `tertiary` | `--color-action-passive-bg` (near-transparent) | none | `--color-action-passive-text` |
| `destructive` | transparent | `--color-core-accent-coral` (#EF476F) 1px | `--color-core-accent-coral` |

Hover: primary and secondary → `--color-action-primary-bg-hover`; destructive → fills with its coral border colour. Active: primary and secondary → `--color-action-primary-bg-active`. Hover and active walk away from the page — deepening in light mode, brightening in dark — so the pressed fill never sinks toward the floor behind it.

Sizes: `default` (padding 8px × 20px), `compact` (padding 6px × 12px).

Loading state: `loading` puts a `variant="inherit"` Spinner in the left icon slot (24px default / 16px compact), keeps the variant's full-colour appearance (no disabled dim), blocks interaction (`pointer-events: none`, `cursor: progress`, `disabled` attribute), and sets `aria-busy`. A loading `href` button renders the `<button>` branch so the link is truly inert.

### ButtonGroup

**`ds-button-group`** — Inline container that composes Buttons for nav and subnav contexts. Two orientations: `horizontal` (default — `--gap-lg` between buttons, used in top navigation) and `vertical` (`--gap-xxs`, left-aligned hug-content column for subnav/mobile). Purely compositional: each entry is a full `ButtonProps` config passed straight through to Button, so variants and disabled states mix freely — except that an entry with no `variant` defaults to `tertiary`, not Button's own `primary`, so nav groups read as passive by default. `role="group"` with an optional `ariaLabel`.

### CircularButton

**`ds-circular-button`** — Round icon-only button, 40px (default) or 32px (compact), always `--radius-full`. The same variants as Button minus `destructive` — `primary` (`--color-action-primary-bg` fill), `secondary` (outlined, `--border-xs` + action border tokens), `tertiary` (ghost, `--color-action-passive-bg-hover` on hover) — with the same state set (`default`/`hover`/`active`/`disabled`). Icon is a single Material Symbol at 24px default / 20px compact. Renders as `<a>` when `href` is set. `ariaLabel` is required — there is no visible label. Follows the published API contract like Button: `disabled` is the real boolean (`state` stays as the documentation-only affordance), the ref forwards to whichever element renders, and unrecognised props — `data-*`, `aria-*`, native event handlers — spread onto it. `loading` swaps the icon for a `variant="inherit"` Spinner, keeps full-colour appearance, blocks interaction, and sets `aria-busy` — same contract as Button.

### SegmentedControl

**`ds-segmented-control`** — Horizontal set of mutually exclusive options on a `--color-bg-container-primary` track with a `--radius-full` pill silhouette. The active segment takes `--color-action-primary-bg` with `--color-action-primary-text`; idle segments use `--font-paragraph-em-*` in `--color-text-secondary` with `--color-action-passive-bg-hover` on hover. Segments accept an optional Material Symbol icon and per-segment `disabled`. The track carries a `--border-xs` `--color-bg-container-border` hairline. Sizes: `default`, `compact`; `fullWidth` stretches segments across the container. Announces as a tablist (`role="tablist"`, segments are `role="tab"` with `aria-selected`). Keyboard: Arrow keys cycle enabled segments, Home/End jump to the ends.

### ToggleGroup

**`ds-toggle-group`** — A row of two-state buttons sharing a bordered `--radius-sm` container (`--border-xs` on `--color-bg-container-border`). Single-select by default; `multiple` allows any combination. Active items fill with `--color-action-primary-bg` and `--color-action-primary-text`; items can be text labels or Material Symbol icons (`icon: true`). Sizes: `default`, `compact`. Group-level `disabled` applies the standard `opacity: 0.4` treatment. `role="group"` + `aria-pressed` per item.

### Badge

**`ds-badge`** — Inline status label. Radius `--radius-xs` (4px) — notably tighter than buttons and inputs. Text: `--font-paragraph-sm-em-*` (14px/500). Padding: 2px vertical × 8px horizontal. Each of the five status variants (`info`, `positive`, `warning`, `error`, `neutral`) maps directly to its `--color-status-*-bg`, `--color-status-*-border`, and `--color-status-*-text` tokens. Renders with `role="status"` for accessibility.

### Chip

**`ds-chip`** — Compact pill for attributes, filters, and inline metadata. Always pill-shaped (`--radius-full`) like Button. Neutral by default: `--color-bg-page-primary` fill, `--color-bg-container-border` hairline, `--color-text-secondary` text in `--font-paragraph-sm-em-*` (14px/500). Icon size: 24px (large), 20px (default), 16px (compact) — below `large`, smaller than Button's because the chip is a tighter control.

Three sizes, matching the Button ladder one rung down: `compact` (24px tall), `default` (32px), and `large` (40px). `large` is the exception to "tighter than a Button" — it takes the default Button's `--padding-sm`/`--padding-lg` box, `--font-paragraph-em-*` (16px/500) text, and 24px icons, so a pill that is a primary tap target rather than metadata reads at the same weight as the body text around it. PromptSuggestions is its intended consumer.

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
- **Hover**: `--color-input-border-hover` (#2C9AB9 light / #118AB2 dark — mid teal, clearing 3:1 against each page)
- **Focus**: `--color-input-border-selected` (#0E6E8F light / #2C9AB9 dark — the active border, on the action colour's weight)
- **Error**: `--color-status-error-border` (#EF476F) on border and helper text
- **Disabled**: `--color-input-bg-disabled` fill, `--color-input-border-disabled`, `--color-input-text-disabled` on label/text

Icon slots (Material Symbols Rounded): left icon at 16px from edge, right icon at 16px from edge. Compact size: padding 6px × 12px, icon 20px.

Field-level error state is where the system's responsibility ends, by design: form-level validation — inline error summaries, field grouping, when to validate — is orchestration, and it belongs to the consumer's form layer, not to a component library. Every form control carries the same error anatomy (status border + helper text), which is exactly the surface a form library needs to drive.

### Checkbox

**`ds-checkbox`** — Custom checkbox with an inline SVG check (and minus for `indeterminate`) instead of font glyphs, for pixel-perfect centring. The box is `--radius-sm` with a `--border-md` border; checked state fills `--color-action-primary-bg` with `--color-action-primary-text-active` stroke, hover shifts to `--color-action-primary-bg-hover`. Sizes: `default`, `compact`. Disabled: `opacity: 0.4`, `cursor: not-allowed`. A `CheckboxGroup` wrapper renders a labelled list of checkboxes bound to a value array.

### RadioButton

**`ds-radio`** — Single-select control: a `--radius-full` circle with a `--border-md` ring and an inner dot that fills `--color-action-primary-bg` when checked; hover shifts the ring toward `--color-action-primary-border-tertiary`. Implemented as a `role="radio"` element with `aria-checked`, Space/Enter activation, and managed `tabIndex`; group radios by `name` (a `RadioGroup` wrapper exists alongside). Label uses `--font-paragraph-*`. Disabled: `opacity: 0.4`.

### ToggleSwitch

**`ds-toggle-switch`** — Binary on/off switch: a 42×24px `--radius-full` track filled with `--color-action-primary-bg` when on, holding a 20px `--color-control-thumb` circle that slides with a spring-curve transition and shows a check icon. Rendered as a `<button role="switch" aria-checked>`; the optional inline label uses `--font-paragraph-*`. Sizes: `default`, `compact`. Used for settings like the site's theme toggle. SelectionCard's `toggle` mode reuses this exact anatomy.

### Slider

**`ds-slider`** — Range input styled with a two-tone track: `--color-action-primary-bg` fill up to the current value, `--color-bg-container-secondary` beyond it, with a `--radius-full` thumb that gains a `--color-action-primary-bg-hover` focus ring. Native `<input type="range">` underneath, so keyboard and screen-reader behaviour come for free (`min`/`max`/`step` props). Sizes: `default`, `compact`. Disabled: `opacity: 0.4`.

### Swatch

**`ds-swatch`** — Clickable colour tile: a 24px `<button>` (20px `compact`) whose background is the `value` colour, passed through the `--ds-swatch-color` custom property so the stylesheet stays data-free. Shapes: `circle` (default, `--radius-full`) and `square` (`--radius-sm`). A hairline `--color-bg-container-border` inset keeps light colours visible on the white floor; `selected` draws the theme-aware ring (`--color-bg-page-primary` gap + `--color-text-primary` outline) and sets `aria-pressed`. Purely presentational — no `'use client'`, so it renders from Server Components. Disabled: `opacity: 0.4`.

### ColorPicker

**`ds-colorpicker`** — Colour picker composed in `Field`: a bordered trigger (`--radius-md`, input border tokens) holding a checkerboard-backed swatch and optional hex text (`showText`), opening a `--shadow-floating` panel with a saturation/brightness area (2D `role="slider"`: pointer, arrow keys, and Home/End on the saturation axis), a hue slider, an optional alpha slider (`showAlpha`, emits 8-digit hex below 100%), and a hex field. Works controlled (`value` + `onValueChange`, fires live while dragging) or uncontrolled (`defaultValue`); `name` renders a hidden input for native form submission. The white/black overlay gradients and hue spectrum are colour-space constants written as `hsl()` literals — the one sanctioned departure from hex-free component CSS, since no theme token can represent them. Sizes: `default`, `compact`. Disabled: `opacity: 0.4`.

### DateInput

**`ds-date-input`** — Form field wrapping the native date input with the standard input anatomy: label (`--font-paragraph-em-*`), `--radius-md` field on `--color-input-bg-primary` with `--color-input-border-primary`, hover/selected borders (`--color-input-border-hover` / `--color-input-border-selected`), calendar icon in `--color-icon-primary`, and helper/error text below (`--font-paragraph-sm-*`, error via `--color-status-error-border`). Supports `min`/`max`, `required`, `disabled` (input disabled tokens), and sizes `default`/`compact`. Value format is `YYYY-MM-DD`.

### DatePicker

**`ds-date-picker`** — Inline calendar: month header with `--radius-full` chevron nav buttons, `Su–Sa` day-header row, and a grid of day cells. The selected day fills `--color-action-primary-bg` with `--color-action-primary-text` at `--radius-full`; today is highlighted; out-of-range days (`min`/`max`) and the `disabled` state get the standard muted treatment. Container: `--radius-md` on `--color-input-bg-primary` with `--color-input-border-primary`. Sizes: `default`, `compact`. Emits `onDateSelect` with `YYYY-MM-DD`.

### TimePicker

**`ds-timepicker`** — Time-of-day form field, the clock sibling of Dropdown. The trigger is a real `<button>` styled with the input anatomy (label via Field, `--radius-md`, input border/bg tokens, helper/error text), led by a `schedule` icon at `--icon-size-sm` and closed by a rotating chevron. Open state reveals a `--radius-md` listbox on `--color-bg-page-primary` elevated with `--shadow-floating`, max-height 240px with scroll, which opens scrolled to the selected or first option. Options are generated from `minTime`/`maxTime`/`stepMinutes` (defaults 00:00, 23:30, 30) and rendered with `tabular-nums`; `hourFormat` switches the display between "2:30 PM" and "14:30" while the value stays a 24-hour `HH:MM` string (controlled `value` or uncontrolled `defaultValue`, `onValueChange`). The selected option is marked with `--color-action-primary-text-tertiary` and a check in `--color-action-primary-bg`; hover and keyboard focus use `--color-action-passive-bg-hover`. Listbox keyboard pattern (arrows, Home/End, Enter, Escape) with `aria-expanded`, `aria-activedescendant` and `aria-haspopup="listbox"` wiring. Sizes: `default`, `compact`.

### EventCalendar

**`ds-event-calendar`** — Month-at-a-glance schedule: a full month grid with event pills on their days, an overflow row once a day is full, and prev/next month navigation. DatePicker selects a date; this one shows a schedule. The container is `--color-bg-container-primary` at `--radius-md` with a hairline border and `--padding-md`; the header pairs the month name (`--font-title-body-*`) with two `--radius-full` passive nav buttons and an optional `actions` slot (a "New event" Button). Day cells are `--color-bg-container-secondary` at `--radius-sm` in a 7-column grid with `grid-auto-rows: 1fr`, so each week row shares the height of its fullest day instead of fixing a cell height; outside-month cells fade to the transparent container fill. Today's day number takes the inverse chip (`--color-bg-page-inverse` / `--color-text-on-inverse`) — the filled version of DatePicker's today ring, because a ring disappears at calendar density.

Event pills are `--color-bg-container-primary` chips at `--radius-xs`: an accent dot, a truncating `--font-paragraph-sm-em-*` title, and a `tabular-nums` time that hides under 768px so titles keep at least a few characters. The dot's colour routes through `--ds-event-accent` and resolves to the `--color-core-accent-*` roles (`coral`/`violet`/`cobalt`/`amber`/`gold`/`mint`; default neutral via `--color-status-neutral-border`) — never the action teal, which stays reserved for actions. Within a day, untimed events sort first, then by time text. Days past `maxEventsPerDay` (default 3) collapse into a "+N more" row. Pills, day numbers, and the overflow row render as buttons only when their callback (`onEventClick`, `onDateClick`) is provided — otherwise they are inert spans, so a read-only calendar contains no fake affordances. Months are `YYYY-MM` strings on the controlled/uncontrolled pair convention (`month`/`defaultMonth`/`onMonthChange`); like DatePicker, the grid is deliberately not `role="grid"` — a labelled group of buttons is honest where a claimed 2D keyboard model would be a lie.

### Dropdown

**`ds-dropdown`** — Select-style form field. Closed state matches Input anatomy (label, `--radius-md`, input border/bg tokens, helper/error text); open state reveals a `--radius-md` listbox on `--color-bg-page-primary` elevated with `--shadow-floating`, max-height 240px with scroll. Options support disabled entries and grouped sections (`groups`) with headings and separators. The selected option is marked with `--color-action-primary-text-tertiary`; hover uses `--color-action-passive-bg-hover`. Listbox keyboard pattern (arrows, Home/End, Escape, Enter) with `aria-expanded`/`aria-activedescendant` wiring. Sizes: `default`, `compact`. For action menus (not form values) use DropdownMenu.

### Combobox

**`ds-combobox`** — Filterable select: a text field that narrows a listbox as the user types. Control matches Input anatomy (label, `--radius-md`, input border/bg tokens, helper/error text) with a leading 24px `search` icon and a trailing chevron that rotates when open; the menu is a `--radius-md` surface on `--color-bg-page-primary` elevated with `--shadow-floating`, max-height 280px with scroll. Options carry an optional `description` second line (`--font-paragraph-sm-*` tertiary) and support disabled entries plus grouped sections. `multiple` renders selections as `--radius-full` chips in `--color-bg-container-primary` inside the control, each with a remove button; Backspace on an empty query pops the last chip. `clearable` adds a clear button, `loading` swaps the list for a status row, and `emptyMessage` covers the no-match case. Async callers pair `onSearchChange` with `manualFiltering` to filter upstream. Full combobox keyboard pattern (arrows, Enter, Escape, Tab) with `aria-expanded`/`aria-activedescendant` wiring. Sizes: `default`, `compact`. Use Dropdown when the option list is short and static; Combobox is for long, searchable, or server-backed lists.

### FileInput

**`ds-file-input`** — Click-or-drop upload zone plus a list of chosen files. The dropzone is a dashed `--border-xs` `--color-input-border-primary` rectangle at `--radius-md` with a centred 24px `upload_file` icon and instruction copy; hovering moves the border to `--color-input-border-hover`, and an active drag fills `--color-bg-container-primary` with the selected border. The real `<input type="file">` stays in the DOM (visually hidden) for form semantics, with the zone exposed as `role="button"` and Enter/Space activation. The file list is fully controlled — each row is a `--radius-md` hairline container with a `description` icon, name, human-readable size, an optional 4px `--color-action-primary-bg` progress track, and a 32px ghost remove button. Per-file `error` swaps the row to the error tokens with an `error` icon and message in `--color-status-error-text`. Sizes: `default`, `compact`.

### NumberInput

**`ds-numberinput`** — Numeric field composed in `Field`, with the native spinners hidden and replaced by decrement/increment stepper buttons (Material Symbols `remove` / `add` at `--icon-size-sm`) flanking a centred `<input type="number">`. The shell carries the input anatomy: `--radius-md` (12px), `--color-input-bg-primary` fill, `--color-input-border-primary` hairline, hover `--color-input-border-hover`, `:focus-within` `--color-input-border-selected`. Steppers clamp to `min`/`max` and disable at the bounds; a typed out-of-range value clamps into range on blur; stepping from an empty field starts at 0 and clamps into range. Works controlled (`value`, `number | ''`) or uncontrolled (`defaultValue`); `onValueChange` receives `number | null` (null when empty) and fires on typing alongside the native `onChange`, and alone on stepper clicks, where no native change event exists. Stepper hover uses `--color-action-passive-bg-hover`. Sizes: `default`, `compact`. Error: `--color-status-error-border` on the shell. Disabled: the input disabled token set on the shell, `cursor: not-allowed`, steppers at `opacity: 0.4`.

### TagInput

**`ds-taginput`** — Multi-value text input holding committed entries as removable tags. The shell (`ds-taginput__shell`) is a focus-within box matching Input anatomy: `--radius-md`, `--color-input-bg-primary` fill, `--color-input-border-primary` hairline, hover `--color-input-border-hover`, focus-within `--color-input-border-selected`, error `--color-status-error-border` on border and helper text. Tags are `--radius-full` pills in `--color-bg-container-secondary` with `--font-paragraph-sm-em-*` labels and a trailing remove button (Material Symbols `close` at `--icon-size-sm`, accessible name "Remove {tag}"). Enter or comma commits the trimmed draft as a tag (no duplicates, no empty entries); Backspace on an empty draft removes the last tag; `maxTags` stops new entries at the limit. Controlled via `values` plus `onValuesChange`, uncontrolled via `defaultValues`; the native `onChange` fires for draft edits. Composes Field for the label, helper and error wiring. Sizes: `default`, `compact` (draft text drops to `--font-paragraph-sm-*`). Disabled: `opacity: 0.4`, `cursor: not-allowed`, tags not removable. Use Combobox when the values come from a known option list; TagInput is for free-text entries.

### PinInput

**`ds-pininput`** — Segmented one-time-code input composed in `Field`: a row of one-character cells (`--gap-sm` between them) below the standard label, with helper/error text underneath. Each cell is a 44×52px `<input maxLength={1}>` at `--radius-md` on `--color-input-bg-primary` with a `--color-input-border-primary` hairline, centred `--font-paragraph-em-*` text, and the input hover/focus borders (`--color-input-border-hover` / `--color-input-border-selected`); keyboard focus adds the 2px `--color-action-primary-bg` ring. Typing fills a cell and advances focus, Backspace clears and retreats, arrows move, and paste distributes a full code from cell 0. `format` is `numeric` (default, rejects non-digits, `inputMode="numeric"`) or `alphanumeric`; `mask` renders password cells; `length` defaults to 6. `onValueChange` emits the joined code, `onComplete` fires once when every cell fills; the first cell carries `autoComplete="one-time-code"` for OTP autofill. The cells wrap in a `role="group"` labelled by Field's label, and every cell has an accessible name ("Digit 1 of 6"). Error: `--color-status-error-border` on cell borders. Disabled: cells at `opacity: 0.4`, `cursor: not-allowed`, input disabled tokens.

### Toast

**`ds-toast`** — Ephemeral notification via `ToastProvider` + `useToast()` hook. Rendered via React portal into `document.body`. Default duration: 5000ms. Pauses on hover/focus. Progress bar animates across bottom. Position: configurable (`top-right`, `bottom-right`, etc.), defaults to `bottom-right`. Max stack: 5 toasts. Five variants share the same `--color-status-*` token mapping as Badge/Alert.

Default icons (Material Symbols Rounded): `info`, `check_circle`, `warning`, `error`, `info` for each variant. Override via `icon` prop.

### NotificationCenter

**`ds-notification-center`** — The persistent inbox for everything that happened while the user was away: Toast interrupts, this accumulates. A `--color-bg-container-primary` panel at `--radius-md` with a hairline border, so it works dropped from a bell icon or inline on a page. Header: `--font-title-body-*` title with a tertiary "N unread" line beside it (a polite live region), and a mark-all-read text control on the right in `--color-action-primary-text-tertiary` (an action, so it may take the action colour) that only renders when `onMarkAllRead` is provided. Optional filter tabs sit under the header — `--radius-full` pills with `--font-paragraph-sm-em-*` labels and `tabular-nums` counts, active pill on `--color-bg-container-tertiary`, `role="tablist"` with arrow-key movement, each tab wired to the list below via `aria-controls` — and the list, a `role="tabpanel"` labelled by the active tab, scrolls beneath a `--color-divider` rule. Filtering is the consumer's job: swap the children when the tab changes. No children renders a built-in compact EmptyState (overridable via `emptyState`).

**`ds-notification-item`** — One row of the inbox, exported alongside: a leading `media` slot (Material Symbol name or an element such as an Avatar, `--icon-size-md`), a title row with right-aligned time (`--font-paragraph-sm-*` tertiary), supporting copy in `--color-text-secondary`, and an `actions` row for compact Buttons. `unread` emphasises the title to `--font-paragraph-sm-em-*` and adds a dot filled with `--color-status-info-border` — informational, so it takes the info status colour rather than the action teal — with visually hidden "Unread" text for screen readers. Rows separate with `--color-divider` hairlines; renders a semantic `<article>`.

### ProgressBar

**`ds-progress-bar`** — Determinate progress as a horizontal `--radius-full` track in `--color-bg-container-secondary` with a `--color-core-accent-mint` fill scaled to the clamped 0–100 value. Optional percentage label (`showLabel`) in `--font-paragraph-sm-em-*`. `role="progressbar"` with `aria-valuenow`/`-valuemin`/`-valuemax` and an `ariaLabel` describing what is loading. Sizes: `default`, `compact` (bar height).

### Skeleton

**`ds-skeleton`** — Loading placeholder with a pulsing fill stepping between `--color-bg-container-primary` and `--color-bg-container-secondary`. Three shapes: `text` (`--radius-sm` line, multi-line via `lines` — the last line renders at 75% width), `circular` (`--radius-full`), and `rectangular`. `width`/`height` accept any CSS length. Announced as `role="status"` with `aria-label="Loading"` and `aria-busy`.

### Spinner

**`ds-spinner`** — Indeterminate loading indicator: an SVG circle with a `--color-bg-container-secondary` track and a rotating arc in `--color-action-primary-bg` (`variant="primary"`) or `--color-text-secondary` (`variant="neutral"`); `variant="inherit"` draws both circles in `currentColor` (track at 0.25 opacity) so the spinner matches the surrounding control — it's what Button and CircularButton use for their `loading` state. Sizes `sm`/`md`/`lg` (16/24/36px). `role="status"` with a configurable `label`. Use Spinner for indeterminate waits and ProgressBar when the completion fraction is known.

### EmptyState

**`ds-empty-state`** — Placeholder for a list, table, search, or dashboard with nothing to show. Centred stack: a 48px `--radius-full` `--color-bg-container-primary` disc holding a 24px Material Symbol, a `--font-title-body-*` headline in `--color-text-primary`, supporting copy in `--font-paragraph-sm-*` tertiary capped at 420px, and an action slot that wraps consumer-provided Buttons. `variant="bordered"` adds a dashed `--color-bg-container-border` container at `--radius-md` — use it inside a card, table, or panel; `plain` sits directly on the page. `size="compact"` drops to a 36px icon disc, `--font-paragraph-em-*` headline, and `--padding-lg`, for dense sidebars. The `icon` prop takes a Material Symbol name or an arbitrary element for illustrations. Write the description as the next action, not just a statement of absence.

### Card

**`ds-card`** — Table-of-contents navigation tile. Two parts: `.ds-card__preview` (content/component preview area) + `.ds-card__title` (h3 label below). Used in component/foundations index grids. When `interactive`, gains `role="button"` and keyboard support. Background: `--color-bg-container-primary-semi`; radius: `--radius-xl` (24px). Interactive and case-study variants lift on hover with `0 8px 24px rgba(0,0,0,0.3)` — the system's one sanctioned container shadow (see Do's and Don'ts). The case-study variant's cover slot takes either an image (`coverSrc`) or drawn content (`cover` — an SVG, a chart, a live preview); both fill the same fixed-ratio box, so a grid keeps one cover shape whichever kind each card was given.

### EntityCard

**`ds-entity-card`** — Compact icon-or-image + label card. Used specifically on Icons and Logos pages in the Foundations section. Takes a Material Symbol name (`icon`) or image path (`imageSrc`). Centered layout with label beneath. Radius: `--radius-xl` (24px), matching Card. Not interactive — display-only.

### SelectionCard

**`ds-selection-card`** — Card-based form control for selecting from a list. Three modes: `radio` (single select), `checkbox` (multi-select), `toggle` (per-card on/off). Each card renders the option label, optional description, and an indicator (radio dot / checkbox / toggle switch). Full keyboard navigation and ARIA roles. Selected state: teal border and background. Use when options need more space or explanation than a standard radio/checkbox group.

**When to use which card:**
- `Card` → navigational tile in a documentation index grid
- `EntityCard` → icon or logo display in a foundations catalog
- `SelectionCard` → form input when options need card-style layout

### AppLayout / AppSidebar

**`ds-app-layout`** — Full-page shell: header + collapsible sidebar + main content area. **`ds-app-sidebar`** — The side navigation component. Used as the outer wrapper for every documentation page on the website. Sidebar background: `--color-bg-container-primary`. Expanded nav pills float off the rail edges (12px margin + 8px padding, so icon and label hold the same 20px inset as the category labels). An item or sub-item with an `href` renders as a real `<a>` (its `onClick` still fires, for client-side routing); accordion rows stay buttons. The active row carries `aria-current="page"`.

### ShaderField

**`ds-shader-field`** — A WebGL2 canvas summing soft Gaussian light sources into an ambient field of colour. Each source names a semantic colour token, read from the canvas's computed style at runtime, so the field re-themes with `data-theme` and with any scoped override — a consumer's palette reaches it for free. Colours are decoded to linear RGB and blended there, so midpoints keep their saturation; theme crossfade is `--motion-duration-slow`, and the reveal is `--motion-duration-slower` / `--motion-ease-entrance`, matching the page's own entrance.

The component owns the canvas and nothing else: `position: absolute; inset: 0` in whatever positioned ancestor the caller provides, `pointer-events: none` so a full-bleed layer never swallows a click. Placement, clipping and any mask belong to that ancestor — baking one in would make it unusable anywhere but a page background. **The default composition never samples `--color-action-primary-bg`**: a full-viewport decorative field is exactly the use that would dilute the action colour, so the last source takes `--color-core-ui-secondary`.

Eight parameters — `intensity`, `warp`, `scale`, `speed`, `grain`, `streak`, `react`, `crop` — pass as a partial merged over the defaults. `streak` stretches sources along a fixed diagonal, discs at 0 to light streams at 1. `grain` doubles as the dither that kills 8-bit banding, so it is never truly off. `react` is the cursor wake, shipping at 0 — built and dormant, not absent; raising it steps the loop from 30fps to 60fps only while a wake is alive. `crop` decides what a narrow container does to the composition: at 0 — the default, and what a CSS blob layer does — the whole field is fitted into it, so a phone shows every source shrunk to phone scale; at 1 the field holds the 1440px scale it was composed at and the viewport crops into it instead. Values between blend the two, keeping enough shrink that colours still bleed together on a small screen. Raise it for a full-viewport background (the site runs 0.5), leave it at 0 wherever seeing the whole composition is the point. A negative source `weight` absorbs light, cutting a shadow that occludes whatever shines behind it. `BLOB_COUNT` (8) sizes the shader's uniform arrays as a compile-time constant; passing fewer sources parks the unused slots off-field.

Two behaviours are the component's rather than the caller's, and both are why it can be dropped in. **It honours reduced motion in JavaScript** — the `tokens-motion.css` guard cannot see a `requestAnimationFrame` loop, so this draws one static frame and never starts the loop (see **Do's and Don'ts**). **And it always reports how it resolved**, via `onStatusChange` and a `data-status` attribute: `pending`, `active`, `unavailable`. No WebGL2, a blocked or lost context, a compile failure, a stalled first frame, and `enabled={false}` all land on `unavailable`, so one fallback covers every failure. `pending` is the state worth handling: paint neither, since swapping a fallback out a frame later reads as two backgrounds in sequence — a 1.5s watchdog bounds the wait so it can never be terminal. It renders no fallback of its own; what to paint instead is a design decision, not a rendering one. The canvas is `aria-hidden`.

### Nav

**`ds-nav`** — Top navigation bar: a 78px-tall, max-width 1440px flex row with a brand slot (icon + `--font-paragraph-em-*` text, `--gap-lg`) on the left and a horizontal ButtonGroup plus optional `trailing` content (e.g. the theme ToggleSwitch) on the right at `--gap-xl`. Purely compositional — active states come from the Button configs passed in.

### NavList

**`ds-nav-list`** — Vertical navigation link list for drawers and side menus, up to three levels deep. Every row is a real link rendered as a full-width, left-aligned **tertiary Button** (level 1 at the default size, deeper levels compact), so shape, padding, typography, and hover/pressed states have one home in the Button spec and stay identical to every other button. The current page gets `aria-current="page"` plus the tertiary active background (`--color-action-passive-bg-active`) — the same treatment the showcase sidebar uses. A collapsible item adds a separate 40px `--radius-full` chevron toggle (`expand_more` at `--icon-size-sm`, rotating 180° when open) wired with `aria-expanded`/`aria-controls` — tapping the label navigates, tapping the chevron expands. Every row reserves that same 40px height, so leaf rows and toggle rows sit on one vertical rhythm at the list's `--gap-xxs` spacing. Sublists indent one `--padding-xl` step (then `--gap-lg`), take the same `--gap-xxs` below their parent row, animate open via `grid-template-rows: 0fr → 1fr` at `--motion-duration-slow` / `--motion-ease-emphasized`, and are `inert` while collapsed so their links leave the tab order. Expansion is uncontrolled (`defaultExpandedIds`) or controlled (`expandedIds` + `onExpandedChange`), single-open by default; `collapsible: false` renders a permanent, always-visible group.

### AnchorNav

**`ds-anchor-nav`** — "On this page" list of anchor links for long pages. Optional header row (Material Symbol at `--icon-size-sm` + `--font-paragraph-em-*` title) above a list carried on a `--border-xs` `--color-divider` left rail. Links are `--font-paragraph-*` in `--color-text-tertiary` with `--padding-xs`/`--padding-md` padding; the active link turns `--color-text-primary` at em weight, paints a `--border-md` indicator in `--color-text-primary` over the rail, and carries `aria-current="location"`. Uncontrolled, a scroll listener marks the last section whose top passed the `offset` prop; pass `activeId` to control the highlight instead. Focus-visible ring in `--color-action-primary-bg`.

### Breadcrumb

**`ds-breadcrumb`** — Location trail as a `<nav aria-label="Breadcrumb">` ordered list. Items are links in `--font-paragraph-sm-*` `--color-text-secondary` separated by `chevron_right` Material Symbols at `--icon-size-sm` in `--color-text-tertiary` (the 20px step matches the 20px line-height of the labels either side, so the chevron centres on the trail); the current (last) item is plain text in `--color-text-primary` at the `-em` weight. `maxItems` collapses the middle of long trails to an ellipsis, always keeping the first and the trailing items. Link focus rings use `--color-action-primary-bg`.

### Tabs

**`ds-tabs`** — Tabbed interface with `TabsList`, `TabsTrigger`, and `TabsContent`. Active tab trigger: teal border-bottom or teal fill depending on variant. Use for grouping related content on a single page (e.g., component page showing Light/Dark/Mobile views).

### Accordion

**`ds-accordion`** — Collapsible content sections in a single `--radius-sm` bordered container (`--border-xs` on `--color-bg-container-border`, row dividers inside). Headers are `--font-paragraph-em-*` buttons with a rotating `expand_more` chevron and `--color-action-passive-bg-hover` on hover; panels hold arbitrary content at `--font-paragraph-*`. Single-open by default, `multiple` allows several; `defaultExpanded` seeds initial state. Headers carry `aria-expanded` and are wired to their panels.

### TreeView

**`ds-treeview`** — Collapsible hierarchy for files, folders, and nested structures, rendered as a WAI-ARIA tree (`role="tree"` on the root `<ul>`, `role="treeitem"` on each `<li>`, children in `role="group"`). Rows carry a `chevron_right` chevron that rotates a quarter turn on expand (`--motion-duration-fast` / `--motion-ease-standard`; leaves render a spacer in the chevron column so labels align), a Material Symbol at `--icon-size-sm` (`folder` default for branches, `draft` for leaves, per-node `icon` overrides), and a `--font-paragraph-sm-*` label that ellipsises rather than wraps. Indentation is a per-depth custom property: each row's `--ds-treeview-depth` steps `padding-left` by one `--gap-md`. Hover takes `--color-action-passive-bg-hover`; the selected row (`ds-treeview__row--selected`) takes `--color-action-passive-bg-active` with the label bumped to `--font-paragraph-sm-em-weight`; rows round at `--radius-sm`. The tree items themselves are focusable via a roving tabindex (one tab stop, never nested buttons): ArrowDown/ArrowUp walk the visible rows, ArrowRight expands or steps into children, ArrowLeft collapses or moves to the parent, Home/End jump to the ends, and Enter or Space selects (click on a branch row also toggles it). Expansion (`expandedIds`/`defaultExpandedIds`/`onExpandedChange`) and selection (`selectedId`/`defaultSelectedId`/`onSelect`) each follow the controlled/uncontrolled pair convention. Each treeitem is named by `aria-labelledby` pointing at its own label, so a branch never announces its whole subtree as its name; expanded state styling keys off `aria-expanded`, so visuals and semantics cannot desync.

### Carousel

**`ds-carousel`** — Sliding content viewport. Navigation arrows are 36px `--radius-full` bordered buttons on `--color-bg-page-primary` (no shadow — the arrows are not floating surfaces); dot indicators mark the active slide with `--color-action-primary-bg`. Supports `autoPlay` with configurable interval, `loop`, keyboard navigation (arrow keys), and an `onSlideChange` callback. Autoplay pauses on hover or keyboard focus and never starts under `prefers-reduced-motion` (a JS-side check; see Do's and Don'ts). The dots are a roving-tabindex `role="tablist"`: one tab stop, arrows move and select. Slides are the component's children.

### Table

**`ds-table`** — Data table with header row and body rows; presentational only (no sorting, selection, or row expansion). Header: `--font-title-body-*` (weight 600). Body: `--font-paragraph-*`. Row dividers: `--color-divider`. Background: `--color-bg-page-primary` or `--color-bg-container-primary` depending on context. `bordered` wraps the table in a `--color-bg-container-border` container with `--radius-md`.

### DataTable

**`ds-data-table`** — The wired version of Table: sorting, search, row selection, and client-side pagination assembled around the presentational pieces (Table `bordered`, Pagination `compact`, Checkbox, Input, EmptyState), so a working data view is one component rather than an afternoon of plumbing. Rows carry raw values keyed by column; a column's `render` turns them into cells (Badges, Buttons) while sorting and search keep reading the raw value underneath. Chrome only in this component's own CSS — rows and cells are entirely Table's.

Sortable headers render the label inside a button with a trailing sort glyph (`swap_vert` idle, `arrow_upward`/`arrow_downward` active, `--icon-size-sm`) that fades in on hover/focus and stays at full opacity while active; clicks cycle ascending → descending → unsorted, and the button's `aria-label` narrates the current state. Sorting compares numbers numerically and text with `localeCompare` (numeric-aware). The toolbar puts a consumer `toolbar` slot (filter Dropdowns) on the left and the built-in search Input (`compact`, `search` icon, capped at 240px) on the right; searching matches every column's raw value and resets to page 1. Selection adds a 40px checkbox column with an indeterminate select-all scoped to the visible page. The footer pairs a `tabular-nums` readout (`--font-paragraph-sm-*` tertiary; result count, or "N selected" once a selection exists, in an `aria-live` region) with compact Pagination. No matches renders the bordered EmptyState. Sort and selection follow the controlled/uncontrolled pair convention (`sort`/`defaultSort`/`onSortChange`, `selectedIds`/`defaultSelectedIds`/`onSelectionChange`) so server-driven tables stay possible.

### Dialog

**`ds-dialog`** — General-purpose modal for arbitrary content; for confirm/cancel prompts use AlertDialog. Panel: `--radius-md`, `--color-bg-page-primary`, hairline `--color-bg-container-border` border, `--shadow-modal`, over a `--color-scrim` backdrop; opens with the standard base-duration scale + fade (`--motion-duration-base` / `--motion-ease-standard`). Header: `--font-heading-3-*` title with optional `--font-paragraph-sm-*` tertiary description and a 32px ghost close button. Body slot scrolls (`overflow-y: auto`) when content exceeds the viewport-capped panel height; optional footer slot right-aligns consumer-provided Buttons. Sizes: `sm` 400px / `md` 560px (default) / `lg` 720px max-width. Behaviour: portal to `<body>`, focus trap with Tab cycling, focus restore on close, body scroll lock, `role="dialog" aria-modal="true"`; `dismissible={false}` disables ESC, backdrop click, and hides the close button.

### AlertDialog

**`ds-alert-dialog`** — Modal confirmation for important or destructive actions. A portal-rendered overlay: `--color-scrim` backdrop behind a `--radius-md` panel on `--color-bg-page-primary` with `--border-xs` border and `--shadow-modal`, title + description text, and a Cancel/Confirm Button pair. `variant="destructive"` styles the confirm action with the error tokens. Focus is trapped while open and restored on close; ESC dismisses; the panel wires `aria-labelledby`/`aria-describedby` to the generated title/description ids. SSR-safe (portal only mounts client-side). For general-purpose modal content use Dialog; AlertDialog is only for confirm/cancel decisions.

### Drawer

**`ds-drawer`** — Edge-anchored modal panel. Shares Dialog's modal contract (portal to `<body>`, focus trap with Tab cycling, focus restore on close, body scroll lock, `role="dialog" aria-modal="true"`, `dismissible={false}` to disable ESC/scrim/close) but slides in from a viewport edge instead of scaling from centre. `side` picks the edge (`left`/`right`/`top`/`bottom`); the panel rests off-screen via a `translate` transform and returns to zero when open, over a `--color-scrim` backdrop that cross-fades. Surface: `--color-bg-page-primary` with `--shadow-modal` and a hairline `--color-bg-container-border` on the edge facing the page. Header is a `--font-heading-3-*` title with optional `--font-paragraph-sm-*` tertiary description and a 32px ghost close button; the body scrolls independently so header and footer stay pinned; the footer right-aligns consumer Buttons. Sizes measure along the slide axis — `sm`/`md`/`lg` are 320/420/560px for side drawers and 30/50/75vh for top and bottom. Side drawers go full-width under 480px. Use Dialog for centred, self-contained prompts; Drawer for filter panels, detail views, and mobile navigation.

### CommandPalette

**`ds-command-palette`** — Modal Cmd+K launcher over a grouped command list. Panel is a 560px `--radius-md` surface on `--color-bg-page-primary` with `--shadow-modal`, pinned 10vh from the top over a `--color-scrim` backdrop, capped at 60vh. A search row (24px `search` icon, borderless input, 32px ghost close) sits above a scrolling list of `--radius-sm` command rows; each row takes an optional 20px icon, a `--font-paragraph-em-*` label, an optional tertiary description line, and a `shortcut` array rendered as compact Kbd keycaps (see Kbd). Group headings use `--font-paragraph-sm-*` tertiary; the active row takes `--color-action-passive-bg-hover`. Filtering matches label, description, and `keywords`; disabled commands stay visible but are skipped by the highlight. Keyboard: arrows wrap through the flattened list, Home/End jump to the ends, Enter runs, Escape closes, and `hotkey` binds Cmd/Ctrl+K globally (set false when the host app owns the shortcut). Shares Dialog's modal contract: focus trap with Tab cycling, focus restore on close, Escape working dialog-wide. A footer hint row documents those keys and hides under 480px. Closed state uses `visibility: hidden` so the input never enters the tab order.

### Popover

**`ds-popover`** — Anchored contextual overlay. Wraps a trigger and positions a `--radius-sm` panel (min-width 200px, `--padding-md`, `--color-bg-page-primary` like the other floating menus and panels — Dropdown, DropdownMenu, ContextMenu, CommandPalette, ModelPicker — `--border-xs` border, `--shadow-floating`) on the chosen side (`top`/`bottom`/`left`/`right`). Trigger mode is `click` (outside-click and ESC dismiss) or `hover`; open state can be controlled via `open`/`onOpenChange`. Content is arbitrary ReactNode — unlike Tooltip, which is text-only. Sizes: `default`, `compact`.

### DropdownMenu

**`ds-dropdown-menu`** — Action menu opened from a trigger element (contrast with Dropdown, which is a form select). The panel is `--radius-md` on `--color-bg-page-primary` with a `--border-xs` `--color-input-border-primary` hairline and `--shadow-floating`, `--padding-xxs` inset, aligned `start` or `end`. Entries are a typed tree: items (label, optional Material Symbol icon, keyboard `shortcut` hint, `disabled`, `destructive` — red via the error/coral tokens), `separator`s, labelled `group`s, and nested sub-menus via `children`. Full keyboard navigation across the flattened item list; hover uses `--color-action-passive-bg-hover`. Sizes: `default`, `compact`.

### ContextMenu

**`ds-context-menu`** — Right-click (and keyboard ContextMenu / Shift+F10) menu anchored at the pointer position. Wraps its `children` as the right-clickable area; the panel is `position: fixed` at the event coordinates, clamped inside the viewport, and closes on outside click, scroll, resize, Escape, or item activation. Entries reuse DropdownMenu's typed tree (`DropdownMenuEntry`: items with icon/`shortcut`/`disabled`/`destructive`, `separator`s, labelled `group`s, one level of `children` sub-menus) and the exact same panel recipe — `--radius-md` on `--color-bg-page-primary`, `--border-xs` `--color-input-border-primary` hairline, `--shadow-floating`, `--padding-xxs` inset, `--motion-duration-fast` appear. Keyboard: the panel takes focus on open (returning it on close) and tracks the highlighted item with `aria-activedescendant`; arrows move, Home/End jump to the ends, Enter activates, Escape closes. Sizes: `default`, `compact`. Use DropdownMenu when the menu opens from a visible trigger; ContextMenu when it opens on the content itself.

### Tooltip

**`ds-tooltip`** — Text-only contextual label on hover or focus. The bubble is the system's inverse surface: `--color-bg-container-inverse` with `--color-text-on-inverse` at `--radius-xs`, `--font-paragraph-sm-*`, with a rotated-square arrow in the same fill. Four positions (`top`/`bottom`/`left`/`right`) with a 4px slide-in transition; `showDelay`/`hideDelay` control timing (300/150ms default). Escape dismisses a visible tooltip from anywhere on the page (WCAG 1.4.13). The panel has `role="tooltip"` and an id; Tooltip clones its child element with `aria-describedby` pointing at that id — host elements get it automatically, and Button/CircularButton accept the attribute natively. Content is a string; anything richer belongs in Popover.

### Divider

**`ds-divider`** — Thin rule separating stacked content: `--border-xs` (1px) in `--color-divider`. Plain horizontal renders a semantic `<hr>`; a `label` variant sets text inline in the line (`--font-paragraph-sm-*` in `--color-text-secondary`, `center` or `start` position, `role="separator"`); `vertical` stretches to container height inside flex rows (`aria-orientation="vertical"`). Spacing prop maps to the gap scale: `none`/`sm` (8px)/`md` (16px, default)/`lg` (20px) — block margin when horizontal, inline when vertical. Not for separating page sections under `h2` headings — the `h2` bottom border already does that (see Section Dividers above); Divider is for forms, lists, toolbars, and card interiors.

### Pagination

**`ds-pagination`** — Page navigation for long datasets; pairs with Table. A `<nav>` of pill page buttons (40px, `--radius-full`) with chevron arrows at each end; first and last pages always visible, ellipses cover the gaps (`siblingCount` controls the window, default 1). Current page takes the SegmentedControl active treatment: `--color-action-primary-bg` fill with `--color-action-primary-text`, `aria-current="page"`. Idle buttons: `--font-paragraph-em-*` in `--color-text-secondary`, hover `--color-action-passive-bg-hover`. Arrows disable at the ends (`opacity: 0.4`, `cursor: not-allowed`). `size="compact"` swaps the numbers for a "Page X of Y" readout (`--font-paragraph-sm-*`) between 32px arrows.

### Stepper

**`ds-stepper`** — Step-by-step progress indicator for wizards and multi-stage flows. An `<ol>` of steps with CSS-drawn connectors; the active item carries `aria-current="step"`. Indicators are 32px `--radius-full` circles: complete shows a `check` Material Symbol at `--icon-size-sm` in `--color-action-primary-text-tertiary` inside a `--color-action-primary-border-secondary` outline, active takes the `--color-action-primary-bg` fill with `--color-action-primary-text`, upcoming shows its number in `--color-text-tertiary` on a `--color-bg-container-border` outline. Labels use `--font-paragraph-sm-em-*` (active `--color-text-primary`, complete `--color-text-secondary`, upcoming `--color-text-tertiary`); optional descriptions are `--font-paragraph-sm-*` in `--color-text-tertiary`. Connectors are `--border-md` lines in `--color-divider`, turning `--color-action-primary-border-secondary` behind completed steps. With `onStepClick`, completed and active steps become buttons (indicator hover `--color-action-passive-bg-hover`, focus ring `--color-action-primary-bg`); upcoming steps stay non-interactive. `orientation="vertical"` stacks the list with connectors dropping below each indicator. Colour changes transition with `--motion-duration-base` and `--motion-ease-standard`.

### Stat

**`ds-stat`** — A single headline metric: display-weight numeral over a quiet label, with an optional trend delta. Value uses `--font-sub-display-*` (30px/300) by default, `--font-display-2-*` (64px/300) at `large` — the weight-contrast rule applied to numerals. Label: `--font-paragraph-sm-*` in `--color-text-tertiary`. Delta: `--font-paragraph-sm-em-*` with a 16px Material arrow; colours by trend — `up` → `--color-core-accent-mint`, `down` → `--color-core-accent-coral` (the vivid accents, stable across themes — the muted status text tokens read too subtle at this size), `neutral` → `--color-text-tertiary`. Compose several in a flex row for a case-study metrics band.

### CodeBlock

**`ds-code-block`** — Monospace code in a `--color-bg-container-primary` container with `--radius-md` and a hairline border. The original sanctioned monospace context in the system, set in `--font-family-code` (Nunito Sans everywhere outside code contexts). Optional header row: filename (mono, `--color-text-secondary`), uppercase language tag (`--color-text-tertiary`, 0.08em tracking), and a copy button that confirms with a check for 2s. Code text is 14px/20px, `--color-text-primary`; long lines scroll horizontally. An optional `maxHeight` prop caps the block: the code area scrolls vertically inside while the header stays pinned. An optional `collapsible` prop adds a chevron beside the filename (`--color-icon-primary`, 20px, rotates −90° when closed) that collapses the code area with the same 0fr/1fr grid animation as Accordion; `defaultCollapsed` starts it closed. No syntax highlighting — monochrome by design, no dependencies.

### CodeDiff

**`ds-codediff`** — Unified diff view for code changes, in the same shell as CodeBlock (a `--color-bg-container-primary` container with `--radius-md` and a hairline border, code set in `--font-family-code` at 14px/20px). The exported `parseUnifiedDiff` turns the diff string into typed lines: `+` additions, `-` removals, `@@` hunk headers, everything else context. File header lines (`+++`, `---`) and `\ No newline` markers are skipped, and a diff with no hunk headers is treated as one hunk numbered from line 1. Added rows tint `--color-status-positive-bg` and removed rows `--color-status-error-bg`, with the `+`/`-` marker in the matching status text colour; hunk rows sit on `--color-bg-container-secondary` in `--color-text-tertiary`. Two gutters track old and new line numbers (`--color-text-tertiary`, excluded from text selection so a copied diff carries only code); `showLineNumbers` toggles them, and an optional `filename` header adds a "+N -N" summary in the positive and error text tokens. The marker and gutter columns are `aria-hidden` and the change type is announced through visually hidden text; long lines scroll horizontally inside a keyboard-reachable labelled region. Purely presentational, no `'use client'`, no syntax highlighting.

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

**`ds-section-title`** — The standard section heading used across the docs site: an `<h2>` in `--font-heading-2-*` `--color-text-secondary` with an optional `trailing` slot (count, badge, metadata) in `--font-paragraph-*` `--color-text-tertiary`, closed by a `--color-divider` bottom border with `--padding-xl` breathing room. This is the h2-carries-the-divider rule from the typography spec, packaged as a component. `divider={false}` (`ds-section-title--no-divider`) drops the border and reduces the clearance to `--padding-md`, for headings above content that draws its own lines (bordered tables, calendars) — where a second rule would double up, the section separates by whitespace alone.

### Instructions

**`ds-instructions`** — Step-by-step guidance list. Each step has a `--radius-full` indicator badge — the step number, or a Material Symbol when `icon` is set — connected by hairline lines (`--color-bg-container-border`), with a `--font-paragraph-em-*` label and optional `--font-paragraph-*` description. Renders as an `<ol>`; directions `vertical` (default) and `horizontal`; sizes `default`/`compact`.

### Timeline

**`ds-timeline`** — Ordered sequence (`<ol>`) with connected markers; `vertical` (default) for histories and process narratives, `horizontal` for compact steppers. Markers: 12px dot in `--color-bg-container-tertiary`; `numbered` upgrades to a 28px badge (`--color-bg-container-primary` fill, hairline border); a per-item `icon` renders as a bare 24px Material Symbol (no circle) centred in the same 28px box. Connector: `--border-md` line in `--color-divider`, hidden after the last item; it stands off below/after bare icon markers instead of passing behind them. Item anatomy: meta (`--font-paragraph-sm-*` tertiary) over title (`--font-heading-3-*`, 22px/600) over description (`--font-paragraph-*` primary, offset `--gap-sm` below the title).

**`ds-timeline--company`** — a résumé/pipeline variant (`variant="company"`, always vertical). The marker is a 32px logo image (`ds-timeline__marker--logo`, bare transparent box) instead of a dot/icon, and each entry carries a company/tool name (`ds-timeline__company-name`, `--font-title-body-*`, 16px/600) beside it. Under the name sits one or more roles (`ds-timeline__role`): a header row (`ds-timeline__role-header`) with the role title (`--font-heading-3-*`) on the left and a right-aligned, optional date (`ds-timeline__role-dates`, `--font-paragraph-*` tertiary) — a current role sets `present` to render a green "Present" (`ds-timeline__present`, `--color-status-positive-text`) in place of the end date. An optional `subtitle` (`ds-timeline__role-subtitle`, `--font-paragraph-*` secondary) sits on its own line under that row for the team, org, or product the role sat in — keeping the title a job title rather than a title and a team punctuated together. Because the title and subtitle read as one header block, whatever follows a subtitle takes a `--gap-sm` top margin on top of the role's own `--gap-sm` rhythm, so the body separates from the header at twice the internal spacing. Roles may add an optional description (`--font-paragraph-*` secondary) and a disc bullet list (`ds-timeline__role-bullets`, links in `--color-action-primary-bg`). The connector is **segmented per entry** — centred under the 32px logo, starting 8px below it and running down to 8px above the next entry's logo, so every logo sits in an even break rather than having the line pass behind it. The last entry's bar thins to `--border-xs` and fades to `--color-bg-container-primary-transparent` at its end — the site's fading-hairline treatment, marking where the timeline runs out.

### AreaChart / BarChart / LineChart / PieChart / RadarChart / RadialChart / ScatterChart / StackedBarChart / Treemap

The Recharts wrapper set, sharing one implementation folder (`Chart/`), one CSS file, and one visual language. Series colours come from the ordered `--color-chart-series-1` → `-7` ramp, read at render by the shared palette helper (`Chart/palette.ts`) so every multi-series chart assigns the same colour to the same slot. Series 1 aliases the action teal (`--color-action-primary-bg`) — the sanctioned data-viz exception to the action-only rule, theme-split with it — and series 2–7 alias the core accents (mint, gold, coral, violet, amber, cobalt), so re-theming an accent re-themes every chart using its slot. Tooltips and legends use system typography tokens. Axes text in `--color-text-tertiary`.

### Contribution graph

**`ds-contribution-graph`** — GitHub-style activity heatmap: weeks as columns, weekdays as rows, one 12px cell per day at `--radius-xxs`. Cell colour comes from the five-step contribution ramp, defined in both themes:

- `--color-chart-contribution-0` — no activity (`--color-bg-container-primary` light / #232323 dark)
- `--color-chart-contribution-1` → `-4` — increasing activity, green primitives (light: green-02 → 04 → 07 → 09; dark: green-10 → 09 → 08 → 07, so the brightest cell is mint #06D6A0)

Month labels, caption, and Less→More legend use `--font-paragraph-sm-*` in `--color-text-tertiary`/`--color-text-secondary`. The grid scrolls horizontally inside its own container on narrow screens. This ramp is for activity intensity only — ordered multi-series colours come from the `--color-chart-series` ramp (see the chart set spec above).

### Sparkline

**`ds-sparkline`** — An inline trend line for stats and table cells, drawn without axes or chrome. Dependency-free SVG computed from props, not a recharts wrapper: no `'use client'`, no hooks, so it renders from a Server Component and works without the optional recharts peer, which is why it keeps its own folder rather than joining `Chart/`. The series normalises into a padded viewBox (default 120x32; `width`/`height` set both the viewBox and the default rendered size, and the SVG scales to its container when sized via CSS). Colour flows through `color`: line, area fill, and end dot all draw with `currentColor`, set per tone. `accent` (default) uses `--color-action-primary-bg` (the chart palette's sanctioned lead colour), `positive` uses `--color-status-positive-text`, `negative` uses `--color-status-error-text`, `neutral` uses `--color-text-secondary`. `variant="area"` (`ds-sparkline--area`) repeats the tone colour under the line at 0.15 opacity. `showDot` (default true) marks the final point with a circle sized off `strokeWidth` (default 2, an SVG geometry attribute rather than a token); internal viewBox padding keeps stroke and dot from clipping at the edges. Degenerate data never produces a NaN path: an all-equal series renders a horizontal midline, a single point renders just the dot, an empty array renders nothing. Decorative by default (`aria-hidden`); passing `label` switches to `role="img"` with `aria-label`.

### AgentPlan

**`ds-agent-plan`** — The steps an agent intends to take and where it has got to. It completes the agent vocabulary: AgentStatus says what is happening right now, ToolCall records one action, AgentPlan holds the whole task. Same container recipe as ToolCall — `--color-bg-container-primary` at `--radius-md` with a hairline `--color-bg-container-border` — and the same `0fr → 1fr` grid collapse for the panel, opened by default. The header button carries a computed title ("3 steps left", or "All steps complete"; `title` overrides), a `tabular-nums` completed/total readout in `--color-text-tertiary`, and the rotating `expand_more` chevron.

Steps render as an `<ol>` with one row per step: a `--icon-size-sm` indicator, the label, and an optional `detail` line in `--color-text-tertiary`. Four statuses — `pending` (`circle`, `--color-icon-secondary`), `active` (Spinner at `variant="inherit"` in `--color-status-info-text`, label bumped to `--font-paragraph-sm-em-*`, `aria-current="step"`), `completed` (`check_circle` in `--color-status-positive-text`, label receding to `--color-text-tertiary`), `failed` (`error` in `--color-status-error-text`, label matching). The container stays neutral like ToolCall — colour lives in the indicators, and a thin `--color-divider` connector ties them into one path through the task. Status is colour + glyph for sighted users; a visually hidden span announces it per step.

### AgentStatus

**`ds-agent-status`** — What an agent is doing right now: a dot-matrix indicator beside a line of status text. The matrix is a 4×3 grid of 12 `--radius-full` dots sized off the icon scale (`--icon-size-md` wide at the default size, `--icon-size-sm` at `compact`) with `--gap-xxs` between them, so the dots derive their size from the grid rather than carrying pixel values of their own. The label is set in `--font-title-body-*` — a status is a heading for the work underneath it, not prose. `compact` keeps the `--font-paragraph-sm-*` metrics (the scale has no 14px title face) but carries the same `--font-title-body-weight`, so one size of the component can't read as a heading and the other as prose; the size still pairs with ChatMessage's default and compact message text (`sm`/`md` remain as legacy aliases). The default size costs nothing in layout: the title-body and paragraph sets share 16px/24px metrics, so only weight and tracking change.

The named patterns — `AgentStatusPatterns.tsx` is their authoritative list (`braille`, `orbit`, `breathe`, `snake`, and the rest) — are choreography over that one grid. Every pattern runs on the same twelve-slot cycle (`--motion-duration-loop-matrix`, 1400ms): each dot is told which slot it lights in via `--ds-agent-step`, and dots a pattern never lights opt out of the animation. One grid and one cycle length means changing pattern never changes the indicator's footprint or its rhythm.

Six states: `idle`, `thinking`, `working`, `waiting`, `done`, `error`. The three working states are deliberately monochrome (`--color-text-secondary`, `--color-text-tertiary` when idle) — colour is reserved for the states where it carries meaning, taking `--color-status-warning-text`, `--color-status-positive-text` and `--color-status-error-text` respectively. The terminal states fill the matrix solid so the shape itself reads as finished. While active, a sweep walks the label left to right (`--motion-duration-loop-shimmer` over a `background-clip: text` gradient from `--ds-agent-shimmer-base`, default `--color-text-tertiary`, through `--ds-agent-shimmer-sweep`, default `--color-text-primary`; `waiting` keeps its warning base and sweeps `--color-text-primary`); `shimmer` overrides the default. The base is the dimmer colour and the sweep the brighter one, so what travels is a highlight rather than a shadow — the reading `waiting` always had, now the rule. The band is narrow, 12% of a 250%-wide image and so under a third of the label at a time: spread wide it washes the whole label at once and stops registering as movement at all. When the `label` string changes, the outgoing text fades up and out while the incoming fades up and in over `--motion-duration-slow` — a status that narrates progress glides between steps rather than snapping. The shimmer's text clip stands down for the swap (an animated descendant composites on its own layer, which escapes `background-clip: text`) and resumes on the settled text; `children` are consumer-owned markup and render without the transition. Every colour on the component routes through custom properties — `--ds-agent-color` for the dots, `--ds-agent-label-color` for the text, plus the shimmer pair — so a consumer can tint a row (e.g. one `--color-core-accent-*` per agent when several share a surface; the showcase page demos one variation per core accent).

`variant="bar"` wraps the row in a full-width `--color-bg-container-secondary` container at `--radius-md` for the top of a panel. The root is a `role="status"` live region, and the matrix is `aria-hidden`, so the state change is announced once as text rather than as twelve dots. Under `prefers-reduced-motion` the matrix parks at a legible static opacity and the shimmer resolves to flat text — the global guard would otherwise collapse every dot to its dark final frame.

### AiButton

**`ds-ai-button`** — The AI entry point: icon and label on a transparent field, ringed by the AI gradient and backed by a soft glow of the same gradient. The ring is the system's signal for "a model answers here": ordinary actions keep the flat `--color-action-primary-bg` teal, and this treatment is reserved for AI surfaces so neither affordance dilutes the other. It is a pill (`--radius-full`, the button invariant) on Button's control scale — same padding tokens, same `--font-paragraph-em-*` face, `default` and `compact` sizes, icon on `--icon-size-md`/`sm`.

The three stops are the AI Gradient tokens (see **AI Gradient** in the Colors chapter for the role and its per-theme values). The ring paints a conic gradient of the three stops (start → mid → end → back to start, so the seam at 360° is invisible) across a `::before`, masked to a `--border-xs` band with an exclude-composited two-fill mask. Rotation animates a registered `@property` angle over a deliberately off-scale 7s (sanctioned in place with `ds-allow(motion)`: ambient signature motion, far slower than the interaction tokens); browsers without `@property` get a static ring. The glow is a `::after` of the same gradient blurred (a component-local `--ds-ai-button-glow` length, chosen by eye) at 0.3 opacity, rising to 0.55 on hover — a colour effect, not an elevation shadow, so depth stays token-owned. Focus is the standard `--color-action-primary-bg` ring; disabled drops to 0.4 opacity and pauses the rotation; `prefers-reduced-motion` stops the turning and keeps the ring and glow. Renders `<button>` or, with `href`, `<a>`.

### ChatHeader

**`ds-chat-header`** — The top row of a chat surface: the conversation's name on the left, its controls on the right. A space-between flex row padded `--padding-xs` `--padding-md` at `--gap-md`, deliberately drawing no bottom border — like Composer at the other end, it floats free of the transcript, and the thread's own top padding provides the separation. A string `title` renders in the `--font-title-body-*` set in `--color-text-primary`, truncating with an ellipsis so a long conversation name never wraps the row; a node `title` renders as-is for consumers who need their own heading element. The `title` prop deliberately shadows the native tooltip attribute — a header's title is content.

`actions` is a trailing flex row at `--gap-xs` that only lays controls out: the intended fillings are tertiary CircularButtons (new chat, close) and a view-switch toggle, each owning its own behaviour and accessible name. The component is purely presentational — no `'use client'` — so it renders from a Server Component.

### ChatMarker

**`ds-chat-marker`** — The inline separator a conversation uses for anything that is not a turn: date breaks, joins, mode changes, system notes. A `--font-paragraph-sm-*` label in `--color-text-tertiary` sits between two flanking `--border-xs` lines in `--color-divider` (`--gap-sm-md` off the text), so the row reads as furniture rather than as a message. An optional leading Material Symbol renders at `--icon-size-sm` and is `aria-hidden` — the label carries the meaning. `line={false}` keeps the flanking segments as transparent spacers, so a bare note stays centred on the same geometry.

The root is `role="separator"` with the label as its content: screen readers treat it as a boundary, not a message, matching how the eye skips it while scanning turns. System *events* belong here; system *messages* with content are ChatMessage's job.

### ChatMessage

**`ds-chat-message`** — A single chat turn: avatar, author, timestamp, and the content itself, aligned by role. User turns are right-aligned bubbles; assistant turns are surface-less full-width text in `--color-text-primary`, so a transcript keeps its question-and-answer rhythm without every row wearing a surface. The `bubble` prop overrides the role default in either direction: an assistant turn can take a received bubble for classic messenger layouts, a user turn can go plain. Bubble surfaces come *only* from the four chat tokens — sent bubbles pair `--color-chat-bubble-sent-bg` with `--color-chat-bubble-sent-text`, received bubbles the matching received pair — never the container ramp directly, so re-theming a chat means repointing those four tokens and nothing else. The action colour never appears as a bubble fill: a teal bubble would spend the "click here" signal on something that is not clickable.

Bubbles sit at `--radius-xl` with `--padding-sm-md` `--padding-lg` padding and cap at `--ds-chat-message-max-width` (default 75%), a consumer-override hook; `tail` squares the speaker-side bottom corner to `--radius-xs` — bottom-right on sent, bottom-left on received — a corner treatment only, with no pseudo-element pointer. Content sits on the `--font-paragraph-*` set; `size="compact"` drops it to `--font-paragraph-sm-*` and tightens bubble padding. Content is width-locked to its container — `min-width: 0`, `max-width: 100%` and `overflow-wrap: anywhere` on the content block, so an unbroken run (a URL, a token) wraps inside the bubble or column instead of pushing the surface wider. The meta row is the author in `--font-paragraph-sm-em-*` `--color-text-secondary` beside a free-text tabular-nums timestamp in `--color-text-tertiary`. The avatar gutter is a fixed `--ds-chat-message-gutter` (default `--icon-size-lg`, matching Avatar's small size): `showAvatar={false}` and `grouped` hide the avatar but keep the gutter, so consecutive rows in a run stay aligned; `grouped` also drops the meta row and pulls the row up towards the one above.

`pending` replaces the content with three `--color-text-tertiary` dots pulsing in a staggered wave on `--motion-duration-loop-matrix`, wrapped in `role="status"` with a visually hidden `pendingLabel` and the dots `aria-hidden`; under `prefers-reduced-motion` the dots park at a legible static opacity rather than freezing at the loop's dim frame. `actions` renders under the content, revealed on hover and `:focus-within` over `--motion-duration-fast` — and always visible where hover does not exist (`hover: none`), so touch users are never locked out; `showActions` pins the row on permanently, for surfaces where the actions are part of the response (the site chat's copy and thumbs row) rather than an affordance to discover. `footer` is an always-visible slot for sources or an edited note. The package ships no markdown renderer: render markdown yourself, ideally wrapped in Prose, and pass the result as children.

### ChatThread

**`ds-chat-thread`** — The scrollable conversation column, and the home of the chat surface's most important interaction: the send choreography. The root is the scroll container; turns stack inside an inner `__content` wrapper (flex column at `--gap-xl`, padded `--padding-lg` with the inline gutters routed through `--ds-chat-thread-padding-inline` as a consumer-override hook for mobile densities), and every entry is `flex-shrink: 0` so children that clip their own overflow never collapse. A second hook, `--ds-chat-thread-content-max-width`, caps the conversation column and centres it — for wide surfaces where the container grows but the column should not — while the scroll container, its fades, and the scrollbar keep spanning the full component width. Both ends fade through a pure-CSS `mask-image` gradient with `--gap-lg` stops — the PromptSuggestions treatment turned vertical — so content scrolling out passes through the fade with no scroll listeners involved (the mask alpha keywords carry a `ds-allow(color)` sanction).

On append, a newly added turn *floats to the top*: the component sizes a trailing spacer so the first new child can sit exactly at the top of the viewport — even when the newest exchange is short — then scrolls to it, pushing the prior conversation upward. The glide comes from `scroll-behavior: smooth`, which the reduced-motion guard in the motion tokens forces back to instant; because content streaming in *below* the viewport never moves the scroll position, the anchored turn stays put while a response grows beneath it. When a user turn and the agent's pending turn are appended in one update, the user turn is the anchor. The first send into an empty thread has no scroll distance yet, so it gets the same feel from a transform instead: the new turn starts at composer level and floats up to the anchor position over `--motion-duration-slower` `--motion-ease-entrance` (a thread that mounts with a restored transcript instead opens instantly at the latest message, re-establishing the anchor). The spacer holds exactly the shortfall between the anchor and what the content can already reach, tracked in both directions for the whole exchange, so the scroll range ends precisely at the anchor and never past it. That is what keeps the dead space honest: reserved room a growing answer has since filled is given back as it goes, so the space is gone by the time the answer lands rather than collapsing after it — no jump, because the range it defines never moves. Growing it back is the direction that needs the clamp guard: content shrinking mid-exchange pulls the range under the anchor a frame before a ResizeObserver can react, so the position is restored alongside the range. A shrinking child count reads as a conversation reset: the spacer collapses and the thread returns to the top. `anchor={false}` opts out entirely.

The scrollbar is deliberately subtle: `scrollbar-width: thin` with `scrollbar-color` held transparent until a scroll event lands, then `--color-divider` over a transparent track while scrolling continues, fading back out after a settle delay (a JS timing — part of the known tokenization gap); `scrollbar-gutter: stable` reserves the gutter so a scrollbar popping in never reflows content sideways, and the component publishes the measured gutter width as `--ds-chat-thread-gutter`, which the content's right padding subtracts (clamped at zero) — so on classic-scrollbar platforms the column stays perfectly symmetric and flush with its surroundings, with the scrollbar tucked outside it at the far edge. Because the inline gutters live on the inner wrapper, the scrollbar rides the component's far edge rather than sitting inside the content column. The root is a `role="region"` named by `ariaLabel` (default "Conversation") with `tabIndex={0}`, so the scrollable area is keyboard-reachable and takes the house focus ring inset.

A scroll-to-bottom control appears whenever there is anything left to scroll to: a `--radius-full` circle matching Composer's send button — the same 40px footprint (`--icon-size-md` glyph plus the `--padding-xs` ring), pointing the other way — on the action-passive ramp painted over a `--color-bg-container-primary` surface with a `--border-xs` `--color-bg-container-border` edge and `--shadow-floating`, centred in a sticky zero-height slot pinned just above the bottom fade, floating over the transcript right on top of the composer. Clicking it glides to the bottom through the same CSS `scroll-behavior` the anchoring uses, and once nothing is left to scroll to it fades out and leaves the accessibility tree (`aria-hidden` plus `tabIndex={-1}`); `jumpLabel` names it for screen readers. The content column's bottom padding is `--padding-xl`, so the end of a long response rests 40px clear of the composer.

### Composer

**`ds-composer`** — The chat input shell: an attachments row, an auto-growing textarea, a leading actions slot, and a trailing send button. The shell is the control — a `--color-input-bg-primary` surface behind a `--border-xs` `--color-input-border-primary` border, floating on `--shadow-floating`. It stacks two zones with different densities: a text zone padded `--padding-md` `--padding-lg` `--padding-sm` (roomy above and beside the words, tighter toward the bar), and an action bar padded a uniform `--padding-sm` holding the leading `actions` slot, the `trailingActions` slot, and the send button. Bar icon actions take *tertiary* CircularButtons at the default size — borderless ghosts that only show a fill on hover — so every control in the bar shares the send button's exact 40px footprint and `--icon-size-md` glyph, and the send button stays the only drawn circle. The radius is the one deliberate departure from the inputs-are-`--radius-md` rule: the corner is `--radius-composer` (29px) — half the default 40px CircularButton, plus the bar's padding-sm ring, plus the border width, resolved into its own semantic token — so the corner arc and the send circle share one centre on both curve surfaces, and a consumer re-theming the radius scale reaches this corner too. The textarea inside is borderless and outline-free so the shell carries the whole interaction ramp: `--color-input-border-hover` on hover, `--color-input-border-selected` on `:focus-within`, transitioning over `--motion-duration-fast` `--motion-ease-standard`. The shell is also the click target: clicking anywhere on it that is not a control focuses the textarea, with a `cursor: text` affordance everywhere except the action bar, which keeps the default cursor. Text sits on the full `--font-paragraph-*` set in `--color-input-text-primary` with `--color-input-text-placeholder` placeholders. The send button is a composed primary CircularButton (`arrow_upward`) — the *one* sanctioned action-colour teal in the chat set, because sending a message is a genuine primary CTA, exactly what that token is reserved for. It disables while the trimmed value is empty; while `streaming` it swaps to a stop button (`stop`, firing `onStop`) and both Enter and `onSubmit` go inert, so a person can never fire a submit into a running response. Enter without Shift submits; Shift+Enter breaks the line. The trimmed-empty guard means whitespace never sends. Native `disabled` takes the house 0.4 opacity with `--color-input-bg-disabled` and not-allowed cursors, and disables the send button with it.

The textarea starts at one row and grows with its content up to `maxRows` (default 8), then scrolls internally: the cap is `calc(var(--ds-composer-max-rows, 8) * var(--font-paragraph-line-height))` — the shell owns the block padding, so rows × line-height is the whole sum — with `--ds-composer-max-rows` set inline from the prop. Where the browser supports `field-sizing: content` the sizing is fully native; elsewhere a measurement effect sets the height from `scrollHeight` on every value change. The step between one height and the next is eased rather than snapped: a ResizeObserver publishes the textarea's measured height to the text zone as `--ds-composer-text-height`, and the zone states its height as that plus its own block padding, so growing a line and collapsing on send both run between two pixel values (`auto` has nothing to interpolate) over `--motion-duration-instant` `--motion-ease-emphasized`. At 75ms it lands under the threshold where a change reads as motion — the edge comes off the jump and nothing more. The zone clips (`overflow: hidden`) while the textarea sits at its new height already, so a new line is uncovered rather than pushed, and the action bar's buttons hold their geometry throughout — the bar translates with the shell, never resizing. `attachments` is a wrapping row above the textarea for DocumentChips, fully controlled by the caller — Composer never owns the file list, mirroring FileInput's philosophy — and `actions` is the leading footer slot for an attach button or model picker. `onSubmit` reports the value but never clears it: the consumer owns the value and empties it after a successful submit. The textarea defaults to `aria-label="Message"` when the caller provides no accessible name; ref and unrecognised props land on the `<textarea>`, `className` on the shell.

The opt-in `aiGlow` prop dresses the focused shell in AiButton's exact signature — the system's "a model answers here" signal, for composers whose messages are answered by a model. On `:focus-within` the plain selected border goes transparent and two pseudo-elements fade in over `--motion-duration-base` `--motion-ease-standard`: a conic-gradient ring in the `--color-ai-gradient-*` triple, masked to a `--border-md` band whose outer edge sits on the shell's own border box — one step up from AiButton's `--border-xs` ring, because the composer is a far larger shape and the heavier stroke keeps the gradient legible on low-density screens, with the extra pixel growing inward so the geometry never shifts — and the same gradient blurred (14px, matched to AiButton) behind the opaque shell at 0.3 opacity so it reads as a halo around the edge. Both rotate in phase on AiButton's 7s ambient turn, driven by a Composer-scoped registered `@property` angle so the component never depends on AiButton's stylesheet; browsers without `@property` render the ring static, and reduced motion keeps the ring but stops the turning. Off by default — the plain composer keeps `--color-input-border-selected` on focus, and a disabled composer keeps the pseudos dark even if a control inside it holds focus.

### DocumentChip

**`ds-document-chip`** — A compact file reference: a two-line tile with a type icon, name, metadata line, upload progress, and an optional remove button, for documents attached to chat messages or queued above a composer. The tile is `--color-bg-container-primary` behind a `--border-xs` border at `--radius-md`, with the border colour routed through a local `--ds-document-chip-border` custom property so the error state repoints one variable to `--color-status-error-border` instead of restyling parts. A module-level map picks the Material Symbol for each of the eight `fileType` values (pdf, doc, sheet, slide, image, code, archive, generic) at `--icon-size-md`, overridable via `icon`; the name truncates with an ellipsis at a consumer-overridable `--ds-document-chip-max-width`, in `--font-paragraph-sm-em-*`. `meta` is free text in `--font-paragraph-sm-*` `--color-text-tertiary` ("1.2 MB", "12 pages"), so callers keep their own formatting. `progress` swaps the metadata line for a composed compact ProgressBar with its percentage label; `error` replaces it with a `--color-status-error-text` message and colours the border and icon with the error pair. `size="compact"` tightens the padding and drops to one line — name only — for dense composer rows.

Passing `onClick` turns the body (icon + text) into a `<button>` inside the root `<div>`, so click and remove coexist without nesting interactive controls; the remove button carries `removeLabel` as its accessible name and every icon is `aria-hidden`. Chip stays the one-line `--radius-full` pill for attributes and filters; FileInput stays the form control that owns selection — DocumentChip only references a file the host already holds.

### InterruptCard

**`ds-interrupt-card`** — A human-in-the-loop checkpoint: a question from the agent with option buttons for the person to decide ("Allow file edit?" — allow once, always allow, deny). It shares ToolCall's skeleton and footer: the same neutral `--color-bg-container-primary` container at `--radius-md` behind a `--border-xs` `--color-bg-container-border`, and an options footer with ToolCall's exact actions-footer values (the card's own background behind a `--color-divider` border-top, flex-end at `--gap-sm`, `--padding-sm-md`/`--padding-md`), so a decision on a card and an approval on a call read as the same row. The card is deliberately single-tone in both states — no status colour on icon or border; the question and its buttons are the signal, and a visually hidden status announcement carries the waiting state. The icon sits in `--color-icon-secondary` via the local `--ds-interrupt-card-color`. Once `value` is set the decision is made: the options are replaced by a quiet echo of the chosen label behind a check icon, on the same footer padding and rule (the `--answered` modifier stays on the root as a consumer styling hook). The header stacks a `--font-title-body-*` title (the question is the card's one heading, so it takes the title tier) over a `--font-paragraph-sm-*` `--color-text-secondary` description, beside a Material Symbol at `--icon-size-sm` (default `pause_circle`).

Options are structured data (`{ value, label, variant }`), not a free slot, because the options *are* the component — each renders as a compact Button (`primary` for the recommended choice, `danger` mapping to Button's destructive variant) firing `onValueChange` with its value. The card is fully controlled and holds no state. Freeform "tell it what to do instead" input is deliberately out of scope in v1; compose richer detail via `children`, whose intended pairing is `<InterruptCard><ToolCall status="pending" /></InterruptCard>` — the question above, the exact call it covers below. The root is `role="group"` named by the title, with a visually hidden `role="status"` "Waiting for your decision" while unanswered.

### MessageActions

**`ds-message-actions`** — The icon-button row for message-level actions: copy, retry, feedback. Built to slot into ChatMessage's `actions` prop, which reveals it on hover and keyboard focus, so the row's own job is just the buttons. Each item is a ghost button — no border, transparent at rest, `--radius-sm` with `var(--padding-xxs)` padding around a Material Symbol at `--icon-size-sm` in `--color-icon-primary` — hovering onto `--color-action-passive-bg-hover` and `--color-text-primary` over `--motion-duration-fast` `--motion-ease-standard`. The row itself is a flex line at `--gap-xxs`. An `active` item (the chosen feedback thumb) holds `--color-action-passive-bg-active`; focus takes the house ring inset (`outline-offset: -2px`), disabled the house 0.4 opacity. These stay ghost buttons rather than CircularButtons because a resting surface per icon would give a quiet utility row four competing pills.

Every button carries its item's `label` as `aria-label`, and by default a composed Tooltip shows the same label on hover and focus (`showTooltips={false}` drops the tooltip, never the name). `aria-pressed` renders only when an item sets `active` — a toggle-like action announces its state, a plain command like copy stays a plain button. The row is stateless beyond hover: copy feedback is the consumer swapping the item's `icon` to `check` (and its `label` to match) for a moment, so the component never owns a timer or a clipboard call — `onActionClick` fires with the item's stable `id` and the consumer decides everything else.

### MessageCard

**`ds-message-card`** — A structured rich-content card embedded in a chat message: media, title, body, and an actions row, for link previews, search results, and booking-style rich responses inside an assistant turn or bubble. Card is the `--radius-xl` navigation tile; MessageCard is `--radius-md` content furniture inside a conversation. The container is `--color-bg-container-primary` behind a `--border-xs` `--color-bg-container-border` border with `overflow: hidden`, so the optional media slot runs flush to the card edges and the clip rounds its corners (images inside render block at full width). The body stacks at `--gap-xs` inside `--padding-sm-md`/`--padding-md` padding: an optional Material Symbol at `--icon-size-sm` `--color-icon-primary` beside a `--font-title-body-*` title, a free-text `meta` line ("transit.example", a date) in `--font-paragraph-sm-*` `--color-text-tertiary`, a description in `--color-text-secondary`, then any children — a Prose block, a DocumentChip row. The card claims no width of its own: the bubble or turn constrains it, with `--ds-message-card-max-width` as the consumer-overridable cap.

The `actions` footer mirrors ToolCall's actions footer exactly — the card's own background behind a `--border-xs` `--color-divider` border-top, flex-end at `--gap-sm`, `--padding-sm-md`/`--padding-md` — so approvals on a tool call and link actions on a card read as the same row across the ai components.

### ModelPicker

**`ds-model-picker`** — The model selector for a chat surface, built for Composer's `actions` slot but freestanding anywhere. The trigger is a quiet `--radius-full` pill on `--color-action-passive-bg` (`--font-paragraph-sm-em-*` in `--color-text-secondary`, rotating `expand_more` chevron) — deliberately chrome, not a call to action, so the send button keeps the only teal in the composer. The panel is the floating-surface recipe (`--color-bg-page-primary` — the opaque page fill the floating menus and panels share, because the container fill is semi-transparent in dark mode and would show text through — hairline border, `--radius-md`, `--shadow-floating`, min-width 260px) and `placement` flips it above the trigger for composers pinned to the bottom of the screen.

Models list as a `role="listbox"` of rows — `--font-paragraph-sm-em-*` name with an optional `--color-status-info-bg` badge pill, a tertiary description line, and a check in `--color-action-primary-text-tertiary` on the selected row — with Dropdown's keyboard model (arrows move, Home/End jump to the ends, Enter selects, Escape closes, outside click dismisses) and `aria-activedescendant` tracking the highlighted row. When an effort value is provided (`effort`/`defaultEffort`/`onEffortChange`), an effort row appears below a `--color-divider` rule: an "Effort" label beside a `role="radiogroup"` of pills in a `--color-bg-container-secondary` track, the chosen one lifted on `--color-bg-container-primary` with `--shadow-floating` — the SegmentedControl treatment at menu scale. The radiogroup roves its tabindex from the checked pill: one tab stop, arrows move focus and selection together. Effort levels default to Low/Medium/High and are overridable via `effortOptions`. Model and effort selection both follow the controlled/uncontrolled pair convention.

### PromptSuggestions

**`ds-prompt-suggestions`** — A horizontal row of tappable prompt suggestions to start or steer a conversation. Each suggestion renders as a clickable Chip, so one component owns the pill look — the row only arranges them and never restyles the pills. `size` picks which Chip size to ask for, one step above Chip's own scale because a conversation starter is something to tap rather than metadata about something else: `default` renders `large` chips at the body-paragraph scale, so a suggestion reads at the same weight as the message it will become, with a `--gap-sm-md` gutter; `compact` renders Chip's default 32px pill at `--gap-sm`, for rows sitting alongside a live conversation. `layout` picks one of three arrangements, named on the element rather than inferred so each owns its own rules. `scroll` (the default) is a single line (`overflow-x: auto`) whose edges fade out through a pure-CSS `mask-image` gradient with `--gap-lg` stops: the fade is the overflow hint, with no scroll listeners and no JS measurement. `wrap` trades that for `flex-wrap` across multiple lines, the empty-state hero placement where everything is visible and there is no overflow to hint at. `stack` gives each suggestion its own line for narrow columns, where a wrapped row breaks wherever the labels run out of room and the ragged edge reads as an accident; the pills still hug their labels (`align-items: flex-start`), since stretching them to a shared width would make a set of prompts look like a set of buttons. `padding-block: var(--padding-xxxs)` keeps chip focus rings clear of the scroll clip. The boolean `wrap` prop is a deprecated alias for `layout="wrap"`, ignored when `layout` is set.

The root is `role="list"` (named by `ariaLabel`, default "Suggested prompts") with each chip in a `role="listitem"` wrapper, so a screen reader announces how many suggestions there are before reading any. The chips themselves are real buttons — Chip's clickable mode — which also keeps the scrollable region keyboard-reachable. Tapping one fires `onValueChange` with the suggestion's stable `id`, never its display text.

### Prose

**`ds-prose`** — Token-styled typography for rendered markdown and rich agent output. The package ships no markdown renderer: consumers render markdown with whatever library they already use and wrap the output in Prose, which styles the descendant elements through scoped selectors. Body text sits on the `--font-paragraph-*` scale in `--color-text-primary` with `--gap-md` between blocks, edges trimmed (`first-child`/`last-child` margins zeroed) so it slots into bubbles and cards cleanly. Headings step down the token tiers — `--font-heading-1-*` through `--font-heading-3-*`, then `--font-title-body-*` for `h4` — each applying its full five-property set, so the weight-contrast principle holds without Prose restating it. Links use `--color-action-primary-text-tertiary` with an underline; `strong` takes `--font-paragraph-em-weight`; lists indent by `--padding-md` with `--gap-xs` between items.

Inline code and `pre` both use `--font-family-code`: inline code sits on `--color-bg-container-secondary` at `--radius-xxs` with `--padding-xxxs` horizontal padding, one size step down; `pre` is a `--color-bg-container-primary` panel with a `--border-xs` `--color-bg-container-border` border at `--radius-md`, `--padding-md`, scrolling horizontally rather than wrapping, and `pre code` drops the inline chrome. Blockquotes take a `--border-md` `--color-divider` left rail with `--padding-md` inset in `--color-text-secondary`, mirroring Reasoning's trace rail. Tables use collapsed borders, `--font-title-body-*` headers on `--color-bg-container-secondary`, and `--border-xs` `--color-divider` row rules. They are their own scroll container: `display: block` with `width: max-content`, `max-width: 100%` and `overflow-x: auto`, so a table wider than its container scrolls sideways instead of being clipped. Prose styles markup it does not render and so cannot add a wrapping element, and the price of making the table element the scroller is that it sizes to its content rather than filling the container, since the anonymous table box inside a block table cannot be stretched. Cells also set `overflow-wrap: normal`, which holds each column's minimum width at its longest word no matter what the surrounding context does; without it an ancestor's `overflow-wrap: anywhere` (ChatMessage sets it so a long URL cannot widen a bubble) inherits in, collapses every column to a single character, and auto table layout squeezes headings into stacks of letters instead of letting the table reach its natural width. Consumers who want the scroll reachable by keyboard alone should put `tabindex="0"` on the table, which is markup only the consumer can supply; `role="region"` belongs on a wrapping element if the scroller also needs an accessible name, never on the table itself, where it would replace the table semantics. `hr` is the same hairline; images cap at `max-width: 100%` under `--radius-md`.

`size="sm"` moves the body scale to `--font-paragraph-sm-*` for dense chat contexts while headings keep their tiers. Prose adds no roles or behaviour of its own — the semantics are the consumer's markup — and its `pre` is the plain fallback: CodeBlock remains the richer choice for standalone code.

### Reasoning

**`ds-reasoning`** — A model's thinking, disclosed behind a one-line summary. The trigger is a borderless `--font-paragraph-*` button in `--color-text-secondary` (stepping to `--color-text-primary` on hover) with an `expand_more` chevron *after* the summary — trailing, like ToolCall's, so the summary line starts at the same left edge as everything around it — rotated −90° to point at the collapsed trace, turning back to pointing down as the panel opens, the same closed/open convention CodeBlock's chevron uses. `summaryOnly` drops the chevron, the trigger, and the panel, leaving the summary line alone — for a model that reports what it is doing but produces no trace to read, where a disclosure would open onto nothing. The line keeps the trigger's own geometry, so a trace arriving mid-response promotes it to a real disclosure without moving anything. The panel collapses with the `grid-template-rows: 0fr → 1fr` technique over `--motion-duration-slow`, and toggles `visibility` alongside it so collapsed content leaves the accessibility tree. The trace sits on a `--border-md` `--color-divider` rail in `--color-text-secondary` — the rail dissolves to the transparent container colour at its foot, the same end-of-line treatment as Timeline's last stem — its geometry derived from an AgentStatus summary: the rail runs down the centre of the matrix (half an `--icon-size-md`, corrected by half the rail width) and the trace text starts exactly where the status label's first letter starts (`--icon-size-md` + `--gap-sm-md`; the compact size derives the same sums from `--icon-size-sm` + `--gap-sm`). A plain text summary shares the same geometry, so swapping a live status for the thought-for line never shifts the trace — quiet enough never to compete with the answer beside it. The text scale pairs with ChatMessage: the default size matches default message text, and `size="compact"` drops trigger and trace to `--font-paragraph-sm-*` to match compact message text.

`streaming` opens the panel and shimmers the summary with the same treatment AgentStatus uses, so "the model is working" looks the same wherever it appears; when the stream ends the panel collapses to `Thought for {duration}s`. That auto-collapse yields to the reader — once someone has toggled the panel themselves, the stream ending no longer moves it. Only the summary is a `role="status"` live region: a trace announced token by token floods a screen reader, so the body stays ordinary expandable content and the announcement covers the boundaries.

The `summary` slot replaces the line with custom content — designed for an AgentStatus, so the live indicator and the trace disclosure work as a pair: AgentStatus-with-trace while the agent runs, the quiet thought-for line above the finished response. A node summary owns its own appearance and announcement, so Reasoning's text shimmer and live region stand down (AgentStatus shimmers and announces itself). Dropping the `summary` prop animates the handoff itself: the departing node fades out in place while the text summary slides left from the label position into the flush edge, the distance derived from `--ds-reasoning-align` (matrix + gap, the same sum the rail geometry uses) — consumers flip `streaming` off and drop the prop; the transition is the component's job.

Inside the panel, a list is the trace's node list: one thinking step per item, no bullets (the rail is the marker), `--gap-lg` between nodes — the same beat the panel opens with — and new nodes rise in as they mount, so a trace that builds while an agent works animates without any consumer wiring.

### SourceChip

**`ds-source-chip`** — A numbered citation pill linking a claim to its source: a borderless `--radius-full` pill on `--color-bg-container-secondary` holding a leading slot and a source title in `--font-paragraph-sm-*` `--color-text-secondary`, the title truncating with an ellipsis at `24ch`. The leading slot is either the citation number — a `--font-paragraph-sm-em-*` `tabular-nums` numeral in `--color-text-tertiary`, centred in its own `--icon-size-sm` `--color-bg-container-tertiary` circle — or a Material Symbol at `--icon-size-sm` `--color-icon-primary`; when both `index` and `icon` are passed, the index wins.

The root is an `<a>` when `href` is set and a plain `<span>` otherwise. Only the link gets interaction styling: on hover the background steps to `--color-bg-container-tertiary` and the text to `--color-text-primary` over `--motion-duration-fast` `--motion-ease-standard`, with `text-decoration: none` throughout — the pill shape is the affordance — and focus draws the house `--color-action-primary-bg` ring. The non-link span keeps `cursor: default` and no hover. It renders inline after a sentence or in a wrapping sources row under an assistant answer, pairing with ChatMessage's footer slot.

### ToolCall

**`ds-tool-call`** — The record of one tool invocation. A skimmable header row — status indicator, monospace tool name (`--font-family-code`, the same sanctioned monospace context CodeBlock uses), summary, status word, `tabular-nums` duration, chevron — over a collapsible body holding the arguments and result. Container is `--color-bg-container-primary` at `--radius-md` with a `--border-xs` `--color-bg-container-border`; the panel uses the same `0fr → 1fr` collapse and `visibility` handling as Reasoning.

Four statuses: `pending`, `running`, `success`, `error`, mapping to the warning, info, positive and error `--color-status-*-text` tokens. The container stays neutral so a long run reads as a list rather than a wall of tinted cards — the border is the standard container hairline in every status, and the status word and icon carry the state. `running` renders a `Spinner` at `variant="inherit"`, the rest a Material Symbol (`pause_circle`, `check_circle`, `error`) at `--icon-size-sm`.

The `actions` slot — allow, deny, always allow — renders in a single-tone footer (the card's own background behind a `--color-divider` border-top) *outside* the collapsible panel, so answering an approval request never requires expanding the call first. With no children the header renders as a plain `div` rather than a button, so a row with nothing to disclose does not look pressable.

### Site chat (pattern)

The site-wide chat is a pattern, not a component: `ChatHeader` + `ChatThread` + `ChatMessage` + `Composer` + `PromptSuggestions` + `Reasoning` + `AgentStatus` + `Prose`, composed in the website's `SiteChat` module and mounted once from the root layout so the conversation, an in-flight stream, and the draft survive client-side navigation.

The panel is a floating card: `position: fixed` on the right at `--layout-chat-width` (420px at rest), inset `--layout-chat-inset` (20px) from the top, right and bottom edges, at `--radius-xl` with the container border and `--shadow-floating`. Docked, a hover-revealed grip on the panel's left edge (the playground Chat view's handle, transplanted) drags the width up to 30% wider by rewriting `--layout-chat-width` inline on `<html>`, so the body inset and header offset slide with it; the chosen width holds for the session. The container surface is translucent, so the panel carries a `backdrop-filter: blur(24px)` that turns the page behind it into glass; fullscreen view drops the inset and radius for a true takeover and raises the blur to 40px, which is what keeps the transcript readable while the page's colours still show through. The switch between the two geometries is a glide, not a swap: position, size, radius, border colour and blur transition together on `--motion-duration-slow` with `--motion-ease-emphasized` (the border fades to transparent rather than dropping, so its width never snaps mid-glide), the scrim animates in when fullscreen exits below the dock threshold, and the widen grip suspends the width transition while dragging. At 1440px and above the panel docks: `html[data-chat="docked"]` pads the body by width + inset, so every page slides over instead of being covered, and the fixed sticky header offsets by the same amount. Docked, the panel is a non-modal `complementary` region — no scrim, no focus trap. Below 1440px (and in fullscreen view) it is modal: `role="dialog"`, `--color-scrim` behind it, focus trapped, body scroll locked through the shared counted lock, Escape closes. On phone widths (under 720px) it fills the viewport, radius and inset dropped — and there it is the takeover in state as well as pixels: the chat opens in fullscreen view and the expand toggle is hidden, since the panel has no card form to return to and a control that switches full screen for full screen is just chrome. Only the compact insets stay, because those follow the host's width rather than the view. On short viewports (under 620px tall) the vertical insets go too — that height belongs to the widget — and inside it the welcome dressing yields in order: the greeting steps aside first, then the starter pills, so the empty state degrades to header, centred composer and disclaimer rather than letting the greeting paint over the header. The thresholds are container queries on the widget, so the same guard covers the docked panel, the takeover and the playground's chat stage. The composer never gives up height in a squeeze. The conversation column caps at 768px like the playground's chat stage.

The entry point is an `AiButton` floating at the bottom-right corner (`--layout-chat-inset` off both edges) on a glassy `--color-bg-container-primary` pill backing, with `aria-expanded` and `aria-controls`; it hides while the panel is open and takes focus back when it closes. Mounted from the root layout, it never remounts on navigation. The panel never renders on /playground (its Chat view hosts its own copy on an injectable transport) or /rr-animated. The welcome starters follow the page — a new chat on /about proposes career questions, one on a blueprint page proposes system questions (`SiteChat/starters.ts`, longest-prefix match on the pathname). The disclaimer line carries the logging disclosure — chats kept 30 days — and changes together with the matching sentence on /contact.

Answers link into the site: the persona asks for internal markdown links, and the widget's markdown renderer turns a same-site path into a client-side navigation, so a docked panel stays open (and the conversation running) while the page changes beside it. When the panel covers the page (fullscreen view, or any viewport below the dock threshold) following a link closes the chat first. Model output is untrusted, so only hrefs matching the slug-charset path shape become links; anything else renders as plain text. Each committed assistant turn carries a message-actions row in `ChatMessage`'s actions slot, pinned permanently visible with `showActions`: copy (the raw markdown; the icon crossfades to a `--color-status-positive-border` tick on `--motion-duration-fast`, reverting after a beat, with an `aria-live` announcement) and thumbs up/down. A thumb posts the exchange's log id and the verdict to the feedback endpoint, renders optimistically, and shows filled at full icon strength while chosen; the thumbs only render when the server logged the exchange, so the playground's sim transport shows copy alone.

Under that row, in `ChatMessage`'s footer slot, sit the turn's follow-up questions: the same `PromptSuggestions` row the welcome screen uses for its starters, at the same scale and layout, because both answer "here is something you could ask" and a second pattern for the same job would be one too many. They arrive a beat after the answer commits — a small model writes them from the finished question-and-answer pair — so they fade up on `--motion-duration-slow` with `--motion-ease-entrance` rather than appearing, and tapping one sends it as the next message. Every suggestion the chat shows, starter or follow-up, is held to one length budget (`SUGGESTION_MAX_CHARS`): a Chip never wraps, so a label past the message column runs off the edge of the docked panel. One that will not fit is dropped rather than clipped, which is why the row can come back with two chips, or none — an answer with no chips under it is a finished answer.

### Site footer (pattern)

The sitemap footer is website chrome, not a library component: `SiteFooter`, mounted once from the root layout inside a pathname gate (`SiteFooterMount`), so every page carries it without a per-page import. It skips the chromeless routes (`website/src/config/chromeless.ts`), the same set the chat panel denies.

A `FadeDivider` on top — the shared 1px hairline that fades to `--color-bg-container-primary-transparent` at both ends, the same line the home hero and the DS landing draw — then a brand block beside four columns holding five link groups under a `<nav aria-label="Footer">` (Site, Design system, Docs, Work, Elsewhere), then a quiet copyright row. Four groups derive from the nav config (`dsMegaItems`, `docsSidebarLinks`, `workSidebarLinks`) and `website/src/config/social.ts`. The Site group is hand-listed in `SiteFooter.tsx`, because the top-level nav links live in MegaNav's own markup rather than in the nav config — the one duplication in the footer. Group names sit in `--font-title-body-weight` at `--font-paragraph-sm-size` on `--color-text-primary`; links are `--font-paragraph-sm-*` on `--color-text-tertiary`, hovering to `--color-text-primary` on `--motion-duration-base`. External links carry a trailing `open_in_new` at `--icon-size-sm`. The brand block holds the same `rr` mark and wordmark the header wears, at the same 24px and `--font-title-body-*` — it is opacity that sets it back (0.5, full on hover and focus), not a smaller or greyer variant — plus the monochrome social icon links (36px targets, `currentColor` at `--color-text-tertiary`); the copyright sits alone in the bottom row, left-clustered so the fixed chat button never covers it, with extra bottom clearance on phones for the same reason.

**The brand block is what makes the columns line up, and that is its structural job as much as its brand one.** It is exactly `--layout-sidebar-width` wide, separated from the links by `--layout-column-gap` — the docs shell's own rail and gutter — so the link grid begins on the same vertical line the page's content does. On a docs page its four columns land pixel-for-pixel on the four content cards above them; on a page with no rail it reads as an ordinary brand block with the columns starting after it. Five equal columns stretched across the whole shell was the version that never sat right: the pages divide that same width differently (three-up on the home page, four-up on the docs pages), so the footer's column edges landed a few pixels off theirs — 2px off the last card, 30–50px off the middle ones, and near-misses read as mistakes where a clear offset reads as a decision. Anchoring the grid to the content line means it either matches exactly or is offset by a whole rail, and the footer stays **identical on every page**: nothing in it reacts to which shell a page uses.

Five groups fit four columns because the two shortest share the first one (Site over Design system). Below 960px the rail is gone from the pages too, so the brand block stops reserving its width and sits above the links, the stacked pair unstacks (`display: contents`) and all five groups flow as columns — 3 + 2 there, 2 + 2 + 1 on phones. As a body flex child the footer inherits the docked-chat inset and pins to the viewport bottom on short pages via `margin-top: auto`. Focus rings are the sanctioned `--color-action-primary-bg` outline; teal appears nowhere else in the footer.

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

- `--color-action-primary-*` — the action family inverts by design: the light theme's deep fill (#0E6E8F) under a light label becomes a light fill (#3CA5C6) under a deep label, because one teal step cannot clear contrast against both page floors (see Action / Brand)

**Tokens that stay stable:**
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
- Don't write a `prefers-reduced-motion` query in component CSS — the duration tokens already collapse under it. The one exception runs the other way: that guard is CSS and cannot see a JS-driven loop or timer, so a JS-driven surface has to check the query itself (ShaderField's render loop and Carousel's autoplay are the worked examples).
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

The thresholds themselves stay raw numbers in the media queries, and that is settled rather than pending: CSS custom properties cannot drive `@media` conditions, and a preprocessor dependency is not worth it for five documented literals. This section is their single authoritative home — the rail widths and gutters they switch are tokenized (`--layout-*`), the numbers that trigger the switch are not.

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

- **Figma parity** — The system originates in Figma ([robr0-ds26](https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/robr0-ds26)), and foundation/component pages deep-link to specific frames via `figmaUrl`. Keeping the Figma file and the coded tokens in sync is still a manual process — there is no automated export pipeline.

Three former entries left this list as decisions rather than work: JS-driven timings now share one home (`src/tokens/motion.ts` — see Motion → Migration status), the raw breakpoint literals are settled as raw (see Responsive Behavior → Breakpoints), and form-level validation is permanently the consumer's form layer, not the system's (see the Input spec).
