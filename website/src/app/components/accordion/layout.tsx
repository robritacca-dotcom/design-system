import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accordion",
  description:
    "Collapsible content sections for organising related information.",
};

export default function AccordionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
