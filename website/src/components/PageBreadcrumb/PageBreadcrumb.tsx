"use client";

import { usePathname } from "next/navigation";
import { Breadcrumb } from "@design-system/components/Breadcrumb/Breadcrumb";
import { getBreadcrumbs } from "@/config/navigation";
import { buildBreadcrumbJsonLd } from "@/lib/structuredData";
import styles from "./PageBreadcrumb.module.css";

/**
 * Renders the current page's breadcrumb trail based on the URL.
 * Returns nothing for top-level pages where no trail is needed
 * (home, /contact, /about/me, /work).
 */
export default function PageBreadcrumb() {
  const pathname = usePathname() ?? "/";
  const items = getBreadcrumbs(pathname);

  if (items.length === 0) return null;

  return (
    <div className={styles.wrap}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbJsonLd(items)) }}
      />
      <Breadcrumb items={items} />
    </div>
  );
}
