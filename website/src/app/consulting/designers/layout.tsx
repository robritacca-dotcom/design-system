import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/consulting/designers",
  "1:1 consulting for designers: portfolio sessions, hiring and career advice, and ongoing mentorship."
);

export default function ConsultingDesignersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
