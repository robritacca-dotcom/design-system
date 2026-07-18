import SidebarLinks from "./SidebarLinks";
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

interface SidebarProps {
  links: SidebarLink[];
  /** Opt-in live filter input at the top of the rail */
  searchable?: boolean;
}

export default function Sidebar({ links, searchable = false }: SidebarProps) {
  return (
    <aside className={styles.sidebar} aria-label="Component navigation">
      {searchable ? (
        <SidebarSearch links={links} />
      ) : (
        <SidebarLinks links={links} />
      )}
    </aside>
  );
}
