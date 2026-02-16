import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Date Input",
  description:
    "Date input with native picker, calendar icon, label, and validation states.",
};

export default function DateInputLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
