import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Breadcrumb",
  description:
    "Hierarchical navigation trail showing the user's location within the site.",
};

export default function BreadcrumbLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
