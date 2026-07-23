import { sectionMetadata } from "@/config/navigation";

export const metadata = sectionMetadata(
  "Work",
  "Selected case studies on product, AI, and design systems."
);

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
