import { ButtonGroup } from "@design-system/components/ButtonGroup/ButtonGroup";
import type { ButtonProps } from "@design-system/components/Button/Button";
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
  const buttons: ButtonProps[] = links.map((link) => ({
    label: link.label,
    href: link.href,
    state: link.active ? ("active" as const) : ("default" as const),
    priority: "tertiary" as const,
  }));

  return (
    <aside className={styles.sidebar} aria-label="Component navigation">
      <ButtonGroup orientation="vertical" buttons={buttons} ariaLabel="Components" />
    </aside>
  );
}
