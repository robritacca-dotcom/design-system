# accessibility-audit

Audit a component or page for accessibility violations against WCAG 2.1 AA criteria.

## When invoked

Use this skill when asked to check accessibility, run an a11y audit, or find WCAG issues — phrases like "accessibility audit", "a11y check on [component/page]", "check WCAG compliance", "is [X] accessible".

## Instructions

1. **Determine scope.** Accept one of:
   - A component name (e.g. `Dropdown`) → audits `src/components/Dropdown/Dropdown.tsx` and its CSS
   - A website page URL (e.g. `/components/button`) → audits the live rendered page
   - `all-components` → audits all components in `src/components/`

2. **Read the source files.** For each component in scope, read the `.tsx` and `.css` files before taking screenshots.

3. **Structural audit (from source code).** Check for:

   **Semantic HTML & ARIA:**
   - Interactive elements use correct roles (`button`, `link`, `checkbox`, etc.) — never a `<div onClick>` without `role` and `tabIndex`
   - Icon-only `<button>` elements have `aria-label` describing their action
   - `<img>` elements have meaningful `alt` text; decorative images use `alt=""`
   - Form inputs are associated with `<label>` via `htmlFor`/`id`, or have `aria-label`
   - Modals and dialogs use `role="dialog"` and `aria-modal="true"`, with `aria-labelledby` pointing to the title
   - Lists use `<ul>`/`<ol>` + `<li>`, not `<div>` stacks
   - Heading hierarchy is logical — no h3 before h2, no skipped levels

   **Keyboard Navigation:**
   - All interactive elements are reachable by Tab key (not `tabIndex={-1}` without justification)
   - Custom interactive components handle `onKeyDown` for Enter/Space (buttons), arrow keys (RadioGroup, SegmentedControl, ToggleGroup)
   - Modal/dialog traps focus while open and restores focus to the trigger on close
   - Escape key closes dismissible overlays (Tooltip, Popover, DropdownMenu, AlertDialog)

   **Focus Styles:**
   - Every interactive element has a `:focus-visible` rule in its CSS
   - Focus ring uses `--color-focus-ring` token — not silently removed with `outline: none`

4. **Visual audit (from screenshots).** Start the preview server and screenshot the target in both light and dark mode (follow the `visual-review` skill pattern). Check:
   - **Colour contrast:** Body text should use `--color-text-*` tokens. Flag any text rendered below 4.5:1 contrast (WCAG 1.4.3). Note which token is used and flag if it's outside the `--color-text-*` / `--color-on-*` families.
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
