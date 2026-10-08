---
name: pre-deploy
description: Run the full local verify (lint, the site build with its generators and validators, the built-HTML validators, and the served-site checks) and confirm the site is safe to push to Vercel. Use when asked whether changes are ready to push, deploy, or ship, or for a pre-deploy check.
icon: rocket_launch
displayDescription: "Runs the same checks as CI before a push to Vercel: lint, the site build (Next.js) with the generators and validators that run ahead of it, the validators that read the built HTML, and the served-site checks: a hydration smoke in a real browser and a page-level axe pass in both themes. Knows the npm-workspace layout and watches for SSR-unsafe code, portal regressions, and static generation failures."
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
   This is the single source of truth for local checks and mirrors the CI job in `.github/workflows/ci.yml`, minus the CI-only checks CLAUDE.md's **CI & Local Verify** section records as deliberate exceptions (its list is authoritative), so a green verify can still meet a red CI on news from outside, like a fresh advisory. It runs lint, then the site build, and then the checks that need the finished build rather than source; the `verify` entry in the root `package.json` is the authoritative list. Some read the prerendered HTML (a space lost between JSX and render, say, or an href pointing at a route that no longer exists); the rest serve the build and load it in a real browser: hydration must succeed and every checked page must be visible with content, because a build can be green while the rendered site is blank (the hydration smoke's doc block records the outage that proved it), and the served pages must pass axe in both themes. That is why all of them follow the build instead of riding the registry chain. The registry validators run via the website's `prebuild` hook, so a registry-drift failure surfaces before the compile even starts. The `validate-registry` entry in the root `package.json` is the authoritative list of what runs; read the failing script's own doc block for what it guards, because the failures do not share a family resemblance: one means an unregistered case study, another that a prose edit removed a fact the chat eval depends on (`validate-chat-coverage.mjs`), another that the ambient background references a colour token that no longer exists (`validate-shader-background.mjs`). This list used to be enumerated here and went stale more than once; a pointer cannot. The prebuild also regenerates the derived surfaces owned by the `validate-registry` chain (the generator scripts at the front of its entry in the root `package.json` are the authoritative list); if any come out modified, commit them with the work that changed their source.

   Note: the repo is an npm workspace: one `npm install` at the root covers the website too, and the design system is the published `rift-ds` package, installed from npm like any other dependency. The website build is a plain `next build`; there is no separate install step inside `website/`.

2. **Check the output of each step for:**

   **Lint failures:**
   - Any ESLint `error` lines (warnings don't fail the run, but mention them)

   **TypeScript errors:**
   - Any `error TS` lines
   - Type mismatches, missing props, invalid imports

   **Next.js-specific issues:**
   - `"use client"` missing on components that use browser APIs (`window`, `document`, `localStorage`, `useEffect`, `useState`, etc.)
   - SSR-unsafe code running outside client guards — particularly watch `website/src/app/layout.tsx` (the inline `themeScript`)
   - Portal/modal components that reference `document` at module or render scope — these have caused past static-build failures (portal-based components have needed fixes before; watch for regressions when the `rift-ds` package is upgraded)
   - Pages that fail static generation (look for `Error occurred prerendering page`)

   **General failures:**
   - Any non-zero exit code
   - `Build failed` or `Compiled with errors`

3. **Report result:**

   If everything passes:
   > Verify passed (lint, the build with its validators, the built-HTML validators, and the served-site checks). Safe to push.

   **Visual regressions are the one thing `verify` cannot see.** There is no automated visual gate in this repo: Chromatic snapshotted Storybook, and Storybook went to the design system's repo with the library. If the change touched layout or styling, offer a `visual-review` pass instead.

   If any step fails, show:
   - Which step failed (lint, the build and its prebuild validators, or one of the checks that run after it — the built-HTML validators or the served-site checks; the tail of the `verify` entry in the root `package.json` is the authoritative list)
   - If the **served-site axe pass** failed, say which rule and on which page. An axe failure names the rule (e.g. `button-name`, `nested-interactive`) and the offending markup; contrast is deliberately excluded from the gate.
   - The exact error message(s)
   - File path and line number if available
   - A brief diagnosis of likely cause

4. **Do not push** — this skill only checks and reports. Pushing is Rob's decision.
