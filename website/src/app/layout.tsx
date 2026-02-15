import type { Metadata } from "next";
import "@design-system/tokens/tokens.css";
import "./material-symbols.css";
import "./button.css";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import "../../../public/reference-styles.css";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-nunito-sans",
});

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
      <body className={nunitoSans.variable}>
        {children}
      </body>
    </html>
  );
}
