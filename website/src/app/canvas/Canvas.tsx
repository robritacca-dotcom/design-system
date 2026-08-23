"use client";

import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CircularButton } from "@robr0/design-system/components/CircularButton/CircularButton";
import { SegmentedControl } from "@robr0/design-system/components/SegmentedControl/SegmentedControl";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
import { siteSections, type CanvasSection } from "./ia";
import styles from "./Canvas.module.css";

/* ============================================
   DEVICES
   The viewport every frame renders at. Width is the frame; height is what
   "one viewport tall" means to the page inside (see onReady), so the frame
   can then grow to the page's own height.
   ============================================ */
type DeviceId = "desktop" | "mobile";

const DEVICES: Record<DeviceId, { label: string; icon: string; width: number; height: number }> = {
  desktop: { label: "Desktop", icon: "desktop_windows", width: 1440, height: 900 },
  mobile: { label: "Mobile", icon: "smartphone", width: 390, height: 844 },
};

const deviceSegments = (Object.keys(DEVICES) as DeviceId[]).map((id) => ({
  value: id,
  label: DEVICES[id].label,
  icon: DEVICES[id].icon,
}));

/* ============================================
   BOARD GEOMETRY
   Board pixels. Gaps scale with the frame width so the mobile board keeps
   the desktop board's proportions.
   ============================================ */
/** A frame shows at most this much of its page; the rest scrolls inside it.
    A case study runs to ~12,000px and fits; the rendered design spec runs
    past 70,000 and would otherwise make everything else on the board a speck. */
const MAX_FRAME_HEIGHT = 24000;

/** Low enough that a board of forty full pages still fits the view. */
const MIN_ZOOM = 0.004;
const MAX_ZOOM = 4;
const ZOOM_STEP = 1.25;
/** Trackpad pinch and ctrl+wheel: zoom factor per wheel-delta pixel. */
const WHEEL_ZOOM_RATE = 0.01;
/** Mouse wheels report lines, not pixels; one line pans this many pixels. */
const LINE_HEIGHT_PX = 16;
/** A single wheel notch (~120) would otherwise triple the zoom; a pinch
    arrives as many small deltas and never reaches this. */
const MAX_WHEEL_ZOOM_DELTA = 40;
/** Frame names hide once a frame is narrower than this on screen: below
    it the name would be wider than the frame it names. Branch labels stay. */
const MIN_LABELLED_FRAME_PX = 96;
/** Room left around a fitted rect, in screen pixels. */
const FIT_PADDING = 96;
/** Pointer travel that turns a click into a drag. */
const DRAG_THRESHOLD = 4;
/** The second height pass, for images and fonts that land after load. */
const RESETTLE_DELAY_MS = 1500;
/** Pages load this many at a time, in IA order: forty at once would contend
    for the same connection and the same main thread. */
const LOAD_CONCURRENCY = 4;

interface View {
  x: number;
  y: number;
  k: number;
}

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface PlacedPage {
  id: string;
  href: string;
  label: string;
  /** Mount order across the whole board. */
  index: number;
  x: number;
  y: number;
}

interface PlacedSection {
  id: string;
  label: string;
  x: number;
  width: number;
  pages: PlacedPage[];
}

/**
 * Lays the IA out left to right, one branch after another. Inside a branch
 * the pages pack into columns, each page dropping into the shortest column
 * so far, with as many columns as it takes for the branch to come out
 * roughly square (a branch of long case studies spreads wide; a branch of
 * short pages stacks). Columns are re-balanced as pages report their
 * heights, so the board settles into shape as it loads.
 */
function layoutBoard(
  sections: CanvasSection[],
  frameWidth: number,
  fallbackHeight: number,
  heights: Record<string, number>,
): PlacedSection[] {
  const pageGap = frameWidth / 12;
  const rowGap = frameWidth / 6;
  const sectionGap = frameWidth / 4;
  let cursor = 0;
  let index = 0;
  return sections.map((section) => {
    const heightOf = (href: string) => heights[href] ?? fallbackHeight;
    const total = section.pages.reduce((sum, p) => sum + heightOf(p.href), 0);
    const cols = Math.max(
      1,
      Math.min(section.pages.length, Math.round(Math.sqrt(total / frameWidth))),
    );
    const x = cursor;
    const columnBottoms = Array.from({ length: cols }, () => 0);
    const pages = section.pages.map((page) => {
      let col = 0;
      for (let c = 1; c < cols; c++) {
        if (columnBottoms[c] < columnBottoms[col]) col = c;
      }
      const y = columnBottoms[col];
      columnBottoms[col] = y + heightOf(page.href) + rowGap;
      return {
        ...page,
        id: page.href,
        index: index++,
        x: x + col * (frameWidth + pageGap),
        y,
      };
    });
    const width = cols * frameWidth + (cols - 1) * pageGap;
    cursor += width + sectionGap;
    return { id: section.id, label: section.label, x, width, pages };
  });
}

const clampZoom = (k: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, k));

function unionRect(rects: Rect[]): Rect {
  const x1 = Math.min(...rects.map((r) => r.x));
  const y1 = Math.min(...rects.map((r) => r.y));
  const x2 = Math.max(...rects.map((r) => r.x + r.w));
  const y2 = Math.max(...rects.map((r) => r.y + r.h));
  return { x: x1, y: y1, w: x2 - x1, h: y2 - y1 };
}

/** True when a key event comes from somewhere that types, so shortcuts stay out of its way. */
function isTypingTarget(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el || typeof el.closest !== "function") return false;
  return Boolean(el.closest("input, textarea, select, [contenteditable='true']"));
}

/**
 * Measures a loaded page and decides how tall its frame should be.
 *
 * Measure once at viewport height, set the frame to it, and the page is laid
 * out in full. The second measurement is a guard: a page that still sizes
 * something by its frame (a stray vh the layout variable does not reach)
 * grows with every step, and the frame stays one viewport tall rather than
 * chase it.
 */
async function settleHeight(
  iframe: HTMLIFrameElement,
  viewportHeight: number,
): Promise<number> {
  const doc = iframe.contentDocument;
  if (!doc) return viewportHeight;
  const measure = () =>
    Math.min(doc.documentElement.scrollHeight, MAX_FRAME_HEIGHT);
  const nextFrame = () =>
    new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

  /* From a clean start: the page's body is at least one viewport tall, so
     a frame that was ever too tall reads as exactly that tall until it is
     shrunk back to the viewport and measured again. Two frames, because
     the first may land before the page has re-laid-out to a new width. */
  iframe.style.height = `${viewportHeight}px`;
  await nextFrame();
  await nextFrame();
  const h1 = measure();
  let result = viewportHeight;
  if (h1 > viewportHeight + 2) {
    iframe.style.height = `${h1}px`;
    await nextFrame();
    const h2 = measure();
    const viewportBound = h2 - h1 > 0.5 * (h1 - viewportHeight);
    result = viewportBound ? viewportHeight : Math.max(h1, h2);
  }
  // The wrapper owns the height from here (the frame fills it).
  iframe.style.height = "";
  return result;
}

/* ============================================
   FRAME
   One page on the board: its label, the live page in an iframe once its
   turn to load comes, and a hit layer over it that takes the pointer until
   the frame is entered.
   ============================================ */
interface FrameProps {
  page: PlacedPage;
  width: number;
  height: number;
  /** Whether the page has been given its turn to load. */
  mounted: boolean;
  /** Where the page inside has gone, when a visitor using the frame has followed a link. */
  location: string | null;
  selected: boolean;
  entered: boolean;
  onReady: (id: string, iframe: HTMLIFrameElement) => void;
}

const Frame = memo(function Frame({
  page,
  width,
  height,
  mounted,
  location,
  selected,
  entered,
  onReady,
}: FrameProps) {
  const ref = useRef<HTMLIFrameElement>(null);
  const announced = useRef(false);

  const announce = useCallback(() => {
    if (announced.current || !ref.current) return;
    announced.current = true;
    onReady(page.id, ref.current);
  }, [onReady, page.id]);

  /* The first frames are in the server markup, and a page that is already
     compiled can finish loading before React hydrates and attaches onLoad.
     A document that is complete on mount is announced here instead. */
  useEffect(() => {
    const doc = ref.current?.contentDocument;
    // A just-inserted frame holds a complete about:blank; that is not it.
    if (doc?.readyState === "complete" && doc.URL !== "about:blank") announce();
  }, [announce, mounted]);

  return (
    <div
      className={styles.frame}
      style={{ left: page.x, top: page.y, width, height }}
      data-selected={selected || undefined}
      data-entered={entered || undefined}
    >
      <div className={styles.frameLabel} data-hit={page.id}>
        <span>{page.label}</span>
        {location && <span className={styles.frameLocation}>{location}</span>}
        {entered && <span className={styles.frameLocation}>Esc to leave</span>}
      </div>
      {mounted && (
        <iframe
          ref={ref}
          src={page.href}
          title={page.label}
          className={styles.page}
          tabIndex={entered ? undefined : -1}
          onLoad={announce}
        />
      )}
      <div className={styles.hit} data-hit={page.id} />
    </div>
  );
});

/* ============================================
   CANVAS
   ============================================ */
export default function Canvas() {
  const sections = useMemo(() => siteSections(), []);

  const viewportRef = useRef<HTMLDivElement>(null);
  const [device, setDevice] = useState<DeviceId>("desktop");
  const [view, setViewState] = useState<View>({ x: 0, y: 0, k: 0.2 });
  const [smooth, setSmooth] = useState(false);
  const [heights, setHeights] = useState<Record<string, number>>({});
  const [locations, setLocations] = useState<Record<string, string | null>>({});
  const [loaded, setLoaded] = useState<Set<string>>(() => new Set());
  const [selected, setSelected] = useState<string | null>(null);
  const [entered, setEntered] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const { width: frameWidth, height: viewportHeight } = DEVICES[device];

  const board = useMemo(
    () => layoutBoard(sections, frameWidth, viewportHeight, heights),
    [sections, frameWidth, viewportHeight, heights],
  );
  const pages = useMemo(() => board.flatMap((s) => s.pages), [board]);

  const viewRef = useRef(view);
  useLayoutEffect(() => {
    viewRef.current = view;
  }, [view]);
  const deviceRef = useRef(device);
  useLayoutEffect(() => {
    deviceRef.current = device;
  }, [device]);
  /* Once the visitor has moved the view, the board stops re-fitting itself
     as pages report their heights. */
  const touched = useRef(false);
  const frames = useRef(new Map<string, HTMLIFrameElement>());

  const setView = useCallback((next: View, animate = false) => {
    setSmooth(animate);
    setViewState({ ...next, k: clampZoom(next.k) });
  }, []);

  /* ---------- geometry ---------- */

  const rectOf = useCallback(
    (page: PlacedPage): Rect => ({
      x: page.x,
      y: page.y,
      w: frameWidth,
      h: heights[page.id] ?? viewportHeight,
    }),
    [frameWidth, heights, viewportHeight],
  );

  const fitRect = useCallback(
    (rect: Rect, animate: boolean) => {
      const vp = viewportRef.current;
      if (!vp) return;
      const { width: vw, height: vh } = vp.getBoundingClientRect();
      // No room yet (a pane still being sized): leave the view alone; the
      // resize observer below fits it once there is.
      if (vw <= 2 * FIT_PADDING || vh <= 2 * FIT_PADDING) return;
      const k = clampZoom(
        Math.min((vw - 2 * FIT_PADDING) / rect.w, (vh - 2 * FIT_PADDING) / rect.h),
      );
      setView(
        {
          k,
          x: (vw - rect.w * k) / 2 - rect.x * k,
          y: (vh - rect.h * k) / 2 - rect.y * k,
        },
        animate,
      );
    },
    [setView],
  );

  const fitAll = useCallback(
    (animate: boolean) => fitRect(unionRect(pages.map(rectOf)), animate),
    [fitRect, pages, rectOf],
  );

  const fitSelection = useCallback(
    (animate: boolean) => {
      const page = pages.find((p) => p.id === selected);
      if (page) fitRect(rectOf(page), animate);
      else fitAll(animate);
    },
    [fitAll, fitRect, pages, rectOf, selected],
  );

  /** Zooms by a factor about a viewport point, which stays put on screen. */
  const zoomAt = useCallback(
    (px: number, py: number, factor: number, animate = false) => {
      const v = viewRef.current;
      const k = clampZoom(v.k * factor);
      const r = k / v.k;
      setView({ k, x: px - (px - v.x) * r, y: py - (py - v.y) * r }, animate);
    },
    [setView],
  );

  /**
   * A stepped zoom (buttons, keys). With a page selected it zooms about that
   * page and brings it to the centre, so stepping in lands on the thing you
   * chose; otherwise it zooms about the middle of the view.
   */
  const zoomStep = useCallback(
    (factor: number) => {
      const vp = viewportRef.current;
      if (!vp) return;
      const { width, height } = vp.getBoundingClientRect();
      touched.current = true;
      const page = pages.find((p) => p.id === selected);
      if (!page) {
        zoomAt(width / 2, height / 2, factor, true);
        return;
      }
      const rect = rectOf(page);
      const cx = rect.x + rect.w / 2;
      const cy = rect.y + rect.h / 2;
      const k = clampZoom(viewRef.current.k * factor);
      setView({ k, x: width / 2 - cx * k, y: height / 2 - cy * k }, true);
    },
    [pages, rectOf, selected, setView, zoomAt],
  );

  const zoomTo100 = useCallback(() => {
    zoomStep(1 / viewRef.current.k);
  }, [zoomStep]);

  /* ---------- first fit, and re-fits while the board is still settling ---------- */

  useLayoutEffect(() => {
    if (!touched.current) fitAll(false);
    // fitAll changes identity as heights arrive; that is the re-fit.
  }, [fitAll]);

  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const observer = new ResizeObserver(() => {
      if (!touched.current) fitAll(false);
    });
    observer.observe(vp);
    return () => observer.disconnect();
  }, [fitAll]);

  /* ---------- wheel: pan, or zoom with ctrl/cmd (a trackpad pinch sets ctrlKey) ---------- */

  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      touched.current = true;
      const scale = e.deltaMode === 1 ? LINE_HEIGHT_PX : 1;
      if (e.ctrlKey || e.metaKey) {
        const rect = vp.getBoundingClientRect();
        const delta = Math.max(
          -MAX_WHEEL_ZOOM_DELTA,
          Math.min(MAX_WHEEL_ZOOM_DELTA, e.deltaY * scale),
        );
        zoomAt(
          e.clientX - rect.left,
          e.clientY - rect.top,
          Math.exp(-delta * WHEEL_ZOOM_RATE),
        );
      } else {
        const v = viewRef.current;
        setView({ ...v, x: v.x - e.deltaX * scale, y: v.y - e.deltaY * scale });
      }
    };
    vp.addEventListener("wheel", onWheel, { passive: false });
    return () => vp.removeEventListener("wheel", onWheel);
  }, [setView, zoomAt]);

  /* ---------- pointer: drag to pan, click to select, double-click to enter ---------- */

  const drag = useRef<{
    sx: number;
    sy: number;
    ox: number;
    oy: number;
    moved: boolean;
    hit: string | null;
  } | null>(null);

  const hitOf = (target: EventTarget | null) =>
    (target as Element | null)?.closest?.("[data-hit]")?.getAttribute("data-hit") ??
    null;
  /* Pointer capture retargets the derived click and dblclick events to the
     viewport, so the frame under the pointer is read once, on pointerdown. */
  const lastHit = useRef<string | null>(null);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const v = viewRef.current;
    lastHit.current = hitOf(e.target);
    drag.current = {
      sx: e.clientX,
      sy: e.clientY,
      ox: v.x,
      oy: v.y,
      moved: false,
      hit: lastHit.current,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.sx;
    const dy = e.clientY - d.sy;
    if (!d.moved) {
      if (Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
      d.moved = true;
      touched.current = true;
      setDragging(true);
    }
    setView({ k: viewRef.current.k, x: d.ox + dx, y: d.oy + dy });
  };

  const onPointerUp = () => {
    const d = drag.current;
    drag.current = null;
    setDragging(false);
    if (!d || d.moved) return;
    if (d.hit) {
      setSelected(d.hit);
      if (entered && entered !== d.hit) setEntered(null);
    } else {
      setSelected(null);
      setEntered(null);
    }
  };

  const onDoubleClick = () => {
    const hit = lastHit.current;
    if (!hit) return;
    setSelected(hit);
    setEntered(hit);
  };

  /* ---------- keyboard ---------- */

  const handleKey = (e: KeyboardEvent) => {
    if (isTypingTarget(e.target)) return;
    const mod = e.metaKey || e.ctrlKey;
    /* Physical key first, so the shortcut survives a shifted symbol; the
       printed key as a fallback for layouts (and tools) that report no code. */
    const is = (code: string, ...keys: string[]) =>
      e.code === code || keys.includes(e.key);

    if (is("Escape", "Escape")) {
      if (entered) {
        setEntered(null);
        const win = frames.current.get(entered)?.contentWindow;
        (win?.document.activeElement as HTMLElement | null)?.blur?.();
      } else {
        setSelected(null);
      }
    } else if (is("Equal", "=", "+") || is("NumpadAdd")) {
      e.preventDefault();
      zoomStep(ZOOM_STEP);
    } else if (is("Minus", "-", "_") || is("NumpadSubtract")) {
      e.preventDefault();
      zoomStep(1 / ZOOM_STEP);
    } else if ((e.shiftKey || mod) && is("Digit0", "0", ")")) {
      e.preventDefault();
      zoomTo100();
    } else if (e.shiftKey && is("Digit1", "1", "!")) {
      e.preventDefault();
      touched.current = true;
      fitAll(true);
    } else if (e.shiftKey && is("Digit2", "2", "@")) {
      e.preventDefault();
      touched.current = true;
      fitSelection(true);
    }
  };
  const keyRef = useRef(handleKey);
  useLayoutEffect(() => {
    keyRef.current = handleKey;
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => keyRef.current(e);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* ---------- theme: the board's toggle reaches into every frame ---------- */

  const applyTheme = useCallback((iframe: HTMLIFrameElement) => {
    const theme = document.documentElement.getAttribute("data-theme") ?? "dark";
    iframe.contentDocument?.documentElement.setAttribute("data-theme", theme);
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      frames.current.forEach(applyTheme);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, [applyTheme]);

  /* ---------- the page's viewport, and its height ---------- */

  /* The page's idea of "one viewport tall" is the device's height, not the
     frame's, so viewport-sized sections get a fixed size and the page a
     natural height (globals.css owns the variable). */
  const pinViewport = useCallback((iframe: HTMLIFrameElement) => {
    iframe.contentDocument?.documentElement.style.setProperty(
      "--layout-viewport-height",
      `${DEVICES[deviceRef.current].height}px`,
    );
  }, []);

  const settle = useCallback(async (id: string, iframe: HTMLIFrameElement) => {
    const h = await settleHeight(iframe, DEVICES[deviceRef.current].height);
    setHeights((prev) => (prev[id] === h ? prev : { ...prev, [id]: h }));
  }, []);

  const switchDevice = useCallback((next: DeviceId) => {
    deviceRef.current = next;
    touched.current = false;
    setDevice(next);
    setHeights({});
  }, []);

  /* Switching device re-measures every page at its new width: after the
     frames have re-rendered at it, and a few pages at a time, so no reading
     lands mid-way through forty pages re-laying-out at once. */
  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      const entries = [...frames.current];
      for (let i = 0; i < entries.length; i += LOAD_CONCURRENCY) {
        if (cancelled) return;
        await Promise.all(
          entries.slice(i, i + LOAD_CONCURRENCY).map(([id, iframe]) => {
            pinViewport(iframe);
            return settle(id, iframe);
          }),
        );
      }
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [device, pinViewport, settle]);

  /* ---------- a frame's page has loaded ---------- */

  const onReady = useCallback(
    (id: string, iframe: HTMLIFrameElement) => {
      const win = iframe.contentWindow;
      const doc = iframe.contentDocument;
      if (!win || !doc) return;
      frames.current.set(id, iframe);
      setLoaded((prev) => {
        if (prev.has(id)) return prev;
        const next = new Set(prev);
        next.add(id);
        return next;
      });
      applyTheme(iframe);
      /* Marked as framed (globals.css reads it: motion off, glass off, so a
         page rasterized under a scale transform repaints as little as it
         can), with its viewport pinned and its scrollbar hidden (the frame
         shows the whole page, so the bar would only be noise). */
      const root = doc.documentElement;
      root.dataset.embedded = "";
      root.style.setProperty("scrollbar-width", "none");
      pinViewport(iframe);
      // Shortcuts keep working while the focus is inside a frame.
      win.addEventListener("keydown", (e) => keyRef.current(e));

      const relabel = () => {
        const path = win.location.pathname;
        const next = path !== id ? path : null;
        setLocations((prev) => (prev[id] === next ? prev : { ...prev, [id]: next }));
      };

      relabel();
      void settle(id, iframe);
      window.setTimeout(() => void settle(id, iframe), RESETTLE_DELAY_MS);

      /* A visitor using the frame follows links, and the app router
         navigates without a load event. The document title changes on
         every route, so it stands in for one: re-label, re-measure. */
      let lastPath = win.location.pathname;
      const titleObserver = new MutationObserver(() => {
        if (win.location.pathname === lastPath) return;
        lastPath = win.location.pathname;
        relabel();
        void settle(id, iframe);
      });
      const head = doc.querySelector("head");
      if (head) {
        titleObserver.observe(head, {
          childList: true,
          subtree: true,
          characterData: true,
        });
      }
    },
    [applyTheme, pinViewport, settle],
  );

  /* ---------- render ---------- */

  const zoomPercent = `${Math.round(view.k * 100)}%`;
  const mountLimit = loaded.size + LOAD_CONCURRENCY;

  return (
    <>
      <div
        ref={viewportRef}
        className={styles.viewport}
        data-dragging={dragging || undefined}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDoubleClick={onDoubleClick}
      >
        <div
          className={styles.world}
          data-smooth={smooth || undefined}
          data-unlabelled={frameWidth * view.k < MIN_LABELLED_FRAME_PX || undefined}
          style={
            {
              transform: `translate(${view.x}px, ${view.y}px) scale(${view.k})`,
              "--zoom": view.k,
            } as React.CSSProperties
          }
        >
          {board.map((section) => (
            <div
              key={section.id}
              className={styles.section}
              style={{ left: section.x, top: 0, width: section.width }}
            >
              <div className={styles.sectionLabel}>{section.label}</div>
            </div>
          ))}
          {pages.map((page) => (
            <Frame
              key={page.id}
              page={page}
              width={frameWidth}
              height={heights[page.id] ?? viewportHeight}
              mounted={page.index < mountLimit}
              location={locations[page.id] ?? null}
              selected={selected === page.id}
              entered={entered === page.id}
              onReady={onReady}
            />
          ))}
        </div>
      </div>

      <div className={styles.controls} role="toolbar" aria-label="Canvas">
        <CircularButton
          icon="remove"
          variant="tertiary"
          size="compact"
          ariaLabel="Zoom out"
          onClick={() => zoomStep(1 / ZOOM_STEP)}
        />
        <button
          type="button"
          className={styles.zoomLevel}
          onClick={zoomTo100}
          aria-label={`Zoom ${zoomPercent}. Reset to 100%`}
        >
          {zoomPercent}
        </button>
        <CircularButton
          icon="add"
          variant="tertiary"
          size="compact"
          ariaLabel="Zoom in"
          onClick={() => zoomStep(ZOOM_STEP)}
        />
        <span className={styles.separator} aria-hidden="true" />
        <CircularButton
          icon="fit_screen"
          variant="tertiary"
          size="compact"
          ariaLabel="Zoom to fit"
          onClick={() => {
            touched.current = true;
            fitAll(true);
          }}
        />
        <CircularButton
          icon="center_focus_strong"
          variant="tertiary"
          size="compact"
          ariaLabel="Zoom to selection"
          disabled={!selected}
          onClick={() => {
            touched.current = true;
            fitSelection(true);
          }}
        />
        <span className={styles.separator} aria-hidden="true" />
        <SegmentedControl
          segments={deviceSegments}
          activeSegment={device}
          onSegmentChange={(value) => switchDevice(value as DeviceId)}
          size="compact"
          ariaLabel="Device"
        />
        <span className={styles.separator} aria-hidden="true" />
        <ThemeToggle />
      </div>

      <p className={styles.hint}>
        Scroll to pan. Hold ⌘ and scroll to zoom. Click a page or its label to
        select it, double-click to use it, Esc to leave.
      </p>
    </>
  );
}
