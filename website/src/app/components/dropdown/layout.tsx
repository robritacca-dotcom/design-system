import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/dropdown",
  "Custom select dropdown with keyboard navigation, disabled options, and error states."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
