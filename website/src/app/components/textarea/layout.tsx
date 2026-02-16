import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Textarea",
  description:
    "Multi-line text input with character counter, resize control, helper text, and error states.",
};

export default function TextareaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
