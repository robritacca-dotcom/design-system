import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/section-title",
  "Heading with a divider line and optional trailing content for organising page sections."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
