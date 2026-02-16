import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dropdown",
  description:
    "Custom select dropdown with keyboard navigation, disabled options, and error states.",
};

export default function DropdownLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
