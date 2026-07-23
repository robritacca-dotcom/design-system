import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/link-list",
  "Linked items with logo, label, and subtitle."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
