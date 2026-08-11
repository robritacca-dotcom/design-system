"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Breadcrumb } from "@robr0/design-system/components/Breadcrumb/Breadcrumb";
import { CircularButton } from "@robr0/design-system/components/CircularButton/CircularButton";
import {
  SegmentedControl,
  type Segment,
} from "@robr0/design-system/components/SegmentedControl/SegmentedControl";
import { getBreadcrumbs } from "@/config/navigation";
import { buildBreadcrumbJsonLd } from "@/lib/structuredData";
import styles from "./StageToolbar.module.css";

export interface StageToolbarProps {
  /** Centre switch segments — omit to render a toolbar with no switch. */
  segments?: Segment[];
  /** The active segment's value. */
  activeSegment?: string;
  /** Called with the picked segment's value. */
  onSegmentChange?: (value: string) => void;
  /** Accessible label for the centre switch. */
  switchLabel?: string;
}

/**
 * The immersive surfaces' header: a slim fixed glass strip carrying the
 * brand mark and breadcrumb trail, an optional centre switch (the hosting
 * page decides what it toggles — views, surfaces), and the X out — a
 * full-screen view's toolbar, not the site's full navigation. Pages
 * beneath reserve --layout-toolbar-height (globals.css) of room for it.
 */
export default function StageToolbar({
  segments,
  activeSegment,
  onSegmentChange,
  switchLabel,
}: StageToolbarProps) {
  const pathname = usePathname() ?? "/";
  const items = getBreadcrumbs(pathname);

  const router = useRouter();
  /* The X is the way back to wherever the visitor came from; opened cold
     (a shared link), it goes home. */
  const leave = () => {
    if (window.history.length > 2) router.back();
    else router.push("/");
  };

  return (
    <header className={styles.toolbar}>
      <div className={styles.trail}>
        <Link href="/" className={styles.logo} aria-label="Home">
          <Image src="/rr.svg" alt="" width={24} height={24} />
        </Link>
        {items.length > 0 && (
          <>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(buildBreadcrumbJsonLd(items)),
              }}
            />
            <Breadcrumb items={items} />
          </>
        )}
      </div>

      {segments && activeSegment && (
        <SegmentedControl
          segments={segments}
          activeSegment={activeSegment}
          onSegmentChange={onSegmentChange}
          size="compact"
          ariaLabel={switchLabel}
        />
      )}

      <div className={styles.actions}>
        <CircularButton
          icon="close"
          variant="tertiary"
          ariaLabel="Close this view"
          onClick={leave}
        />
      </div>
    </header>
  );
}
