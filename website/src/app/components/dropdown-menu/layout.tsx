import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dropdown menu",
  description:
    "Contextual menu with sections, sub-menus, keyboard shortcuts, and inset-gap hover styling.",
};

export default function DropdownMenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
