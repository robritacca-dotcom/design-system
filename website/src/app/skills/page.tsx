"use client";

import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import BlurBackground from "../../components/BlurBackground/BlurBackground";
import Footer from "../../components/Footer/Footer";
import { Button } from "@design-system/components/Button/Button";
import { Badge } from "@design-system/components/Badge/Badge";
import { ToastProvider, useToast } from "@design-system/components/Toast/Toast";
import { getNavLinks, getSidebarLinks, skillsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";

const navLinks = getNavLinks("Skills");
const { sidebarLinks, subnavLinks } = getSidebarLinks(skillsSidebarLinks, "/skills");

/* ============================================
   SKILL DATA
   ============================================ */

interface SkillInfo {
  slug: string;
  name: string;
  icon: string;
  description: string;
  invoke: string[];
  content: string;
}

const skills: SkillInfo[] = [
  {
    slug: "new-component",
    name: "new-component",
    icon: "widgets",
    description:
      "Scaffolds a new design system component with all three required files — a typed React component, a token-only CSS stylesheet, and a Storybook stories file. Enforces the ds- BEM naming prefix, semantic token usage, and the correct stories format without needing reminders.",
    invoke: ["add a [Name] component", "create a [Name] component", "scaffold [Name]"],
    content: `# new-component

Scaffold a new design system component with all three required files.

## When invoked

Use this skill any time you are asked to add or create a new component to the design system — phrases like "add a [Name] component", "create a [Name] component", "scaffold [Name]".

## Instructions

1. **Ask** for the component name (PascalCase) and a one-sentence description of its purpose, if not already provided.

2. **Read these reference files before writing anything:**
   - \`src/components/Button/Button.tsx\` — structural reference (props interface, BEM class usage, conditional rendering)
   - \`src/components/Badge/Badge.css\` — CSS token reference (no raw hex/pixels, semantic token usage)
   - \`src/components/Badge/Badge.stories.tsx\` — stories file reference (\`satisfies Meta\`, \`StoryObj\`, autodocs)
   - \`src/tokens/tokens-light.css\` — full list of available semantic tokens

3. **Create the directory** \`src/components/ComponentName/\` and write exactly three files:

### File 1: \`ComponentName.tsx\`
- Named export (not default)
- Typed props interface (\`ComponentNameProps\`)
- BEM class naming with \`ds-componentname\` root prefix (e.g. \`ds-button\`, \`ds-badge\`)
- Modifier classes follow \`ds-componentname--variant\` pattern
- Imports CSS: \`import "./ComponentName.css"\`
- If the component renders as \`<a>\` when an \`href\` prop is passed, follow the Button pattern of conditional element rendering

### File 2: \`ComponentName.css\`
- CSS custom properties exclusively — **no hardcoded hex colours**, no raw \`rgb()\`/\`rgba()\`
- Acceptable raw pixel values: icon sizes only (20px, 24px) — these have no token equivalent
- All other spacing, padding, gap, border-radius, font sizes must use semantic tokens from \`tokens-light.css\` / \`tokens-typography.css\`
- Section comments grouping related rules (e.g. \`/* Base */\`, \`/* Variants */\`, \`/* States */\`, \`/* Dark theme */\`)
- Dark theme overrides use \`:root[data-theme="dark"] .ds-componentname { }\` selector

### File 3: \`ComponentName.stories.tsx\`
- Import: \`import type { Meta, StoryObj } from "@storybook/react-vite"\`
- Meta uses \`satisfies Meta<typeof ComponentName>\`
- \`title: "Components/ComponentName"\`
- \`tags: ["autodocs"]\`
- \`parameters: { layout: "centered" }\`
- One named \`StoryObj\` export per meaningful variant or state combination
- Story names are descriptive (e.g. \`Default\`, \`WithIcon\`, \`Disabled\`, \`Small\`)

4. **After creating files**, ask Rob: "Should I also add a documentation page for this component on the website? (invokes the \`component-doc-page\` skill)"
`,
  },
  {
    slug: "new-page",
    name: "new-page",
    icon: "insert_drive_file",
    description:
      "Creates a new website page with the full standard layout shell (Header, Sidebar, BlurBackground, Footer, PageLinks) and automatically wires it into the navigation config. Prevents the common mistake of adding a route without updating the sidebar.",
    invoke: ["add a page for [X]", "create a [section] page", "add [X] to the site"],
    content: `# new-page

Add a new page to the website with the standard layout shell and correct navigation wiring.

## When invoked

Use this skill when asked to add or create a new page on the website — phrases like "add a page for [X]", "create a [section] page", "add [X] to the site".

## Instructions

1. **Gather requirements** if not already provided:
   - Page URL path (e.g. \`/foundations/motion\`)
   - Section: \`Components\` | \`Foundations\` | \`About\` | \`Skills\` (determines which sidebar)
   - Page title and one-sentence description (for metadata and page header)
   - Figma URL (optional) and Storybook path (optional) — for \`PageLinks\`

2. **Read these reference files before writing anything:**
   - \`website/src/app/components/button/page.tsx\` — gold-standard page structure
   - \`website/src/app/components/button/page.module.css\` — CSS module reference
   - \`website/src/app/components/button/layout.tsx\` — metadata reference
   - \`website/src/config/navigation.ts\` — navigation config (single source of truth)

3. **Create the directory** \`website/src/app/<path>/\` with three files:

### File 1: \`page.tsx\`
- \`"use client"\` directive at top
- Standard imports: \`Header\`, \`Sidebar\`, \`BlurBackground\`, \`Footer\`, \`PageLinks\` from \`@/components/\`
- Import \`styles\` from \`./page.module.css\`
- Import \`getNavLinks\`, \`getSidebarLinks\`, and the correct section sidebar links array from \`@/config/navigation\`
- Page structure with \`dsLayout\`, \`dsContent\`, \`pageHeader\`, \`pageTitle\`, \`subDisplay\`, \`introSection\`, \`introBody\` classes
- Include \`<PageLinks figmaUrl={...} storybookPath={...} />\` if URLs are available

### File 2: \`page.module.css\`
- Must include: \`dsLayout\`, \`dsContent\`, \`pageHeader\`, \`pageTitle\`, \`subDisplay\`, \`introSection\`, \`introBody\`
- CSS custom properties only — no hardcoded values
- Match the structure from the Button page module CSS

### File 3: \`layout.tsx\`
- Exports \`metadata\` with \`title\` and \`description\`
- \`title\` format: \`"Page Title | robr0 DS"\`
- Exports default \`Layout\` component wrapping \`{children}\` in a fragment

4. **Update \`website/src/config/navigation.ts\`:**
   - Find the correct sidebar links array for the section
   - Add the new entry in alphabetical order by label
   - Entry format: \`{ label: "Page Title", href: "/path/to/page" }\`

5. **If this is a component page**, also add the component to the preview card grid in \`website/src/app/components/page.tsx\`.
`,
  },
  {
    slug: "visual-review",
    name: "visual-review",
    icon: "preview",
    description:
      "Starts the Next.js dev server, navigates to specified pages, and screenshots them in both light and dark mode. Checks for invisible text, broken layouts, overflow, and stuck hover states — then reports findings or confirms all clear.",
    invoke: ["check how this looks", "review light and dark", "visual check", "screenshot the page"],
    content: `# visual-review

Start the website dev server and screenshot pages in both light and dark mode to catch visual issues.

## When invoked

Use this skill when asked to visually review changes — phrases like "check how this looks", "review light and dark", "does this look right", "screenshot the page", "visual check".

## Instructions

1. **Determine which URLs to review.** If not specified, default to the page(s) most recently modified in the current conversation. Ask if unclear.

2. **Start the preview server** using \`preview_start\` targeting the \`website/\` directory (Next.js dev server, port 3000). Wait for it to be ready.

3. **For each URL to review**, do the following in order:

   **Dark mode check:**
   - Navigate to the URL
   - Verify \`data-theme="dark"\` is present on \`<html>\` (use \`preview_eval\`: \`document.documentElement.getAttribute('data-theme')\`)
   - If it's \`"light"\`, click the ThemeToggle button (it's in the Header — use \`preview_snapshot\` to find it, then \`preview_click\`)
   - Take a screenshot with \`preview_screenshot\`

   **Light mode check:**
   - Click the ThemeToggle to switch to light mode
   - Verify \`data-theme="light"\` on \`<html>\`
   - Take a screenshot with \`preview_screenshot\`

4. **Examine each screenshot for:**
   - Text that is invisible or the same colour as its background
   - Components that appear broken, overflow their container, or clip
   - Spacing that looks inconsistent or misaligned
   - Hover/focus states that appear stuck
   - Images or assets that failed to load

5. **Report findings** concisely:
   - Format: \`[URL] [dark|light] — description of issue\`
   - If no issues found, say: \`[URL] — looks correct in both themes\`

6. **Stop the preview server** with \`preview_stop\` when all pages are reviewed.

## Key context

- Theme state is stored on \`document.documentElement\` as \`data-theme="light"\` or \`data-theme="dark"\`
- The ThemeToggle component is always in the \`<Header>\` at the top of every page
- The \`animate-in\` class on page elements triggers CSS entry animations — these are normal on first load
`,
  },
  {
    slug: "token-audit",
    name: "token-audit",
    icon: "manage_search",
    description:
      "Scans CSS files for hardcoded hex colours, raw rgb() values, and pixel values that should reference design tokens. Reports file, line number, offending value, and recommended token replacement. Accepts a single component, all-components, or website as scope.",
    invoke: ["check for hardcoded values", "token audit", "audit [component] CSS", "are there raw colours"],
    content: `# token-audit

Scan CSS files for hardcoded values that should use design tokens, and report violations.

## When invoked

Use this skill when asked to check for hardcoded values, audit token usage, find raw colours or pixel values, or check design system compliance — phrases like "check for hardcoded values", "token audit", "are there any raw colours", "audit [component] CSS".

## Instructions

1. **Determine scope.** Accept one of:
   - A specific component name (e.g. \`Avatar\`) → scans \`src/components/Avatar/Avatar.css\`
   - \`all-components\` → scans all \`src/components/**/*.css\`
   - \`website\` → scans all \`website/src/**/*.css\` and \`website/src/**/*.module.css\`
   - A specific file path

2. **Read the token reference files first** to know what tokens are available:
   - \`src/tokens/tokens-primitives.css\` — spatial/size primitives
   - \`src/tokens/tokens-light.css\` — semantic colour tokens
   - \`src/tokens/tokens-typography.css\` — font size, weight, line-height tokens

3. **Scan each CSS file** in scope for violations:

   **Flag as violations:**
   - Hardcoded hex colours: \`#rrggbb\`, \`#rgb\`, \`#rrggbbaa\`
   - Raw \`rgb()\` or \`rgba()\` calls that could map to a semantic colour token
   - Pixel values for \`padding\`, \`margin\`, \`gap\`, \`border-radius\`, \`font-size\`, \`line-height\` that correspond to a known token
   - Hardcoded font weights where a typography token exists

   **Do NOT flag:**
   - Files within \`src/tokens/\` themselves
   - \`0px\`, \`0\`, \`100%\`, \`50%\` — structural values
   - Icon pixel sizes: \`16px\`, \`20px\`, \`24px\`, \`48px\` — no token equivalent, note as "acceptable raw value"
   - \`1px\` border widths — acceptable
   - CSS variable declarations themselves (lines starting with \`--\`)

4. **For each violation**, output:
   - File path (relative to repo root)
   - Line number
   - The offending value
   - Recommended token replacement

   Format: \`path/to/file.css:42 — #3b82f6 → var(--color-action-default)\`

5. **Summarise** at the end:
   - \`X violation(s) found\`
   - \`Y acceptable raw value(s) noted (icon sizes)\`
   - If zero violations: "No token violations found. CSS is token-compliant."
`,
  },
  {
    slug: "pre-deploy",
    name: "pre-deploy",
    icon: "rocket_launch",
    description:
      "Runs both the component library build (Vite + TypeScript) and the website build (Next.js) before a push to Vercel. Knows the non-standard monorepo build order and watches for SSR-unsafe code, portal regressions, and static generation failures.",
    invoke: ["is this ready to push?", "run the build", "pre-deploy check", "check before I push"],
    content: `# pre-deploy

Run both builds and confirm the site is safe to push to Vercel.

## When invoked

Use this skill when asked to check if changes are ready to push, deploy, or ship — phrases like "is this ready to push?", "run the build", "pre-deploy check", "check before I push".

## Instructions

1. **Run the component library build** from the repo root:
   \`\`\`
   npm run build
   \`\`\`
   This runs TypeScript type-checking + Vite build. Capture all output.

2. **Run the website build** from the \`website/\` directory:
   \`\`\`
   cd website && npm run build
   \`\`\`
   Note: the website build script does \`cd .. && npm install --include=dev\` first (monorepo alias setup). This is expected and normal.

3. **For each build, check output for:**

   **TypeScript errors:**
   - Any \`error TS\` lines
   - Type mismatches, missing props, invalid imports

   **Next.js-specific issues:**
   - \`"use client"\` missing on components that use browser APIs
   - SSR-unsafe code running outside client guards — particularly \`website/src/app/layout.tsx\`
   - Portal/modal components that reference \`document\` — watch for regressions (AlertDialog, Toast were fixed in commit \`080eaf50\`)
   - Pages that fail static generation (look for \`Error occurred prerendering page\`)

   **General failures:**
   - Any non-zero exit code
   - \`Build failed\` or \`Compiled with errors\`

4. **Report result:**

   If both pass:
   > Both builds succeeded. Safe to push.

   If either fails, show:
   - Which build failed
   - The exact error message(s)
   - File path and line number if available
   - A brief diagnosis of likely cause

5. **Do not push** — this skill only builds and reports. Pushing is Rob's decision.
`,
  },
  {
    slug: "component-doc-page",
    name: "component-doc-page",
    icon: "article",
    description:
      "Creates a full-quality documentation page for a design system component on the website. Reads the component's props to generate a variant showcase grid (the Button page is the benchmark), writes all three page files, and wires navigation.",
    invoke: ["document [X] on the website", "add a docs page for [X]", "create the website page for [X]"],
    content: `# component-doc-page

Create a full-quality documentation page for a design system component on the website.

## When invoked

Use this skill when asked to document a component on the website, add a component page, or create docs for a component — phrases like "document [X] on the website", "add a docs page for [X]", "create the website page for [X]".

This is a more thorough, component-specific version of \`new-page\`. The Button page is the quality benchmark.

## Instructions

1. **Gather requirements** if not already provided:
   - Component name (PascalCase)
   - Figma node URL (optional — ask Rob, or omit if unknown)
   - Storybook path (optional — usually \`Components-ComponentName--docs\`)

2. **Read the source component** \`src/components/ComponentName/ComponentName.tsx\`:
   - Extract all props from the TypeScript interface
   - Identify all variant enumerations (e.g. \`type\`, \`size\`, \`status\` props with union types)
   - Understand the component's states (default, hover, active, disabled, loading, etc.)
   - Note the BEM class names used for each variant/state

3. **Read the gold-standard reference:**
   - \`website/src/app/components/button/page.tsx\` — study the variant showcase grid structure
   - \`website/src/app/components/button/page.module.css\` — CSS module structure

4. **Create \`website/src/app/components/<component-slug>/page.tsx\`:**
   - \`"use client"\` directive
   - Standard layout shell: \`Header\`, \`Sidebar\`, \`BlurBackground\`, \`Footer\`, \`PageLinks\`
   - \`pageHeader\` block with \`subDisplay\` ("Components") and \`pageTitle\` (component name)
   - \`introSection\` with an \`introBody\` paragraph describing the component's purpose
   - **Variant showcase grid**: render the component in every meaningful combination of its variants and states
   - Import: \`import { ComponentName } from "@design-system/components/ComponentName/ComponentName"\`
   - Include \`<PageLinks figmaUrl={...} storybookPath={...} />\` if URLs provided

5. **Create \`page.module.css\`**, **\`layout.tsx\`** with standard structure.

6. **Update \`website/src/config/navigation.ts\`:**
   - Find \`componentsSidebarLinks\` and add entry in alphabetical order

7. **Check \`website/src/app/components/page.tsx\`** — add to preview card grid if not already present.
`,
  },
  {
    slug: "heuristic-analysis",
    name: "heuristic-analysis",
    icon: "fact_check",
    description:
      "Evaluates a page or component against Nielsen's 10 Usability Heuristics. Takes screenshots in light and dark mode, reads the source code, then produces a structured findings table with severity ratings (Pass / Minor / Moderate / Critical) and specific fix suggestions.",
    invoke: ["heuristic analysis of [page]", "UX review of [page]", "usability check on [component]"],
    content: `# heuristic-analysis

Evaluate a page or component against Nielsen's 10 Usability Heuristics and produce a structured findings report.

## When invoked

Use this skill when asked to run a UX or usability review — phrases like "heuristic analysis of [page]", "UX review of [page]", "usability check on [component]", "how does [X] score on usability".

## Instructions

1. **Determine scope.** Accept one of:
   - A website URL path (e.g. \`/components/button\`) → review the live page
   - A component name (e.g. \`AlertDialog\`) → review the component source and its rendered output

2. **Gather visual evidence.** Start the preview server and screenshot the target in both light and dark mode (follow the \`visual-review\` skill pattern). Stop the server when done.

3. **Read the source code** for the page or component to understand the full implementation, not just what's visible in screenshots.

4. **Evaluate against each of Nielsen's 10 Heuristics.** For each, assign a severity:
   - ✅ **Pass** — fully satisfied, no issues
   - ⚠️ **Minor** — small gap, low user impact
   - 🔶 **Moderate** — noticeable issue, degrades experience
   - 🔴 **Critical** — breaks usability, must fix

   **The 10 Heuristics:**
   1. **Visibility of system status** — Does the UI communicate what's happening? (loading states, active states, progress indicators, feedback on interaction)
   2. **Match between system and real world** — Do labels, icons, and concepts match the user's mental model? (plain language, familiar metaphors, no jargon)
   3. **User control and freedom** — Can users undo, cancel, go back, or exit? (close buttons, undo actions, Escape key support on overlays)
   4. **Consistency and standards** — Are patterns applied uniformly? (same component behaves the same way everywhere, no contradictory conventions)
   5. **Error prevention** — Does the UI prevent mistakes before they happen? (confirmation dialogs for destructive actions, disabled states, validation hints before submission)
   6. **Recognition rather than recall** — Are options visible rather than requiring memory? (labels on icon-only buttons, visible choices, no hidden commands)
   7. **Flexibility and efficiency of use** — Can experienced users work faster? (keyboard shortcuts, compact modes, sensible defaults)
   8. **Aesthetic and minimalist design** — Is every element necessary? (no redundant labels, no visual noise, appropriate information density)
   9. **Help users recognise, diagnose, and recover from errors** — Are error messages plain, specific, and constructive? (not just "Something went wrong")
   10. **Help and documentation** — Are tooltips, placeholder text, or inline guidance provided where genuinely needed?

5. **Produce a structured report:**

   \`\`\`
   ## Heuristic Analysis: [Page/Component Name]

   | # | Heuristic | Severity | Finding |
   |---|-----------|----------|---------|
   | 1 | Visibility of system status | ✅ Pass | — |
   | 2 | Match with real world | 🔶 Moderate | Submit button gives no feedback after click — add loading state |
   ...

   ### Findings requiring action
   [Only Minor/Moderate/Critical items, each with a specific fix suggestion]

   ### Summary
   X critical · Y moderate · Z minor · W passing
   \`\`\`

6. **Be specific.** Reference the exact element, prop, or file where possible. A finding like "the Dismiss button in AlertDialog has no visible focus ring (AlertDialog.css:47)" is more useful than "focus styles are missing".
`,
  },
  {
    slug: "accessibility-audit",
    name: "accessibility-audit",
    icon: "accessibility",
    description:
      "Audits a component or page against WCAG 2.1 AA criteria. Checks semantic HTML, ARIA usage, keyboard navigation, focus styles, and colour contrast via both source code analysis and live screenshots. Reports file and line-level findings with WCAG criterion and severity.",
    invoke: ["accessibility audit", "a11y check on [component/page]", "check WCAG compliance", "is [X] accessible"],
    content: `# accessibility-audit

Audit a component or page for accessibility violations against WCAG 2.1 AA criteria.

## When invoked

Use this skill when asked to check accessibility, run an a11y audit, or find WCAG issues — phrases like "accessibility audit", "a11y check on [component/page]", "check WCAG compliance", "is [X] accessible".

## Instructions

1. **Determine scope.** Accept one of:
   - A component name (e.g. \`Dropdown\`) → audits \`src/components/Dropdown/Dropdown.tsx\` and its CSS
   - A website page URL (e.g. \`/components/button\`) → audits the live rendered page
   - \`all-components\` → audits all components in \`src/components/\`

2. **Read the source files.** For each component in scope, read the \`.tsx\` and \`.css\` files before taking screenshots.

3. **Structural audit (from source code).** Check for:

   **Semantic HTML & ARIA:**
   - Interactive elements use correct roles (\`button\`, \`link\`, \`checkbox\`, etc.) — never a \`<div onClick>\` without \`role\` and \`tabIndex\`
   - Icon-only \`<button>\` elements have \`aria-label\` describing their action
   - \`<img>\` elements have meaningful \`alt\` text; decorative images use \`alt=""\`
   - Form inputs are associated with \`<label>\` via \`htmlFor\`/\`id\`, or have \`aria-label\`
   - Modals and dialogs use \`role="dialog"\` and \`aria-modal="true"\`, with \`aria-labelledby\` pointing to the title
   - Lists use \`<ul>\`/\`<ol>\` + \`<li>\`, not \`<div>\` stacks
   - Heading hierarchy is logical — no h3 before h2, no skipped levels

   **Keyboard Navigation:**
   - All interactive elements are reachable by Tab key (not \`tabIndex={-1}\` without justification)
   - Custom interactive components handle \`onKeyDown\` for Enter/Space (buttons), arrow keys (RadioGroup, SegmentedControl, ToggleGroup)
   - Modal/dialog traps focus while open and restores focus to the trigger on close
   - Escape key closes dismissible overlays (Tooltip, Popover, DropdownMenu, AlertDialog)

   **Focus Styles:**
   - Every interactive element has a \`:focus-visible\` rule in its CSS
   - Focus ring uses \`--color-focus-ring\` token — not silently removed with \`outline: none\`

4. **Visual audit (from screenshots).** Start the preview server and screenshot the target in both light and dark mode (follow the \`visual-review\` skill pattern). Check:
   - **Colour contrast:** Body text should use \`--color-text-*\` tokens. Flag any text rendered below 4.5:1 contrast (WCAG 1.4.3). Note which token is used and flag if it's outside the \`--color-text-*\` / \`--color-on-*\` families.
   - **Text sizing:** No text visually below ~12px (WCAG 1.4.4)
   - **Focus visibility:** Confirm focus rings are clearly visible in both light and dark themes

   Stop the server when done.

5. **For each issue, report:**

   \`\`\`
   src/components/Dropdown/Dropdown.tsx:84 — WCAG 4.1.2 Name, Role, Value [Critical]
   Trigger button has no accessible name. Icon-only button needs aria-label="Open dropdown".
   \`\`\`

   Severity:
   - **Critical** — blocks keyboard or screen reader users entirely
   - **Moderate** — degrades experience significantly
   - **Minor** — best practice violation, low direct impact

6. **Summarise:**
   - \`X critical · Y moderate · Z minor\`
   - If clean: "No accessibility violations found. Component meets WCAG 2.1 AA."
`,
  },
  {
    slug: "api-consistency",
    name: "api-consistency",
    icon: "compare",
    description:
      "Reads all component Props interfaces and flags inconsistencies across the library: mixed boolean naming (disabled vs isDisabled), mismatched size enums, missing standard props (className, disabled), and structural mismatches within component families. Produces a grouped findings report prioritised by breaking impact.",
    invoke: ["review component APIs", "prop consistency audit", "are our component props consistent", "check for API inconsistencies"],
    content: `# api-consistency

Review component prop interfaces across the design system for naming inconsistencies, missing standard props, and pattern violations.

## When invoked

Use this skill when asked to review component APIs, check prop naming consistency, or audit TypeScript interfaces — phrases like "review component APIs", "prop consistency audit", "are our component props consistent", "check for API inconsistencies".

## Instructions

1. **Determine scope.** Accept one of:
   - A list of specific components (e.g. \`Button, IconButton, CircularButton\`) → compare those
   - \`all\` → scan all components in \`src/components/\`
   - A category description (e.g. "all button-like components", "all form inputs") → infer the relevant components

2. **Read every component's TypeScript interface.** For each \`.tsx\` file in scope, extract:
   - All prop names, types, and whether they are required or optional
   - Default values (from destructuring defaults in the function signature)

3. **Check for these specific inconsistencies:**

   **Boolean prop naming:**
   - Should follow \`is*\`/\`has*\` convention OR plain adjective — not both (e.g. \`isDisabled\` on one component, \`disabled\` on another doing the same thing)
   - Flag: mixed usage within the same component family

   **Event handler naming:**
   - Must be \`on*\` (e.g. \`onClick\`, \`onChange\`, \`onDismiss\`)
   - Flag: \`handleClick\`, \`clickHandler\`, \`onClickHandler\`, or similar

   **Content prop naming:**
   - \`label\` for display text, \`children\` for slot content
   - Flag: \`text\`, \`title\`, \`copy\`, \`content\` used interchangeably across components for the same purpose

   **Size enum values:**
   - Should use a consistent vocabulary across components
   - Flag: \`"sm"/"md"/"lg"\` on one component and \`"small"/"medium"/"large"\` on another, or \`"compact"/"default"\` on one and \`"small"/"medium"\` on another

   **Missing standard props on interactive components:**
   - All components rendering clickable/interactive elements should have \`className?: string\`
   - All components with visual disabled states should have \`disabled?: boolean\`
   - All form-like components should have \`id?: string\` and \`name?: string\`

   **Family consistency:**
   - Components in the same family (e.g. Button / IconButton / CircularButton) should share \`size\` enum values
   - If one component accepts \`iconLeft\`/\`iconRight\`, siblings in the same family should follow the same pattern
   - Default values: if \`size\` defaults to \`"default"\` on Button, it should not default to \`"medium"\` on a related component

4. **Output a grouped findings report:**

   \`\`\`
   ## API Consistency Report

   ### Boolean prop naming
   - Button: uses \`disabled\` (plain adjective)
   - ToggleSwitch: uses \`isDisabled\` (is* prefix)
   → Standardise to \`disabled\` across all interactive components

   ### Size enum values
   - Button: "compact" | "default" | "large"
   - Slider: "small" | "medium" | "large"
   → Standardise to Button's enum (it is the most-used component)

   ### Missing className prop
   - DatePicker — no className passthrough
   - Carousel — no className passthrough

   ### Summary
   X naming inconsistencies · Y missing props · Z structural mismatches
   \`\`\`

5. **Prioritise fixes** by impact:
   - **High:** Renames that would require consuming code changes — flag these clearly so Rob can decide whether to batch into a breaking release
   - **Medium:** Missing props that are commonly needed by consumers
   - **Low:** Style preferences with no breaking impact
`,
  },
];

/* ============================================
   DOWNLOAD HELPER
   ============================================ */

function downloadSkill(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ============================================
   PAGE
   ============================================ */

function SkillsContent() {
  const { toast } = useToast();

  function copySkill(content: string) {
    navigator.clipboard.writeText(content);
    toast({ title: "Copied to clipboard", variant: "positive", duration: 3000 });
  }

  return (
    <>
      <BlurBackground />

      <Header navLinks={navLinks} subnavLinks={subnavLinks} />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          {/* Page Header */}
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Claude Skills</h1>
          </div>

          {/* Intro */}
          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              Reusable AI instructions, tuned for this project
            </p>
            <p className={styles.introBody}>
              These skill files live in{" "}
              <code className={styles.inlineCode}>.claude/skills/</code> and encode
              this project&apos;s conventions — component patterns, token rules, navigation
              wiring, and more. Invoke any skill by name in Claude Code and it follows
              the exact steps without re-explanation each session. Download any skill
              to adapt it for your own project.
            </p>
          </div>

          {/* Skills List */}
          <div className={`${styles.skillsGrid} animate-in animate-delay-2`}>
            {skills.map((skill) => (
              <div key={skill.slug} className={styles.skillCard}>
                <div className={styles.skillCardHeader}>
                  <div className={styles.skillMeta}>
                    <span className={`material-symbols-rounded ${styles.skillIcon}`}>
                      {skill.icon}
                    </span>
                    <code className={styles.skillName}>{skill.name}</code>
                  </div>
                  <div className={styles.skillActions}>
                    <Button
                      label="Copy"
                      priority="tertiary"
                      size="compact"
                      iconLeft="content_copy"
                      onClick={() => copySkill(skill.content)}
                    />
                    <Button
                      label="Download"
                      priority="secondary"
                      size="compact"
                      iconLeft="download"
                      onClick={() => downloadSkill(`${skill.slug}.md`, skill.content)}
                    />
                  </div>
                </div>

                <p className={styles.skillDescription}>{skill.description}</p>

                <div className={styles.skillInvoke}>
                  <span className={styles.skillInvokeLabel}>Invoke:</span>
                  {skill.invoke.map((phrase) => (
                    <Badge key={phrase} variant="info" label={phrase} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}

export default function SkillsPage() {
  return (
    <ToastProvider position="bottom-right">
      <SkillsContent />
    </ToastProvider>
  );
}
