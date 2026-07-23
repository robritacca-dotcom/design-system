import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/divider",
  "A thin rule separating stacked content, with optional inline label and vertical orientation."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
