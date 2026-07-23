import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/skeleton",
  "Placeholder loading indicators with text, circular, and rectangular variants."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
