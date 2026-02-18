import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chart",
  description:
    "Data visualisation components built on Recharts. Includes bar, line, pie, and radial chart types with design-system token integration.",
};

export default function ChartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
