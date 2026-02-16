import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Radio Button",
  description:
    "Radio button and radio group with vertical and horizontal layouts, animated dot indicator.",
};

export default function RadioButtonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
