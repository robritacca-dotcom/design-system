import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard 2",
  description:
    "Full-page layout template with collapsible sidebar navigation and centred content area.",
};

export default function Dashboard2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
