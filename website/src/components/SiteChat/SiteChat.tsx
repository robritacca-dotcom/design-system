"use client";

import { useEffect, useRef, useSyncExternalStore, type ReactNode } from "react";
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
import { CHAT_MODEL_LABEL } from "@/lib/chat-model";
import { fitsChip } from "@/lib/chat-suggestions";
import { AssistantTurn } from "./AssistantTurn";
import { useSiteChat } from "./ChatContext";
import { readGreeting, serverGreeting, subscribeClock } from "./greeting";
import { startersForPath, type Starter } from "./starters";
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
  phone = false,
  title = "robr0 GPT",
  placeholder = "Ask anything",
  showStarters = true,
  logo = "/rr.svg",
  tagline,
  starters: startersOverride,
  composerActions,
}: {
  /** Show the expand toggle. The bench's mobile stage is always a takeover, so it hides there. */
  fullscreenEnabled?: boolean;
  /** Narrow insets for phone-width hosts. */
  compact?: boolean;
  /** The host is a phone viewport, where the soft keyboard will claim the
      lower half of the screen the moment the composer is focused. The
      welcome screen stacks instead of centring the composer: greeting in
      the middle of the empty thread, starters directly above the composer,
      composer pinned to the bottom
      from the first paint — no centred state, and no glide out of one. */
  phone?: boolean;
  /** The header brand name. The bench overrides it to preview a consumer's own product name. */
  title?: string;
  /** The composer's placeholder text. */
  placeholder?: string;
  /** Show the conversation starters on the welcome screen. */
  showStarters?: boolean;
  /** The header mark's image src; null hides it. The bench feeds it
      session-only blob URLs for throwaway logo previews. */
  logo?: string | null;
  /** The welcome screen's line under the greeting. The playground overrides
      it to preview a consumer's own copy; the site default stays. */
  tagline?: string;
  /** Replaces the route-aware conversation starters wholesale — again the
      playground's lever, so its preview isn't robr0-specific. */
  starters?: Starter[];
  /** Replaces the composer's leading actions (the disabled model label) —
      the playground slots a working mock picker and attach button here. */
  composerActions?: ReactNode;
}) {
  const {
    turns,
    live,
    streaming,
    modelLabel,
    send,
    stop,
    reset,
    open,
    setOpen,
    view,
    setView,
    draft,
    setDraft,
  } = useSiteChat();

  const greeting = useSyncExternalStore(subscribeClock, readGreeting, serverGreeting);

  /* Starters follow the page: a new chat opened on /about proposes career
     questions, one on a case-study or component page names the item (the
     nav registry already knows its label, client-side). usePathname is
     reactive, so navigating with the welcome screen showing swaps the
     suggestions to match where the visitor now stands. */
  const pathname = usePathname();
  /* Filtered, not truncated: a chip is a question the visitor is about to
     ask, and half a question is not one. The route's own starters are held
     to the budget by scripts/validate-chat-starters.mjs, so this only ever
     fires on a caller's overrides. */
  const starters = (
    startersOverride ?? startersForPath(pathname, pathname ? getNavLabel(pathname) : null)
  ).filter((starter) => fitsChip(starter.label));

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

  /* The starters sit in one of two places: under the centred composer on
     the desktop welcome, directly above the bottom-pinned one on a phone.
     Rendered where they show, not reordered with CSS, so the tab order
     follows the visual order in both layouts. */
  const startersNode = isEmpty && showStarters && (
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
  );

  return (
    <div
      className={styles.chat}
      data-compact={compact || undefined}
      data-phone={phone || undefined}
      /* Escape steps out of the takeover first; the host's own Escape
         handling (closing the panel) takes over once back in panel view. */
      onKeyDown={(e) => {
        if (e.key === "Escape" && isFull) {
          e.stopPropagation();
          setView("panel");
        }
      }}
      /* On the welcome screen the whole panel is an invitation to type, so a
         click on its dead space lands focus in the composer — unless it hit a
         real control, or the visitor was selecting the greeting text. */
      onClick={(e) => {
        if (!isEmpty) return;
        const target = e.target as HTMLElement;
        if (target.closest("button, a, input, textarea, [role='button']")) return;
        if (window.getSelection()?.toString()) return;
        focusComposer();
      }}
    >
      <div className={styles.topRegion}>
        <ChatHeader
          title={
            <span className={styles.brand}>
              {logo && (
                <Image
                  src={logo}
                  alt=""
                  width={20}
                  height={20}
                  /* A blob: URL is an in-memory object the optimizer can't
                     fetch — serve it as-is. */
                  unoptimized={logo.startsWith("blob:")}
                />
              )}
              <span className={styles.brandName}>{title}</span>
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
                turn.bare ? (
                  /* Conversation furniture (a day marker): the injected
                     content stands alone in the thread, no message chrome. */
                  <div key={turn.id}>{turn.content}</div>
                ) : turn.role === "user" ? (
                  turn.content ? (
                    /* An injected attachment rides above the bubble, right-
                       aligned with it — a file lands beside the message,
                       never inside the sentence. */
                    <div key={turn.id} className={styles.userTurnStack}>
                      <div className={styles.userTurnAttachment}>{turn.content}</div>
                      {turn.text !== "" && (
                        <ChatMessage role="user">{turn.text}</ChatMessage>
                      )}
                    </div>
                  ) : (
                    <ChatMessage key={turn.id} role="user">
                      {turn.text}
                    </ChatMessage>
                  )
                ) : (
                  <AssistantTurn key={turn.id} turn={turn} />
                )
              ),
              ...(live ? [<AssistantTurn key={live.id} live={live} />] : []),
            ]}
          </ChatThread>

          {/* Welcome greeting — an overlay on the empty thread, sitting
              just above the centred composer; centred in the empty thread
              on a phone, where the composer is pinned to the bottom. */}
          {isEmpty && (
            <div className={styles.welcomeTop}>
              <div className={styles.welcomeGreeting}>
                {/* Nameless by design: visitors are anonymous, so the
                    widget cannot know who it is greeting — only when. */}
                <p className={styles.welcomeHello}>{greeting}</p>
                {/* The subjects, not the author: the chat is about the work
                    and the thinking behind it, and the header already says
                    whose it is. */}
                <p className={styles.welcomeAsk}>
                  {/* The last pair is tied: "AI" alone on a line is a widow
                      at the docked panel's width. */}
                  {tagline ?? "Ask about the case studies, the system, design, or\u00a0AI"}
                </p>
                {/* The placeholder below stays a plain action ("Ask anything")
                    so this line and the composer don't say the same sentence
                    twice, stacked. */}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Phone welcome: the starters lead the composer, so the chips sit
          between the greeting and the input rather than between the input
          and the keyboard. */}
      {phone && startersNode}

      <footer className={styles.footer}>
        <div className={styles.composerColumn}>
          <Composer
            ref={composerRef}
            placeholder={placeholder}
            sendLabel="Send"
            aiGlow
            value={draft}
            onValueChange={setDraft}
            onSubmit={handleSubmit}
            streaming={streaming}
            onStop={stop}
            actions={
              /* A host can slot its own leading actions (the playground's
                 mock picker). The site's default: the model picker is out of
                 scope — the label is shown, disabled, so the bar's final
                 shape reads now. The name is dynamic: the configured model
                 until the server first reports, then whatever the server
                 says actually served. */
              composerActions ?? (
                <Button
                  variant="tertiary"
                  size="compact"
                  iconLeft={claudeGlyph}
                  label={modelLabel ?? CHAT_MODEL_LABEL}
                  disabled
                />
              )
            }
          />
        </div>
      </footer>

      {/* The bottom region: starters at its top, disclaimer pinned to its
          bottom in every state. Grown while the chat is empty (centring the
          composer), collapsing on the first utterance — only flex-grow ever
          animates, so the flow-down is seamless. On a phone it never grows:
          the composer is already at the bottom, and the starters are above
          it. */}
      <div className={`${styles.bottomRegion} ${isEmpty ? styles.bottomRegionWelcome : ""}`}>
        {!phone && startersNode}
        <div className={styles.disclaimerRow}>
          {/* The second sentence is the logging disclosure — required by the
              privacy decision on record, so keep it when editing. */}
          <p className={styles.disclaimer}>
            Answers can be wrong. Chats are kept for 30 days. See the{" "}
            <a href="/privacy">privacy page</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
