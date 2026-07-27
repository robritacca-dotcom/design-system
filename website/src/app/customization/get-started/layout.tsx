import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/customization/get-started",
  "Install @robr0/design-system, import the tokens, bring your own font, and re-theme the system by overriding primitive tokens."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
