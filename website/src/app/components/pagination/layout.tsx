import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pagination",
  description:
    "Numbered page navigation for long datasets, with ellipses, disabled end arrows, and a compact readout mode.",
};

export default function PaginationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
