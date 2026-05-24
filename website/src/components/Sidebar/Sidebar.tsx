import Image from "next/image";
import { ButtonGroup } from "@design-system/components/ButtonGroup/ButtonGroup";
import type { ButtonProps } from "@design-system/components/Button/Button";
import styles from "./Sidebar.module.css";

interface SidebarLink {
  href: string;
  label: string;
  active?: boolean;
  disabled?: boolean;
  /** Optional logo path (e.g. "/logos/Intuit.svg") rendered to the left of the label */
  logo?: string;
}

interface SidebarProps {
  links: SidebarLink[];
}

export default function Sidebar({ links }: SidebarProps) {
  const buttons: ButtonProps[] = links.map((link) => ({
    label: link.label,
    href: link.disabled ? undefined : link.href,
    state: link.disabled
      ? ("disabled" as const)
      : link.active
        ? ("active" as const)
        : ("default" as const),
    priority: "tertiary" as const,
    iconLeft: link.logo ? (
      <Image
        src={link.logo}
        alt=""
        width={18}
        height={18}
        className={styles.itemLogo}
      />
    ) : undefined,
  }));

  return (
    <aside className={styles.sidebar} aria-label="Component navigation">
      <ButtonGroup orientation="vertical" buttons={buttons} ariaLabel="Components" />
    </aside>
  );
}
