---
name: design-system-project
description: "Rob's portfolio \"design-system\" repo — structure, how to run, and Vercel deploy"
metadata: 
  node_type: memory
  type: project
  originSessionId: bdb3e7c6-f534-4a96-838b-06344412181d
---

Rob Ritacca (GitHub `robritacca-dotcom`) builds his portfolio site in repo **design-system**, cloned to `~/Documents/Projects/design-system`. He develops across two computers, syncing through GitHub (push/pull on `main`).

Structure: a React 19 + TypeScript **design system** built with **Vite 7** at the root (42+ components, Storybook 10), plus the actual **portfolio website** as a **Next.js 16** app in `website/`.

Run locally:
- Root sandbox: `npm run dev` (Vite, :5173); `npm run storybook` (:6006)
- The site: `cd website && npm run dev` (Next, :3000) — verified working

**Deploy:** repo is already connected to **Vercel** with GitHub integration — pushing to `main` auto-deploys. No Vercel CLI needed. See [[dev-environment-setup]].

**Claude preview panel:** workspace root is the *parent* `~/Documents/Projects`, not the repo, so `~/Documents/Projects/.claude/launch.json` drives the preview. Because node is nvm-managed (not on the preview tool's PATH) and the preview sandbox blocks `/bin/sh` wrapper scripts ("Operation not permitted") and runs with cwd=workspace-root, configs must invoke binaries **directly via the absolute nvm node path** with absolute target dirs — e.g. website = `node website/node_modules/next/dist/bin/next dev <websiteDir>`. `npm run` fails because the `next` child shebang (`env node`) can't find node. Start with preview_start name="website" (port 3000).
