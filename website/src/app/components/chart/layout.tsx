import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/chart",
  "Data visualisation components built on Recharts. Includes bar, line, pie, and radial chart types with design-system token integration."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
