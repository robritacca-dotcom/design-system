import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/pagination",
  "Numbered page navigation for long datasets, with ellipses, disabled end arrows, and a compact readout mode."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
