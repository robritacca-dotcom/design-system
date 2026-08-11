/**
 * Routes that render none of the shared site chrome (footer, chat panel):
 * the chat bench hosts its own copy of the widget (two live widgets would
 * double-bill and confuse QA), and the animated-logo page is a
 * full-viewport piece with no room for chrome.
 */
export const CHROMELESS_ROUTES = new Set(["/robr0-gpt", "/rr-animated"]);
