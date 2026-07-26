import { sectionMetadata } from "@/config/navigation";

export const metadata = sectionMetadata(
  "Customization",
  "Install @robr0/design-system, bring your own font, and re-theme the whole system by overriding primitive tokens."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
