import Link from "next/link";
import SidebarLinks from "./SidebarLinks";
import type { SidebarLinkGroup } from "./Sidebar";
import styles from "./Sidebar.module.css";

interface SidebarGroupsProps {
  groups: SidebarLinkGroup[];
}

/**
 * The grouped variant of the sidebar's link list: one titled block per group,
 * each header linking to its group's landing page.
 */
export default function SidebarGroups({ groups }: SidebarGroupsProps) {
  return (
    <div className={styles.groups}>
      {groups.map((group) => (
        <div key={group.id} className={styles.group}>
          <Link
            href={group.href}
            className={
              group.active
                ? `${styles.groupHeader} ${styles.groupHeaderActive}`
                : styles.groupHeader
            }
            aria-current={group.active ? "page" : undefined}
          >
            {group.label}
          </Link>
          <SidebarLinks links={group.links} ariaLabel={group.label} />
        </div>
      ))}
    </div>
  );
}
