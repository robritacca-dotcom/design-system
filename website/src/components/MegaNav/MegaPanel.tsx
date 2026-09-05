"use client";

import Link from "next/link";
import { Button } from "@robr0/design-system/components/Button/Button";
import {
  dsMegaGroups,
  dsMegaShowcase,
  type MegaItem,
} from "@/config/navigation";
import { CoverImage } from "../covers/CoverImage";
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
 * The featured-page card in the right column — overline, cover, copy, and
 * the tertiary button that carries the link.
 */
function MegaShowcaseCard({ tabbable }: { tabbable: boolean }) {
  return (
    <div className={styles.megaShowcase}>
      <div className={styles.megaGroupLabel}>{dsMegaShowcase.overline}</div>
      {/* Decorative here — the card's own title and description carry the
          meaning, so the cover's registry alt would only repeat them. */}
      <CoverImage
        href={dsMegaShowcase.coverHref}
        aspect="card"
        alt=""
        className={styles.megaShowcaseCover}
      />
      <div className={styles.megaItemText}>
        <div className={styles.megaLabel}>{dsMegaShowcase.label}</div>
        <div className={styles.megaDescription}>{dsMegaShowcase.description}</div>
      </div>
      <Button
        href={dsMegaShowcase.href}
        label={dsMegaShowcase.cta}
        variant="tertiary"
        size="compact"
        iconRight="arrow_forward"
        tabIndex={tabbable ? 0 : -1}
        className={styles.megaShowcaseBtn}
      />
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
