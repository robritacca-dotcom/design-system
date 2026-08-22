---
name: visual-review
description: Start the website dev server and screenshot pages in both light and dark mode, at desktop and mobile widths, to catch visual issues. Use when asked to visually review changes, check light and dark mode, or screenshot pages.
icon: preview
displayDescription: "Opens the site in a browser preview, drives each page through both light and dark mode at desktop and mobile widths, and screenshots them. Checks for invisible text, broken layouts, overflow, and stuck hover states, then reports findings or confirms all clear."
invoke: ["check how this looks","review light and dark","visual check","screenshot the page"]
---

# visual-review

Start the website dev server and screenshot pages in both light and dark mode, at desktop and mobile widths, to catch visual issues.

## When invoked

Use this skill when asked to visually review changes — phrases like "check how this looks", "review light and dark", "does this look right", "screenshot the page", "visual check".

## Instructions

Use the browser/preview tools available in the current environment for every step below — this skill describes *what* to do; map it to whatever tools the harness currently provides. Never launch the dev server through a raw shell command.

1. **Determine which URLs to review.** If not specified, default to the page(s) most recently modified in the current conversation. Ask if unclear.

2. **Open the website's Next.js dev server** (the `website` configuration in `.claude/launch.json`; port 3000 by default, but the config sets `autoPort`, so read the URL the preview actually reports rather than assuming 3000) in the browser preview and wait for it to be ready.

3. **For each URL, check both themes at both viewports.** The site's theme is driven by the `data-theme` attribute on `<html>` — not by `prefers-color-scheme`, so forcing the browser's colour scheme does nothing. To switch: click the theme toggle in the top nav (`MegaNav`, top-right), or set the attribute programmatically. Verify the attribute actually changed before screenshotting, then take a screenshot in each theme. Repeat at a mobile viewport (~375px wide — mobile is a first-class surface: type and spacing collapse at the token layer, and navigation moves into a drawer): screenshot both themes there too, and on at least one page open the drawer nav, expand a section, and screenshot it open. The site chat has three geometries and the default desktop width shows the least interesting one: below 720px it is a full-viewport takeover with its own stacked welcome screen, between 720 and 1439px a floating modal panel, and from 1440px a docked panel that insets the whole page beside it. On at least one page, open the chat at the mobile width and at a width of 1440px or more and screenshot both — the docked form is the one that moves the page, so a layout that survives 1280px can still break there.

4. **Examine each screenshot for:**
   - Text that is invisible or the same colour as its background
   - Components that appear broken, overflow their container, or clip
   - Spacing that looks inconsistent or misaligned compared to other pages
   - Hover/focus states that appear stuck in an active state
   - Images or assets that failed to load (broken image icons)
   - Any layout that differs unexpectedly between light and dark
   - At mobile width: horizontal overflow (a page that scrolls sideways), content clipped by the viewport, and drawer navigation that fails to open, scroll, or close

5. **Report findings** concisely:
   - Format: `[URL] [dark|light] [desktop|mobile] — description of issue`
   - If no issues found, say: `[URL] — looks correct in both themes at both widths`

6. **Stop the preview server** when all pages are reviewed, unless the session is still using it.

## Key context

- Theme state lives on `document.documentElement` as `data-theme="light"` or `data-theme="dark"`; it persists via the localStorage key `theme` and is applied before first paint by an inline script in the root layout
- The theme toggle is rendered by `MegaNav` (top-right of every page)
- The sitemap footer (`SiteFooter`) and the chat button/panel are site chrome mounted once from the root layout, not per page — expect both in every screenshot's lower region (the chat as a floating button when closed; open, it is a takeover on phones, a modal panel on mid widths, and a docked panel from 1440px that pads the page to make room — see step 3). On the mobile pass, check the footer's collapse: a brand block beside four link columns at desktop, then 3 columns and 2 as the width drops, with the brand block leaving the row and sitting above the links at the same 960px breakpoint the page's nav rail disappears at. The footer is identical on every page, so a difference between two pages is a finding; the brand block's width matching the rail is deliberate, not a coincidence to report
- The routes in `CHROMELESS_ROUTES` (`website/src/config/chromeless.ts`) deliberately render neither the footer nor the chat — their absence there is not a finding
- The `animate-in` class on page elements triggers CSS entry animations — these are normal on first load
- The ambient background (`BlurBackground`) is layout-mounted chrome too, and it is the largest thing in every screenshot. Three of its behaviours produce **false findings** if you do not expect them:
  - **It has two renderers.** A WebGL2 field normally, the CSS blobs underneath as the fallback. Which one you capture depends on the machine's GPU, so the same page can legitimately screenshot two different ways on two runs. A background that differs between runs is not a finding; a *broken-looking* one is.
  - **There is a moment with no background at all.** While the renderer resolves, the blobs are hidden and the canvas has not faded in. A screenshot caught in those first frames shows bare page floor. Let the page settle before capturing.
  - **Most pages get a 450px band, not a full screen.** Only pages rendering `FullBleedBackground` fill the viewport; grep `FullBleedBackground` under `website/src/app` for the current set rather than trusting a list here. Judge each page against its own variant.
- To rule the background in or out of a finding, `?tune=1` on any page in dev opens its control panel, which reports the live renderer and lets you A/B the shader against the CSS blobs
