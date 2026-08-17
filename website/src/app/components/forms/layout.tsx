import { categoryPageMetadata } from "@/config/navigation";

// Title and description come from src/components/registry.json — the single
// place a category's label and one-line summary live.
export const metadata = categoryPageMetadata("forms");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
