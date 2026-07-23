import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/circular-button",
  "Round icon button with primary and secondary variants, default and compact sizes."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
