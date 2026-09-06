import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/templates/relay-console",
  "A network operations console built from the design system alone: one interactive globe holding the stage, its key and headline numbers on the corners, and an assistant docked at the side."
);

export default function RelayConsoleTemplateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
