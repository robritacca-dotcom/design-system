import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/figure",
  "Images with captions, in the case-study frame."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
