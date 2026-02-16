import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Section Title",
  description:
    "Heading with a divider line and optional trailing content for organising page sections.",
};

export default function SectionTitleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
