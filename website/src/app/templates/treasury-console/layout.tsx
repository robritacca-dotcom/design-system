import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/templates/treasury-console",
  "A treasury release desk built from the design system alone: a wire queue, compliance screening, an approval chain, and a release gated behind a one-time code."
);

export default function TreasuryConsoleTemplateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
