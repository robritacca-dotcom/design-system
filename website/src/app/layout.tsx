import type { Metadata } from "next";
import "@design-system/tokens/tokens.css";
import "@design-system/fonts/roboto-flex.css";
import "@design-system/fonts/material-symbols.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rob Ritacca - Personal Website",
  description: "Personal website built with custom design system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
