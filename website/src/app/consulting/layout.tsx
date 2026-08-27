import { sectionMetadata } from "@/config/navigation";

export const metadata = sectionMetadata(
  "Consulting",
  "Work with me: zero-to-one builds, health checks, and advisory for teams, and 1:1 sessions, hiring advice, and mentorship for designers."
);

export default function ConsultingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
