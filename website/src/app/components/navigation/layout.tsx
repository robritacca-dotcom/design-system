import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Navigation",
  description:
    "Desktop and mobile navigation components including top-level nav bar, collapsed mobile bar, and hamburger slide-out menu.",
};

export default function NavigationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
