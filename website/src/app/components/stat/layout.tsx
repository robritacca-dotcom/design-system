import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/stat",
  "Headline metrics with labels and trend deltas."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
