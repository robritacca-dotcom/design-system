"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ChatProvider, type ChatLinkRenderer } from "rift-ds/chat";
import { FALLBACK_FOLLOWUPS } from "@/lib/chat-followups";

/* Internal links in an answer navigate client-side, so the panel — mounted
   from the root layout — survives the trip and the conversation keeps going
   beside the new page. The widget decides which hrefs are links at all (its
   default is the same-site slug charset /api/chat's sanitisePath enforces on
   the way in) and hands over onNavigate, which closes a panel that covers
   the page. Module scope, so the provider's context value keeps a stable
   renderer across renders. */
const renderLink: ChatLinkRenderer = ({ href, children, onNavigate }) => (
  <Link href={href} onClick={onNavigate}>
    {children}
  </Link>
);

/**
 * The chat's whole client state: the rift-ds ChatProvider, pointed at this
 * site's own routes. Mounted once in the root layout, which never remounts
 * on client-side navigation, so the transcript, a stream in flight, the
 * half-typed draft, the open state and the chosen seat all survive clicking
 * between pages. A hard reload starts clean by design: no storage.
 *
 * A wrapper rather than the provider itself in the layout because the
 * layout is a server component and `renderLink` is a function, which cannot
 * cross that boundary as a prop.
 *
 * Only what this site configures is passed. Threads, card renderers and the
 * rest of the provider's options stay at their defaults, which is off.
 */
export function SiteChatProvider({ children }: { children: ReactNode }) {
  return (
    <ChatProvider
      endpoint="/api/chat"
      followups="/api/chat/followups"
      feedback="/api/chat/feedback"
      fallbackFollowups={FALLBACK_FOLLOWUPS}
      defaultPlacement="right"
      renderLink={renderLink}
    >
      {children}
    </ChatProvider>
  );
}
