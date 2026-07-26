"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
import { Badge } from "@robr0/design-system/components/Badge/Badge";
import { Alert } from "@robr0/design-system/components/Alert/Alert";
import { Input } from "@robr0/design-system/components/Input/Input";
import { Checkbox } from "@robr0/design-system/components/Checkbox/Checkbox";
import { Chip } from "@robr0/design-system/components/Chip/Chip";
import { ProgressBar } from "@robr0/design-system/components/ProgressBar/ProgressBar";
import { Slider } from "@robr0/design-system/components/Slider/Slider";
import { Tabs } from "@robr0/design-system/components/Tabs/Tabs";
import { ToggleSwitch } from "@robr0/design-system/components/ToggleSwitch/ToggleSwitch";
import { Dropdown } from "@robr0/design-system/components/Dropdown/Dropdown";
import { BarChart } from "@robr0/design-system/charts";
import {
  DEFAULT_BRAND,
  DEFAULT_NEUTRAL_SEED,
  FONT_OPTIONS,
  type Overrides,
  brandOverrides,
  buildCssSnippet,
  googleFontHref,
  neutralOverrides,
  radiusOverrides,
} from "./theme-overrides";

const { sidebarLinks } = getSidebarLinks(
  customizationSidebarLinks,
  "/customization/playground"
);

const PREVIEW_TABS = [
  { value: "overview", label: "Overview" },
  { value: "activity", label: "Activity" },
  { value: "settings", label: "Settings" },
];

const CHART_DATA = [
  { label: "Mon", value: 320 },
  { label: "Tue", value: 480 },
  { label: "Wed", value: 260 },
  { label: "Thu", value: 540 },
  { label: "Fri", value: 610 },
  { label: "Sat", value: 380 },
  { label: "Sun", value: 290 },
];

export default function PlaygroundPage() {
  /* ---------- levers ---------- */
  const [brand, setBrand] = useState(DEFAULT_BRAND);
  const [tintOn, setTintOn] = useState(false);
  const [tintSeed, setTintSeed] = useState(DEFAULT_NEUTRAL_SEED);
  const [tintStrength, setTintStrength] = useState(6); // percent
  const [radiusScale, setRadiusScale] = useState(100); // percent
  const [pill, setPill] = useState(true);
  const [fontLabel, setFontLabel] = useState(FONT_OPTIONS[0].label);

  /* ---------- preview-only state ---------- */
  const [activeTab, setActiveTab] = useState("overview");
  const [demoChecked, setDemoChecked] = useState(true);
  const [demoToggle, setDemoToggle] = useState(true);
  const [demoSlider, setDemoSlider] = useState(60);

  const font = FONT_OPTIONS.find((f) => f.label === fontLabel) ?? FONT_OPTIONS[0];

  const overrides = useMemo<Overrides>(() => {
    const merged: Overrides = {};
    if (brand.toUpperCase() !== DEFAULT_BRAND) {
      Object.assign(merged, brandOverrides(brand));
    }
    if (tintOn && tintStrength > 0) {
      Object.assign(merged, neutralOverrides(tintSeed, tintStrength / 100));
    }
    if (radiusScale !== 100 || !pill) {
      Object.assign(merged, radiusOverrides(radiusScale / 100, pill));
    }
    return merged;
  }, [brand, tintOn, tintSeed, tintStrength, radiusScale, pill]);

  /* ---------- apply to the whole page (see plan D5) ----------
     Custom properties substitute var() where they are declared, and the
     semantic layer is declared on :root — so primitive overrides must land
     on the root element to cascade. Bonus: the entire site chrome previews
     the theme live. Everything is removed on unmount. */
  const appliedKeys = useRef<string[]>([]);
  useEffect(() => {
    const root = document.documentElement;
    for (const key of appliedKeys.current) root.style.removeProperty(key);
    const keys = Object.keys(overrides);
    if (font.family) keys.push("--font-family-primary");
    for (const [name, value] of Object.entries(overrides)) {
      root.style.setProperty(name, value);
    }
    if (font.family) root.style.setProperty("--font-family-primary", font.family);
    appliedKeys.current = keys;
  }, [overrides, font]);

  useEffect(() => {
    const root = document.documentElement;
    const cleanupRef = appliedKeys;
    return () => {
      for (const key of cleanupRef.current) root.style.removeProperty(key);
    };
  }, []);

  /* Google Fonts stylesheets load on demand; loaded ones stay (cheap, and
     re-selecting is instant). All are removed on unmount. */
  useEffect(() => {
    if (!font.googleParam) return;
    const id = `playground-font-${font.googleParam}`;
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = googleFontHref(font.googleParam);
      document.head.appendChild(link);
    }
  }, [font]);

  useEffect(() => {
    return () => {
      document
        .querySelectorAll('link[id^="playground-font-"]')
        .forEach((link) => link.remove());
    };
  }, []);

  const isPristine = Object.keys(overrides).length === 0 && !font.family;

  const reset = () => {
    setBrand(DEFAULT_BRAND);
    setTintOn(false);
    setTintSeed(DEFAULT_NEUTRAL_SEED);
    setTintStrength(6);
    setRadiusScale(100);
    setPill(true);
    setFontLabel(FONT_OPTIONS[0].label);
  };

  const cssSnippet = isPristine
    ? "/* Everything is at its shipped default — move a lever to generate CSS. */"
    : buildCssSnippet(overrides, font);

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
            <h1 className={styles.pageTitle}>Playground</h1>
          </div>

          {/* Intro */}
          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              Move a lever — the whole site re-themes, live
            </p>
            <p className={styles.introBody}>
              These controls override <code>--primitive-*</code> tokens on the page
              root, exactly the way a consumer of the package would in their own CSS.
              Because every semantic token chains to a primitive, one override cascades
              through buttons, focus rings, status colours, and both themes — try the
              light/dark toggle in the header while a brand colour is applied. Leaving
              the page puts everything back.
            </p>
          </div>

          {/* Levers + preview */}
          <div className={`${styles.playgroundGrid} animate-in animate-delay-2`}>
            {/* Controls */}
            <section className={styles.controls} aria-label="Theme controls">
              <div className={styles.controlGroup}>
                <h3 className={styles.controlHeading}>Action colour</h3>
                <p className={styles.controlNote}>
                  Rebuilds the whole teal ramp around your pick — hover and pressed
                  states included.
                </p>
                <label className={styles.colorRow}>
                  <input
                    type="color"
                    className={styles.colorInput}
                    value={brand}
                    onChange={(e) => setBrand(e.target.value.toUpperCase())}
                    aria-label="Brand colour"
                  />
                  <code className={styles.colorValue}>{brand.toUpperCase()}</code>
                </label>
              </div>

              <div className={styles.controlGroup}>
                <h3 className={styles.controlHeading}>Neutral tint</h3>
                <p className={styles.controlNote}>
                  Washes the neutral scale — page, containers, text — toward a seed
                  colour.
                </p>
                <ToggleSwitch
                  label="Tint neutrals"
                  checked={tintOn}
                  onChange={setTintOn}
                />
                {tintOn && (
                  <>
                    <label className={styles.colorRow}>
                      <input
                        type="color"
                        className={styles.colorInput}
                        value={tintSeed}
                        onChange={(e) => setTintSeed(e.target.value.toUpperCase())}
                        aria-label="Neutral tint seed colour"
                      />
                      <code className={styles.colorValue}>{tintSeed.toUpperCase()}</code>
                    </label>
                    <div className={styles.sliderRow}>
                      <Slider
                        value={tintStrength}
                        min={0}
                        max={16}
                        step={1}
                        onChange={setTintStrength}
                        ariaLabel="Tint strength"
                      />
                      <span className={styles.sliderValue}>{tintStrength}%</span>
                    </div>
                  </>
                )}
              </div>

              <div className={styles.controlGroup}>
                <h3 className={styles.controlHeading}>Corner radius</h3>
                <p className={styles.controlNote}>
                  Scales the radius scale; pills can become rectangles.
                </p>
                <div className={styles.sliderRow}>
                  <Slider
                    value={radiusScale}
                    min={0}
                    max={200}
                    step={10}
                    onChange={setRadiusScale}
                    ariaLabel="Radius scale"
                  />
                  <span className={styles.sliderValue}>{radiusScale}%</span>
                </div>
                <ToggleSwitch label="Pill buttons" checked={pill} onChange={setPill} />
              </div>

              <div className={styles.controlGroup}>
                <h3 className={styles.controlHeading}>Typeface</h3>
                <p className={styles.controlNote}>
                  One token drives the entire type scale. Fonts load from Google Fonts
                  on demand.
                </p>
                <Dropdown
                  ariaLabel="Typeface"
                  value={fontLabel}
                  options={FONT_OPTIONS.map((f) => ({ label: f.label, value: f.label }))}
                  onChange={setFontLabel}
                />
              </div>

              <Button
                label="Reset everything"
                priority="secondary"
                iconLeft="restart_alt"
                disabled={isPristine}
                onClick={reset}
              />
            </section>

            {/* Component sampler */}
            <section className={styles.canvas} aria-label="Component preview">
              <div className={styles.canvasRow}>
                <Button label="Primary action" priority="primary" />
                <Button label="Secondary" priority="secondary" />
                <Button label="Primary" priority="primary" size="compact" iconRight="arrow_forward" />
              </div>

              <Tabs
                tabs={PREVIEW_TABS}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                ariaLabel="Preview tabs"
              />

              <Alert
                variant="info"
                title="Live theme preview"
                description="Every component on this canvas — and the rest of the site — renders from the overridden tokens."
              />

              <div className={styles.canvasRow}>
                <Badge label="Info" variant="info" />
                <Badge label="Positive" variant="positive" />
                <Badge label="Warning" variant="warning" />
                <Badge label="Error" variant="error" />
                <Badge label="Neutral" variant="neutral" />
              </div>

              <Input
                label="Email"
                placeholder="you@example.com"
                type="email"
                helperText="Focus me — the active border follows the brand colour."
              />

              <div className={styles.canvasRow}>
                <Chip label="Design tokens" icon="palette" selected />
                <Chip label="Components" icon="widgets" />
                <Checkbox
                  label="Checked state"
                  checked={demoChecked}
                  onChange={setDemoChecked}
                />
                <ToggleSwitch
                  label="Toggle"
                  checked={demoToggle}
                  onChange={setDemoToggle}
                />
              </div>

              <ProgressBar value={64} showLabel ariaLabel="Demo progress" />

              {/* barColor is fed from state rather than left to the chart's
                  own token lookup: the chart resolves CSS variables during
                  render, before the effect that writes the overrides runs,
                  so it would otherwise lag the brand lever by one change. */}
              <BarChart
                data={CHART_DATA}
                title="Weekly views"
                subtitle="Bars follow the action colour"
                dataLabel="Views"
                barColor={brand}
                height={240}
              />

              <div className={styles.sliderRow}>
                <Slider
                  value={demoSlider}
                  min={0}
                  max={100}
                  onChange={setDemoSlider}
                  ariaLabel="Demo slider"
                />
                <span className={styles.sliderValue}>{demoSlider}</span>
              </div>
            </section>
          </div>

          {/* Copy the CSS */}
          <section className={`${styles.section} animate-in animate-delay-3`}>
            <SectionTitle title="Copy the CSS" />
            <p className={styles.sectionNote}>
              Paste this after importing{" "}
              <code>@robr0/design-system/tokens/tokens.css</code> and your app matches
              this preview — both themes included. The install steps live on{" "}
              <a href="/customization" className={styles.inlineLink}>
                Get started
              </a>
              .
            </p>
            <CodeBlock code={cssSnippet} language="css" filename="theme-overrides.css" showCopy />
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
