import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instructions",
  description:
    "Step-by-step guidance with numbered badges, connecting lines, and horizontal layout.",
};

export default function InstructionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
