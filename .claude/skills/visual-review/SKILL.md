---
name: visual-review
description: Start the website dev server and screenshot pages in both light and dark mode to catch visual issues. Use when asked to visually review changes, check light and dark mode, or screenshot pages.
icon: preview
displayDescription: "Opens the site in a browser preview, drives each page through both light and dark mode, and screenshots them. Checks for invisible text, broken layouts, overflow, and stuck hover states, then reports findings or confirms all clear."
invoke: ["check how this looks","review light and dark","visual check","screenshot the page"]
---

# visual-review

Start the website dev server and screenshot pages in both light and dark mode to catch visual issues.

## When invoked

Use this skill when asked to visually review changes — phrases like "check how this looks", "review light and dark", "does this look right", "screenshot the page", "visual check".

## Instructions

Use the browser/preview tools available in the current environment for every step below — this skill describes *what* to do; map it to whatever tools the harness currently provides. Never launch the dev server through a raw shell command.

1. **Determine which URLs to review.** If not specified, default to the page(s) most recently modified in the current conversation. Ask if unclear.

2. **Open the website's Next.js dev server** (the `website/` project, port 3000) in the browser preview and wait for it to be ready.

3. **For each URL, check both themes.** The site's theme is driven by the `data-theme` attribute on `<html>` — not by `prefers-color-scheme`, so forcing the browser's colour scheme does nothing. To switch: click the theme toggle in the top nav (`MegaNav`, top-right), or set the attribute programmatically. Verify the attribute actually changed before screenshotting, then take a screenshot in each theme.

4. **Examine each screenshot for:**
   - Text that is invisible or the same colour as its background
   - Components that appear broken, overflow their container, or clip
   - Spacing that looks inconsistent or misaligned compared to other pages
   - Hover/focus states that appear stuck in an active state
   - Images or assets that failed to load (broken image icons)
   - Any layout that differs unexpectedly between light and dark

5. **Report findings** concisely:
   - Format: `[URL] [dark|light] — description of issue`
   - If no issues found, say: `[URL] — looks correct in both themes`

6. **Stop the preview server** when all pages are reviewed, unless the session is still using it.

## Key context

- Theme state lives on `document.documentElement` as `data-theme="light"` or `data-theme="dark"`; it persists via the localStorage key `theme` and is applied before first paint by an inline script in the root layout
- The theme toggle is rendered by `MegaNav` (top-right of every page)
- The `animate-in` class on page elements triggers CSS entry animations — these are normal on first load
