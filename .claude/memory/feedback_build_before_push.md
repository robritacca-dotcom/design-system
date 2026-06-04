---
name: feedback_build_before_push
description: Run the production build/lint before pushing — Vercel fails on ESLint errors that next dev ignores
metadata:
  type: feedback
---

Before pushing website changes, run the production build (`cd website && npm run build`, or at least `npm run lint`). Vercel deploys via `next build`, which runs ESLint and **fails the build on any error-level rule**. `next dev` and the Claude preview panel do NOT run that lint pass, so these slip through locally.

**Why:** Real case — commit `67f2aad` called `setTheme()` synchronously inside a `useLayoutEffect`, tripping React 19's `react-hooks/set-state-in-effect` (error). Dev mode was fine; the Vercel production build failed. Fixed in `e7ca0f8` by switching to `useSyncExternalStore`.

**How to apply:** Treat `next build` as the gate, not `next dev`. Common build-only failures: `react-hooks/set-state-in-effect`, `react-hooks/exhaustive-deps` (if escalated), `@next/next/no-img-element`, TypeScript errors. Vercel CLI is linked to `robritacca-gmailcoms-projects/robr0-ds` — use `vercel inspect <url> --logs` for runtime logs; build logs live in the dashboard's Logs tab. See [[design-system-project]] and [[feedback_storybook_autodocs]].
