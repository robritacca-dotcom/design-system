/**
 * Routes that render none of the shared site chrome (footer, chat panel,
 * command palette):
 * the animated-logo page is a full-viewport piece with no room for chrome;
 * and the covers page is a blank staging surface for vector mocks, where any
 * shared chrome would sit on top of the frames being reviewed — as is
 * /covers/render, the surface the cover images are shot from, where a footer
 * or chat panel would land inside the screenshot.
 *
 * This list was long when the design system lived here: the playground, the
 * dependency graph, the canvas board, the labs rebuilds and the template
 * screens were all immersive full-viewport surfaces. They went to rift-ds.com
 * with the system, and scripts/validate-route-config.mjs now holds every
 * entry to a route that exists.
 *
 * Matching is exact, so a nested route needs its own entry.
 */
export const CHROMELESS_ROUTES = new Set([
  "/rr-animated",
  "/covers",
  "/covers/render",
]);
