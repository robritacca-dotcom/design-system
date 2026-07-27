"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
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
import { SelectionCard } from "@robr0/design-system/components/SelectionCard/SelectionCard";
import { SegmentedControl } from "@robr0/design-system/components/SegmentedControl/SegmentedControl";
import { RadioButton } from "@robr0/design-system/components/RadioButton/RadioButton";
import { Input } from "@robr0/design-system/components/Input/Input";
import { Checkbox } from "@robr0/design-system/components/Checkbox/Checkbox";
import { Chip } from "@robr0/design-system/components/Chip/Chip";
import { Slider } from "@robr0/design-system/components/Slider/Slider";
import { Tabs } from "@robr0/design-system/components/Tabs/Tabs";
import { ToggleSwitch } from "@robr0/design-system/components/ToggleSwitch/ToggleSwitch";
import { Dropdown } from "@robr0/design-system/components/Dropdown/Dropdown";
import { BarChart, LineChart } from "@robr0/design-system/charts";
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

/** A preset is just a saved position for every lever. Font labels must
    match FONT_OPTIONS entries. */
interface ThemePreset {
  label: string;
  brand: string;
  /** Theme-dependent action colour: used instead of `brand` in dark mode
      (the black & white preset flips to a white button there). */
  brandDark?: string;
  tintOn: boolean;
  tintSeed: string;
  tintStrength: number;
  radiusScale: number;
  pill: boolean;
  fontLabel: string;
  /** Preset-specific extras beyond the levers (e.g. greyscale accents). */
  extraOverrides?: Overrides;
}

const THEME_PRESETS: Record<string, ThemePreset> = {
  warm: {
    label: "Warm serif",
    brand: "#D97757",
    tintOn: true,
    tintSeed: "#C08B5C",
    tintStrength: 8,
    radiusScale: 100,
    pill: true,
    fontLabel: "Lora (serif)",
  },
  mono: {
    label: "Black & white",
    brand: "#171717",
    brandDark: "#F5F5F5",
    tintOn: false,
    tintSeed: DEFAULT_NEUTRAL_SEED,
    tintStrength: 6,
    radiusScale: 40,
    pill: false,
    fontLabel: "Inter",
    // Grey out the decorative accents (they colour the background glow
    // blobs, among other things). Status colours are a separate token set
    // and deliberately keep their meaning.
    extraOverrides: {
      "--color-core-accent-coral": "#A3A3A3",
      "--color-core-accent-violet": "#8F8F8F",
      "--color-core-accent-cobalt": "#5C5C5C",
      "--color-core-accent-amber": "#B8B8B8",
      "--color-core-accent-gold": "#C9C9C9",
      "--color-core-accent-mint": "#ADADAD",
    },
  },
  contrast: {
    label: "High contrast (AAA)",
    brand: "#1E40AF",
    tintOn: true,
    tintSeed: "#1E40AF",
    tintStrength: 4,
    radiusScale: 100,
    pill: true,
    fontLabel: "IBM Plex Sans",
  },
};

const PRESET_OPTIONS = [
  { label: "Custom", value: "custom" },
  ...Object.entries(THEME_PRESETS).map(([value, p]) => ({ label: p.label, value })),
];

/* Live theme tracking (same pattern as foundations/colour-mode) so
   theme-dependent presets re-derive their overrides when the site's
   light/dark toggle flips. */
function subscribeToTheme(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

const CHART_DATA = [
  { label: "Mon", value: 320 },
  { label: "Tue", value: 480 },
  { label: "Wed", value: 260 },
  { label: "Thu", value: 540 },
  { label: "Fri", value: 610 },
  { label: "Sat", value: 380 },
  { label: "Sun", value: 290 },
];

const TREND_DATA = [
  { month: "Jan", sessions: 180, signups: 60 },
  { month: "Feb", sessions: 300, signups: 110 },
  { month: "Mar", sessions: 240, signups: 90 },
  { month: "Apr", sessions: 420, signups: 170 },
  { month: "May", sessions: 380, signups: 210 },
  { month: "Jun", sessions: 520, signups: 260 },
];

const PLAN_OPTIONS = [
  { value: "starter", label: "Starter", description: "For a single project" },
  { value: "team", label: "Team", description: "Shared workspaces and roles" },
];

const VIEW_SEGMENTS = [
  { value: "grid", label: "Grid", icon: "grid_view" },
  { value: "list", label: "List", icon: "view_list" },
];

export default function PlaygroundPage() {
  /* ---------- levers ---------- */
  const [preset, setPreset] = useState("custom");
  const [brand, setBrand] = useState(DEFAULT_BRAND);
  const [tintOn, setTintOn] = useState(false);
  const [tintSeed, setTintSeed] = useState(DEFAULT_NEUTRAL_SEED);
  const [tintStrength, setTintStrength] = useState(6); // percent
  const [radiusScale, setRadiusScale] = useState(100); // percent
  const [pill, setPill] = useState(true);
  const [fontLabel, setFontLabel] = useState(FONT_OPTIONS[0].label);
  const [productName, setProductName] = useState("Your product");

  /** Touching any individual lever means the state is no longer the preset. */
  const asCustom = <T,>(setter: (value: T) => void) => (value: T) => {
    setPreset("custom");
    setter(value);
  };

  const applyPreset = (value: string) => {
    setPreset(value);
    const p = THEME_PRESETS[value];
    if (!p) return; // "custom" — keep the current levers
    setBrand(p.brand);
    setTintOn(p.tintOn);
    setTintSeed(p.tintSeed);
    setTintStrength(p.tintStrength);
    setRadiusScale(p.radiusScale);
    setPill(p.pill);
    setFontLabel(p.fontLabel);
  };

  /* ---------- preview-only state ---------- */
  const [activeTab, setActiveTab] = useState("overview");
  const [demoChecked, setDemoChecked] = useState(true);
  const [demoToggle, setDemoToggle] = useState(true);
  const [plan, setPlan] = useState("team");
  const [view, setView] = useState("grid");
  const [cadence, setCadence] = useState("weekly");
  const [demoSlider, setDemoSlider] = useState(60);

  const font = FONT_OPTIONS.find((f) => f.label === fontLabel) ?? FONT_OPTIONS[0];

  const theme = useSyncExternalStore(
    subscribeToTheme,
    () => document.documentElement.getAttribute("data-theme") ?? "dark",
    () => "dark"
  );

  /* A preset can carry a theme-dependent action colour (black & white:
     dark button on light, white button on dark). */
  const activePreset = THEME_PRESETS[preset];
  const effectiveBrand =
    activePreset?.brandDark && theme === "dark" ? activePreset.brandDark : brand;

  const overrides = useMemo<Overrides>(() => {
    const merged: Overrides = {};
    if (effectiveBrand.toUpperCase() !== DEFAULT_BRAND) {
      Object.assign(merged, brandOverrides(effectiveBrand));
    }
    if (tintOn && tintStrength > 0) {
      Object.assign(merged, neutralOverrides(tintSeed, tintStrength / 100));
    }
    if (radiusScale !== 100 || !pill) {
      Object.assign(merged, radiusOverrides(radiusScale / 100, pill));
    }
    if (activePreset?.extraOverrides) {
      Object.assign(merged, activePreset.extraOverrides);
    }
    return merged;
  }, [effectiveBrand, tintOn, tintSeed, tintStrength, radiusScale, pill, activePreset]);

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
    setPreset("custom");
    setBrand(DEFAULT_BRAND);
    setTintOn(false);
    setTintSeed(DEFAULT_NEUTRAL_SEED);
    setTintStrength(6);
    setRadiusScale(100);
    setPill(true);
    setFontLabel(FONT_OPTIONS[0].label);
  };

  /* The copied CSS is theme-agnostic except a preset's dark-mode action
     colour, which ships as a [data-theme="dark"] block — so :root always
     carries the light-mode ramp regardless of the theme being previewed. */
  const darkBrandBlock = activePreset?.brandDark
    ? brandOverrides(activePreset.brandDark)
    : undefined;
  const snippetOverrides = darkBrandBlock
    ? { ...overrides, ...brandOverrides(brand) }
    : overrides;
  const cssSnippet = isPristine
    ? "/* Everything is at its shipped default — move a lever to generate CSS. */"
    : buildCssSnippet(snippetOverrides, font, darkBrandBlock);

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
                <h3 className={styles.controlHeading}>Theme preset</h3>
                <p className={styles.controlNote}>
                  Start from a saved look — any lever you touch turns it back
                  into Custom.
                </p>
                <Dropdown
                  ariaLabel="Theme preset"
                  value={preset}
                  options={PRESET_OPTIONS}
                  onChange={applyPreset}
                />
              </div>

              <div className={styles.controlGroup}>
                <h3 className={styles.controlHeading}>Product name</h3>
                <p className={styles.controlNote}>
                  Renames the preview&apos;s title as you type.
                </p>
                <Input
                  ariaLabel="Product name"
                  placeholder="Your product"
                  value={productName}
                  onChange={setProductName}
                />
              </div>

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
                    value={effectiveBrand}
                    onChange={(e) => asCustom(setBrand)(e.target.value.toUpperCase())}
                    aria-label="Brand colour"
                  />
                  <code className={styles.colorValue}>{effectiveBrand.toUpperCase()}</code>
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
                  onChange={asCustom(setTintOn)}
                />
                {tintOn && (
                  <>
                    <label className={styles.colorRow}>
                      <input
                        type="color"
                        className={styles.colorInput}
                        value={tintSeed}
                        onChange={(e) => asCustom(setTintSeed)(e.target.value.toUpperCase())}
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
                        onChange={asCustom(setTintStrength)}
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
                    onChange={asCustom(setRadiusScale)}
                    ariaLabel="Radius scale"
                  />
                  <span className={styles.sliderValue}>{radiusScale}%</span>
                </div>
                <ToggleSwitch label="Pill buttons" checked={pill} onChange={asCustom(setPill)} />
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
                  onChange={asCustom(setFontLabel)}
                />
              </div>

              <Button
                label="Reset everything"
                priority="secondary"
                iconLeft="restart_alt"
                state={isPristine ? "disabled" : "default"}
                onClick={reset}
              />
            </section>

            {/* Component sampler */}
            <section className={styles.canvas} aria-label="Component preview">
              <h1 className={styles.canvasTitle}>{productName}</h1>

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

              {/* Every component on this canvas is chosen because it reads the
                  action colour. Status-driven components (Alert, Badge) are
                  deliberately absent: their tokens are a separate set that
                  keeps its meaning regardless of branding, so they would sit
                  here looking broken while everything around them changed. */}
              <SelectionCard
                mode="radio"
                name="plan"
                options={PLAN_OPTIONS}
                value={plan}
                onChange={(v) => setPlan(v as string)}
              />

              <div className={styles.canvasRow}>
                <SegmentedControl
                  segments={VIEW_SEGMENTS}
                  activeSegment={view}
                  onSegmentChange={setView}
                />
                <RadioButton
                  label="Weekly digest"
                  name="cadence"
                  value="weekly"
                  checked={cadence === "weekly"}
                  onChange={() => setCadence("weekly")}
                />
                <RadioButton
                  label="Monthly"
                  name="cadence"
                  value="monthly"
                  checked={cadence === "monthly"}
                  onChange={() => setCadence("monthly")}
                />
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

              {/* barColor is fed from state rather than left to the chart's
                  own token lookup: the chart resolves CSS variables during
                  render, before the effect that writes the overrides runs,
                  so it would otherwise lag the brand lever by one change. */}
              <BarChart
                data={CHART_DATA}
                title="Weekly views"
                subtitle="Bars follow the action colour"
                dataLabel="Views"
                barColor={effectiveBrand}
                height={240}
              />

              <LineChart
                data={TREND_DATA}
                xKey="month"
                series={[
                  { dataKey: "sessions", label: "Sessions", color: effectiveBrand },
                  { dataKey: "signups", label: "Signups", color: effectiveBrand, strokeDasharray: "5 4" },
                ]}
                title="Growth"
                subtitle="Both series derive from the action colour"
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
              <a href="/customization/get-started" className={styles.inlineLink}>
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
