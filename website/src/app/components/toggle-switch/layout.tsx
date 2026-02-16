import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Toggle Switch",
  description:
    "Binary on/off toggle control with sliding thumb and check indicator, used for settings like theme switching.",
};

export default function ToggleSwitchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
