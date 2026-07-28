import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "@robr0/design-system/tokens/tokens.css";
// Single source of the Material Symbols base styles and icon-size scale.
// Imported explicitly rather than relying on it arriving incidentally through
// a component import, so pages that use raw .material-symbols-rounded spans
// (e.g. /foundations/icons) are styled deterministically.
import "@robr0/design-system/fonts/material-symbols.css";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { buildPersonJsonLd, buildWebsiteJsonLd, SITE_URL } from "@/lib/structuredData";

const GA_ID = "G-RCSFYMD51K";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-nunito-sans",
});

const SITE_DESCRIPTION =
  "Principal Product Designer crafting AI-native products, systems, and experiences. Selected case studies, a personal design system (robr0 DS), and writing on design and AI.";

export const metadata: Metadata = {
  title: {
    default: "Robert Ritacca · Principal Product Designer",
    template: "%s · Robert Ritacca",
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  // No root `alternates.canonical` — it would be inherited by every page,
  // canonicalising the whole site to the homepage. Each page sets its own
  // canonical (via pageMetadata/sectionMetadata or an explicit alternates
  // block); pages that set none self-canonicalise to their own URL.
  keywords: [
    "Robert Ritacca",
    "product designer",
    "principal designer",
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
    title: "Robert Ritacca · Principal Product Designer",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Robert Ritacca",
    locale: "en_US",
    type: "website",
    // og:image (and the Twitter image) come from the file-convention
    // opengraph-image.tsx routes — the root one plus per-section overrides —
    // so every page gets a branded 1200×630 card, not one static Thumbnail.
  },
  twitter: {
    card: "summary_large_image",
    title: "Robert Ritacca · Principal Product Designer",
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Matches the white-floor UI: pure white in light, near-black in dark.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
  ],
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
  // The next/font variable class lives on <html>, not <body>: globals.css
  // feeds var(--font-nunito-sans) into the design system's
  // --font-family-primary token at :root, and a custom property resolves its
  // var() references on the element that declares it — on <body> the variable
  // would be invisible to :root and the token would go invalid.
  return (
    <html lang="en" data-theme="dark" className={nunitoSans.variable} suppressHydrationWarning>
      <head>
        {/* Material Symbols is served from the design system's own bundled
            @font-face (src/fonts/material-symbols.css, imported above) — the
            .ttf is emitted into the build, so the font was being shipped twice.

            The Google Fonts <link> that used to sit here is deliberately gone.
            Besides the duplicate request, that stylesheet ships its own
            `.material-symbols-rounded { font-size: 24px }` rule, which tied on
            specificity with the design system's token-driven sizing and — being
            a <link> in <head> — won, pinning every icon to 24px regardless of
            --icon-size. Re-adding it would silently break the icon-size scale.

            Nunito Sans comes from next/font/google, which self-hosts at build
            time, so no preconnect to fonts.googleapis.com is needed either. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildPersonJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildWebsiteJsonLd()) }}
        />
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
      <body>
        {/* Must run before first paint (html stays visibility:hidden until
            .theme-ready). Emitted as raw HTML in a hidden div, not a React
            <script> element: parser-inserted scripts still execute, while
            React-rendered ones are inert on client render and trigger a dev
            warning ("Encountered a script tag while rendering…"). */}
        <div
          hidden
          dangerouslySetInnerHTML={{ __html: `<script>${themeScript}</script>` }}
        />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
