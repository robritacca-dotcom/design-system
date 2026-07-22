import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entity card",
  description:
    "Compact display-only card with a centred icon or image and a label — powers the Icons and Logos galleries.",
};

export default function EntityCardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
