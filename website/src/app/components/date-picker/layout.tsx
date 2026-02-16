import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DatePicker",
  description:
    "Inline calendar with month navigation, day selection, and today indicator.",
};

export default function DatePickerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
