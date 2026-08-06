---
name: token-audit
description: Scan CSS files for hardcoded values that should use design tokens, and report violations. Use when asked to check for hardcoded values, raw colours or pixel values, or audit token usage and design system compliance.
icon: manage_search
displayDescription: "Scans CSS files for hardcoded hex colours, raw rgb() values, pixel values, and transition timings that should reference design tokens. Reports file, line number, offending value, and recommended token replacement. Accepts a single component, all-components, or website as scope."
invoke: ["check for hardcoded values","token audit","audit [component] CSS","are there raw colours"]
---

# token-audit

Scan CSS files for hardcoded values that should use design tokens, and report violations.

## When invoked

Use this skill when asked to check for hardcoded values, audit token usage, find raw colours or pixel values, or check design system compliance — phrases like "check for hardcoded values", "token audit", "are there any raw colours", "audit [component] CSS".

## Instructions

1. **Determine scope.** Accept one of:
   - A specific component name (e.g. `Avatar`) → scans `src/components/Avatar/Avatar.css`
   - `all-components` → scans all `src/components/**/*.css`
   - `website` → scans all `website/src/**/*.css` (which includes the `.module.css` files)
   - A specific file path

2. **Read the token files in `src/tokens/` first** to know what tokens are available and what raw values they map to — primitives (raw hex/px), the light *and* dark semantic files, typography (font size, weight, line-height), and motion (`tokens-motion.css` — durations and easings). The fastest authoritative index is the **generated** `src/tokens/registry.json` — every semantic token with its category and per-theme values, machine-readable; read it instead of parsing the CSS by hand (never edit it — it regenerates from the CSS).

3. **Scan each CSS file** in scope for violations:

   **Flag as violations:**
   - Hardcoded hex colours: `#rrggbb`, `#rgb`, `#rrggbbaa`
   - Raw `rgb()` or `rgba()` calls that could map to a semantic colour token
   - Pixel values for `padding`, `margin`, `gap`, `border-radius`, `font-size`, `line-height` that correspond to a known token (cross-reference the primitives file)
   - Hardcoded font weights (e.g. `font-weight: 600`) where a typography token exists
   - Icon sizing done wrong: `font-size` set directly on a Material Symbols icon, or raw pixel icon dimensions matching an `--icon-size-*` step — the fix is `--icon-size: var(--icon-size-sm|md|lg|xl)` (the icon font reads that one property for size, width, and height; the scale's values live in the token files)
   - Hardcoded `transition`/`animation` durations and easings (`0.2s`, `ease`, literal cubic-beziers) where a `--motion-duration-*`/`--motion-ease-*` token matches — component and website CSS is fully migrated, so any literal timing is a violation unless a directive sanctions it

   **Do NOT flag:**
   - Files within `src/tokens/` themselves (these define the tokens)
   - `0px`, `0`, `100%`, `50%` — these are structural, not token-replaceable
   - **Any value sanctioned by a `ds-allow` directive** — the one and only signal that an off-token value is deliberate. `/* ds-allow(<category>): <reason> */` inside a comment covers the declaration/rule/section it sits at; `/* ds-allow-file(<category>): <reason> */` in a file header covers the whole file for that category. Enumerate the current sanctions with `grep -rn "ds-allow" src website/src --include='*.css'` (the same scope `validate-css-directives.mjs` scans); the category set and grammar are build-enforced by `scripts/validate-css-directives.mjs`. This skill deliberately names no components: an off-token value with **no** directive is a violation, and the fix is either a token or a new directive at the site (plus a design.md note) — never an exception added to this skill
   - `1px` border widths — acceptable
   - Values inside `calc()` that are genuine arithmetic, not replaceable with a single token
   - CSS variable declarations themselves (lines starting with `--`)

4. **For each violation**, output:
   - File path (relative to repo root)
   - Line number
   - The offending value
   - Recommended token replacement (if a clear match exists in the token files)

   Format: `path/to/file.css:42 — #118AB2 → var(--color-action-primary-bg)`

5. **Summarise** at the end:
   - `X violation(s) found`
   - `Y acceptable raw value(s) noted (documented exceptions)`
   - If zero violations: "No token violations found. CSS is token-compliant."
