import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/timeline",
  "Ordered sequences — histories and steppers."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
