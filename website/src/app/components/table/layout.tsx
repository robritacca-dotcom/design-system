import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Table",
  description:
    "Data table with flexible cell content, striped rows, compact sizing, and support for icons, inputs, buttons, and interactive controls.",
};

export default function TableLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
