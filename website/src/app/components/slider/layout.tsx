import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Slider",
  description:
    "Range input for selecting a value within a given range with default and compact sizes.",
};

export default function SliderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
