import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spinner",
  description:
    "Animated circular loading indicator available in three sizes and primary or neutral variants.",
};

export default function SpinnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
