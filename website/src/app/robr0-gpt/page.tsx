"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./page.module.css";
import { AgentStatus } from "@robr0/design-system/components/AgentStatus/AgentStatus";
import { Button } from "@robr0/design-system/components/Button/Button";
import { ChatHeader } from "@robr0/design-system/components/ChatHeader/ChatHeader";
import { ChatMessage } from "@robr0/design-system/components/ChatMessage/ChatMessage";
import { ChatThread } from "@robr0/design-system/components/ChatThread/ChatThread";
import { CircularButton } from "@robr0/design-system/components/CircularButton/CircularButton";
import { Composer } from "@robr0/design-system/components/Composer/Composer";
import { PromptSuggestions } from "@robr0/design-system/components/PromptSuggestions/PromptSuggestions";
import { SegmentedControl } from "@robr0/design-system/components/SegmentedControl/SegmentedControl";
import { Prose } from "@robr0/design-system/components/Prose/Prose";
import { Reasoning } from "@robr0/design-system/components/Reasoning/Reasoning";
import { useChat, type ChatTurn, type LiveResponse } from "@/hooks/useChat";
import { createSimTransport } from "@/lib/chat-sim";
import { createFetchTransport } from "@/lib/chat-transport";
import BlurBackground from "@/components/BlurBackground/BlurBackground";

type StageSize = "desktop" | "mobile";
/** Which transport the widget runs on. Live talks to /api/chat. */
type TransportMode = "live" | "sim";
type WidgetView = "panel" | "full";
type Theme = "light" | "dark";
type ResizeAxis = "x" | "y" | "both";

/* The html root's data-theme attribute is the theme store (the site
   convention) — subscribe to it rather than mirroring it into state. */
const subscribeTheme = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
};
const readTheme = (): Theme =>
  document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
const applyTheme = (next: Theme) => {
  document.documentElement.setAttribute("data-theme", next);
  window.localStorage.setItem("theme", next);
};

/* The welcome greeting, by the visitor's own clock. Evening runs through
   the small hours: at 2am "good evening" is closer to true than "good
   morning", which belongs to a day that has not started yet.

   Read as a store rather than during render, like the theme above: the page
   is prerendered, so computing the hour on the server would bake the build
   machine's clock into the HTML. The server snapshot is empty and the real
   greeting lands on hydration; the line reserves its height in the CSS so
   nothing moves when the words arrive. The clock needs no subscription —
   nobody is watching a widget at the moment noon turns. */
const greetingFor = (hour: number) => {
  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 17) return "Good afternoon";
  return "Good evening";
};
const subscribeClock = () => () => {};
const readGreeting = () => greetingFor(new Date().getHours());

/* The welcome screen's conversation starters. Tapping one sends it. */
const STARTERS = [
  { id: "philosophy", label: "Describe Rob's design philosophy" },
  { id: "recent", label: "What has Rob shipped recently?" },
  { id: "system", label: "How does this design system work?" },
];

/* MVP presentation: default size, no tails, no avatars, no message details —
   bare bubbles and bare text. The choreography is the deliverable. */

/* A markdown table has a natural minimum width that a 420px panel cannot
   meet, and the browser resolves that by breaking headings one letter per
   line. Scrolling the table sideways inside the message keeps it readable.
   Prose styles the table itself; this only supplies the scroll container,
   which Prose cannot add because it styles markup it does not render. */
const markdownComponents = {
  table: ({ children, ...props }: React.ComponentPropsWithoutRef<"table">) => (
    <div className={styles.tableScroll}>
      <table {...props}>{children}</table>
    </div>
  ),
};

/* One component for the assistant turn in both states. The live turn and
   its committed form share an id (and so a key), so React reconciles the
   finished response in place — separate components remounted the whole
   subtree at commit, which read as a flicker after the response rendered. */
function AssistantTurn({ turn, live }: { turn?: ChatTurn; live?: LiveResponse }) {
  const thinking = live?.phase === "thinking";
  const tracePoints = live ? live.tracePoints : (turn?.tracePoints ?? []);
  const durationSeconds = live ? live.durationSeconds : turn?.durationSeconds;
  const text = live ? live.text : (turn?.text ?? "");

  return (
    <ChatMessage role="assistant">
      <div className={styles.responseStack}>
        {/* While thinking the disclosure carries the live status; once
            streaming, it stays only if a trace actually accumulated —
            an empty collapsed panel is noise. Until a trace point arrives
            there is nothing behind the line either, so it renders as a
            plain status: no chevron, nothing to open. */}
        {(thinking || tracePoints.length > 0) && (
          <Reasoning
            streaming={thinking}
            summaryOnly={tracePoints.length === 0}
            duration={durationSeconds}
            summary={
              thinking && live ? (
                <AgentStatus state="working" label={live.statusLabel} />
              ) : undefined
            }
          >
            {tracePoints.length > 0 && (
              <ul>
                {tracePoints.map((point, index) => (
                  <li key={`${index}-${point.slice(0, 24)}`}>{point}</li>
                ))}
              </ul>
            )}
          </Reasoning>
        )}
        {text !== "" && (
          <Prose>
            {/* gfm: a real model emits tables and strikethrough, which plain
                CommonMark renders as literal pipes and tildes. */}
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {text}
            </ReactMarkdown>
          </Prose>
        )}
      </div>
    </ChatMessage>
  );
}

export default function ChatWidgetTestPage() {
  const [size, setSize] = useState<StageSize>("desktop");
  const [transportMode, setTransportMode] = useState<TransportMode>("live");
  const [view, setView] = useState<WidgetView>("panel");
  const [open, setOpen] = useState(true);
  const [draft, setDraft] = useState("");

  const theme = useSyncExternalStore(subscribeTheme, readTheme, () => "dark");

  const greeting = useSyncExternalStore(subscribeClock, readGreeting, () => "");

  /* Manual resize via the edge handles. The stage centres the widget, so a
     drag moves both opposing edges — deltas are doubled to keep the grabbed
     edge under the cursor. Sizes are clamped by the CSS min/max, and any
     size or view toggle clears the manual override. */
  const widgetRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<{
    axis: ResizeAxis;
    xSign: number;
    startX: number;
    startY: number;
    width: number;
    height: number;
  } | null>(null);
  const [manual, setManual] = useState<{ w?: number; h?: number }>({});
  const [resizing, setResizing] = useState(false);

  const beginResize = (e: React.PointerEvent<HTMLDivElement>) => {
    // Primary button only, one drag at a time — a second concurrent
    // pointer must not hijack an in-flight drag's baseline.
    if ((e.pointerType === "mouse" && e.button !== 0) || dragRef.current) return;
    const axis = e.currentTarget.dataset.axis as ResizeAxis;
    const rect = widgetRef.current?.getBoundingClientRect();
    if (!axis || !rect) return;
    dragRef.current = {
      axis,
      // Dragging the left edge outward means a negative pointer delta.
      xSign: e.currentTarget.dataset.edge === "left" ? -1 : 1,
      startX: e.clientX,
      startY: e.clientY,
      width: rect.width,
      height: rect.height,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
    setResizing(true);
  };

  /* The stage centres the widget, so a drag moves both opposing edges;
     doubling the delta keeps the grabbed edge under the cursor. */
  const CENTERED_DRAG_FACTOR = 2;

  const moveResize = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    const next: { w?: number; h?: number } = {};
    if (drag.axis !== "y")
      next.w = Math.round(
        drag.width + (e.clientX - drag.startX) * CENTERED_DRAG_FACTOR * drag.xSign
      );
    if (drag.axis !== "x")
      next.h = Math.round(drag.height + (e.clientY - drag.startY) * CENTERED_DRAG_FACTOR);
    setManual((m) => ({ ...m, ...next }));
  };

  const endResize = () => {
    dragRef.current = null;
    setResizing(false);
  };

  const transport = useMemo(
    () => (transportMode === "live" ? createFetchTransport() : createSimTransport()),
    [transportMode]
  );
  const { turns, live, streaming, send, stop, reset } = useChat(transport);

  /* The text field is ready to type into whenever a conversation can start:
     on open, on new chat, and again after every send. Closing hands focus
     to the launcher so the keyboard never lands on <body>. */
  const composerRef = useRef<HTMLTextAreaElement | null>(null);
  const launcherRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const focusComposer = () => composerRef.current?.focus();
  useEffect(() => {
    if (open) focusComposer();
    else launcherRef.current?.focus();
  }, [open]);

  const handleSubmit = (value: string) => {
    // send() reports acceptance; an ignored submit keeps the draft.
    if (send(value)) setDraft("");
    focusComposer();
  };

  const isMobile = size === "mobile";
  const isFull = view === "full" && !isMobile;
  const isEmpty = turns.length === 0 && !live;

  const widgetClasses = [
    styles.widget,
    isMobile ? styles.widgetMobile : "",
    isFull ? styles.widgetFull : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      {/* The site's own backdrop, so the widget is reviewed floating over the
          surface it will actually sit on rather than a flat fill. */}
      <BlurBackground fullHeight />

    <main className={styles.stage}>
      {/* Fullscreen covers the stage — the whole left panel leaves the tab
          order entirely rather than lurking reachable behind the overlay. */}
      {!isFull && (
      <div className={styles.panel}>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>robr0 GPT</h1>
        <div className={styles.introSection}>
          <p className={styles.subDisplay}>
            A test bench for the design system&rsquo;s chat widget
          </p>
          <p className={styles.introBody}>
            Answers are generated live by Claude Sonnet through this
            site&rsquo;s own API route, which gives the model a corpus built
            from the published pages and nothing else. Switch to Simulated to
            replay a scripted exchange and check the choreography without
            calling the model.
          </p>
        </div>
      </header>

      <div className={styles.controls}>
        {/* A manual drag is a size of its own, so switching stage size
            discards it rather than resizing around it. */}
        <SegmentedControl
          size="compact"
          ariaLabel="Stage size"
          activeSegment={size}
          onSegmentChange={(value) => {
            setSize(value as StageSize);
            setManual({});
          }}
          segments={[
            { value: "desktop", label: "Desktop", icon: "desktop_windows" },
            { value: "mobile", label: "Mobile (390px)", icon: "smartphone" },
          ]}
        />

        <SegmentedControl
          size="compact"
          ariaLabel="Theme"
          activeSegment={theme}
          onSegmentChange={(value) => applyTheme(value as Theme)}
          segments={[
            { value: "light", label: "Light", icon: "light_mode" },
            { value: "dark", label: "Dark", icon: "dark_mode" },
          ]}
        />

        {/* Swapping transports resets the conversation: a stream from the old
            one would otherwise keep writing into the new transcript. Picking
            the mode already running is not a swap, so it costs nothing. */}
        <SegmentedControl
          size="compact"
          ariaLabel="Transport"
          activeSegment={transportMode}
          onSegmentChange={(value) => {
            if (value === transportMode) return;
            setTransportMode(value as TransportMode);
            reset();
          }}
          segments={[
            { value: "live", label: "Live", icon: "sensors" },
            { value: "sim", label: "Simulated", icon: "science" },
          ]}
        />
      </div>
      </div>
      )}

      <div className={styles.viewport}>
      {open ? (
        <div className={`${styles.widgetFrame} ${resizing ? styles.resizing : ""}`}>
          <div
            ref={widgetRef}
            className={widgetClasses}
            /* Full screen owns its size; the manual size survives in state
               so collapsing returns to the previous footprint. */
            style={isFull ? undefined : { width: manual.w, height: manual.h }}
            /* Escape is the keyboard way out of the fullscreen takeover. */
            onKeyDown={(e) => {
              if (e.key === "Escape" && isFull) setView("panel");
            }}
          >
          {/* The top region: header + thread. Zero-basis, like the bottom
              region, so in welcome mode the two split the height exactly
              and the composer sits at the widget's true centre — with
              nothing ever changing positioning mode on send. */}
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
                {/* Mobile is always a full takeover, so the switch hides there. */}
                {!isMobile && (
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
                    <p className={styles.welcomeAsk}>Ask about Rob&rsquo;s work or the design system</p>
                  </div>
                </div>
              )}
            </div>
            </div>

            <footer className={styles.footer}>
              <div className={styles.composerColumn}>
                <Composer
                  ref={composerRef}
                  placeholder="Message the agent"
                  sendLabel="Send"
                  value={draft}
                  onValueChange={setDraft}
                  onSubmit={handleSubmit}
                  streaming={streaming}
                  onStop={stop}
                  actions={
                    /* Attachments and the model picker are out of MVP scope —
                       both affordances are shown, disabled, so the bar's
                       final shape reads now. */
                    <>
                      <CircularButton
                        icon="add"
                        variant="tertiary"
                        ariaLabel="Add attachment"
                        disabled
                      />
                      <Button
                        variant="tertiary"
                        size="compact"
                        label="Sonnet"
                        disabled
                      />
                    </>
                  }
                />
              </div>
            </footer>

            {/* The bottom region: starters at its top, disclaimer pinned to
                its bottom in every state. Grown while the chat is empty
                (centring the composer), collapsing on the first utterance —
                only flex-grow ever animates, so the flow-down is seamless. */}
            <div className={`${styles.bottomRegion} ${isEmpty ? styles.bottomRegionWelcome : ""}`}>
              {isEmpty && (
                <div className={styles.startersColumn}>
                  <PromptSuggestions
                    layout="stack"
                    ariaLabel="Conversation starters"
                    suggestions={STARTERS}
                    onValueChange={(id) => {
                      const starter = STARTERS.find((s) => s.id === id);
                      if (starter && send(starter.label)) focusComposer();
                    }}
                  />
                </div>
              )}
              <div className={styles.disclaimerRow}>
                <p className={styles.disclaimer}>The agent can make mistakes.</p>
              </div>
            </div>
          </div>

          {/* Resize grips — review tooling, straddling the widget edges so
              they stay clear of the thread's scrollbar. Mouse-driven only;
              the size and view toggles remain the accessible path. Full
              screen owns the whole viewport, so the grips disappear there.
              pointercancel ends a drag too, or an interrupted drag would
              leave transitions and text selection disabled. */}
          {!isFull &&
            (
              [
                { cls: styles.handleLeft, axis: "x", edge: "left" },
                { cls: styles.handleRight, axis: "x", edge: undefined },
                { cls: styles.handleBottom, axis: "y", edge: undefined },
                { cls: styles.handleCorner, axis: "both", edge: undefined },
              ] as const
            ).map(({ cls, axis, edge }) => (
              <div
                key={axis + (edge ?? "")}
                className={`${styles.handle} ${cls}`}
                aria-hidden="true"
                data-axis={axis}
                data-edge={edge}
                onPointerDown={beginResize}
                onPointerMove={moveResize}
                onPointerUp={endResize}
                onPointerCancel={endResize}
              />
            ))}
        </div>
      ) : (
        <div className={styles.launcherSlot}>
          <CircularButton
            ref={launcherRef}
            icon="chat_bubble"
            variant="primary"
            ariaLabel="Open chat"
            onClick={() => setOpen(true)}
          />
        </div>
      )}
      </div>
    </main>
    </>
  );
}
