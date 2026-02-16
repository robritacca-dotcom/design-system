import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Input",
  description:
    "Text input with label, placeholder, left and right icons, helper text, and error states.",
};

export default function InputLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
