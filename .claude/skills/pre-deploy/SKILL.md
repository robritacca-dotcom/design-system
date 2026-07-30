---
name: pre-deploy
description: Run the full local verify (lint, library build, story tests, Storybook build, website lint, website build) and confirm the site is safe to push to Vercel. Use when asked whether changes are ready to push, deploy, or ship, or for a pre-deploy check.
icon: rocket_launch
displayDescription: "Runs the same checks as CI before a push to Vercel: lint, the library type-check, the publishable npm package build, every Storybook story as a render *and* accessibility test (Vitest + headless Chromium + axe), the Storybook build, and the website lint + build (Next.js). Knows the npm-workspace layout and watches for SSR-unsafe code, portal regressions, and static generation failures."
invoke: ["is this ready to push?","run the build","pre-deploy check","check before I push"]
---

# pre-deploy

Run the full local verify and confirm the site is safe to push to Vercel.

## When invoked

Use this skill when asked to check if changes are ready to push, deploy, or ship — phrases like "is this ready to push?", "run the build", "pre-deploy check", "check before I push".

## Instructions

1. **Run the full verify** from the repo root:
   ```
   npm run verify
   ```
   This is the single source of truth for local checks and mirrors the CI jobs in `.github/workflows/ci.yml`. It runs, in order: ESLint, the library type-check, the publishable package build (`build:lib` — vite lib mode + d.ts into `dist/`), the story tests (every Storybook story rendered in headless Chromium, **with axe asserting WCAG 2.1 AA on each one** — an accessibility violation fails the suite exactly like a render error), the Storybook build, the website lint, and the website build. The registry validators run via the builds' `prebuild` hooks — a registry-drift failure (unregistered component or skill, stale generated skills content or barrels, README Tech versions out of step with package.json, package exports out of sync with `scripts/package-manifest.mjs`) surfaces before the compiles even start. The prebuild also regenerates the derived surfaces owned by the `validate-registry` chain (the generator scripts at the front of its entry in the root `package.json` are the authoritative list) — if any come out modified, commit them with the work that changed their source.

   Note: the repo is an npm workspace — one `npm install` at the root covers the website too, and the website resolves `@robr0/design-system` through a symlink to the repo root. The website build is a plain `next build`; there is no separate install step inside `website/`.

2. **Check the output of each step for:**

   **Lint failures:**
   - Any ESLint `error` lines (warnings don't fail the run, but mention them)

   **TypeScript errors:**
   - Any `error TS` lines
   - Type mismatches, missing props, invalid imports

   **Next.js-specific issues:**
   - `"use client"` missing on components that use browser APIs (`window`, `document`, `localStorage`, `useEffect`, `useState`, etc.)
   - SSR-unsafe code running outside client guards — particularly watch `website/src/app/layout.tsx` (the inline `themeScript`)
   - Portal/modal components that reference `document` at module or render scope — these have caused past static-build failures (AlertDialog and Toast both needed fixes; watch for regressions if portal-based components change)
   - Pages that fail static generation (look for `Error occurred prerendering page`)

   **General failures:**
   - Any non-zero exit code
   - `Build failed` or `Compiled with errors`

3. **Report result:**

   If everything passes:
   > Verify passed (lint + story tests + library, package, Storybook, and website builds). Safe to push.

   **If the change touched component CSS, `src/tokens/`, or `.storybook/`, also dispatch the Chromatic workflow** (`gh workflow run chromatic.yml`) and check the diff before or right after pushing — visual regressions are the one thing `verify` cannot see, and Chromatic is deliberately not part of it because every run bills cloud snapshots against a monthly budget. Text-only, script-only, or website-prose changes don't need a run.

   If any step fails, show:
   - Which step failed (lint, component library, story tests, Storybook, website lint, or website build)
   - If **story tests** failed, say whether it was a render error or an **a11y violation** — they surface identically but are fixed differently. An axe failure names the rule (e.g. `button-name`, `nested-interactive`) and the offending markup; contrast is deliberately excluded from the gate, so a contrast complaint means someone re-enabled `color-contrast` in `.storybook/preview.ts`
   - The exact error message(s)
   - File path and line number if available
   - A brief diagnosis of likely cause

4. **Do not push** — this skill only checks and reports. Pushing is Rob's decision.
