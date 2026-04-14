# api-consistency

Review component prop interfaces across the design system for naming inconsistencies, missing standard props, and pattern violations.

## When invoked

Use this skill when asked to review component APIs, check prop naming consistency, or audit TypeScript interfaces — phrases like "review component APIs", "prop consistency audit", "are our component props consistent", "check for API inconsistencies".

## Instructions

1. **Determine scope.** Accept one of:
   - A list of specific components (e.g. `Button, IconButton, CircularButton`) → compare those
   - `all` → scan all components in `src/components/`
   - A category description (e.g. "all button-like components", "all form inputs") → infer the relevant components

2. **Read every component's TypeScript interface.** For each `.tsx` file in scope, extract:
   - All prop names, types, and whether they are required or optional
   - Default values (from destructuring defaults in the function signature)

3. **Check for these specific inconsistencies:**

   **Boolean prop naming:**
   - Should follow `is*`/`has*` convention OR plain adjective — not both (e.g. `isDisabled` on one component, `disabled` on another doing the same thing)
   - Flag: mixed usage within the same component family

   **Event handler naming:**
   - Must be `on*` (e.g. `onClick`, `onChange`, `onDismiss`)
   - Flag: `handleClick`, `clickHandler`, `onClickHandler`, or similar

   **Content prop naming:**
   - `label` for display text, `children` for slot content
   - Flag: `text`, `title`, `copy`, `content` used interchangeably across components for the same purpose

   **Size enum values:**
   - Should use a consistent vocabulary across components
   - Flag: `"sm"/"md"/"lg"` on one component and `"small"/"medium"/"large"` on another, or `"compact"/"default"` on one and `"small"/"medium"` on another

   **Missing standard props on interactive components:**
   - All components rendering clickable/interactive elements should have `className?: string`
   - All components with visual disabled states should have `disabled?: boolean`
   - All form-like components should have `id?: string` and `name?: string`

   **Family consistency:**
   - Components in the same family (e.g. Button / IconButton / CircularButton) should share `size` enum values
   - If one component accepts `iconLeft`/`iconRight`, siblings in the same family should follow the same pattern
   - Default values: if `size` defaults to `"default"` on Button, it should not default to `"medium"` on a related component

4. **Output a grouped findings report:**

   ```
   ## API Consistency Report

   ### Boolean prop naming
   - Button: uses `disabled` (plain adjective)
   - ToggleSwitch: uses `isDisabled` (is* prefix)
   → Standardise to `disabled` across all interactive components

   ### Size enum values
   - Button: "compact" | "default" | "large"
   - Slider: "small" | "medium" | "large"
   → Standardise to Button's enum (it is the most-used component)

   ### Missing className prop
   - DatePicker — no className passthrough
   - Carousel — no className passthrough

   ### Summary
   X naming inconsistencies · Y missing props · Z structural mismatches
   ```

5. **Prioritise fixes** by impact:
   - **High:** Renames that would require consuming code changes — flag these clearly so Rob can decide whether to batch into a breaking release
   - **Medium:** Missing props that are commonly needed by consumers
   - **Low:** Style preferences with no breaking impact
