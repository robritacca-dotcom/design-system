import SidebarLinks from "./SidebarLinks";
import SidebarGroups from "./SidebarGroups";
import SidebarSearch from "./SidebarSearch";
import styles from "./Sidebar.module.css";

export interface SidebarLink {
  href: string;
  label: string;
  active?: boolean;
  disabled?: boolean;
  /** Optional logo path (e.g. "/logos/Intuit.svg") rendered to the left of the label */
  logo?: string;
}

export interface SidebarLinkGroup {
  id: string;
  /** Group header text; the header links to `href` */
  label: string;
  href: string;
  /** Highlight the header — its landing page is the current page */
  active?: boolean;
  links: SidebarLink[];
}

interface SidebarProps {
  links: SidebarLink[];
  /**
   * Grouped mode: titled link groups rendered below the pinned first link.
   * When set, `links` only supplies that pinned entry (`links[0]`).
   */
  groups?: SidebarLinkGroup[];
  /** Opt-in live filter input at the top of the rail */
  searchable?: boolean;
}

export default function Sidebar({ links, groups, searchable = false }: SidebarProps) {
  return (
    <aside className={styles.sidebar} aria-label="Component navigation">
      {searchable ? (
        <SidebarSearch links={links} groups={groups} />
      ) : groups ? (
        <SidebarGroups groups={groups} />
      ) : (
        <SidebarLinks links={links} />
      )}
    </aside>
  );
}
