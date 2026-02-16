import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkbox",
  description:
    "Custom checkbox with check and indeterminate states, keyboard accessible with animated transitions.",
};

export default function CheckboxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
