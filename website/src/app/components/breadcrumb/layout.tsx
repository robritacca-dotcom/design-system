import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/breadcrumb",
  "Hierarchical navigation trail showing the user's location within the site."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
