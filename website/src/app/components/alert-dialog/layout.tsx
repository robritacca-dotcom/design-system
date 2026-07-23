import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/alert-dialog",
  "Modal confirmation overlay with title, description, and confirm / cancel actions."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
