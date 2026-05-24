import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Career Profile Vision — Meta",
  description:
    "Case study: reimagining Meta's Career Profile as a scalable, personalized, end-to-end candidate platform. Systems thinking, modular UX, and a timeline-centered experience for one of the most emotionally high-stakes journeys someone can take.",
};

export default function MetaCareerProfileLayout({ children }: { children: React.ReactNode }) {
  return children;
}
