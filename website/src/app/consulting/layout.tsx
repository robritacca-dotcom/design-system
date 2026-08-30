import { sectionMetadata } from "@/config/navigation";

export const metadata = sectionMetadata(
  "Consulting",
  "Work with me: a 1:1 session booked through Stripe, for designers and teams alike. Bigger builds and advisory start with an email."
);

export default function ConsultingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
