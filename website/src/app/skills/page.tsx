"use client";

import Link from "next/link";
import MegaNav from "../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../components/Sidebar/Sidebar";
import BlurBackground from "../../components/BlurBackground/BlurBackground";
import Footer from "../../components/Footer/Footer";
import { Badge } from "@design-system/components/Badge/Badge";
import { CodeBlock } from "@design-system/components/CodeBlock/CodeBlock";
import { getSidebarLinks, aboutSidebarLinks } from "@/config/navigation";
import { SKILL_COUNT } from "@/data/skills-registry";
import styles from "./page.module.css";

const { sidebarLinks } = getSidebarLinks(aboutSidebarLinks, "/skills");

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
   - Section: \`Components\` | \`Foundations\` | \`About\` (determines which sidebar)
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
- Page structure:
  \`\`\`
  <div className={styles.dsLayout}>
    <Header links={getNavLinks(...)} />
    <BlurBackground />
    <Sidebar links={getSidebarLinks(sectionSidebarLinks, "/current/path")} />
    <main className={styles.dsContent}>
      <div className={styles.pageHeader}>
        <p className={\`\${styles.subDisplay} animate-in\`}>Section label</p>
        <h1 className={\`\${styles.pageTitle} animate-in\`}>Page Title</h1>
      </div>
      <div className={\`\${styles.introSection} animate-in\`}>
        <p className={styles.introBody}>Introductory description.</p>
      </div>
      {/* Page content goes here */}
    </main>
    <Footer />
  </div>
  \`\`\`
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
   - Find the correct sidebar links array for the section (\`componentsSidebarLinks\`, \`foundationsSidebarLinks\`, \`aboutSidebarLinks\`)
   - Add the new entry in alphabetical order by label
   - Entry format: \`{ label: "Page Title", href: "/path/to/page" }\`

5. **If this is a component page**, also add the component to the preview card grid in \`website/src/app/components/page.tsx\` — find the existing card list and add a new entry matching the format.
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
   - Spacing that looks inconsistent or misaligned compared to other pages
   - Hover/focus states that appear stuck in an active state
   - Images or assets that failed to load (broken image icons)
   - Any layout that differs unexpectedly between light and dark

5. **Report findings** concisely:
   - Format: \`[URL] [dark|light] — description of issue\`
   - If no issues found, say: \`[URL] — looks correct in both themes\`

6. **Stop the preview server** with \`preview_stop\` when all pages are reviewed.

## Key context

- Theme state is stored on \`document.documentElement\` as \`data-theme="light"\` or \`data-theme="dark"\`
- Theme persists via localStorage key \`theme\` and a cookie
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

2. **Read the token reference files first** to know what tokens are available and what pixel values they map to:
   - \`src/tokens/tokens-primitives.css\` — spatial/size primitives
   - \`src/tokens/tokens-light.css\` — semantic colour tokens
   - \`src/tokens/tokens-typography.css\` — font size, weight, line-height tokens

3. **Scan each CSS file** in scope for violations:

   **Flag as violations:**
   - Hardcoded hex colours: \`#rrggbb\`, \`#rgb\`, \`#rrggbbaa\`
   - Raw \`rgb()\` or \`rgba()\` calls that could map to a semantic colour token
   - Pixel values for \`padding\`, \`margin\`, \`gap\`, \`border-radius\`, \`font-size\`, \`line-height\` that correspond to a known token (cross-reference the primitives file)
   - Hardcoded font weights (e.g. \`font-weight: 600\`) where a typography token exists

   **Do NOT flag:**
   - Files within \`src/tokens/\` themselves (these define the tokens)
   - \`0px\`, \`0\`, \`100%\`, \`50%\` — these are structural, not token-replaceable
   - Icon-related pixel sizes: \`16px\`, \`20px\`, \`24px\`, \`48px\` — no token equivalent, acceptable as-is. Note these as "acceptable raw value"
   - \`1px\` border widths — acceptable
   - Values inside \`calc()\` that are genuine arithmetic, not replaceable with a single token
   - CSS variable declarations themselves (lines starting with \`--\`)

4. **For each violation**, output:
   - File path (relative to repo root)
   - Line number
   - The offending value
   - Recommended token replacement (if a clear match exists in the token files)

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
   Note: the website build script does \`cd .. && npm install --include=dev\` first (monorepo alias setup) before running Next.js. This is expected and normal.

3. **For each build, check output for:**

   **TypeScript errors:**
   - Any \`error TS\` lines
   - Type mismatches, missing props, invalid imports

   **Next.js-specific issues:**
   - \`"use client"\` missing on components that use browser APIs (\`window\`, \`document\`, \`localStorage\`, \`useEffect\`, \`useState\`, etc.)
   - SSR-unsafe code running outside client guards — particularly watch \`website/src/app/layout.tsx\` (the inline \`themeScript\`)
   - Portal/modal components that reference \`document\` — these have caused past build failures (AlertDialog, Toast were fixed in commit \`080eaf50\`; watch for regressions if those components change)
   - Pages that fail static generation (look for \`Error occurred prerendering page\`)

   **General failures:**
   - Any non-zero exit code
   - \`Build failed\` or \`Compiled with errors\`

4. **Report result:**

   If both pass:
   > Both builds succeeded. Safe to push.

   If either fails, show:
   - Which build failed (component library or website)
   - The exact error message(s)
   - File path and line number if available
   - A brief diagnosis of likely cause

5. **Do not push** — this skill only builds and reports. Pushing is Rob's decision.
`,
  },
  {
    slug: "merge-and-push",
    name: "merge-and-push",
    icon: "publish",
    description:
      "Ships completed work safely: surveys the tree so unrelated files never get swept into a commit, runs both builds (registry validators included) before anything is committed, groups changes into logical conventional commits, pushes, and reports exactly what shipped and what was deliberately left out.",
    invoke: ["merge and push", "commit and push", "push this", "ship it"],
    content: `# merge-and-push

Commit the session's work and push to main safely — builds green first, no unrelated files swept in, a clear report after.

## When invoked

Use this skill when asked to ship completed work — phrases like "merge and push", "commit and push", "push this", "ship it".

## Instructions

1. **Survey the tree before touching anything**: run \`git status --short\` and classify every entry:
   - **In scope** — files created or modified as part of the work just completed in this session
   - **Out of scope** — anything untracked or modified that predates the session, or that wasn't part of the requested work

   **Never run \`git add -A\`, \`git add .\`, or \`git add\` on a directory** — always add explicit file paths. Out-of-scope files are excluded by default and named in the final report; if it's genuinely unclear whether something belongs, ask before including it.

2. **Run both builds before committing** (the \`pre-deploy\` skill's checks, inlined):
   \`\`\`bash
   npm run build                    # library: registry validators + tsc + Vite
   cd website && npm run build      # website: validators + Next.js static build
   \`\`\`
   The registry validators run automatically via \`prebuild\`. **If either build fails, stop** — fix the failure if it was caused by this session's work, otherwise report it. Never push red.

3. **Group changes into logical commits** — one commit per concern, not one giant commit. Match the repo's conventional style (\`feat(scope):\`, \`fix(scope):\`, \`chore(scope):\`), with a 1–3 sentence body explaining the why. Check \`git log --oneline -5\` if unsure of the voice.

4. **Push**: \`git push\` on \`main\`. Remember: **a push to main deploys robertritacca.com via Vercel** — pushing is publishing.

5. **Report** in the final message:
   - Each pushed commit (hash + subject) and confirmation both builds passed
   - Every file deliberately left out and why
   - Anything the deploy will visibly change on the live site

## Guardrails

- Never force-push, never rewrite pushed history
- Never commit \`ga-analysis/output/\`, \`ga-analysis/service-account.json\`, \`.env*\`, or anything credential-shaped — even if explicitly staged by mistake
- If there is nothing in scope to commit, say so and stop — don't invent a commit
- Pushing is Rob's call: only invoke this flow when asked to push, and never chain into it automatically from other work
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
   - \`website/src/app/components/button/page.tsx\` — study the variant showcase grid structure (rows = states, columns = variants), the \`pageHeader\` block, \`introSection\`, and how \`PageLinks\` is used
   - \`website/src/app/components/button/page.module.css\` — CSS module structure

4. **Create \`website/src/app/components/<component-slug>/page.tsx\`:**
   - \`"use client"\` directive
   - Standard layout shell: \`Header\`, \`Sidebar\`, \`BlurBackground\`, \`Footer\`, \`PageLinks\`
   - \`pageHeader\` block with \`subDisplay\` ("Components") and \`pageTitle\` (component name)
   - \`introSection\` with an \`introBody\` paragraph — write a clear 1–2 sentence description of the component's purpose, inferred from its props and JSDoc if available
   - **Variant showcase grid**: render the component in every meaningful combination of its variants and states. For components with discrete variants × states (like Button), render a proper grid. For simpler components, render one example per meaningful state/variant.
   - Import the component: \`import { ComponentName } from "@design-system/components/ComponentName/ComponentName"\`
   - Include \`<PageLinks figmaUrl={...} storybookPath={...} />\` if URLs provided

5. **Create \`website/src/app/components/<component-slug>/page.module.css\`:**
   - Standard layout classes: \`dsLayout\`, \`dsContent\`, \`pageHeader\`, \`pageTitle\`, \`subDisplay\`, \`introSection\`, \`introBody\`
   - Any additional classes needed for the variant showcase grid
   - CSS custom properties only

6. **Create \`website/src/app/components/<component-slug>/layout.tsx\`:**
   - \`metadata.title\`: \`"ComponentName | robr0 DS"\`
   - \`metadata.description\`: same as \`introBody\` text

7. **Update \`website/src/config/navigation.ts\`:**
   - Find \`componentsSidebarLinks\` array
   - Add entry in alphabetical order: \`{ label: "Component Name", href: "/components/component-slug" }\`
   - If entry already exists, skip this step

8. **Check \`website/src/app/components/page.tsx\`** (the component gallery):
   - If the component is not already in the preview card grid, add it following the existing card pattern
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
  {
    slug: "growth-loop",
    name: "growth-loop",
    icon: "cycle",
    description:
      "Runs one analytics-driven copy experiment end to end: pulls GA4 data, filters bot noise, forms a falsifiable hypothesis about the words on a page, implements the change on a branch in a temporary worktree, verifies the build, and writes a problem / hypothesis / solution report for approval. The only skill here that also runs itself — every Monday, as the loop described on the Loops page.",
    invoke: ["run the growth loop", "/growth-loop"],
    content: `# growth-loop

Weekly GA-driven copy experiment loop for www.robertritacca.com (this repo's \`website/\` deploys there via Vercel). Each run: analyze last month's GA data, find ONE copy problem, form a hypothesis, implement the fix on a local branch, and write a clear report for the user to approve. **Never push, merge, or deploy — the user approves every change.**

## When invoked

Run when asked to "run the growth loop" (\`/growth-loop\`) or by the \`growth-loop-weekly\` scheduled task.

## Scope guardrails (read first)

- **Copy only.** Headlines, body text, CTA/link labels, button text, page \`metadata\` titles/descriptions — all inside \`website/src\`. No CSS, no layout, no component structure, no new components, no dependencies.
- **One focused change per run.** One page, or one copy element (e.g. the same CTA wording) across a few pages. A reviewer should be able to read the diff in under two minutes.
- **Local branch only.** Never \`git push\`, never merge, never touch the user's checked-out branch or working tree (use a worktree — see step 4).
- Never read into version control or modify \`ga-analysis/service-account.json\` or \`ga-analysis/output/\`.

## The loop

### 0. Close the previous loop

Read the newest report in \`ga-analysis/loop-reports/\` (git-ignored, local-only). If a previous experiment was approved/merged, check whether its metric moved in this run's data and record the verdict (improved / no change / worse / too early to tell) in this run's report. If the previous branch was never merged, note that instead and don't count it as tested. Don't re-run a hypothesis a previous report already tested unless the report says the change was never merged.

### 1. Pull the data

\`\`\`bash
cd ~/Documents/Projects/design-system/ga-analysis && ./.venv/bin/python pull_ga.py --days 28
\`\`\`

Output lands in \`ga-analysis/output/all.json\`. If the venv is missing: \`python3 -m venv .venv && ./.venv/bin/pip install -q -r requirements.txt\`. FutureWarnings are harmless.

### 2. Analyze — with the ga-report skill's judgment calls

Apply every gotcha from the \`ga-report\` skill (\`~/.claude/skills/ga-report/SKILL.md\`):
- Subtract bot traffic (historically Singapore at ~4% engagement; spam referrers \`ddvvff.org\`, \`snucm.com\`) before drawing conclusions.
- Sum pages by \`pagePath\`, not \`pageTitle\` (titles are fragmented from past SEO edits).
- High Direct (~75%) is normal dark social, not a problem.
- Component gallery pages naturally have short dwell — don't flag that.

Look for **copy-shaped problems**, e.g.: a high-traffic landing page with weak engagement or dwell; strong entry pages that don't lead anywhere (missing/weak CTA copy); case studies with good dwell but low reach (weak titles/descriptions); a mismatch between what a traffic source promises and what the page's headline says.

### 3. Pick ONE problem and write the hypothesis

The hypothesis must be falsifiable and name its metric:
> If we [specific copy change], then [specific metric for a specific page/segment] should [direction] over the next few weeks, because [reasoning grounded in the data].

If the data doesn't support a confident copy hypothesis this week, **say so and stop** — a no-op run with a short "nothing worth changing" report is a valid outcome. Don't invent a change to have something to ship.

### 4. Implement on a branch (via worktree)

Work in a temporary worktree so the user's working tree is untouched:

\`\`\`bash
REPO=~/Documents/Projects/design-system
WT=$REPO/../.growth-loop-worktree
BRANCH=growth/$(date +%F)-<short-slug>
git -C $REPO worktree add "$WT" -b "$BRANCH" main
\`\`\`

Make the copy edits in \`$WT/website/src/...\`, then verify the build without reinstalling deps:

\`\`\`bash
ln -s $REPO/node_modules "$WT/node_modules"
ln -s $REPO/website/node_modules "$WT/website/node_modules"
cd "$WT/website" && npm run build
\`\`\`

If the build fails because of your edit, fix it. Then commit in the worktree (conventional message, e.g. \`experiment(growth): reword /work CTA — hypothesis in loop report 2026-07-20\`) and clean up:

\`\`\`bash
rm "$WT/node_modules" "$WT/website/node_modules"
git -C $REPO worktree remove "$WT"
\`\`\`

The branch survives worktree removal and is ready for the user to review.

### 5. Write the report

Save to \`ga-analysis/loop-reports/YYYY-MM-DD.md\` **and** repeat it in full in the final message to the user. Plain English — the user is a designer, no analytics jargon. Format:

\`\`\`markdown
# Growth loop — YYYY-MM-DD

## Last week's experiment
[Verdict on the previous change, or "none / not merged".]

## The problem
[What the data shows, with the actual numbers, after bot filtering.]

## The hypothesis
If we ..., then ... should ..., because ...

## The change (branch: growth/YYYY-MM-DD-slug)
[File(s) touched. Before → after for every copy string changed.]

## How we'll know
[Which metric to look at next run, and roughly what movement would count as a win.]
\`\`\`

### 6. Hand off for approval

End by telling the user: the branch name, that the build passed, and that nothing is pushed or deployed. To approve they merge the branch (or ask Claude to open a PR); to reject they delete the branch. That's the whole approval step.
`,
  },
  {
    slug: "ga-report",
    name: "ga-report",
    icon: "query_stats",
    description:
      "Pulls GA4 data for this site and analyzes it in plain English — with the judgment calls baked in: which traffic is bots, why page titles fragment, and which numbers are normal for a portfolio rather than problems. Lives in my personal skills folder rather than the repo, because it encodes analytics context instead of codebase conventions.",
    invoke: ["GA report", "how's the site doing", "site traffic analysis"],
    content: `---
name: ga-report
description: Pull Google Analytics (GA4) data for robertritacca.com and analyze it in plain English. Use when the user asks for a GA report, site traffic analysis, analytics summary, "how's the site doing", visitor/pageview breakdown, or to refresh GA numbers.
---

# GA report

Pulls GA4 data for **www.robertritacca.com** (property \`•••••••••\`) via the
\`ga-analysis/pull_ga.py\` script, then analyzes it in plain, non-jargon English.

## Where things live

- Script + venv: \`~/Documents/Projects/design-system/ga-analysis/\`
- Runner: \`./.venv/bin/python pull_ga.py\`
- Output: \`ga-analysis/output/all.json\` (+ one CSV per report). Git-ignored.
- Credentials: \`ga-analysis/service-account.json\` (git-ignored; already set up).

## Steps

1. **Pick a window.** If the user gave one (e.g. "last month", "this week", "90 days"),
   use it. Otherwise default to \`--days 30\`. The script accepts \`--days N\` or
   \`--start YYYY-MM-DD --end YYYY-MM-DD\`.

2. **Run the pull** from the ga-analysis folder:
   \`\`\`bash
   cd ~/Documents/Projects/design-system/ga-analysis && ./.venv/bin/python pull_ga.py --days 30
   \`\`\`
   If the venv is missing, create it first:
   \`\`\`bash
   python3 -m venv .venv && ./.venv/bin/pip install -q -r requirements.txt
   \`\`\`
   The Python-version FutureWarnings are harmless — ignore them.

3. **Read the data.** Load \`ga-analysis/output/all.json\`. It's large; if it exceeds
   the read cap, use a small Python snippet with the venv interpreter to compute
   aggregates instead of reading the whole file. Reports included: \`daily_trend\`,
   \`channels\`, \`top_pages\`, \`countries\`, \`devices\`, \`sources\`, \`landing_pages\`, \`events\`.

4. **Analyze in plain English.** Lead with what matters, not raw dumps. Cover:
   - Headline: total users, % new, sessions, pageviews, pages/session, engaged %.
   - Traffic sources (channels + the \`sources\` detail — call out LinkedIn / Medium /
     Reddit / Google / any AI-assistant referral by name).
   - Best content (top_pages) with dwell time — case studies are the important ones;
     component gallery pages naturally have short dwell, don't flag that as a problem.
   - Geography + device split.

## Judgment calls / gotchas (apply these every time)

- **Bot / junk traffic:** flag any country or source with high user count but very low
  engagement rate (historically **Singapore ~4%** engaged = bots). Spam referrers seen:
  \`ddvvff.org\`, \`snucm.com\`. Subtract these when stating the "real" audience size.
- **Page-title fragmentation:** the same URL (e.g. \`/\` or \`/work\`) appears under several
  different \`pageTitle\` values because of past SEO/metadata edits. Sum by \`pagePath\`,
  don't treat each title as a separate page.
- **Direct is usually high (~75%)** for this portfolio — that's dark social (LinkedIn app,
  DMs, résumé links), not an error.
- **Mobile engagement** tends to run lower than desktop here — worth mentioning if the gap
  is large.

## Output

A tight written summary (the user is a designer, not an analyst — no acronym soup).
Offer, but don't auto-run: charting it as a visual, or filtering bots in GA.
Never commit \`output/\` or \`service-account.json\`.
`,
  },
];

/* ============================================
   PAGE
   ============================================ */

export default function SkillsPage() {
  return (
    <>
      <BlurBackground />

      <MegaNav />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          <PageBreadcrumb />
          {/* Page Header */}
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Skills</h1>
          </div>

          {/* Intro */}
          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              Reusable AI instructions, tuned for this project
            </p>
            <p className={styles.introBody}>
              These {SKILL_COUNT} skill files live in{" "}
              <code className={styles.inlineCode}>.claude/skills/</code> — most in this
              repo, one (<code className={styles.inlineCode}>ga-report</code>) in my
              personal skills folder — and encode this project&apos;s conventions:
              component patterns, token rules, navigation wiring, and more. Invoke any
              skill by name in Claude Code and it follows the exact steps without
              re-explanation each session. Expand any skill to read the full file, and
              copy it to adapt it for your own project. One of them even runs on its own schedule — see{" "}
              <Link href="/loops" className={styles.introLink}>Loops</Link>.
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
                </div>

                <p className={styles.skillDescription}>{skill.description}</p>

                <CodeBlock
                  code={skill.content}
                  filename={`${skill.slug}.md`}
                  language="md"
                  collapsible
                  defaultCollapsed
                  maxHeight={300}
                />

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
