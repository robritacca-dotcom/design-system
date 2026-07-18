---
name: token-audit
description: Scan CSS files for hardcoded values that should use design tokens, and report violations. Use when asked to check for hardcoded values, raw colours or pixel values, or audit token usage and design system compliance.
icon: manage_search
displayDescription: "Scans CSS files for hardcoded hex colours, raw rgb() values, and pixel values that should reference design tokens. Reports file, line number, offending value, and recommended token replacement. Accepts a single component, all-components, or website as scope."
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
   - `website` → scans all `website/src/**/*.css` and `website/src/**/*.module.css`
   - A specific file path

2. **Read the token files in `src/tokens/` first** to know what tokens are available and what raw values they map to — primitives (raw hex/px), the light *and* dark semantic files, and typography (font size, weight, line-height).

3. **Scan each CSS file** in scope for violations:

   **Flag as violations:**
   - Hardcoded hex colours: `#rrggbb`, `#rgb`, `#rrggbbaa`
   - Raw `rgb()` or `rgba()` calls that could map to a semantic colour token
   - Pixel values for `padding`, `margin`, `gap`, `border-radius`, `font-size`, `line-height` that correspond to a known token (cross-reference the primitives file)
   - Hardcoded font weights (e.g. `font-weight: 600`) where a typography token exists

   **Do NOT flag:**
   - Files within `src/tokens/` themselves (these define the tokens)
   - `0px`, `0`, `100%`, `50%` — these are structural, not token-replaceable
   - Icon-related pixel sizes: `16px`, `20px`, `24px`, `48px` — no token equivalent, acceptable as-is. Note these as "acceptable raw value"
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
   - `Y acceptable raw value(s) noted (icon sizes)`
   - If zero violations: "No token violations found. CSS is token-compliant."
