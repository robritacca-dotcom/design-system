import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/slider",
  "Range input for selecting a value within a given range with default and compact sizes."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
