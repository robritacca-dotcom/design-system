---
name: pre-deploy
description: Run the full local verify (lint, library build, story tests, Storybook build, website build) and confirm the site is safe to push to Vercel. Use when asked whether changes are ready to push, deploy, or ship, or for a pre-deploy check.
icon: rocket_launch
displayDescription: "Runs the same checks as CI — lint, the component library build (Vite + TypeScript), every Storybook story as a render test (Vitest + headless Chromium), the Storybook build, and the website build (Next.js) — before a push to Vercel. Knows the non-standard monorepo build order and watches for SSR-unsafe code, portal regressions, and static generation failures."
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
   This is the single source of truth for local checks and mirrors the CI jobs in `.github/workflows/ci.yml`. It runs, in order: ESLint, the library build, the story tests (every Storybook story rendered in headless Chromium), the Storybook build, and the website build. The registry validators run via the builds' `prebuild` hooks — a registry-drift failure (unregistered component or skill, stale generated skills content, README Tech versions out of step with package.json) surfaces before the compiles even start. The prebuild also regenerates the README's component count/list from the registry — if `README.md` comes out modified, commit it with the work that changed the registry.

   Note: the website build script does `cd .. && npm install --include=dev` first (monorepo alias setup) before running Next.js. This is expected and normal.

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
   > Verify passed (lint + story tests + library, Storybook, and website builds). Safe to push.

   If any step fails, show:
   - Which step failed (lint, component library, story tests, Storybook, or website)
   - The exact error message(s)
   - File path and line number if available
   - A brief diagnosis of likely cause

4. **Do not push** — this skill only checks and reports. Pushing is Rob's decision.
