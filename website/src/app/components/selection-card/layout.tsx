import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/selection-card",
  "Large selectable option cards with radio or checkbox indicators for high-visibility choices like settings and onboarding."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
