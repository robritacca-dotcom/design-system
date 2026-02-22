import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carousel",
  description:
    "Sliding content viewer with navigation arrows, dot indicators, auto-play, and keyboard support.",
};

export default function CarouselLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
