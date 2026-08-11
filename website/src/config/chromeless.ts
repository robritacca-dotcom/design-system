/**
 * Routes that render none of the shared site chrome (footer, chat panel):
 * the chat bench hosts its own copy of the widget (two live widgets would
 * double-bill and confuse QA); the playground shares the bench's immersive
 * format — a floating rail, an X out, no page chrome — and the bench next
 * door owns the chat demo, so a docked panel here would be duplicative;
 * and the animated-logo page is a full-viewport piece with no room for
 * chrome.
 */
export const CHROMELESS_ROUTES = new Set(["/playground", "/robr0-gpt", "/rr-animated"]);
