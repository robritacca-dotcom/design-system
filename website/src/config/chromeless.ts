/**
 * Routes that render none of the shared site chrome (footer, chat panel):
 * the playground is an immersive tool — a slim toolbar and an edge panel
 * over a centred stage — whose Chat view hosts its own copy of the widget
 * (two live widgets would double-bill and confuse QA); and the
 * animated-logo page is a full-viewport piece with no room for chrome; and
 * the covers page is a blank staging surface for vector mocks, where any
 * shared chrome would sit on top of the frames being reviewed.
 */
export const CHROMELESS_ROUTES = new Set([
  "/playground",
  "/rr-animated",
  "/covers",
]);
