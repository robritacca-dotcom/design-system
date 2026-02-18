import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Analytics dashboard showcasing design system components.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
