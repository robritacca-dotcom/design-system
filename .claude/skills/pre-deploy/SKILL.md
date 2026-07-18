---
name: pre-deploy
description: Run both builds (component library and website) and confirm the site is safe to push to Vercel. Use when asked whether changes are ready to push, deploy, or ship, or for a pre-deploy check.
icon: rocket_launch
displayDescription: "Runs both the component library build (Vite + TypeScript) and the website build (Next.js) before a push to Vercel. Knows the non-standard monorepo build order and watches for SSR-unsafe code, portal regressions, and static generation failures."
invoke: ["is this ready to push?","run the build","pre-deploy check","check before I push"]
---

# pre-deploy

Run both builds and confirm the site is safe to push to Vercel.

## When invoked

Use this skill when asked to check if changes are ready to push, deploy, or ship — phrases like "is this ready to push?", "run the build", "pre-deploy check", "check before I push".

## Instructions

1. **Run the component library build** from the repo root:
   ```
   npm run build
   ```
   This runs the registry validators (`prebuild`), then TypeScript type-checking + Vite build. Capture all output — a registry-drift failure (unregistered component or skill, stale generated skills content) surfaces here before the compile even starts.

2. **Run the website build** from the `website/` directory:
   ```
   cd website && npm run build
   ```
   Note: the website build script does `cd .. && npm install --include=dev` first (monorepo alias setup) before running Next.js. This is expected and normal.

3. **For each build, check output for:**

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

4. **Report result:**

   If both pass:
   > Both builds succeeded. Safe to push.

   If either fails, show:
   - Which build failed (component library or website)
   - The exact error message(s)
   - File path and line number if available
   - A brief diagnosis of likely cause

5. **Do not push** — this skill only builds and reports. Pushing is Rob's decision.
