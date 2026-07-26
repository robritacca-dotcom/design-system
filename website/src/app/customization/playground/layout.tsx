import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/customization/playground",
  "Re-theme the design system live — pick a brand colour, tint the neutrals, reshape the radii, swap the typeface, then copy the CSS."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
