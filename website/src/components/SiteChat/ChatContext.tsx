"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useChat, type ChatTransport } from "@/hooks/useChat";
import { createFetchTransport } from "@/lib/chat-transport";

/** Panel is the docked rail; full is the viewport takeover. */
export type ChatView = "panel" | "full";

interface SiteChatContextValue {
  turns: ReturnType<typeof useChat>["turns"];
  live: ReturnType<typeof useChat>["live"];
  streaming: boolean;
  /** Display label of the model last reported by the server, null before the first exchange. */
  modelLabel: string | null;
  send: (text: string) => boolean;
  stop: () => void;
  reset: () => void;
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
