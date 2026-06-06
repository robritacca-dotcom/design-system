import type { Metadata } from "next";
import Script from "next/script";
import "@design-system/tokens/tokens.css";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

const GA_ID = "G-RCSFYMD51K";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-nunito-sans",
});

const SITE_DESCRIPTION =
  "Principal Product Designer at Intuit, previously Meta. Selected case studies, a personal design system (robr0 DS), and writing on AI and product design.";

export const metadata: Metadata = {
  title: {
    default: "Robert Ritacca — Principal Product Designer",
    template: "%s — Robert Ritacca",
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL("https://robertritacca.com"),
  alternates: {
    canonical: "https://robertritacca.com",
  },
  keywords: [
    "Robert Ritacca",
    "product designer",
    "principal designer",
    "Intuit",
    "Meta",
    "AI design",
    "design system",
    "robr0 DS",
    "case studies",
    "design tokens",
    "React components",
  ],
  authors: [{ name: "Robert Ritacca" }],
  creator: "Robert Ritacca",
  openGraph: {
    title: "Robert Ritacca — Principal Product Designer",
    description: SITE_DESCRIPTION,
    siteName: "Robert Ritacca",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/Thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Robert Ritacca — Product Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Robert Ritacca — Principal Product Designer",
    description: SITE_DESCRIPTION,
    images: ["/images/Thumbnail.png"],
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
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </head>
      <body className={nunitoSans.variable}>{children}</body>
    </html>
  );
}
