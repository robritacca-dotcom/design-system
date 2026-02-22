import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Avatar",
  description:
    "User profile image with initials and icon fallback, status indicator, and multiple sizes.",
};

export default function AvatarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
