import type { Metadata } from "next";
import "@design-system/tokens/tokens.css";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-nunito-sans",
});

export const metadata: Metadata = {
  title: {
    default: "robr0 Design System | Robert Ritacca",
    template: "%s | robr0 DS",
  },
  description:
    "A token-based design system with primitive colours, semantic tokens, typography, spacing, and reusable components built with React and CSS.",
  metadataBase: new URL("https://robr0-ds.vercel.app"),
  keywords: [
    "design system",
    "React components",
    "design tokens",
    "UI library",
    "typography",
    "colour primitives",
    "semantic tokens",
    "Robert Ritacca",
    "robr0",
  ],
  authors: [{ name: "Robert Ritacca" }],
  creator: "Robert Ritacca",
  openGraph: {
    title: "robr0 Design System",
    description:
      "A token-based design system with primitive colours, semantic tokens, typography, spacing, and reusable components built with React and CSS.",
    siteName: "robr0 DS",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "robr0 Design System",
    description:
      "A token-based design system with primitive colours, semantic tokens, typography, spacing, and reusable components built with React and CSS.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const themeScript = `
(function() {
  var savedTheme = localStorage.getItem('theme');
  var systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var isLight = savedTheme === 'light' || (savedTheme === null && !systemPrefersDark);
  if (isLight) {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  document.documentElement.classList.add('theme-ready');
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={nunitoSans.variable}>{children}</body>
    </html>
  );
}
