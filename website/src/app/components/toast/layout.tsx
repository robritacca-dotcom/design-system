import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Toast",
  description:
    "Temporary notification with status variants, auto-dismiss, and stacking via ToastProvider.",
};

export default function ToastLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
