import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/field",
  "The shared scaffolding for labelled form controls — label, required marker, helper and error text, and the ARIA wiring that ties them together."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
