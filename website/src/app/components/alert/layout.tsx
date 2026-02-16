import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alert",
  description:
    "Contextual feedback with status variants, optional dismiss, and compact sizing.",
};

export default function AlertLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
