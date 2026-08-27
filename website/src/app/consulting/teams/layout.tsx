import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/consulting/teams",
  "Consulting for teams and small businesses: a fixed-scope health check, zero-to-one builds by a team of one, and ongoing advisory."
);

export default function ConsultingTeamsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
