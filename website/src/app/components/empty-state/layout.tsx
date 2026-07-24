import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/empty-state",
  "The placeholder for a list, table, or search with nothing to show — icon, headline, guidance, and a next action."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
