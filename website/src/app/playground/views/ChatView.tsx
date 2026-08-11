"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AiButton } from "@robr0/design-system/components/AiButton/AiButton";
import { createSimTransport } from "@/lib/chat-sim";
import { createFetchTransport } from "@/lib/chat-transport";
import { SiteChatProvider, useSiteChat } from "@/components/SiteChat/ChatContext";
import { SiteChat } from "@/components/SiteChat/SiteChat";
import styles from "./ChatView.module.css";

export type TransportMode = "live" | "sim";
type ResizeAxis = "x" | "y" | "both";

/* Review targets, not layout tokens. The mobile preset carries a real phone
   viewport and renders edge-to-edge in a bezel — the presentation a phone
   visitor actually gets (the site panel drops its card chrome below 720px). */
export const STAGE_SIZES = {
  desktop: { label: "Desktop (880px)", w: 880, h: 956, device: false, notch: false },
  tablet: { label: "Tablet (768px)", w: 768, h: 956, device: false, notch: false },
  mobile: { label: "Mobile (390px)", w: 390, h: 844, device: true, notch: true },
} as const;
export type StageSize = keyof typeof STAGE_SIZES;

export interface ChatViewProps {
  transportMode: TransportMode;
  /** The widget's header brand — follows the Product name lever. */
  title: string;
  /** The review footprint: desktop/tablet as a resizable card, mobile in a bezel. */
  size: StageSize;
  /** The composer's placeholder copy; empty falls back to "Ask anything". */
  placeholder: string;
  /** Show the conversation starters on the welcome screen. */
  showStarters: boolean;
}

/**
 * The Chat view: the site's chat widget on a stage, re-themed by the same
 * levers as everything else. Runs its own provider so the transport picked
 * in the rail (simulated by default — reviewing choreography should cost
 * nothing) can be injected. The widget's title follows the Product name
 * lever and its copy is deliberately generic — the stage shows a
 * consumer's product, not the site's own assistant.
 */
export default function ChatView({
  transportMode,
  title,
  size,
  placeholder,
  showStarters,
}: ChatViewProps) {
  const transport = useMemo(
    () => (transportMode === "live" ? createFetchTransport() : createSimTransport()),
    [transportMode]
  );

  return (
    /* Keyed by transport: swapping remounts the provider, so a stream from
       the old transport can never keep writing into the new transcript. */
    <SiteChatProvider key={transportMode} transport={transport}>
      <ChatStage
        title={title}
        size={size}
        placeholder={placeholder}
        showStarters={showStarters}
      />
    </SiteChatProvider>
  );
}

function ChatStage({
  title,
  size,
  placeholder,
  showStarters,
}: Omit<ChatViewProps, "transportMode">) {
  const { open, setOpen, returnFocusRef } = useSiteChat();

  /* The provider defaults to closed (the site's resting state); the view
     exists to look at the widget, so it opens on arrival. */
  useEffect(() => {
    setOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Closing hands focus to the launcher so the keyboard never lands on
     <body>. Opening is handled inside SiteChat (composer focus). */
  const launcherRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  useEffect(() => {
    if (!open) launcherRef.current?.focus();
  }, [open]);

  /* ---------- manual resize via the edge handles ----------
     The stage centres the widget, so a drag moves both opposing edges —
     deltas are doubled to keep the grabbed edge under the cursor. Sizes
     are clamped by the CSS min/max. */
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

  /* A manual drag is a size of its own, so switching the stage size
     discards it rather than resizing around it. (The lever lives in the
     rail, outside this component — hence an effect, not a handler.) */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setManual({});
  }, [size]);

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

  /* The devtools-style readout: the widget's actual rendered size while a
     grip is being dragged — the rect, not the requested size, so the CSS
     clamps are visible the moment a drag hits one. */
  const [readout, setReadout] = useState<{ w: number; h: number } | null>(null);
  useEffect(() => {
    if (!resizing) return;
    const rect = widgetRef.current?.getBoundingClientRect();
    if (rect) setReadout({ w: Math.round(rect.width), h: Math.round(rect.height) });
  }, [manual, resizing]);

  const preset = STAGE_SIZES[size];
  const isDevice = preset.device;
  const isCompact = preset.w < 500;

  const widgetEl = (
    <div
      ref={widgetRef}
      className={[
        styles.widget,
        isDevice ? styles.widgetDevice : "",
        /* Resting sizes stay fitted to the column and viewport; a manual
           drag drops the matching clamp so the card can grow past both —
           the workspace edge is the one wall that remains. */
        !isDevice && manual.w == null ? styles.widgetFitW : "",
        !isDevice && manual.h == null ? styles.widgetFitH : "",
      ]
        .filter(Boolean)
        .join(" ")}
      /* In device mode the screen wrapper owns the size and the widget
         fills it; otherwise the manual size wins over the preset, with
         the CSS min/max clamps over both. */
      style={
        isDevice
          ? undefined
          : { width: manual.w ?? preset.w, height: manual.h ?? preset.h }
      }
    >
      <SiteChat
        fullscreenEnabled={false}
        compact={isCompact}
        title={title}
        placeholder={placeholder.trim() === "" ? "Ask anything" : placeholder}
        showStarters={showStarters}
        /* No site mark on a generic product's chat. */
        logo={null}
        tagline="How can we help you today?"
        starters={[
          { id: "start", label: "How do I get started?" },
          { id: "pricing", label: "What do the plans include?" },
          { id: "invite", label: "Invite my team to a workspace" },
        ]}
      />
    </div>
  );

  return (
    <div className={styles.stage}>
      {open ? (
        <div className={`${styles.widgetFrame} ${resizing ? styles.resizing : ""}`}>
          {isDevice ? (
            <div className={styles.deviceShell}>
              {/* The screen: OS chrome above and below the widget, one
                  glass surface behind all three. The strips are set
                  dressing — hidden from the tree like the grips. */}
              <div
                className={styles.deviceScreen}
                style={{ width: preset.w, height: preset.h }}
              >
                <div className={styles.statusBar} aria-hidden="true">
                  <span className={styles.statusTime}>9:41</span>
                  {preset.notch && <span className={styles.dynamicIsland} />}
                  <span className={styles.statusIcons}>
                    <span className="material-symbols-rounded">
                      signal_cellular_alt
                    </span>
                    <span className="material-symbols-rounded">wifi</span>
                    <span className="material-symbols-rounded">battery_full</span>
                  </span>
                </div>
                {widgetEl}
                <div className={styles.homeBar} aria-hidden="true">
                  <span className={styles.homeIndicator} />
                </div>
              </div>
            </div>
          ) : (
            widgetEl
          )}

          {/* Resize grips — review tooling, straddling the widget edges so
              they stay clear of the thread's scrollbar. Mouse-driven only;
              the device presets are fixed hardware sizes, so the grips
              disappear there. pointercancel ends a drag too, or an
              interrupted drag would leave transitions and text selection
              disabled. */}
          {!isDevice &&
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

          {resizing && readout && (
            <div className={styles.sizeReadout} aria-hidden="true">
              {readout.w} &times; {readout.h}
            </div>
          )}
        </div>
      ) : (
        <div className={styles.launcher}>
          <AiButton
            ref={launcherRef}
            label={`Ask ${title}`}
            icon="forum"
            aria-expanded={false}
            onClick={() => {
              returnFocusRef.current = null;
              setOpen(true);
            }}
          />
        </div>
      )}
    </div>
  );
}
