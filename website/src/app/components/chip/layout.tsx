import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/chip",
  "Compact pills for attributes, filters, and inline metadata."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
