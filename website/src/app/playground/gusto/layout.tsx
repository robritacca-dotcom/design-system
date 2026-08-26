export const metadata = {
  title: "Gusto chat demo",
  description: "The Gusto-themed chat widget alone on a bare stage.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
