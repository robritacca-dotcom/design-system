"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useChat, type ChatTransport } from "@/hooks/useChat";
import { fetchFollowups, followupTarget } from "@/lib/chat-followups";
import { createFetchTransport } from "@/lib/chat-transport";

/** Panel is the docked rail; full is the viewport takeover. */
export type ChatView = "panel" | "full";

/* Above this the panel docks and the page slides over (the body inset in
   globals.css); below it the panel overlays behind a scrim. Chosen so the
   pages that already run sidebar + content + right rail keep a readable
   main column — see the build plan's geometry notes. Lives here rather than
   in SiteChatMount so consumers deeper in the widget tree (the markdown
   link renderer, which closes an overlaying panel on navigation) can read
   it without importing the mount and its component graph. Also used by
   pages that auto-open the panel (the playground), which must only do so
   when the panel docks beside the page rather than covering it. */
export const DOCK_QUERY = "(min-width: 1440px)";

/* Below this the panel has no card form to return to: it fills the viewport
   whatever the view says, so the site opens it as a takeover and hides the
   expand toggle rather than offering a switch between a state and itself.
   The width is mirrored by the .panel rule in SiteChat.module.css — the CSS
   is what covers the first render, before this query has been read. */
export const TAKEOVER_QUERY = "(max-width: 719px)";

interface SiteChatContextValue {
  turns: ReturnType<typeof useChat>["turns"];
  live: ReturnType<typeof useChat>["live"];
  streaming: boolean;
  /** Display label of the model last reported by the server, null before the first exchange. */
  modelLabel: string | null;
  send: (text: string) => boolean;
  stop: () => void;
  reset: () => void;
  setTurnFeedback: ReturnType<typeof useChat>["setTurnFeedback"];
  setTurnFollowups: ReturnType<typeof useChat>["setTurnFollowups"];
  open: boolean;
  setOpen: (open: boolean) => void;
  toggleOpen: () => void;
  view: ChatView;
  setView: (view: ChatView) => void;
  draft: string;
  setDraft: (draft: string) => void;
  /** The element to restore focus to when the panel closes. */
  returnFocusRef: React.MutableRefObject<HTMLElement | null>;
}

const SiteChatContext = createContext<SiteChatContextValue | null>(null);

/**
 * The chat's whole client state, mounted once in the root layout. The root
 * layout never remounts on client-side navigation, so everything here — the
 * transcript, a stream in flight, the half-typed draft, open state — survives
 * clicking between pages for free. useChat's unmount-abort never fires on
 * navigation because the provider outlives every page.
 *
 * A hard reload starts clean by design: no storage, no persistence.
 */
export function SiteChatProvider({
  transport,
  children,
}: {
  /** Injectable for the bench (sim transport); defaults to the live route. */
  transport?: ChatTransport;
  children: ReactNode;
}) {
  const fallbackTransport = useMemo(() => createFetchTransport(), []);
  const chat = useChat(transport ?? fallbackTransport);

  /* Follow-up chips for the answer that just landed. Fired here rather than
     from the turn's own component so it happens once per answer, whether or
     not anything is rendering it — the panel can be closed, or the turn
     scrolled far above the fold, and the chips are still there when the
     visitor arrives. Turn ids are minted in sequence and never reused, so
     the set of ids already asked about is all the bookkeeping this needs: it
     survives the state changes that a request-in-flight would otherwise be
     re-fired by (a thumbs verdict, the next question being asked). */
  const { setTurnFollowups } = chat;
  const target = useMemo(() => followupTarget(chat.turns), [chat.turns]);
  const askedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!target || askedRef.current.has(target.id)) return;
    askedRef.current.add(target.id);
    // Never rejects, and a write to a turn that has since been cleared by a
    // new chat is a no-op — so there is nothing here to abort or guard.
    void fetchFollowups(target.question, target.answer).then((suggestions) =>
      setTurnFollowups(target.id, suggestions)
    );
  }, [target, setTurnFollowups]);

  const [open, setOpen] = useState(false);
  const [view, setView] = useState<ChatView>("panel");
  const [draft, setDraft] = useState("");
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const toggleOpen = useCallback(() => setOpen((current) => !current), []);

  const value = useMemo<SiteChatContextValue>(
    () => ({
      ...chat,
      open,
      setOpen,
      toggleOpen,
      view,
      setView,
      draft,
      setDraft,
      returnFocusRef,
    }),
    [chat, open, toggleOpen, view, draft]
  );

  return <SiteChatContext.Provider value={value}>{children}</SiteChatContext.Provider>;
}

export function useSiteChat(): SiteChatContextValue {
  const context = useContext(SiteChatContext);
  if (!context) {
    throw new Error("useSiteChat must be used inside a SiteChatProvider");
  }
  return context;
}
