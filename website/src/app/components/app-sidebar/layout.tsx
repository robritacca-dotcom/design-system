import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "App sidebar",
  description:
    "Collapsible navigation rail with accordion sub-items, category headings, and profile section.",
};

export default function AppSidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
