import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/dialog",
  "A general-purpose modal for focused tasks, with sizes, an optional footer, and full focus management."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
