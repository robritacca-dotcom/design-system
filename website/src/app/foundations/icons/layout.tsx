import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/foundations/icons",
  "Material Symbols Rounded icon set — outlined and filled variants used throughout the design system."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
