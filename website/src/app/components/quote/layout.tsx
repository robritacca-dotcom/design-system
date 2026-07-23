import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/quote",
  "Blockquotes and pull-quotes with attribution."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
