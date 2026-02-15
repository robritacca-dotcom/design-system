import Link from "next/link";
import styles from "./Sidebar.module.css";

interface SidebarLink {
  href: string;
  label: string;
  active?: boolean;
}

interface SidebarProps {
  links: SidebarLink[];
}

export default function Sidebar({ links }: SidebarProps) {
  return (
    <aside className={styles.sidebar}>
      {links.map((link) => (
        <Link
          key={link.href + link.label}
          href={link.href}
          className={`${styles.sidebarLink} ${link.active ? styles.active : ""}`}
        >
          {link.label}
        </Link>
      ))}
    </aside>
  );
}
