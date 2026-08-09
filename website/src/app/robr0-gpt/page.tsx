"use client";

import { useMemo, useRef, useState, useSyncExternalStore, useEffect } from "react";
import styles from "./page.module.css";
import { CircularButton } from "@robr0/design-system/components/CircularButton/CircularButton";
import { SegmentedControl } from "@robr0/design-system/components/SegmentedControl/SegmentedControl";
import { createSimTransport } from "@/lib/chat-sim";
import { createFetchTransport } from "@/lib/chat-transport";
import BlurBackground from "@/components/BlurBackground/BlurBackground";
import { SiteChatProvider, useSiteChat } from "@/components/SiteChat/ChatContext";
import { SiteChat } from "@/components/SiteChat/SiteChat";

type StageSize = "desktop" | "mobile";
/** Which transport the widget runs on. Live talks to /api/chat. */
type TransportMode = "live" | "sim";
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

/* The widget itself lives in @/components/SiteChat — the same component the
   site mounts as its docked panel. This page is the QA surface: the stage
   hosts that widget at review sizes with resize grips, a theme toggle, and
   a transport switch, so the choreography can be exercised on the sim
   without calling the model. */

function BenchStage({
  size,
  onSizeChange,
  transportMode,
  onTransportChange,
}: {
  size: StageSize;
  onSizeChange: (next: StageSize) => void;
  transportMode: TransportMode;
  onTransportChange: (next: TransportMode) => void;
}) {
  const { open, setOpen, view, reset, returnFocusRef } = useSiteChat();

  const theme = useSyncExternalStore(subscribeTheme, readTheme, () => "dark");

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

  /* Closing hands focus to the launcher so the keyboard never lands on
     <body>. Opening is handled inside SiteChat (composer focus). */
  const launcherRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  useEffect(() => {
    if (!open) launcherRef.current?.focus();
  }, [open]);

  const isMobile = size === "mobile";
  const isFull = view === "full" && !isMobile;

  const widgetClasses = [
    styles.widget,
    isMobile ? styles.widgetMobile : "",
    isFull ? styles.widgetFull : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
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
                site&rsquo;s own API route. Facts about Rob and the system come
                from a corpus built from the published site; general design
                questions draw on the model&rsquo;s own knowledge, kept visibly
                separate. Switch to Simulated to replay a scripted exchange and
                check the choreography without calling the model.
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
                onSizeChange(value as StageSize);
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

            {/* Swapping transports resets the conversation: a stream from the
                old one would otherwise keep writing into the new transcript.
                Picking the mode already running is not a swap. */}
            <SegmentedControl
              size="compact"
              ariaLabel="Transport"
              activeSegment={transportMode}
              onSegmentChange={(value) => {
                if (value === transportMode) return;
                onTransportChange(value as TransportMode);
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
            >
              <SiteChat fullscreenEnabled={!isMobile} compact={isMobile} />
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
              onClick={() => {
                returnFocusRef.current = null;
                setOpen(true);
              }}
            />
          </div>
        )}
      </div>
    </main>
  );
}

export default function ChatWidgetTestPage() {
  const [size, setSize] = useState<StageSize>("desktop");
  const [transportMode, setTransportMode] = useState<TransportMode>("live");

  const transport = useMemo(
    () => (transportMode === "live" ? createFetchTransport() : createSimTransport()),
    [transportMode]
  );

  return (
    <>
      {/* The site's own backdrop, so the widget is reviewed floating over the
          surface it will actually sit on rather than a flat fill. */}
      <BlurBackground fullHeight />

      {/* The bench runs its own provider so the sim transport can be
          injected. It shadows the site-wide provider from the layout, and
          the site panel is deny-listed on this route — one widget, one
          conversation, no double billing. */}
      <SiteChatProvider transport={transport}>
        <BenchOpenOnLoad />
        <BenchStage
          size={size}
          onSizeChange={setSize}
          transportMode={transportMode}
          onTransportChange={setTransportMode}
        />
      </SiteChatProvider>
    </>
  );
}

/* The provider defaults to closed (the site's resting state); the bench
   exists to look at the widget, so it opens on arrival. */
function BenchOpenOnLoad() {
  const { setOpen } = useSiteChat();
  useEffect(() => {
    setOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
