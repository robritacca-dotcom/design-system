"use client";

import Link from "next/link";
import PipelineWireframe from "@/components/PipelineWireframe/PipelineWireframe";
import {
  dsMegaGroups,
  dsMegaShowcase,
  type MegaItem,
} from "@/config/navigation";
import styles from "./MegaNav.module.css";

/** One index-page row: icon tile, then label over description. */
function MegaItemRow({
  item,
  pathname,
  tabbable,
}: {
  item: MegaItem;
  pathname: string;
  tabbable: boolean;
}) {
  const active = pathname === item.href || pathname.startsWith(item.href + "/");
  return (
    <Link
      href={item.href}
      className={`${styles.megaItem} ${active ? styles.megaItemActive : ""}`}
      tabIndex={tabbable ? 0 : -1}
      aria-current={active ? "page" : undefined}
    >
      <div className={styles.megaIcon}>
        <span className="material-symbols-rounded" aria-hidden="true">
          {item.icon}
        </span>
      </div>
      <div className={styles.megaItemText}>
        <div className={styles.megaLabel}>{item.label}</div>
        <div className={styles.megaDescription}>{item.description}</div>
      </div>
    </Link>
  );
}

/**
 * The featured-page card in the right column — one link that IS the card.
 * The pipeline vector fills the whole frame and absorbs whatever height the
 * link grid runs to, and the copy sits inside it over a gradient rising from
 * the bottom edge. No separate call to action: the title carries the arrow
 * and the card is the button.
 */
function MegaShowcaseCard({ tabbable }: { tabbable: boolean }) {
  return (
    <div className={styles.megaShowcaseColumn}>
      <Link
        href={dsMegaShowcase.href}
        className={styles.megaShowcase}
        tabIndex={tabbable ? 0 : -1}
      >
        {/* The abstract pipeline vector — the card's own title and
            description carry the meaning, so the drawing stays decorative. */}
        <PipelineWireframe className={styles.megaShowcaseCover} />
        <div className={styles.megaShowcaseText}>
          <div className={styles.megaGroupLabel}>{dsMegaShowcase.overline}</div>
          <div className={`${styles.megaLabel} ${styles.megaShowcaseTitle}`}>
            {dsMegaShowcase.label}
            <span
              className={`material-symbols-rounded ${styles.megaShowcaseTitleIcon}`}
              aria-hidden="true"
            >
              arrow_forward
            </span>
          </div>
          <div className={styles.megaDescription}>
            {dsMegaShowcase.description}
          </div>
        </div>
      </Link>
    </div>
  );
}

/**
 * The mega panel's content — the grouped link grid on the left two thirds,
 * the showcase card on the right third. Shared by the in-flow and sticky
 * panels, which differ only in when their links are tabbable.
 */
export default function MegaPanel({
  pathname,
  tabbable,
}: {
  pathname: string;
  tabbable: boolean;
}) {
  return (
    <div className={styles.megaInner}>
      <div className={styles.megaLayout}>
        <div className={styles.megaGroups}>
          {dsMegaGroups.map((group) => (
            <div key={group.id} className={styles.megaGroup}>
              <div className={styles.megaGroupLabel}>{group.label}</div>
              {group.items.map((item) => (
                <MegaItemRow
                  key={item.href}
                  item={item}
                  pathname={pathname}
                  tabbable={tabbable}
                />
              ))}
            </div>
          ))}
        </div>
        <MegaShowcaseCard tabbable={tabbable} />
      </div>
    </div>
  );
}
