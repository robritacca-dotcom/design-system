"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import MegaNav from "../../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import { ColourSwatch } from "@robr0/design-system/components/ColourSwatch/ColourSwatch";
import PageLinks from "../../../components/PageLinks/PageLinks";
import { getSidebarLinks, foundationsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";
import { SectionTitle } from "@robr0/design-system/components/SectionTitle/SectionTitle";

const { sidebarLinks } = getSidebarLinks(foundationsSidebarLinks, "/foundations/colour-primitives");

/* ============================================
   PRIMITIVE COLOUR DATA
   No "primitive" field — these ARE the primitives.
   Only hex + RGB are shown.
   ============================================ */

interface PrimitiveSwatch {
  label: string;
  cssVar: string;
  hex: string;
  rgb: string;
}

/* --- Neutral Scale (00–11) --- */
const neutralColours: PrimitiveSwatch[] = [
  { label: "Neutral 00", cssVar: "--primitive-neutral-00", hex: "#FFFFFF", rgb: "255 / 255 / 255" },
  { label: "Neutral 01", cssVar: "--primitive-neutral-01", hex: "#F1F1F1", rgb: "241 / 241 / 241" },
  { label: "Neutral 02", cssVar: "--primitive-neutral-02", hex: "#D6D6D6", rgb: "214 / 214 / 214" },
  { label: "Neutral 03", cssVar: "--primitive-neutral-03", hex: "#BCBCBC", rgb: "188 / 188 / 188" },
  { label: "Neutral 04", cssVar: "--primitive-neutral-04", hex: "#A2A2A2", rgb: "162 / 162 / 162" },
  { label: "Neutral 05", cssVar: "--primitive-neutral-05", hex: "#888888", rgb: "136 / 136 / 136" },
  { label: "Neutral 06", cssVar: "--primitive-neutral-06", hex: "#6D6D6D", rgb: "109 / 109 / 109" },
  { label: "Neutral 07", cssVar: "--primitive-neutral-07", hex: "#303030", rgb: "48 / 48 / 48" },
  { label: "Neutral 08", cssVar: "--primitive-neutral-08", hex: "#232323", rgb: "35 / 35 / 35" },
  { label: "Neutral 09", cssVar: "--primitive-neutral-09", hex: "#0E0E0E", rgb: "14 / 14 / 14" },
  { label: "Neutral 10", cssVar: "--primitive-neutral-10", hex: "#050505", rgb: "5 / 5 / 5" },
  { label: "Neutral 11", cssVar: "--primitive-neutral-11", hex: "#000000", rgb: "0 / 0 / 0" },
];

/* --- Red Scale (01–10) --- */
const redColours: PrimitiveSwatch[] = [
  { label: "Red 01", cssVar: "--primitive-red-01", hex: "#FDEFF3", rgb: "253 / 239 / 243" },
  { label: "Red 02", cssVar: "--primitive-red-02", hex: "#FAD3DD", rgb: "250 / 211 / 221" },
  { label: "Red 03", cssVar: "--primitive-red-03", hex: "#F8B7C7", rgb: "248 / 183 / 199" },
  { label: "Red 04", cssVar: "--primitive-red-04", hex: "#F69BB1", rgb: "246 / 155 / 177" },
  { label: "Red 05", cssVar: "--primitive-red-05", hex: "#F37F9B", rgb: "243 / 127 / 155" },
  { label: "Red 06", cssVar: "--primitive-red-06", hex: "#F16385", rgb: "241 / 99 / 133" },
  { label: "Red 07", cssVar: "--primitive-red-07", hex: "#EF476F", rgb: "239 / 71 / 111" },
  { label: "Red 08", cssVar: "--primitive-red-08", hex: "#C93A5C", rgb: "201 / 58 / 92" },
  { label: "Red 09", cssVar: "--primitive-red-09", hex: "#8E2641", rgb: "142 / 38 / 65" },
  { label: "Red 10", cssVar: "--primitive-red-10", hex: "#571727", rgb: "87 / 23 / 39" },
];

/* --- Orange Scale (01–10) --- */
const orangeColours: PrimitiveSwatch[] = [
  { label: "Orange 01", cssVar: "--primitive-orange-01", hex: "#FFF3EC", rgb: "255 / 243 / 236" },
  { label: "Orange 02", cssVar: "--primitive-orange-02", hex: "#FBD9C5", rgb: "251 / 217 / 197" },
  { label: "Orange 03", cssVar: "--primitive-orange-03", hex: "#F6B794", rgb: "246 / 183 / 148" },
  { label: "Orange 04", cssVar: "--primitive-orange-04", hex: "#F1996E", rgb: "241 / 153 / 110" },
  { label: "Orange 05", cssVar: "--primitive-orange-05", hex: "#E98256", rgb: "233 / 130 / 86" },
  { label: "Orange 06", cssVar: "--primitive-orange-06", hex: "#E07045", rgb: "224 / 112 / 69" },
  { label: "Orange 07", cssVar: "--primitive-orange-07", hex: "#EF8247", rgb: "239 / 130 / 71" },
  { label: "Orange 08", cssVar: "--primitive-orange-08", hex: "#C65E33", rgb: "198 / 94 / 51" },
  { label: "Orange 09", cssVar: "--primitive-orange-09", hex: "#8F4324", rgb: "143 / 67 / 36" },
  { label: "Orange 10", cssVar: "--primitive-orange-10", hex: "#552716", rgb: "85 / 39 / 22" },
];

/* --- Yellow Scale (01–10) --- */
const yellowColours: PrimitiveSwatch[] = [
  { label: "Yellow 01", cssVar: "--primitive-yellow-01", hex: "#FFF9EA", rgb: "255 / 249 / 234" },
  { label: "Yellow 02", cssVar: "--primitive-yellow-02", hex: "#FFF0C9", rgb: "255 / 240 / 201" },
  { label: "Yellow 03", cssVar: "--primitive-yellow-03", hex: "#FFE5A3", rgb: "255 / 229 / 163" },
  { label: "Yellow 04", cssVar: "--primitive-yellow-04", hex: "#FFD97F", rgb: "255 / 217 / 127" },
  { label: "Yellow 05", cssVar: "--primitive-yellow-05", hex: "#F2C55E", rgb: "242 / 197 / 94" },
  { label: "Yellow 06", cssVar: "--primitive-yellow-06", hex: "#E0B654", rgb: "224 / 182 / 84" },
  { label: "Yellow 07", cssVar: "--primitive-yellow-07", hex: "#FFD166", rgb: "255 / 209 / 102" },
  { label: "Yellow 08", cssVar: "--primitive-yellow-08", hex: "#C49A3E", rgb: "196 / 154 / 62" },
  { label: "Yellow 09", cssVar: "--primitive-yellow-09", hex: "#8A6B2A", rgb: "138 / 107 / 42" },
  { label: "Yellow 10", cssVar: "--primitive-yellow-10", hex: "#544016", rgb: "84 / 64 / 22" },
];

/* --- Green Scale (01–10) --- */
const greenColours: PrimitiveSwatch[] = [
  { label: "Green 01", cssVar: "--primitive-green-01", hex: "#ECFCF7", rgb: "236 / 252 / 247" },
  { label: "Green 02", cssVar: "--primitive-green-02", hex: "#CEF6E8", rgb: "206 / 246 / 232" },
  { label: "Green 03", cssVar: "--primitive-green-03", hex: "#9DEBD4", rgb: "157 / 235 / 212" },
  { label: "Green 04", cssVar: "--primitive-green-04", hex: "#6DE0C0", rgb: "109 / 224 / 192" },
  { label: "Green 05", cssVar: "--primitive-green-05", hex: "#3ED4AA", rgb: "62 / 212 / 170" },
  { label: "Green 06", cssVar: "--primitive-green-06", hex: "#1FCB9A", rgb: "31 / 203 / 154" },
  { label: "Green 07", cssVar: "--primitive-green-07", hex: "#06D6A0", rgb: "6 / 214 / 160" },
  { label: "Green 08", cssVar: "--primitive-green-08", hex: "#05A67C", rgb: "5 / 166 / 124" },
  { label: "Green 09", cssVar: "--primitive-green-09", hex: "#03765A", rgb: "3 / 118 / 90" },
  { label: "Green 10", cssVar: "--primitive-green-10", hex: "#024336", rgb: "2 / 67 / 54" },
];

/* --- Teal Scale (01–10) --- */
const tealColours: PrimitiveSwatch[] = [
  { label: "Teal 01", cssVar: "--primitive-teal-01", hex: "#ECF7FB", rgb: "236 / 247 / 251" },
  { label: "Teal 02", cssVar: "--primitive-teal-02", hex: "#CFEAF3", rgb: "207 / 234 / 243" },
  { label: "Teal 03", cssVar: "--primitive-teal-03", hex: "#9ED4E5", rgb: "158 / 212 / 229" },
  { label: "Teal 04", cssVar: "--primitive-teal-04", hex: "#6DBCD6", rgb: "109 / 188 / 214" },
  { label: "Teal 05", cssVar: "--primitive-teal-05", hex: "#3CA5C6", rgb: "60 / 165 / 198" },
  { label: "Teal 06", cssVar: "--primitive-teal-06", hex: "#2C9AB9", rgb: "44 / 154 / 185" },
  { label: "Teal 07", cssVar: "--primitive-teal-07", hex: "#118AB2", rgb: "17 / 138 / 178" },
  { label: "Teal 08", cssVar: "--primitive-teal-08", hex: "#0E6E8F", rgb: "14 / 110 / 143" },
  { label: "Teal 09", cssVar: "--primitive-teal-09", hex: "#0A4E66", rgb: "10 / 78 / 102" },
  { label: "Teal 10", cssVar: "--primitive-teal-10", hex: "#052F3E", rgb: "5 / 47 / 62" },
];

/* --- Blue Scale (01–10) --- */
const blueColours: PrimitiveSwatch[] = [
  { label: "Blue 01", cssVar: "--primitive-blue-01", hex: "#EEF3FD", rgb: "238 / 243 / 253" },
  { label: "Blue 02", cssVar: "--primitive-blue-02", hex: "#D3DDF8", rgb: "211 / 221 / 248" },
  { label: "Blue 03", cssVar: "--primitive-blue-03", hex: "#AABCEF", rgb: "170 / 188 / 239" },
  { label: "Blue 04", cssVar: "--primitive-blue-04", hex: "#7F99E3", rgb: "127 / 153 / 227" },
  { label: "Blue 05", cssVar: "--primitive-blue-05", hex: "#5475D4", rgb: "84 / 117 / 212" },
  { label: "Blue 06", cssVar: "--primitive-blue-06", hex: "#345AC4", rgb: "52 / 90 / 196" },
  { label: "Blue 07", cssVar: "--primitive-blue-07", hex: "#1E47B0", rgb: "30 / 71 / 176" },
  { label: "Blue 08", cssVar: "--primitive-blue-08", hex: "#163789", rgb: "22 / 55 / 137" },
  { label: "Blue 09", cssVar: "--primitive-blue-09", hex: "#0F265E", rgb: "15 / 38 / 94" },
  { label: "Blue 10", cssVar: "--primitive-blue-10", hex: "#081633", rgb: "8 / 22 / 51" },
];

/* --- Purple Scale (01–10) --- */
const purpleColours: PrimitiveSwatch[] = [
  { label: "Purple 01", cssVar: "--primitive-purple-01", hex: "#F7F0FE", rgb: "247 / 240 / 254" },
  { label: "Purple 02", cssVar: "--primitive-purple-02", hex: "#E6D2FB", rgb: "230 / 210 / 251" },
  { label: "Purple 03", cssVar: "--primitive-purple-03", hex: "#CFABF7", rgb: "207 / 171 / 247" },
  { label: "Purple 04", cssVar: "--primitive-purple-04", hex: "#B785F0", rgb: "183 / 133 / 240" },
  { label: "Purple 05", cssVar: "--primitive-purple-05", hex: "#A86AE8", rgb: "168 / 106 / 232" },
  { label: "Purple 06", cssVar: "--primitive-purple-06", hex: "#9754DC", rgb: "151 / 84 / 220" },
  { label: "Purple 07", cssVar: "--primitive-purple-07", hex: "#9E47EF", rgb: "158 / 71 / 239" },
  { label: "Purple 08", cssVar: "--primitive-purple-08", hex: "#7434B3", rgb: "116 / 52 / 179" },
  { label: "Purple 09", cssVar: "--primitive-purple-09", hex: "#52247D", rgb: "82 / 36 / 125" },
  { label: "Purple 10", cssVar: "--primitive-purple-10", hex: "#31164A", rgb: "49 / 22 / 74" },
];

const trueBlackColours: PrimitiveSwatch[] = [
  { label: "True Black", cssVar: "--primitive-true-black", hex: "#000000", rgb: "0 / 0 / 0" },
  { label: "True Black Semi", cssVar: "--primitive-true-black-semi", hex: "rgba(0,0,0,0.5)", rgb: "0 / 0 / 0" },
  { label: "True Black Strong", cssVar: "--primitive-true-black-strong", hex: "rgba(0,0,0,0.7)", rgb: "0 / 0 / 0" },
];

/* All colour ramps in display order */
const colourRamps = [
  { title: "Neutral", swatches: neutralColours },
  { title: "Red", swatches: redColours },
  { title: "Orange", swatches: orangeColours },
  { title: "Yellow", swatches: yellowColours },
  { title: "Green", swatches: greenColours },
  { title: "Teal", swatches: tealColours },
  { title: "Blue", swatches: blueColours },
  { title: "Purple", swatches: purpleColours },
  { title: "True black", swatches: trueBlackColours },
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

export default function PrimitiveColoursPage() {
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
            <h1 className={styles.pageTitle}>Primitive colours</h1>
            <PageLinks
              figmaUrl="https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/robr0-ds26?node-id=155-6434"
              storybookPath="/?path=/docs/foundations-tokens--docs"
            />
          </div>

          {/* Intro */}
          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              Colour ramps built from a single palette in Figma
            </p>
            <p className={styles.introBody}>
              These raw values never get used directly in components. Instead, they feed into the semantic layer where each value gets assigned a role like &quot;page background&quot; or &quot;primary text&quot;. Keeping them separate means the palette can evolve without touching any component styles.
            </p>
          </div>

          {/* Example images */}
          <div className={`${styles.exampleRow} animate-in animate-delay-2`}>
            <div className={styles.exampleItem}>
              <Image src="/images/figma primitive variables.png" alt="Figma primitive variables" width={500} height={300} className={styles.exampleImage} />
              <p className={styles.exampleCaption}>Figma: Primitive colour variables collection</p>
            </div>
            <div className={styles.exampleItem}>
              <Image src="/images/primitive tokens code.png" alt="Primitive tokens code" width={500} height={300} className={styles.exampleImage} />
              <p className={styles.exampleCaption}>Code: tokens-primitives.css</p>
            </div>
          </div>

          {/* Colour Ramps */}
          {colourRamps.map((ramp, idx) => (
            <section
              key={ramp.title}
              className={`${styles.colourGroup}${idx < 3 ? " animate-in animate-delay-2" : ""}`}
            >
              <SectionTitle title={ramp.title} />
              <div className={styles.colourSwatches}>
                {ramp.swatches.map((s) => (
                  <ColourSwatch
                    key={s.cssVar}
                    label={s.label}
                    cssVar={s.cssVar}
                    dark={{ hex: s.hex, rgb: s.rgb }}
                    theme={theme}
                  />
                ))}
              </div>
            </section>
          ))}
        </main>
      </div>

    </>
  );
}
