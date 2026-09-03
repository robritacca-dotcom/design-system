"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./EscalatorStage.module.css";
import ActionsSection from "./sections/ActionsSection";
import MapsSection from "./sections/MapsSection";
import AiSection from "./sections/AiSection";
import FormsSection from "./sections/FormsSection";
import NavigationSection from "./sections/NavigationSection";
import DataDisplaySection from "./sections/DataDisplaySection";
import ChartsSection from "./sections/ChartsSection";
import OverlaysSection from "./sections/OverlaysSection";
import FeedbackSection from "./sections/FeedbackSection";

/* ============================================================
   ESCALATOR STAGE — a proof of concept, deliberately additive.

   The Components view's sections re-hosted in the DS landing
   page's collage: instead of one long list, three columns of
   live content drifting slower than a reading pace. The
   EscalatorColumn below is a 1:1 copy of the landing page's —
   the same seamless two-copy track, the same live/inert copy
   handover — pointed at the stage sections instead of the
   curated cards. The toolbar's Escalator switch flips between
   this and the classic list for a live before/after.
   ============================================================ */

/** One escalator column: the content renders twice into a track that
    translates by exactly one copy's height, so the loop is seamless.
    Exactly one copy is live at a time — the other is aria-hidden and inert,
    keeping the pair out of the accessibility tree and tab order as a single
    column. Which copy is live follows the loop: inert also removes a subtree
    from pointer hit-testing, so a statically inert duplicate turns into
    visible-but-dead UI (arrow cursor, no hover, no pause) for the stretch of
    the cycle where it fills the window. A slow poll keeps the copy occupying
    the window the interactive one, and never swaps under a pointer or focus,
    since flipping inert mid-hover would drop the hover and un-pause the
    track. `render` is a function (not children) so a copy can vary anything
    that must be document-unique, like a radio group name. */
function EscalatorColumn({
  direction,
  duration,
  render,
}: {
  direction: "up" | "down";
  duration: string;
  render: (copy: "a" | "b") => React.ReactNode;
}) {
  const colRef = useRef<HTMLDivElement>(null);
  const stackARef = useRef<HTMLDivElement>(null);
  const stackBRef = useRef<HTMLDivElement>(null);
  const [liveCopy, setLiveCopy] = useState<"a" | "b">("a");

  useEffect(() => {
    const col = colRef.current;
    const a = stackARef.current;
    const b = stackBRef.current;
    if (!col || !a || !b) return;
    const visibleHeight = (el: HTMLElement, win: DOMRect) => {
      const r = el.getBoundingClientRect();
      return Math.max(0, Math.min(r.bottom, win.bottom) - Math.max(r.top, win.top));
    };
    const tick = () => {
      if (col.matches(":hover") || col.matches(":focus-within")) return;
      const win = col.getBoundingClientRect();
      setLiveCopy(visibleHeight(a, win) >= visibleHeight(b, win) ? "a" : "b");
    };
    tick();
    /* The track drifts ~10px/s and the handover zone spans hundreds of px,
       so a 1s poll can't miss it; rAF would be waste. */
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      ref={colRef}
      className={`${styles.col} ${direction === "up" ? styles.colUp : styles.colDown}`}
      style={{ "--escalator-duration": duration } as React.CSSProperties}
    >
      <div className={styles.escalatorTrack}>
        <div
          ref={stackARef}
          className={styles.escalatorStack}
          aria-hidden={liveCopy !== "a" || undefined}
          inert={liveCopy !== "a"}
        >
          {render("a")}
        </div>
        <div
          ref={stackBRef}
          className={`${styles.escalatorStack} ${styles.escalatorDupe}`}
          aria-hidden={liveCopy !== "b" || undefined}
          inert={liveCopy !== "b"}
        >
          {render("b")}
        </div>
      </div>
    </div>
  );
}

/** The nine stage sections, distributed across the three columns roughly by
    height so no column laps the others visibly faster. */
export default function EscalatorStage({ brand }: { brand: string }) {
  return (
    <div className={styles.collage}>
      <EscalatorColumn
        direction="down"
        duration="320s"
        render={() => (
          <>
            <ActionsSection />
            <FormsSection />
            <FeedbackSection />
          </>
        )}
      />
      <EscalatorColumn
        direction="up"
        duration="360s"
        render={() => (
          <>
            <AiSection />
            <NavigationSection />
            <OverlaysSection />
          </>
        )}
      />
      <EscalatorColumn
        direction="down"
        duration="340s"
        render={() => (
          <>
            <MapsSection />
            <DataDisplaySection />
            <ChartsSection brand={brand} />
          </>
        )}
      />
    </div>
  );
}
