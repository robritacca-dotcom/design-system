"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AiButton } from "@robr0/design-system/components/AiButton/AiButton";
import { CircularButton } from "@robr0/design-system/components/CircularButton/CircularButton";
import { DocumentChip } from "@robr0/design-system/components/DocumentChip/DocumentChip";
import {
  ModelPicker,
  type ModelPickerModel,
} from "@robr0/design-system/components/ModelPicker/ModelPicker";
import { useSiteChat, useTakeoverViewport } from "@/components/SiteChat/ChatContext";
import { SiteChat } from "@/components/SiteChat/SiteChat";
import styles from "./ChatView.module.css";

/* The simulated composer's model list — set dressing for a generic product,
   so choosing one changes nothing but the pill. The default matches the
   label the live composer shows, so switching transports doesn't jump. */
const MOCK_MODELS: ModelPickerModel[] = [
  {
    label: "Sonnet 5",
    value: "sonnet-5",
    description: "Fast and capable, the everyday pick.",
    badge: "New",
  },
  {
    label: "Fable 5",
    value: "fable-5",
    description: "The deepest reasoning for hard questions.",
  },
  {
    label: "Haiku 4.5",
    value: "haiku-4-5",
    description: "Instant answers for quick lookups.",
  },
];

export type TransportMode = "live" | "sim";
type ResizeAxis = "x" | "y" | "both";

/* Review targets, not layout tokens. Two footprints are enough: the
   desktop card, which rests filling the stage's safe zone (its size
   derives from the available space; w/h here are only the drag baseline
   the type shares), and the mobile preset — a real phone viewport
   rendered edge-to-edge in a bezel, the presentation a phone visitor
   actually gets (the site panel drops its card chrome below 720px). */
export const STAGE_SIZES = {
  desktop: { label: "Desktop", w: 880, h: 956, device: false, notch: false },
  mobile: { label: "Mobile (390px)", w: 390, h: 844, device: true, notch: true },
} as const;
export type StageSize = keyof typeof STAGE_SIZES;

export interface ChatViewProps {
  /** The widget's header brand — follows the Product name lever. */
  title: string;
  /** The review footprint: desktop as a resizable card, mobile in a bezel. */
  size: StageSize;
  /** The composer's placeholder copy; empty falls back to "Ask anything". */
  placeholder: string;
  /** Show the conversation starters on the welcome screen. */
  showStarters: boolean;
  /** The dragged size, held by the page so it survives a switch to the
      Components view and back — and dies with the playground, like every
      other lever. */
  manual: { w?: number; h?: number };
  /** Reports a drag's partial size; the page merges it functionally. */
  onManual: (next: { w?: number; h?: number }) => void;
  /** The takeover is a desktop affordance — compact screens are already
      edge-to-edge, so the page withholds it there. */
  allowFullscreen: boolean;
  /** The Simulated transport is active: the composer swaps the site's live
      model picker for the mock picker and the attach button. */
  simControls: boolean;
}

/**
 * The Chat view: the site's chat widget on a stage, re-themed by the same
 * levers as everything else. The provider lives up in the page now, wrapped
 * around the whole layout, so the event rail and the compact Drawer can
 * direct the same conversation the stage renders — and the transcript
 * survives a switch to the Components view and back. The widget's title
 * follows the Product name lever and its copy is deliberately generic —
 * the stage shows a consumer's product, not the site's own assistant.
 */
export default function ChatView({
  title,
  size,
  placeholder,
  showStarters,
  manual,
  onManual,
  allowFullscreen,
  simControls,
}: ChatViewProps) {
  const { open, setOpen, view, returnFocusRef, send, streaming } = useSiteChat();
  /* A real phone viewport: the stage-size lever is hidden there and the
     widget goes fluid, so the preset alone cannot say it is a phone. */
  const phoneViewport = useTakeoverViewport();

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
    onManual(next);
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
  /* The takeover: SiteChat's own expand button drives the view; the stage
     just dresses the widget as a full-viewport surface while it lasts. */
  const isFull = allowFullscreen && !isDevice && view === "full";

  /* ---------- the takeover glide (the live panel's animation) ----------
     The site panel glides because it is always fixed — only animatable
     properties change. The stage widget is in-flow, so the same feel
     needs a FLIP: pin the card as fixed at its current rect, let the
     transition carry it to the viewport, and reverse on the way out. A
     spacer holds the card's slot meanwhile, and is also the measured
     return target, so a scroll during fullscreen can't strand the card. */
  type FullPhase = "closed" | "pinned" | "open" | "closing";
  const [fullPhase, setFullPhase] = useState<FullPhase>("closed");
  /* State, not a ref: the rect is read during render (the pinned style,
     the spacer's footprint), and it only changes at phase transitions. */
  const [flipRect, setFlipRect] = useState<{
    x: number;
    y: number;
    w: number;
    h: number;
  } | null>(null);
  const spacerRef = useRef<HTMLDivElement | null>(null);

  /* The phase machine reacts to the context's view flipping, and each
     step must measure the DOM the previous step produced. */
  useLayoutEffect(() => {
    if (isFull && fullPhase === "closed") {
      const r = widgetRef.current?.getBoundingClientRect();
      if (r) setFlipRect({ x: r.x, y: r.y, w: r.width, h: r.height });
      setFullPhase("pinned");
    } else if (!isFull && (fullPhase === "open" || fullPhase === "pinned")) {
      const r = spacerRef.current?.getBoundingClientRect();
      if (r) setFlipRect({ x: r.x, y: r.y, w: r.width, h: r.height });
      setFullPhase("closing");
    }
  }, [isFull, fullPhase]);

  /* Two frames between pin and release, so the transition has a starting
     geometry to leave from. */
  useEffect(() => {
    if (fullPhase !== "pinned") return;
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setFullPhase("open"))
    );
    return () => cancelAnimationFrame(raf);
  }, [fullPhase]);

  /* The glide home ends on transitionend; the timeout is the reduced-motion
     fallback (zeroed durations fire no event). */
  useEffect(() => {
    if (fullPhase !== "closing") return;
    const el = widgetRef.current;
    const done = () => setFullPhase("closed");
    el?.addEventListener("transitionend", done, { once: true });
    const fallback = setTimeout(done, 600);
    return () => {
      el?.removeEventListener("transitionend", done);
      clearTimeout(fallback);
    };
  }, [fullPhase]);

  const takeover = fullPhase !== "closed";
  const pinnedStyle =
    (fullPhase === "pinned" || fullPhase === "closing") && flipRect
      ? {
          top: flipRect.y,
          left: flipRect.x,
          width: flipRect.w,
          height: flipRect.h,
        }
      : undefined;

  const widgetEl = (
    <div
      ref={widgetRef}
      className={[
        styles.widget,
        isDevice ? styles.widgetDevice : "",
        /* Resting sizes stay fitted to the column and viewport; a manual
           drag drops the matching clamp so the card can grow past both —
           the workspace edge is the one wall that remains. The takeover
           carries no fit clamps at all, or they would cap it. */
        !takeover && !isDevice && manual.w == null ? styles.widgetFitW : "",
        !takeover && !isDevice && manual.h == null ? styles.widgetFitH : "",
        takeover ? styles.widgetFull : "",
      ]
        .filter(Boolean)
        .join(" ")}
      /* Pinned phases hold the card's rect so the glide has somewhere to
         start and land; open lets the class's viewport geometry rule; in
         device mode the screen wrapper owns the size. Otherwise only a
         manual drag sizes the card inline — at rest the fit classes derive
         its size from the stage's available space, with the CSS clamps
         over both. */
      style={
        takeover
          ? pinnedStyle
          : isDevice
            ? undefined
            : { width: manual.w, height: manual.h }
      }
    >
      <SiteChat
        fullscreenEnabled={allowFullscreen && !isDevice}
        compact={isCompact}
        /* The bezel previews a phone, and a phone is one: both get the
           stacked welcome the site's takeover shows. */
        phone={isDevice || phoneViewport}
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
        composerActions={
          simControls ? (
            <>
              {/* The attach button stages a file exactly the way the
                  director's doc-drop event does — everything on this stage
                  is simulated, so the click skips the picker and sends the
                  attachment through the sim story: the chip rides the
                  visitor's bubble, and the agent answers by reading the
                  doc and charting its budget. */}
              <CircularButton
                icon="add"
                variant="tertiary"
                ariaLabel="Attach a file"
                disabled={streaming}
                onClick={() =>
                  send("Here is the launch plan we are working from.", {
                    content: (
                      <DocumentChip
                        name="Q3 launch plan.pdf"
                        fileType="pdf"
                        meta="1.2 MB"
                      />
                    ),
                  })
                }
              />
              {/* Working mock: the panel opens and the pill follows the
                  choice, but nothing routes anywhere — the sim script is
                  the sim script whatever the pill says. */}
              <ModelPicker models={MOCK_MODELS} placement="top" />
            </>
          ) : undefined
        }
      />
    </div>
  );

  return (
    <div className={styles.stage}>
      {open ? (
        <div className={`${styles.widgetFrame} ${resizing ? styles.resizing : ""}`}>
          {/* Holds the card's slot while the widget is off being the
              takeover — the stage doesn't collapse, and coming back has a
              measurable target. */}
          {takeover && (
            <div
              ref={spacerRef}
              className={styles.spacer}
              style={{ width: flipRect?.w, height: flipRect?.h }}
              aria-hidden="true"
            />
          )}
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
            fullPhase === "closed" &&
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
