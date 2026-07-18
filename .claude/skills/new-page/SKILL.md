---
name: new-page
description: Add a new page to the website with the standard layout shell and correct navigation wiring. Use when asked to add or create a new page on the site.
---

# new-page

Add a new page to the website with the standard layout shell and correct navigation wiring.

## When invoked

Use this skill when asked to add or create a new page on the website — phrases like "add a page for [X]", "create a [section] page", "add [X] to the site".

## Instructions

1. **Gather requirements** if not already provided:
   - Page URL path (e.g. `/foundations/motion`)
   - Section: `Components` | `Foundations` | `About` (determines which sidebar)
   - Page title and one-sentence description (for metadata and page header)
   - Figma URL (optional) and Storybook path (optional) — for `PageLinks`

2. **Read these reference files before writing anything:**
   - `website/src/app/components/button/page.tsx` — gold-standard page structure
   - `website/src/app/components/button/page.module.css` — CSS module reference
   - `website/src/app/components/button/layout.tsx` — metadata reference
   - `website/src/config/navigation.ts` — navigation config (single source of truth)

3. **Create the directory** `website/src/app/<path>/` with three files:

### File 1: `page.tsx`
- `"use client"` directive at top
- Standard imports: `Header`, `Sidebar`, `BlurBackground`, `Footer`, `PageLinks` from `@/components/`
- Import `styles` from `./page.module.css`
- Import `getNavLinks`, `getSidebarLinks`, and the correct section sidebar links array from `@/config/navigation`
- Page structure:
  ```
  <div className={styles.dsLayout}>
    <Header links={getNavLinks(...)} />
    <BlurBackground />
    <Sidebar links={getSidebarLinks(sectionSidebarLinks, "/current/path")} />
    <main className={styles.dsContent}>
      <div className={styles.pageHeader}>
        <p className={`${styles.subDisplay} animate-in`}>Section label</p>
        <h1 className={`${styles.pageTitle} animate-in`}>Page Title</h1>
      </div>
      <div className={`${styles.introSection} animate-in`}>
        <p className={styles.introBody}>Introductory description.</p>
      </div>
      {/* Page content goes here */}
    </main>
    <Footer />
  </div>
  ```
- Include `<PageLinks figmaUrl={...} storybookPath={...} />` if URLs are available

### File 2: `page.module.css`
- Must include: `dsLayout`, `dsContent`, `pageHeader`, `pageTitle`, `subDisplay`, `introSection`, `introBody`
- CSS custom properties only — no hardcoded values
- Match the structure from the Button page module CSS

### File 3: `layout.tsx`
- Exports `metadata` with `title` and `description`
- `title` format: `"Page Title | robr0 DS"`
- Exports default `Layout` component wrapping `{children}` in a fragment

4. **Update `website/src/config/navigation.ts`:**
   - Find the correct sidebar links array for the section (`componentsSidebarLinks`, `foundationsSidebarLinks`, `aboutSidebarLinks`)
   - Add the new entry in alphabetical order by label
   - Entry format: `{ label: "Page Title", href: "/path/to/page" }`

5. **If this is a component page**, also add the component to the preview card grid in `website/src/app/components/page.tsx` — find the existing card list and add a new entry matching the format.
