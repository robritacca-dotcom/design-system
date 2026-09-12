"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./CaseStudyTldr.module.css";

export interface CaseStudyTldrPoint {
  claim: string;
  detail: string;
}

interface CaseStudyTldrProps {
  /** The key claims, in reading order. Hand-written per case study. */
  points: CaseStudyTldrPoint[];
}

/**
 * The TLDR block at the top of a case study: the article's key claims,
 * revealed with one staggered entrance when scrolled into view, closed by an
 * anchor down to the full article. The points live in
 * src/data/case-study-tldrs.ts, deliberately outside the route folders so
 * the site-corpus extractor never reads them (the data module's doc block
 * owns why); the "Read the full story" link targets id="full-story", which
 * the page puts on its article section (with the anchor clearance, since a
 * section element is not covered by the global h2 scroll-margin rule).
 */
export default function CaseStudyTldr({ points }: CaseStudyTldrProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`${styles.tldr} ${visible ? styles.visible : ""}`}
      aria-label="TLDR"
    >
      <div className={styles.header}>
        <h2 className={styles.title} id="tldr">TLDR</h2>
      </div>
      <ol className={styles.list}>
        {points.map((point, i) => (
          <li key={point.claim} className={styles.item}>
            <span className={styles.index} aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className={styles.text}>
              <p className={styles.claim}>{point.claim}</p>
              <p className={styles.detail}>{point.detail}</p>
            </div>
          </li>
        ))}
      </ol>
      <a href="#full-story" className={styles.more}>
        <span>Read the full story</span>
        <span className="material-symbols-rounded" aria-hidden="true">arrow_downward</span>
      </a>
    </section>
  );
}
