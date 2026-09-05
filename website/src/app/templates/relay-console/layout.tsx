import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/templates/relay-console",
  "A network operations console built from the design system alone: an interactive globe centre stage, driven by the station list, region presets, and knobs around it."
);

export default function RelayConsoleTemplateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
