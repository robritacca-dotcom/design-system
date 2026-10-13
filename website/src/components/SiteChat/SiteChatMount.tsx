"use client";

import { useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { ChatLauncher, useChatWidget } from "rift-ds/chat";
import { CHROMELESS_ROUTES } from "@/config/chromeless";
import { getNavLabel } from "@/config/navigation";
import { getPageSummary } from "@/data/page-summaries";
import { CHAT_MODELS, DEFAULT_CHAT_MODEL } from "@/lib/chat-model";
import { startersForPath } from "./starters";

/** The panel's DOM id. globals.css names it in the phone takeover rule,
    which hides every other child of <body>. */
const PANEL_ID = "site-chat-panel";

/* The TLDR panel is hover-summoned, so it exists only where hover exists: a
   touch tap has no dwell to summon it with, and the synthetic mouseenter a
   tap fires would pop the panel in the way of opening the chat. The server
   snapshot is false, so the server always renders the plain FAB and the
   panel mounts after hydration on pointer devices — which is also what
   keeps the FAB immune to the server's idea of the pathname: the root
   route's ISR regeneration can see a pathname the client never would, and
   a summary rendered from it is a hydration mismatch that blanks the whole
   site (React redoes <html> and drops the theme guard's ready mark).

   ChatLauncher's docs say it applies this gate itself. As of rift-ds 1.8.0
   it does not: it hands `summary` straight to AiButton, which renders the
   panel whenever one is passed. So the gate stays here, and it is load-
   bearing — do not remove it on the strength of the prop's description. */
const HOVER_QUERY = "(hover: hover) and (pointer: fine)";
const subscribeHover = (onChange: () => void) => {
  const media = window.matchMedia(HOVER_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
};
const readHover = () => window.matchMedia(HOVER_QUERY).matches;

/* The link points at /privacy, which carries the AI-use and 30-day logging
   disclosure required by the privacy decision on record. Module scope, so
   the widget is handed the same node on every render. */
const DISCLAIMER = (
  <>
    Answers may be wrong. <a href="/privacy">How we use AI and your data</a>
  </>
);

/**
 * The site-wide chat: the rift-ds ChatLauncher (the FAB and the panel in
 * every seat), configured for this site. Mounted once from the root layout,
 * after {children}, so it sits last in the tab order and never remounts on
 * navigation — which is what lets a mid-stream answer keep streaming while
 * the visitor reads a different page.
 *
 * The launcher owns the seats: docked beside the page on a wide screen (to
 * the right by default, or to the left from the header's Chat position
 * menu), floating as a card the visitor moves and sizes, an overlay behind
 * a scrim below the dock threshold, and the whole screen on a phone, where
 * it offers no position menu. It says which on <html> as `data-chat`, and
 * globals.css makes the room.
 *
 * What is passed is what this site's chat has always had. Threads, tabs,
 * the agent pane, mentions, attachments and the widgets board are the
 * widget's to offer and are left at their defaults, which is off.
 */
export function SiteChatMount() {
  const pathname = usePathname();
  const { starterSeed } = useChatWidget();

  /* The FAB's TLDR panel: per-route content from the page-summaries data,
     summoned by hovering the button (AiButton owns the hover mechanics).
     Hover-capable devices only, and never in the server HTML — see
     HOVER_QUERY above for why both halves are load-bearing. */
  const canHover = useSyncExternalStore(subscribeHover, readHover, () => false);
  const summary = canHover && pathname ? getPageSummary(pathname) : null;

  /* Starters follow the page: a new chat opened on /about proposes career
     questions, one on a case-study page names the study (the nav registry
     already knows its label, client-side). usePathname is reactive, so
     navigating with the welcome screen showing swaps the suggestions to
     match where the visitor now stands. The provider's starterSeed picks
     this load's three from the page's pool — see starters.ts for the draw's
     lifecycle. The widget drops any that would not fit a chip. */
  const starters = startersForPath(
    pathname,
    pathname ? getNavLabel(pathname) : null,
    starterSeed
  );

  /* The composer's context note names the page the visitor is reading,
     resolved through the page-summaries data first (it covers essays and
     case studies) with the nav label as the fallback. A route neither knows
     simply shows no note. */
  const pageName = pathname
    ? (getPageSummary(pathname)?.title ?? getNavLabel(pathname))
    : undefined;

  return (
    <ChatLauncher
      label="Ask robr0 GPT"
      icon="forum"
      /* Chromeless routes render no chat at all. */
      hidden={CHROMELESS_ROUTES.has(pathname)}
      panelId={PANEL_ID}
      panelLabel="Site chat"
      summary={
        summary
          ? {
              title: summary.title,
              caption: summary.caption,
              text: summary.text,
              chips: summary.chips,
            }
          : undefined
      }
      widget={{
        title: "robr0 GPT",
        logo: "/rr.svg",
        placeholder: "Ask anything",
        /* The subjects, not the author: the chat is about the work and the
           thinking behind it, and the header already says whose it is. The
           last pair is tied: "AI" alone on a line is a widow at the docked
           panel's width. */
        tagline: "Ask about the case studies, the writing, design, or AI",
        starters,
        /* Keys the starters' staged reveal to the page, so a route change
           replays the short generation beat over the new set. */
        startersKey: pathname ?? "",
        /* The live picker: the pick rides on the next send, the server
           clamps it to the day's budget, and the selection follows the
           server's default until the visitor chooses. */
        models: CHAT_MODELS,
        defaultModel: DEFAULT_CHAT_MODEL.value,
        contextLabel: pageName ?? null,
        disclaimer: DISCLAIMER,
      }}
    />
  );
}
