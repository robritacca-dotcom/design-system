"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import MegaNav from "../../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import { ColourSwatch } from "@design-system/components/ColourSwatch/ColourSwatch";
import PageLinks from "../../../components/PageLinks/PageLinks";
import { getSidebarLinks, foundationsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";
import { SectionTitle } from "@design-system/components/SectionTitle/SectionTitle";

const { sidebarLinks } = getSidebarLinks(foundationsSidebarLinks, "/foundations/colour-mode");

/* ============================================
   COLOUR DATA
   Each swatch defines its values per theme.
   Static swatches use the same values in both.
   ============================================ */

interface SwatchData {
  label: string;
  cssVar: string;
  dark: { primitive: string; hex: string; rgb: string };
  light: { primitive: string; hex: string; rgb: string };
}

interface StatusSwatchData {
  label: string;
  bgVar: string;
  borderVar: string;
  dark: { primitive: string; hex: string; rgb: string };
  light: { primitive: string; hex: string; rgb: string };
}

/* --- Primary UI --- */
const primaryUiColours: SwatchData[] = [
  {
    label: "Primary", cssVar: "--color-core-ui-primary",
    dark: { primitive: "--teal--07--", hex: "#118AB2", rgb: "17 / 138 / 178" },
    light: { primitive: "--teal--07--", hex: "#118AB2", rgb: "17 / 138 / 178" },
  },
  {
    label: "Secondary", cssVar: "--color-core-ui-secondary",
    dark: { primitive: "--teal--09--", hex: "#0A4E66", rgb: "10 / 78 / 102" },
    light: { primitive: "--teal--10--", hex: "#052F3E", rgb: "5 / 47 / 62" },
  },
];

/* --- Accent --- */
const accentColours: SwatchData[] = [
  {
    label: "Coral", cssVar: "--color-core-accent-coral",
    dark: { primitive: "--red--07--", hex: "#EF476F", rgb: "239 / 71 / 111" },
    light: { primitive: "--red--07--", hex: "#EF476F", rgb: "239 / 71 / 111" },
  },
  {
    label: "Amber", cssVar: "--color-core-accent-amber",
    dark: { primitive: "--orange--05--", hex: "#EF8247", rgb: "239 / 130 / 71" },
    light: { primitive: "--orange--05--", hex: "#EF8247", rgb: "239 / 130 / 71" },
  },
  {
    label: "Gold", cssVar: "--color-core-accent-gold",
    dark: { primitive: "--yellow--07--", hex: "#FFD166", rgb: "255 / 209 / 102" },
    light: { primitive: "--yellow--07--", hex: "#FFD166", rgb: "255 / 209 / 102" },
  },
  {
    label: "Violet", cssVar: "--color-core-accent-violet",
    dark: { primitive: "--purple--07--", hex: "#9E47EF", rgb: "158 / 71 / 239" },
    light: { primitive: "--purple--07--", hex: "#9E47EF", rgb: "158 / 71 / 239" },
  },
  {
    label: "Cobalt", cssVar: "--color-core-accent-cobalt",
    dark: { primitive: "--blue--07--", hex: "#1E47B0", rgb: "30 / 71 / 176" },
    light: { primitive: "--blue--07--", hex: "#1E47B0", rgb: "30 / 71 / 176" },
  },
  {
    label: "Mint", cssVar: "--color-core-accent-mint",
    dark: { primitive: "--green--07--", hex: "#06D6A0", rgb: "6 / 214 / 160" },
    light: { primitive: "--green--07--", hex: "#06D6A0", rgb: "6 / 214 / 160" },
  },
];

/* --- Page --- */
const pageColours: SwatchData[] = [
  {
    label: "Primary", cssVar: "--color-bg-page-primary",
    dark: { primitive: "--neutral--10--", hex: "#050505", rgb: "5 / 5 / 5" },
    light: { primitive: "--neutral--00--", hex: "#FFFFFF", rgb: "255 / 255 / 255" },
  },
  {
    label: "Inverse", cssVar: "--color-bg-page-inverse",
    dark: { primitive: "--neutral--01--", hex: "#F1F1F1", rgb: "241 / 241 / 241" },
    light: { primitive: "--neutral--10--", hex: "#050505", rgb: "5 / 5 / 5" },
  },
];

/* --- Container --- */
const containerColours: SwatchData[] = [
  {
    label: "Primary", cssVar: "--color-bg-container-primary",
    dark: { primitive: "--neutral--09--", hex: "rgba(14,14,14,0.8)", rgb: "14 / 14 / 14" },
    light: { primitive: "--neutral--01--", hex: "#F1F1F1", rgb: "241 / 241 / 241" },
  },
  {
    label: "Secondary", cssVar: "--color-bg-container-secondary",
    dark: { primitive: "--neutral--08--", hex: "#303030", rgb: "48 / 48 / 48" },
    light: { primitive: "--neutral--02--", hex: "#D6D6D6", rgb: "214 / 214 / 214" },
  },
  {
    label: "Tertiary", cssVar: "--color-bg-container-tertiary",
    dark: { primitive: "--neutral--07--", hex: "#232323", rgb: "35 / 35 / 35" },
    light: { primitive: "--neutral--03--", hex: "#BCBCBC", rgb: "188 / 188 / 188" },
  },
  {
    label: "Inverse", cssVar: "--color-bg-container-inverse",
    dark: { primitive: "--neutral--01--", hex: "#F1F1F1", rgb: "241 / 241 / 241" },
    light: { primitive: "--neutral--09--", hex: "#0E0E0E", rgb: "14 / 14 / 14" },
  },
];

/* --- Text --- */
const textColours: SwatchData[] = [
  {
    label: "Primary", cssVar: "--color-text-primary",
    dark: { primitive: "--neutral--01--", hex: "#F1F1F1", rgb: "241 / 241 / 241" },
    light: { primitive: "--neutral--10--", hex: "#050505", rgb: "5 / 5 / 5" },
  },
  {
    label: "Secondary", cssVar: "--color-text-secondary",
    dark: { primitive: "--neutral--03--", hex: "#BCBCBC", rgb: "188 / 188 / 188" },
    light: { primitive: "--neutral--07--", hex: "#303030", rgb: "48 / 48 / 48" },
  },
  {
    label: "Tertiary", cssVar: "--color-text-tertiary",
    dark: { primitive: "--neutral--04--", hex: "#A2A2A2", rgb: "162 / 162 / 162" },
    light: { primitive: "--neutral--05--", hex: "#6D6D6D", rgb: "109 / 109 / 109" },
  },
  {
    label: "Inverse", cssVar: "--color-text-inverse",
    dark: { primitive: "--neutral--07--", hex: "#303030", rgb: "48 / 48 / 48" },
    light: { primitive: "--neutral--04--", hex: "#A2A2A2", rgb: "162 / 162 / 162" },
  },
  {
    label: "On Inverse", cssVar: "--color-text-on-inverse",
    dark: { primitive: "--neutral--09--", hex: "#0E0E0E", rgb: "14 / 14 / 14" },
    light: { primitive: "--neutral--01--", hex: "#F1F1F1", rgb: "241 / 241 / 241" },
  },
];

/* --- Overlay & Controls --- */
const overlayControlColours: SwatchData[] = [
  {
    label: "Scrim", cssVar: "--color-scrim",
    dark: { primitive: "--true-black-strong--", hex: "rgba(0,0,0,0.7)", rgb: "0 / 0 / 0" },
    light: { primitive: "--true-black-semi--", hex: "rgba(0,0,0,0.5)", rgb: "0 / 0 / 0" },
  },
  {
    label: "Control Thumb", cssVar: "--color-control-thumb",
    dark: { primitive: "--neutral--01--", hex: "#F1F1F1", rgb: "241 / 241 / 241" },
    light: { primitive: "--neutral--00--", hex: "#FFFFFF", rgb: "255 / 255 / 255" },
  },
];

/* --- Action / Primary --- */
const actionPrimaryColours: SwatchData[] = [
  {
    label: "Background Default", cssVar: "--color-action-primary-bg",
    dark: { primitive: "--teal--07--", hex: "#118AB2", rgb: "17 / 138 / 178" },
    light: { primitive: "--teal--07--", hex: "#118AB2", rgb: "17 / 138 / 178" },
  },
  {
    label: "Background Hover", cssVar: "--color-action-primary-bg-hover",
    dark: { primitive: "--teal--08--", hex: "#0E6E8F", rgb: "14 / 110 / 143" },
    light: { primitive: "--teal--08--", hex: "#0E6E8F", rgb: "14 / 110 / 143" },
  },
  {
    label: "Background Active", cssVar: "--color-action-primary-bg-active",
    dark: { primitive: "--teal--09--", hex: "#0A4E66", rgb: "10 / 78 / 102" },
    light: { primitive: "--teal--09--", hex: "#0A4E66", rgb: "10 / 78 / 102" },
  },
  {
    label: "Text Primary", cssVar: "--color-action-primary-text",
    dark: { primitive: "--teal--02--", hex: "#CFEAF3", rgb: "207 / 234 / 243" },
    light: { primitive: "--teal--02--", hex: "#CFEAF3", rgb: "207 / 234 / 243" },
  },
  {
    label: "Text Secondary", cssVar: "--color-action-primary-text-secondary",
    dark: { primitive: "--teal--10--", hex: "#052F3E", rgb: "5 / 47 / 62" },
    light: { primitive: "--teal--10--", hex: "#052F3E", rgb: "5 / 47 / 62" },
  },
  {
    label: "Text Tertiary", cssVar: "--color-action-primary-text-tertiary",
    dark: { primitive: "--teal--07--", hex: "#118AB2", rgb: "17 / 138 / 178" },
    light: { primitive: "--teal--07--", hex: "#118AB2", rgb: "17 / 138 / 178" },
  },
  {
    label: "Border Primary", cssVar: "--color-action-primary-border",
    dark: { primitive: "--teal--09--", hex: "#0A4E66", rgb: "10 / 78 / 102" },
    light: { primitive: "--teal--09--", hex: "#0A4E66", rgb: "10 / 78 / 102" },
  },
];

/* --- Action / Passive --- */
const actionPassiveColours: SwatchData[] = [
  {
    label: "Background Default", cssVar: "--color-action-passive-bg",
    dark: { primitive: "--neutral--09-transparent--", hex: "rgba(14,14,14,0.01)", rgb: "Transparent" },
    light: { primitive: "--neutral--01-transparent--", hex: "rgba(241,241,241,0.01)", rgb: "Transparent" },
  },
  {
    label: "Background Hover", cssVar: "--color-action-passive-bg-hover",
    dark: { primitive: "--neutral--08--", hex: "rgba(35,35,35,0.8)", rgb: "35 / 35 / 35" },
    light: { primitive: "--neutral--02--", hex: "rgba(214,214,214,0.8)", rgb: "214 / 214 / 214" },
  },
  {
    label: "Background Active", cssVar: "--color-action-passive-bg-active",
    dark: { primitive: "--neutral--07--", hex: "rgba(48,48,48,0.8)", rgb: "48 / 48 / 48" },
    light: { primitive: "--neutral--03--", hex: "rgba(188,188,188,0.8)", rgb: "188 / 188 / 188" },
  },
  {
    label: "Text Primary", cssVar: "--color-action-passive-text",
    dark: { primitive: "--neutral--01--", hex: "#F1F1F1", rgb: "241 / 241 / 241" },
    light: { primitive: "--neutral--10--", hex: "#050505", rgb: "5 / 5 / 5" },
  },
];

/* --- Status --- */
const statusColours: StatusSwatchData[] = [
  {
    label: "Positive", bgVar: "--color-status-positive-bg", borderVar: "--color-status-positive-border",
    dark: { primitive: "--green--10--", hex: "#024336", rgb: "2 / 67 / 54" },
    light: { primitive: "--green--01--", hex: "#ECFCF7", rgb: "236 / 252 / 247" },
  },
  {
    label: "Warning", bgVar: "--color-status-warning-bg", borderVar: "--color-status-warning-border",
    dark: { primitive: "--orange--09--", hex: "#552716", rgb: "85 / 39 / 22" },
    light: { primitive: "--orange--01--", hex: "#FFF3EC", rgb: "255 / 243 / 236" },
  },
  {
    label: "Error", bgVar: "--color-status-error-bg", borderVar: "--color-status-error-border",
    dark: { primitive: "--red--10--", hex: "#571727", rgb: "87 / 23 / 39" },
    light: { primitive: "--red--01--", hex: "#FDEFF3", rgb: "253 / 239 / 243" },
  },
  {
    label: "Info", bgVar: "--color-status-info-bg", borderVar: "--color-status-info-border",
    dark: { primitive: "--blue--10--", hex: "#081633", rgb: "8 / 22 / 51" },
    light: { primitive: "--blue--01--", hex: "#EEF3FD", rgb: "238 / 243 / 253" },
  },
  {
    label: "Neutral", bgVar: "--color-status-neutral-bg", borderVar: "--color-status-neutral-border",
    dark: { primitive: "--neutral--08--", hex: "#232323", rgb: "35 / 35 / 35" },
    light: { primitive: "--neutral--02--", hex: "#D6D6D6", rgb: "214 / 214 / 214" },
  },
];

/* --- Chart / Contribution --- */
const chartContributionColours: SwatchData[] = [
  {
    label: "Level 0", cssVar: "--color-chart-contribution-0",
    dark: { primitive: "--neutral--08--", hex: "#232323", rgb: "35 / 35 / 35" },
    light: { primitive: "--neutral--01--", hex: "#F1F1F1", rgb: "241 / 241 / 241" },
  },
  {
    label: "Level 1", cssVar: "--color-chart-contribution-1",
    dark: { primitive: "--green--10--", hex: "#024336", rgb: "2 / 67 / 54" },
    light: { primitive: "--green--02--", hex: "#CEF6E8", rgb: "206 / 246 / 232" },
  },
  {
    label: "Level 2", cssVar: "--color-chart-contribution-2",
    dark: { primitive: "--green--09--", hex: "#03765A", rgb: "3 / 118 / 90" },
    light: { primitive: "--green--04--", hex: "#6DE0C0", rgb: "109 / 224 / 192" },
  },
  {
    label: "Level 3", cssVar: "--color-chart-contribution-3",
    dark: { primitive: "--green--08--", hex: "#05A67C", rgb: "5 / 166 / 124" },
    light: { primitive: "--green--07--", hex: "#06D6A0", rgb: "6 / 214 / 160" },
  },
  {
    label: "Level 4", cssVar: "--color-chart-contribution-4",
    dark: { primitive: "--green--07--", hex: "#06D6A0", rgb: "6 / 214 / 160" },
    light: { primitive: "--green--09--", hex: "#03765A", rgb: "3 / 118 / 90" },
  },
];

/* ============================================
   THEME HOOK
   ============================================ */

function subscribeToTheme(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function getTheme(): "dark" | "light" {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function useTheme() {
  return useSyncExternalStore<"dark" | "light">(subscribeToTheme, getTheme, () => "dark");
}

/* ============================================
   PAGE
   ============================================ */

export default function SemanticColoursPage() {
  const theme = useTheme();

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
            <h1 className={styles.pageTitle}>Semantic colours</h1>
            <PageLinks
              figmaUrl="https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/robr0-ds26?node-id=113-4831"
              storybookPath="/?path=/docs/foundations-tokens--docs"
            />
          </div>

          {/* Intro */}
          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              Semantic roles that map to primitives per mode
            </p>
            <p className={styles.introBody}>
              Each colour here has a role, like &quot;page background&quot; or &quot;error border&quot;, and maps to a different primitive value depending on whether the UI is in light or dark mode. Components only reference these roles, so switching themes is just swapping which primitives each role points to. Toggle the mode above to see the values change.
            </p>
          </div>

          {/* Example images */}
          <div className={`${styles.exampleRow} animate-in animate-delay-2`}>
            <div className={styles.exampleItem}>
              <Image src="/images/figma variables.png" alt="Figma mode variables" width={500} height={300} className={styles.exampleImage} />
              <p className={styles.exampleCaption}>Figma: Colour mode variables collection</p>
            </div>
            <div className={styles.exampleItem}>
              <Image src="/images/coded semantic tokens.png" alt="Coded semantic tokens" width={500} height={300} className={styles.exampleImage} />
              <p className={styles.exampleCaption}>Code: tokens-mode.css</p>
            </div>
          </div>

          {/* Primary UI Colours */}
          <section className={`${styles.colourGroup} animate-in animate-delay-2`}>
            <SectionTitle title="Primary UI Colours" />
            <div className={styles.colourSwatches}>
              {primaryUiColours.map((s) => (
                <ColourSwatch key={s.label} label={s.label} cssVar={s.cssVar} dark={s.dark} light={s.light} theme={theme} />
              ))}
            </div>
          </section>

          {/* Accent Colours */}
          <section className={styles.colourGroup}>
            <SectionTitle title="Accent Colours" />
            <div className={styles.colourSwatches}>
              {accentColours.map((s) => (
                <ColourSwatch key={s.label} label={s.label} cssVar={s.cssVar} dark={s.dark} light={s.light} theme={theme} />
              ))}
            </div>
          </section>

          {/* Page */}
          <section className={styles.colourGroup}>
            <SectionTitle title="Page" />
            <div className={styles.colourSwatches}>
              {pageColours.map((s) => (
                <ColourSwatch key={s.label} label={s.label} cssVar={s.cssVar} dark={s.dark} light={s.light} theme={theme} />
              ))}
            </div>
          </section>

          {/* Container */}
          <section className={styles.colourGroup}>
            <SectionTitle title="Container" />
            <div className={styles.colourSwatches}>
              {containerColours.map((s) => (
                <ColourSwatch key={s.label} label={s.label} cssVar={s.cssVar} dark={s.dark} light={s.light} theme={theme} />
              ))}
            </div>
          </section>

          {/* Text */}
          <section className={styles.colourGroup}>
            <SectionTitle title="Text" />
            <div className={styles.colourSwatches}>
              {textColours.map((s) => (
                <ColourSwatch key={s.label} label={s.label} cssVar={s.cssVar} dark={s.dark} light={s.light} theme={theme} />
              ))}
            </div>
          </section>

          {/* Action / Primary */}
          <section className={styles.colourGroup}>
            <SectionTitle title="Action / Primary" />
            <div className={styles.colourSwatches}>
              {actionPrimaryColours.map((s) => (
                <ColourSwatch key={s.label} label={s.label} cssVar={s.cssVar} dark={s.dark} light={s.light} theme={theme} />
              ))}
            </div>
          </section>

          {/* Action / Passive */}
          <section className={styles.colourGroup}>
            <SectionTitle title="Action / Passive" />
            <div className={styles.colourSwatches}>
              {actionPassiveColours.map((s) => (
                <ColourSwatch key={s.label} label={s.label} cssVar={s.cssVar} dark={s.dark} light={s.light} theme={theme} />
              ))}
            </div>
          </section>

          {/* Overlay & Controls */}
          <section className={styles.colourGroup}>
            <SectionTitle title="Overlay & Controls" />
            <div className={styles.colourSwatches}>
              {overlayControlColours.map((s) => (
                <ColourSwatch key={s.label} label={s.label} cssVar={s.cssVar} dark={s.dark} light={s.light} theme={theme} />
              ))}
            </div>
          </section>

          {/* Status */}
          <section className={styles.colourGroup}>
            <SectionTitle title="Status" />
            <div className={styles.colourSwatches}>
              {statusColours.map((s) => (
                <ColourSwatch key={s.label} label={s.label} cssVar={s.bgVar} dark={s.dark} light={s.light} theme={theme} status borderVar={s.borderVar} />
              ))}
            </div>
          </section>

          {/* Chart / Contribution */}
          <section className={styles.colourGroup}>
            <SectionTitle title="Chart / Contribution" />
            <div className={styles.colourSwatches}>
              {chartContributionColours.map((s) => (
                <ColourSwatch key={s.label} label={s.label} cssVar={s.cssVar} dark={s.dark} light={s.light} theme={theme} />
              ))}
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
