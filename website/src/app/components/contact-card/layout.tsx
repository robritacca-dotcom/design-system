import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/contact-card",
  "Linked contact method with icon, label, and value."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
