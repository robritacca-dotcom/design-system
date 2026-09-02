"use client";

import { useEffect, useRef, useSyncExternalStore, type ReactNode } from "react";
import Image from "next/image";
import { ChatHeader } from "@robr0/design-system/components/ChatHeader/ChatHeader";
import { ChatMessage } from "@robr0/design-system/components/ChatMessage/ChatMessage";
import { ChatThread } from "@robr0/design-system/components/ChatThread/ChatThread";
import { CircularButton } from "@robr0/design-system/components/CircularButton/CircularButton";
import { Composer } from "@robr0/design-system/components/Composer/Composer";
import { ModelPicker } from "@robr0/design-system/components/ModelPicker/ModelPicker";
import { PromptSuggestions } from "@robr0/design-system/components/PromptSuggestions/PromptSuggestions";
import { usePathname } from "next/navigation";
import { getNavLabel } from "@/config/navigation";
import { CHAT_MODELS, DEFAULT_CHAT_MODEL } from "@/lib/chat-model";
import { fitsChip } from "@/lib/chat-suggestions";
import { AssistantTurn } from "./AssistantTurn";
import { useSiteChat } from "./ChatContext";
import { readGreeting, serverGreeting, subscribeClock } from "./greeting";
import { startersForPath, type Starter } from "./starters";
import styles from "./SiteChat.module.css";

/** The one line a locked model shows in place of its description. */
const LOCKED_MODEL_DESCRIPTION = "Paused for today to stay in budget.";

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
  /** Replaces the composer's leading actions (the live model picker) —
      the playground slots its own mock picker and attach button here. */
  composerActions?: ReactNode;
}) {
  const {
    turns,
    live,
    streaming,
    modelPolicy,
    chosenModel,
    setChosenModel,
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

  /* The picker shows the visitor's pick, or the server's current default
     when they have not made one — which is how a budget step-down moves the
     label without a click. Locked entries stay listed but greyed, with the
     reason where their description was; a pick the server has since locked
     counts as no pick (the route clamps it anyway), so the label falls back
     to the default rather than naming a model that will not serve. */
  const lockedValues = modelPolicy?.locked ?? [];
  const pick = chosenModel && !lockedValues.includes(chosenModel) ? chosenModel : null;
  const pickerValue = pick ?? modelPolicy?.default ?? DEFAULT_CHAT_MODEL.value;
  const pickerModels = CHAT_MODELS.map((option) => ({
    value: option.value,
    label: option.label,
    description: lockedValues.includes(option.value)
      ? LOCKED_MODEL_DESCRIPTION
      : option.description,
    disabled: lockedValues.includes(option.value),
  }));

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
            /* The buttons self-label with tooltips; they open downward because
               the header hugs the panel's clipped top edge. */
            <>
              <CircularButton
                icon="edit_square"
                variant="tertiary"
                ariaLabel="New chat"
                tooltipPosition="bottom"
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
                  tooltipPosition="bottom"
                  onClick={() => setView(isFull ? "panel" : "full")}
                />
              )}
              <CircularButton
                icon="close"
                variant="tertiary"
                ariaLabel="Close chat"
                tooltipPosition="bottom"
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
                 mock picker). The site's default is the live picker: the
                 pick rides on the next send, the server clamps it to the
                 day's budget, and the selection follows the server's
                 default until the visitor chooses. */
              composerActions ?? (
                <ModelPicker
                  models={pickerModels}
                  value={pickerValue}
                  onValueChange={setChosenModel}
                  placement="top"
                  aria-label="Choose a model"
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
          {/* The link points at /privacy, which carries the AI-use and 30-day
              logging disclosure required by the privacy decision on record. */}
          <p className={styles.disclaimer}>
            Answers may be wrong.{" "}
            <a className={styles.disclaimerLink} href="/privacy">
              How we use AI and your data
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
