import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/contribution-graph",
  "A year of activity, one cell per day."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
