# visual-review

Start the website dev server and screenshot pages in both light and dark mode to catch visual issues.

## When invoked

Use this skill when asked to visually review changes — phrases like "check how this looks", "review light and dark", "does this look right", "screenshot the page", "visual check".

## Instructions

1. **Determine which URLs to review.** If not specified, default to the page(s) most recently modified in the current conversation. Ask if unclear.

2. **Start the preview server** using `preview_start` targeting the `website/` directory (Next.js dev server, port 3000). Wait for it to be ready.

3. **For each URL to review**, do the following in order:

   **Dark mode check:**
   - Navigate to the URL
   - Verify `data-theme="dark"` is present on `<html>` (use `preview_eval`: `document.documentElement.getAttribute('data-theme')`)
   - If it's `"light"`, click the ThemeToggle button (it's in the Header — use `preview_snapshot` to find it, then `preview_click`)
   - Take a screenshot with `preview_screenshot`

   **Light mode check:**
   - Click the ThemeToggle to switch to light mode
   - Verify `data-theme="light"` on `<html>`
   - Take a screenshot with `preview_screenshot`

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

6. **Stop the preview server** with `preview_stop` when all pages are reviewed.

## Key context

- Theme state is stored on `document.documentElement` as `data-theme="light"` or `data-theme="dark"`
- Theme persists via localStorage key `theme` and a cookie
- The ThemeToggle component is always in the `<Header>` at the top of every page
- The `animate-in` class on page elements triggers CSS entry animations — these are normal on first load
