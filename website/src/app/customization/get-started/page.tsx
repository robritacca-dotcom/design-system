"use client";

import Link from "next/link";
import MegaNav from "../../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import { getSidebarLinks, customizationSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";
import { SectionTitle } from "@robr0/design-system/components/SectionTitle/SectionTitle";
import { CodeBlock } from "@robr0/design-system/components/CodeBlock/CodeBlock";
import { Button } from "@robr0/design-system/components/Button/Button";

const { sidebarLinks } = getSidebarLinks(customizationSidebarLinks, "/customization/get-started");

const INSTALL_SNIPPET = `npm install @robr0/design-system`;

const USAGE_SNIPPET = `// Load the tokens once — primitives, semantic tokens, and both themes.
import '@robr0/design-system/tokens/tokens.css';

// Then import components — from the barrel…
import { Button, Card, Badge } from '@robr0/design-system';

// …or by deep path (what this site does):
import { Button } from '@robr0/design-system/components/Button/Button';`;

const CHARTS_SNIPPET = `// Charts live behind their own entry so the recharts peer
// dependency stays optional — install recharts only if you use them.
import { BarChart, LineChart } from '@robr0/design-system/charts';`;

const DARK_MODE_SNIPPET = `<!-- Light is the default; flip the whole system with one attribute -->
<html data-theme="dark">`;

const FONT_SNIPPET = `/* The entire 14-step type scale chains to one token.
   Load any font (Google Fonts, next/font, self-hosted), then: */
:root {
  --font-family-primary: 'Inter', sans-serif;
}`;

const PRIMITIVE_SNIPPET = `/* Every semantic token references a primitive, so overriding a
   primitive re-themes everything built on it — in both themes. */
:root {
  /* Your brand colour becomes the action colour (buttons, focus rings) */
  --primitive-teal-07: #7C3AED;
  /* Its pressed/hover ramp neighbours */
  --primitive-teal-08: #6D31D3;
  --primitive-teal-09: #4C2293;

  /* Pill buttons become rounded rectangles */
  --primitive-radius-full: 12px;
}`;

const SEMANTIC_SNIPPET = `/* Prefer surgical changes? Override a semantic token directly —
   scope the dark value under the theme attribute. */
:root {
  --color-status-info-border: #345AC4;
}
[data-theme="dark"] {
  --color-status-info-border: #7F99E3;
}`;

export default function CustomizationPage() {
  return (
    <>
      <BlurBackground />

      <MegaNav />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          <PageBreadcrumb />

          {/* Page Title */}
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Get started</h1>
          </div>

          {/* Intro */}
          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              One package, one stylesheet, and every token is yours to override
            </p>
            <p className={styles.introBody}>
              The design system ships as <code>@robr0/design-system</code> — the same
              package this site is built with. There is no configuration API or theme
              provider: theming is plain CSS custom properties. Import the token
              stylesheet, use the components, and re-theme by redefining tokens.{" "}
              <Link href="/customization/playground" className={styles.inlineLink}>
                Try it live in the playground
              </Link>{" "}
              — it generates the exact CSS you would paste into your app.
            </p>
          </div>

          {/* Install */}
          <section className={`${styles.section} animate-in animate-delay-2`}>
            <SectionTitle title="Install" />
            <p className={styles.sectionNote}>
              React 19+ is a peer dependency. Everything else — component CSS, both
              themes, the Material Symbols icon font — is bundled.
            </p>
            <CodeBlock code={INSTALL_SNIPPET} language="bash" showCopy />
            <CodeBlock code={USAGE_SNIPPET} language="tsx" filename="app.tsx" showCopy />
            <CodeBlock code={CHARTS_SNIPPET} language="tsx" showCopy />
          </section>

          {/* Dark mode */}
          <section className={`${styles.section} animate-in animate-delay-3`}>
            <SectionTitle title="Dark mode" />
            <p className={styles.sectionNote}>
              Every semantic token has a light and a dark value. Set{" "}
              <code>data-theme=&quot;dark&quot;</code> on the root element to switch —
              there are no <code>prefers-color-scheme</code> queries in components, so
              your app decides when.
            </p>
            <CodeBlock code={DARK_MODE_SNIPPET} language="html" showCopy />
          </section>

          {/* Fonts */}
          <section className={`${styles.section} animate-in animate-delay-4`}>
            <SectionTitle title="Bring your own font" />
            <p className={styles.sectionNote}>
              The system is designed for Nunito Sans but deliberately does not bundle
              it — load it (or any font) however your stack prefers and point one token
              at it. This site loads Nunito Sans with <code>next/font</code> and does
              exactly this override in its global CSS.
            </p>
            <CodeBlock code={FONT_SNIPPET} language="css" showCopy />
          </section>

          {/* Primitives */}
          <section className={`${styles.section} animate-in animate-delay-5`}>
            <SectionTitle title="Re-theme with primitives" />
            <p className={styles.sectionNote}>
              Tokens are three tiers: primitives hold the raw values, semantic tokens
              reference primitives, components use semantic tokens. That chain is
              build-enforced, which is what makes a primitive override cascade through
              the entire system — both themes included.
            </p>
            <CodeBlock code={PRIMITIVE_SNIPPET} language="css" showCopy />
            <p className={styles.sectionNote}>
              Semantic tokens are fair game too when you want to change one meaning
              without touching the ramp it comes from:
            </p>
            <CodeBlock code={SEMANTIC_SNIPPET} language="css" showCopy />
          </section>

          {/* Playground CTA */}
          <section className={`${styles.section} animate-in animate-delay-6`}>
            <SectionTitle title="See it live" />
            <p className={styles.sectionNote}>
              The playground applies these overrides to this site in real time — pick a
              brand colour, tint the neutrals, reshape the radii, swap the font, then
              copy the generated CSS.
            </p>
            <Link href="/customization/playground" className={styles.ctaLink}>
              <Button label="Open the playground" priority="primary" iconRight="arrow_forward" />
            </Link>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
