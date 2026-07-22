import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "App layout",
  description:
    "Full-page template pairing the collapsible App sidebar with a centred content area.",
};

export default function AppLayoutPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
