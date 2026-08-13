---
name: accessibility-audit
description: Audit a component or page for accessibility violations against WCAG 2.1 AA criteria. Use when asked for an accessibility audit, a11y check, WCAG compliance check, or "is X accessible".
icon: accessibility
displayDescription: "Audits a component or page against WCAG 2.1 AA criteria. Checks semantic HTML, ARIA usage, keyboard navigation, focus styles, and colour contrast via both source code analysis and live screenshots. Reports file and line-level findings with WCAG criterion and severity."
invoke: ["accessibility audit","a11y check on [component/page]","check WCAG compliance","is [X] accessible"]
---

# accessibility-audit

Audit a component or page for accessibility violations against WCAG 2.1 AA criteria.

## When invoked

Use this skill when asked to check accessibility, run an a11y audit, or find WCAG issues — phrases like "accessibility audit", "a11y check on [component/page]", "check WCAG compliance", "is [X] accessible".

## What is already automated — read this before auditing anything

**Axe runs on every Storybook story and fails the build.** `.storybook/preview.ts` sets `a11y.test: 'error'`, so `npm run test` (and therefore CI and `npm run verify`) already enforces WCAG 2.1 AA across the whole library. Start by running it:

```bash
npm run test
```

If that is green, every violation axe can detect is already absent — and re-checking icon-only button names, label association, `role="dialog"` naming or ARIA parent/child relationships by hand is duplicated effort.

**This skill exists for the three things that gate does not cover:**

1. **Colour contrast — deliberately excluded from the automated gate.** `color-contrast` is disabled in `.storybook/preview.ts` because the action colour fails behind its own label and fixing it is a design decision, not a lint fix — the comment on the rule override there is the authoritative record of the deferral. **Contrast is therefore the single highest-value thing to audit manually** — nothing else checks it.
2. **What axe cannot see.** Axe catches roughly a third of WCAG issues. It cannot tell whether alt text is *meaningful*, whether focus order makes sense, whether a Dialog *actually* traps focus, or whether a helper message *should* have been associated with its control. (Two such bugs shipped undetected until a manual survey found them: Dropdown announced neither its helper text nor its error state.)
3. **Anything outside the story suite** — the Next.js website pages, which axe never runs against.

Report a finding as **already-enforced** if `npm run test` would have caught it; that tells the reader the gate is working rather than implying a gap.

## Instructions

1. **Determine scope.** Accept one of:
   - A component name (e.g. `Dropdown`) → audits `src/components/Dropdown/Dropdown.tsx` and its CSS
   - A website page URL (e.g. `/components/button`) → audits the live rendered page
   - `all-components` → audits all components in `src/components/`

2. **Read the source files.** For each component in scope, read the `.tsx` and `.css` files before taking screenshots.

3. **Structural audit (from source code).** Most items here are already enforced by axe — spend your effort on the ones marked **[manual]**, which it cannot evaluate:

   **Semantic HTML & ARIA:**
   - Interactive elements use correct roles (`button`, `link`, `checkbox`, etc.) — never a `<div onClick>` without `role` and `tabIndex`
   - Icon-only `<button>` elements have `aria-label` describing their action
   - **[manual]** `<img>` elements have *meaningful* `alt` text — axe only checks that the attribute exists; decorative images use `alt=""`
   - Form inputs are associated with `<label>` via `htmlFor`/`id`, or have `aria-label`
   - Modals and dialogs use `role="dialog"` and `aria-modal="true"`, with `aria-labelledby` pointing to the title
   - Lists use `<ul>`/`<ol>` + `<li>`, not `<div>` stacks
   - Heading hierarchy is logical — no h3 before h2, no skipped levels

   **Keyboard Navigation:**
   - **[manual]** All interactive elements are reachable by Tab, in an order that makes sense — axe cannot judge order
   - Custom interactive components handle `onKeyDown` for Enter/Space (buttons), arrow keys (RadioButton, SegmentedControl, ToggleGroup)
   - **[manual]** Modal/dialog *actually* traps focus while open and restores it to the trigger on close — axe sees the attributes, not the behaviour
   - Escape key closes dismissible overlays (Tooltip, Popover, DropdownMenu, AlertDialog)

   **Focus Styles:**
   - Every interactive element has a `:focus-visible` rule in its CSS
   - Focus ring uses the teal action token (`--color-action-primary-bg`) — per design.md, teal is reserved for primary CTAs and focus rings. Flag any `outline: none` without a visible replacement

   **Motion** (axe evaluates none of this):
   - **[manual]** Anything that animates for more than five seconds, or loops indefinitely, can be paused, stopped, or hidden (WCAG 2.2.2). CSS-token motion satisfies this through the `prefers-reduced-motion` guard in `tokens-motion.css`, which collapses every duration
   - **[manual]** Animation driven from JavaScript is **outside that guard** — a `requestAnimationFrame` loop cannot be seen by CSS, so each one has to check `prefers-reduced-motion` itself. The site's ambient background is the standing example; confirm it still renders a single static frame under the preference rather than assuming the token layer covers it
   - **[manual]** Motion triggered by interaction (parallax, cursor-reactive effects) is disabled under reduced motion, or is not essential (WCAG 2.3.3)

4. **Visual audit (from screenshots).** Start the preview server and screenshot the target in both light and dark mode (follow the `visual-review` skill pattern). Check:
   - **Colour contrast (the priority — nothing automated covers this):** compute the ratio for every foreground/background pair actually rendered, not just body text. Flag anything below 4.5:1 for normal text or 3:1 for large text and UI components (WCAG 1.4.3 / 1.4.11). Note which token is used. The action-colour pairs recorded in `.storybook/preview.ts`'s contrast deferral (primary CTA label, teal-as-text on white, tertiary-on-tertiary) are known — report those as *known deferred*, not as new findings.
   - **Text sizing:** No text visually below ~12px (WCAG 1.4.4)
   - **Focus visibility:** Confirm focus rings are clearly visible in both light and dark themes

   Stop the server when done.

5. **For each issue, report:**

   ```
   src/components/Dropdown/Dropdown.tsx:84 — WCAG 4.1.2 Name, Role, Value [Critical]
   Trigger button has no accessible name. Icon-only button needs aria-label="Open dropdown".
   ```

   Severity:
   - **Critical** — blocks keyboard or screen reader users entirely
   - **Moderate** — degrades experience significantly
   - **Minor** — best practice violation, low direct impact

6. **Summarise:**
   - `X critical · Y moderate · Z minor`
   - If clean: "No accessibility violations found. Component meets WCAG 2.1 AA."
