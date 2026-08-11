"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { Button } from "@robr0/design-system/components/Button/Button";
import { CircularButton } from "@robr0/design-system/components/CircularButton/CircularButton";
import { ColorPicker } from "@robr0/design-system/components/ColorPicker/ColorPicker";
import { FileInput } from "@robr0/design-system/components/FileInput/FileInput";
import { Input } from "@robr0/design-system/components/Input/Input";
import { RadioGroup } from "@robr0/design-system/components/RadioButton/RadioButton";
import { Swatch } from "@robr0/design-system/components/Swatch/Swatch";
import { ToggleSwitch } from "@robr0/design-system/components/ToggleSwitch/ToggleSwitch";
import { createSimTransport } from "@/lib/chat-sim";
import { createFetchTransport } from "@/lib/chat-transport";
import BlurBackground from "@/components/BlurBackground/BlurBackground";
import { SiteChatProvider, useSiteChat } from "@/components/SiteChat/ChatContext";
import { SiteChat } from "@/components/SiteChat/SiteChat";
import {
  ACTION_COLOR_PRESETS,
  DEFAULT_BRAND,
  actionColorPlan,
  type Overrides,
} from "../playground/theme-overrides";

/** Which transport the widget runs on. Live talks to /api/chat; the bench
    defaults to the sim so a review session costs nothing. */
type TransportMode = "live" | "sim";
type Theme = "light" | "dark";
type ResizeAxis = "x" | "y" | "both";

/* Review targets, not layout tokens. The mobile preset carries a real phone
   viewport and renders edge-to-edge in a bezel — the presentation a phone
   visitor actually gets (the site panel drops its card chrome below 720px). */
const STAGE_SIZES = {
  desktop: { label: "Desktop (880px)", w: 880, h: 956, device: false, notch: false },
  tablet: { label: "Tablet (768px)", w: 768, h: 956, device: false, notch: false },
  mobile: { label: "Mobile (390px)", w: 390, h: 844, device: true, notch: true },
} as const;
type StageSize = keyof typeof STAGE_SIZES;

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
   site mounts as its docked panel. This page is the QA surface, shaped like
   a playground: a control rail on the left (size, theme, transport, action
   colour, copy overrides), the widget on the right at review sizes with
   resize grips. */

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
  const router = useRouter();

  const theme = useSyncExternalStore(subscribeTheme, readTheme, (): Theme => "dark");

  /* ---------- action colour (the playground's lever, scoped down) ----------
     A preset that names a real primitive repoints the semantic action tokens
     at its ramp; a custom hex rebases its nearest ramp family. Applied on
     the root element — the semantic layer is declared on :root, so overrides
     must land there to cascade — and removed on unmount. */
  const [brand, setBrand] = useState(DEFAULT_BRAND);
  const [brandDark, setBrandDark] = useState<string | undefined>(undefined);
  const effectiveBrand = theme === "dark" && brandDark ? brandDark : brand;

  const actionPlan = useMemo(
    () => actionColorPlan(effectiveBrand, theme),
    [effectiveBrand, theme]
  );
  const overrides = useMemo<Overrides>(
    () => (actionPlan ? { ...actionPlan.primitives, ...actionPlan.semantics } : {}),
    [actionPlan]
  );

  const appliedKeys = useRef<string[]>([]);
  useEffect(() => {
    const root = document.documentElement;
    for (const key of appliedKeys.current) root.style.removeProperty(key);
    for (const [name, value] of Object.entries(overrides)) {
      root.style.setProperty(name, value);
    }
    appliedKeys.current = Object.keys(overrides);
  }, [overrides]);
  useEffect(() => {
    const root = document.documentElement;
    const cleanupRef = appliedKeys;
    return () => {
      for (const key of cleanupRef.current) root.style.removeProperty(key);
    };
  }, []);

  const presetHex = (p: (typeof ACTION_COLOR_PRESETS)[number]) =>
    (theme === "dark" && p.hexDark ? p.hexDark : p.hex).toUpperCase();
  const presetLabel = (p: (typeof ACTION_COLOR_PRESETS)[number]) =>
    theme === "dark" && p.labelDark ? p.labelDark : p.label;
  const isCustomBrand = !ACTION_COLOR_PRESETS.some(
    (p) => effectiveBrand.toUpperCase() === presetHex(p)
  );
  const pickBrand = (hex: string, hexDark?: string) => {
    setBrand(hex);
    setBrandDark(hexDark);
  };

  /* ---------- widget copy overrides ---------- */
  const [appName, setAppName] = useState("");
  const [placeholderText, setPlaceholderText] = useState("");
  const [showStarters, setShowStarters] = useState(true);

  /* ---------- logo ----------
     A custom logo is a session-only object URL: it lives in this tab's
     memory, never uploads anywhere, and dies on reload. Replacing or
     clearing one revokes it so a long review session doesn't leak blobs. */
  const [logoOn, setLogoOn] = useState(true);
  const [customLogo, setCustomLogo] = useState<{ url: string; name: string } | null>(
    null
  );
  const pickLogo = (files: File[]) => {
    const file = files[0];
    if (!file) return;
    setCustomLogo((prev) => {
      if (prev) URL.revokeObjectURL(prev.url);
      return { url: URL.createObjectURL(file), name: file.name };
    });
  };
  const clearLogo = () =>
    setCustomLogo((prev) => {
      if (prev) URL.revokeObjectURL(prev.url);
      return null;
    });
  /* No unmount revoke, deliberately: dev-mode remounts (Fast Refresh,
     StrictMode) re-run effect cleanups while state survives, which would
     kill the blob under a live preview. The replace/clear revokes above
     bound the leak at one small image per session, and the document's end
     reclaims that. */

  /* ---------- manual resize via the edge handles ----------
     The stage centres the widget, so a drag moves both opposing edges —
     deltas are doubled to keep the grabbed edge under the cursor. Sizes are
     clamped by the CSS min/max, and any size or view toggle clears the
     manual override. */
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

  /* The devtools-style readout: the widget's actual rendered size while a
     grip is being dragged — the rect, not the requested size, so the CSS
     clamps are visible the moment a drag hits one. */
  const [readout, setReadout] = useState<{ w: number; h: number } | null>(null);
  useEffect(() => {
    if (!resizing) return;
    const rect = widgetRef.current?.getBoundingClientRect();
    if (rect) setReadout({ w: Math.round(rect.width), h: Math.round(rect.height) });
  }, [manual, resizing]);

  /* Closing hands focus to the launcher so the keyboard never lands on
     <body>. Opening is handled inside SiteChat (composer focus). */
  const launcherRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  useEffect(() => {
    if (!open) launcherRef.current?.focus();
  }, [open]);

  const preset = STAGE_SIZES[size];
  const isDevice = preset.device;
  const isCompact = preset.w < 500;
  const isFull = view === "full" && !isDevice;

  /* The bench is chromeless, so the X is the way back to wherever the
     visitor came from; opened cold (a shared link), it goes home. */
  const leaveBench = () => {
    if (window.history.length > 2) router.back();
    else router.push("/");
  };

  const resetBench = () => {
    onSizeChange("desktop");
    setManual({});
    setBrand(DEFAULT_BRAND);
    setBrandDark(undefined);
    setAppName("");
    setPlaceholderText("");
    setShowStarters(true);
    setLogoOn(true);
    clearLogo();
    if (transportMode !== "sim") {
      onTransportChange("sim");
      reset();
    }
  };

  const widgetClasses = [
    styles.widget,
    isDevice ? styles.widgetDevice : "",
    isFull ? styles.widgetFull : "",
  ]
    .filter(Boolean)
    .join(" ");

  const widgetEl = (
    <div
      ref={widgetRef}
      className={widgetClasses}
      /* Full screen owns its size; the manual size survives in state so
         collapsing returns to the previous footprint. The CSS min/max
         clamps still apply over these. In device mode the screen wrapper
         owns the size and the widget fills it. */
      style={
        isFull || isDevice
          ? undefined
          : { width: manual.w ?? preset.w, height: manual.h ?? preset.h }
      }
    >
      <SiteChat
        fullscreenEnabled={!isDevice}
        compact={isCompact}
        title={appName.trim() === "" ? "robr0 GPT" : appName}
        placeholder={placeholderText.trim() === "" ? "Ask anything" : placeholderText}
        showStarters={showStarters}
        logo={logoOn ? (customLogo?.url ?? "/rr.svg") : null}
      />
    </div>
  );

  return (
    <main className={styles.stage}>
      {/* Fullscreen covers the stage — the rail and the close button leave
          the tab order entirely rather than lurking reachable behind the
          overlay. */}
      {!isFull && (
        <>
          <div className={styles.closeSlot}>
            <CircularButton
              icon="close"
              variant="tertiary"
              ariaLabel="Close the bench"
              onClick={leaveBench}
            />
          </div>

          <div className={styles.rail}>
            <h1 className={styles.railTitle}>Chat bench</h1>

            <div className={styles.controlGroup}>
              <RadioGroup
                label="Stage size"
                name="stage-size"
                value={size}
                options={Object.entries(STAGE_SIZES).map(([value, s]) => ({
                  value,
                  label: s.label,
                }))}
                onValueChange={(value) => {
                  /* A manual drag is a size of its own, so switching stage
                     size discards it rather than resizing around it. */
                  onSizeChange(value as StageSize);
                  setManual({});
                }}
              />
              <p className={styles.controlNote}>
                Mobile renders edge-to-edge in a bezel, the way the site panel
                ships on phones.
              </p>
            </div>

            <div className={styles.controlGroup}>
              <RadioGroup
                label="Theme"
                name="bench-theme"
                value={theme}
                options={[
                  { value: "light", label: "Light" },
                  { value: "dark", label: "Dark" },
                ]}
                onValueChange={(value) => applyTheme(value as Theme)}
              />
            </div>

            <div className={styles.controlGroup}>
              {/* Swapping transports resets the conversation: a stream from
                  the old one would otherwise keep writing into the new
                  transcript. Picking the mode already running is not a swap. */}
              <RadioGroup
                label="Transport"
                name="bench-transport"
                value={transportMode}
                options={[
                  { value: "sim", label: "Simulated" },
                  { value: "live", label: "Live" },
                ]}
                onValueChange={(value) => {
                  if (value === transportMode) return;
                  onTransportChange(value as TransportMode);
                  reset();
                }}
              />
              <p className={styles.controlNote}>
                Simulated replays a scripted exchange without calling the
                model. Live answers through the site&rsquo;s API route.
              </p>
            </div>

            <div className={styles.controlGroup}>
              <h4 className={styles.controlHeading}>Action colour</h4>
              <div className={styles.swatchGrid}>
                {ACTION_COLOR_PRESETS.map((p) => (
                  <Swatch
                    key={p.hex}
                    value={presetHex(p)}
                    label={presetLabel(p)}
                    selected={effectiveBrand.toUpperCase() === presetHex(p)}
                    onClick={() => pickBrand(p.hex, p.hexDark)}
                  />
                ))}
              </div>
              <ColorPicker
                value={brand}
                onValueChange={pickBrand}
                showText
                aria-label="Custom action colour"
                className={isCustomBrand ? styles.customPickerActive : ""}
              />
            </div>

            <div className={styles.controlGroup}>
              <Input
                label="App name"
                placeholder="robr0 GPT"
                value={appName}
                onValueChange={setAppName}
              />
              <Input
                label="Composer placeholder"
                placeholder="Ask anything"
                value={placeholderText}
                onValueChange={setPlaceholderText}
              />
              <ToggleSwitch
                label="Starter prompts"
                checked={showStarters}
                onChange={setShowStarters}
              />
              <ToggleSwitch label="Logo" checked={logoOn} onChange={setLogoOn} />
              {logoOn && (
                <>
                  <FileInput
                    label="Custom logo"
                    size="compact"
                    placeholder="Drop an image or browse"
                    accept="image/*"
                    files={customLogo ? [{ id: "logo", name: customLogo.name }] : []}
                    onFilesSelected={pickLogo}
                    onFileRemove={clearLogo}
                  />
                  <p className={styles.controlNote}>
                    The logo stays in this tab and is gone on reload. Nothing
                    uploads.
                  </p>
                </>
              )}
            </div>

            <Button
              label="Reset bench"
              variant="tertiary"
              iconLeft="restart_alt"
              onClick={resetBench}
            />
          </div>
        </>
      )}

      <div className={styles.viewport}>
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
                the size presets remain the accessible path. Full screen owns
                the whole viewport and the device presets are fixed hardware
                sizes, so the grips disappear in both. pointercancel ends a
                drag too, or an interrupted drag would leave transitions and
                text selection disabled. */}
            {!isFull &&
              !isDevice &&
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
  /* Sim by default: reviewing choreography should cost nothing — Live is
     the deliberate opt-in (the chat cost policy on record). */
  const [transportMode, setTransportMode] = useState<TransportMode>("sim");

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
