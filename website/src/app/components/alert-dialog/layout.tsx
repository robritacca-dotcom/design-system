import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alert dialog",
  description:
    "Modal confirmation overlay with title, description, and confirm / cancel actions.",
};

export default function AlertDialogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
