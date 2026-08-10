"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import { Button } from "@robr0/design-system/components/Button/Button";
import { ChatHeader } from "@robr0/design-system/components/ChatHeader/ChatHeader";
import { ChatMessage } from "@robr0/design-system/components/ChatMessage/ChatMessage";
import { ChatThread } from "@robr0/design-system/components/ChatThread/ChatThread";
import { CircularButton } from "@robr0/design-system/components/CircularButton/CircularButton";
import { Composer } from "@robr0/design-system/components/Composer/Composer";
import { PromptSuggestions } from "@robr0/design-system/components/PromptSuggestions/PromptSuggestions";
import { usePathname } from "next/navigation";
import { getNavLabel } from "@/config/navigation";
import { AssistantTurn } from "./AssistantTurn";
import { useSiteChat } from "./ChatContext";
import { readGreeting, serverGreeting, subscribeClock } from "./greeting";
import { startersForPath } from "./starters";
import styles from "./SiteChat.module.css";

/** Claude-style starburst for the model label — currentColor, so it takes the button's grey. */
const claudeGlyph = (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <line x1={12} y1={12} x2={12.0} y2={2.0} />
    <line x1={12} y1={12} x2={16.35} y2={5.05} />
    <line x1={12} y1={12} x2={20.55} y2={7.64} />
    <line x1={12} y1={12} x2={19.96} y2={12.84} />
    <line x1={12} y1={12} x2={19.72} y2={18.03} />
    <line x1={12} y1={12} x2={15.01} y2={19.84} />
    <line x1={12} y1={12} x2={10.07} y2={21.1} />
    <line x1={12} y1={12} x2={6.44} y2={17.75} />
    <line x1={12} y1={12} x2={2.63} y2={14.51} />
    <line x1={12} y1={12} x2={4.2} y2={9.47} />
    <line x1={12} y1={12} x2={5.89} y2={4.72} />
    <line x1={12} y1={12} x2={10.82} y2={3.58} />
  </svg>
);

/**
 * The chat widget's internals: header, thread, composer, starters,
 * disclaimer. It fills whatever container hosts it — the bench's resizable
 * stage widget, or the site's docked panel — and reads all of its state from
 * SiteChatProvider, so the conversation is the same object wherever it shows.
 */
export function SiteChat({
  fullscreenEnabled = true,
  compact = false,
}: {
  /** Show the expand toggle. The bench's mobile stage is always a takeover, so it hides there. */
  fullscreenEnabled?: boolean;
  /** Narrow insets for phone-width hosts. */
  compact?: boolean;
}) {
  const { turns, live, streaming, send, stop, reset, open, setOpen, view, setView, draft, setDraft } =
    useSiteChat();

  const greeting = useSyncExternalStore(subscribeClock, readGreeting, serverGreeting);

  /* Starters follow the page: a new chat opened on /about proposes career
     questions, one on a case-study or component page names the item (the
     nav registry already knows its label, client-side). usePathname is
     reactive, so navigating with the welcome screen showing swaps the
     suggestions to match where the visitor now stands. */
  const pathname = usePathname();
  const starters = startersForPath(pathname, pathname ? getNavLabel(pathname) : null);

  /* The text field is ready to type into whenever a conversation can start:
     on open, on new chat, and again after every send. The host restores
     focus to its own trigger when the chat closes. */
  const composerRef = useRef<HTMLTextAreaElement | null>(null);
  const focusComposer = () => composerRef.current?.focus();
  useEffect(() => {
    if (open) focusComposer();
  }, [open]);

  const handleSubmit = (value: string) => {
    // send() reports acceptance; an ignored submit keeps the draft.
    if (send(value)) setDraft("");
    focusComposer();
  };

  const isFull = view === "full";
  const isEmpty = turns.length === 0 && !live;

  return (
    <div
      className={styles.chat}
      data-compact={compact || undefined}
      /* Escape steps out of the takeover first; the host's own Escape
         handling (closing the panel) takes over once back in panel view. */
      onKeyDown={(e) => {
        if (e.key === "Escape" && isFull) {
          e.stopPropagation();
          setView("panel");
        }
      }}
    >
      <div className={styles.topRegion}>
        <ChatHeader
          title={
            <span className={styles.brand}>
              <Image src="/rr.svg" alt="" width={20} height={20} />
              <span className={styles.brandName}>robr0 GPT</span>
            </span>
          }
          actions={
            <>
              <CircularButton
                icon="edit_square"
                variant="tertiary"
                ariaLabel="New chat"
                onClick={() => {
                  reset();
                  setDraft("");
                  focusComposer();
                }}
              />
              {fullscreenEnabled && (
                <CircularButton
                  icon={isFull ? "close_fullscreen" : "open_in_full"}
                  variant="tertiary"
                  ariaLabel={isFull ? "Exit full screen" : "Enter full screen"}
                  onClick={() => setView(isFull ? "panel" : "full")}
                />
              )}
              <CircularButton
                icon="close"
                variant="tertiary"
                ariaLabel="Close chat"
                onClick={() => setOpen(false)}
              />
            </>
          }
        />

        <div className={styles.body}>
          <ChatThread className={styles.thread}>
            {/* One array, so the live turn and its committed form match
                by key — split expressions are separate children slots
                and React would remount across them. */}
            {[
              ...turns.map((turn) =>
                turn.role === "user" ? (
                  <ChatMessage key={turn.id} role="user">
                    {turn.text}
                  </ChatMessage>
                ) : (
                  <AssistantTurn key={turn.id} turn={turn} />
                )
              ),
              ...(live ? [<AssistantTurn key={live.id} live={live} />] : []),
            ]}
          </ChatThread>

          {/* Welcome greeting — an overlay on the empty thread, sitting
              just above the centred composer. */}
          {isEmpty && (
            <div className={styles.welcomeTop}>
              <div className={styles.welcomeGreeting}>
                {/* Nameless by design: visitors are anonymous, so the
                    widget cannot know who it is greeting — only when. */}
                <p className={styles.welcomeHello}>{greeting}</p>
                <p className={styles.welcomeAsk}>
                  Ask about Rob&rsquo;s work, or anything design
                </p>
                {/* The placeholder below stays a plain action ("Ask anything")
                    so this line and the composer don't say the same sentence
                    twice, stacked. */}
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.composerColumn}>
          <Composer
            ref={composerRef}
            placeholder="Ask anything"
            sendLabel="Send"
            value={draft}
            onValueChange={setDraft}
            onSubmit={handleSubmit}
            streaming={streaming}
            onStop={stop}
            actions={
              /* The model picker is out of scope — the label is shown,
                 disabled, so the bar's final shape reads now. */
              <Button variant="tertiary" size="compact" iconLeft={claudeGlyph} label="Sonnet 5" disabled />
            }
          />
        </div>
      </footer>

      {/* The bottom region: starters at its top, disclaimer pinned to its
          bottom in every state. Grown while the chat is empty (centring the
          composer), collapsing on the first utterance — only flex-grow ever
          animates, so the flow-down is seamless. */}
      <div className={`${styles.bottomRegion} ${isEmpty ? styles.bottomRegionWelcome : ""}`}>
        {isEmpty && (
          <div className={styles.startersColumn}>
            <PromptSuggestions
              layout="stack"
              ariaLabel="Conversation starters"
              suggestions={starters}
              onValueChange={(id) => {
                const starter = starters.find((s) => s.id === id);
                if (starter && send(starter.label)) focusComposer();
              }}
            />
          </div>
        )}
        <div className={styles.disclaimerRow}>
          {/* The second sentence is the logging disclosure — required by the
              privacy decision on record, so keep it when editing. */}
          <p className={styles.disclaimer}>
            The agent can make mistakes. Chats are kept for 30 days to improve answers.
          </p>
        </div>
      </div>
    </div>
  );
}
