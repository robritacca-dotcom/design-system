import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tabs",
  description:
    "Tab navigation with underline indicator, icon support, compact size, and full-width mode.",
};

export default function TabsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
