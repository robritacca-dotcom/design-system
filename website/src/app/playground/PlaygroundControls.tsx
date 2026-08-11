"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import { Button } from "@robr0/design-system/components/Button/Button";
import { ColorPicker } from "@robr0/design-system/components/ColorPicker/ColorPicker";
import { Swatch } from "@robr0/design-system/components/Swatch/Swatch";
import { Dropdown } from "@robr0/design-system/components/Dropdown/Dropdown";
import { Input } from "@robr0/design-system/components/Input/Input";
import { RadioGroup } from "@robr0/design-system/components/RadioButton/RadioButton";
import { Slider } from "@robr0/design-system/components/Slider/Slider";
import { ToggleSwitch } from "@robr0/design-system/components/ToggleSwitch/ToggleSwitch";
import { ACTION_COLOR_PRESETS, FONT_OPTIONS } from "./theme-overrides";
import { PRESET_OPTIONS } from "./presets";

export interface PlaygroundControlsProps {
  preset: string;
  /** The action colour being previewed (theme-resolved). */
  brand: string;
  /** Active site theme — resolves the theme-dependent neutral swatches. */
  theme: string;
  /** Sets the site theme — the rail owns the toggle now that the immersive
      format drops the header that used to carry it. */
  onTheme: (value: string) => void;
  tintOn: boolean;
  tintSeed: string;
  tintStrength: number;
  radiusScale: number;
  pill: boolean;
  fontLabel: string;
  productName: string;
  /** One-line explanation of how the current action colour is applied. */
  actionModeNote: string | null;
  isPristine: boolean;
  cssSnippet: string;
  onPreset: (value: string) => void;
  /** `darkValue` rides along for the theme-dependent neutral swatches. */
  onBrand: (value: string, darkValue?: string) => void;
  onTintOn: (value: boolean) => void;
  onTintSeed: (value: string) => void;
  onTintStrength: (value: number) => void;
  onRadiusScale: (value: number) => void;
  onPill: (value: boolean) => void;
  onFontLabel: (value: string) => void;
  onProductName: (value: string) => void;
  onReset: () => void;
  /** Opens the advanced-mode dialog (every primitive ramp). */
  onOpenAdvanced: () => void;
}

/** The sticky theme-control rail — presentational; all state lives in the page. */
export default function PlaygroundControls({
  preset,
  brand,
  theme,
  onTheme,
  tintOn,
  tintSeed,
  tintStrength,
  radiusScale,
  pill,
  fontLabel,
  productName,
  actionModeNote,
  isPristine,
  cssSnippet,
  onPreset,
  onBrand,
  onTintOn,
  onTintSeed,
  onTintStrength,
  onRadiusScale,
  onPill,
  onFontLabel,
  onProductName,
  onReset,
  onOpenAdvanced,
}: PlaygroundControlsProps) {
  /* Theme-dependent entries (the neutrals) show and match their dark-mode
     counterpart while dark mode is active. */
  const dark = theme === "dark";
  const presetHex = (p: (typeof ACTION_COLOR_PRESETS)[number]) =>
    dark && p.hexDark ? p.hexDark : p.hex;
  const presetLabel = (p: (typeof ACTION_COLOR_PRESETS)[number]) =>
    dark && p.labelDark ? p.labelDark : p.label;

  const isCustomBrand = !ACTION_COLOR_PRESETS.some(
    (p) => presetHex(p) === brand.toUpperCase()
  );

  /* "Custom" is a state you land in by touching a lever, not a look you
     pick — it only appears in the list while it is the active value. */
  const presetOptions =
    preset === "custom"
      ? PRESET_OPTIONS
      : PRESET_OPTIONS.filter((o) => o.value !== "custom");

  const [copied, setCopied] = useState(false);
  const copiedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
    };
  }, []);

  const copyCss = async () => {
    try {
      await navigator.clipboard.writeText(cssSnippet);
      setCopied(true);
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
      copiedTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (permissions) — the end-of-page CodeBlock
      // still offers its own copy affordance.
    }
  };

  return (
    /* No animate-in here: the rail centres itself with a translateY
       transform, and the entrance animation would fight it. The inner
       wrapper scrolls; the shell owns the radius and clips (see the CSS). */
    <aside className={styles.controlRail} aria-label="Theme controls">
      <div className={styles.railScroll}>
        <h3 className={styles.railTitle}>Theme controls</h3>

        <div className={styles.controlGroup}>
          <Dropdown
            label="Theme preset"
            value={preset}
            options={presetOptions}
            onValueChange={onPreset}
          />
        </div>

        <div className={styles.controlGroup}>
          {/* A site-level toggle, not a theme lever — flipping it must not
              flip the preset to Custom, so it bypasses asCustom. */}
          <RadioGroup
            label="Theme"
            name="playground-theme"
            value={theme}
            options={[
              { value: "light", label: "Light" },
              { value: "dark", label: "Dark" },
            ]}
            onValueChange={onTheme}
          />
        </div>

        <div className={styles.controlGroup}>
          <Input
            label="Product name"
            placeholder="Playground"
            value={productName}
            onValueChange={onProductName}
          />
        </div>

        <div className={styles.controlGroup}>
          <h4 className={styles.controlHeading}>Action colour</h4>
          <div className={styles.swatchGrid}>
            {ACTION_COLOR_PRESETS.map((p) => (
              <Swatch
                key={p.hex}
                value={presetHex(p)}
                label={presetLabel(p)}
                selected={brand.toUpperCase() === presetHex(p)}
                onClick={() => onBrand(p.hex, p.hexDark)}
              />
            ))}
          </div>
          <ColorPicker
            value={brand}
            onValueChange={onBrand}
            showText
            aria-label="Custom brand colour"
            className={isCustomBrand ? styles.customPickerActive : ""}
          />
          {actionModeNote && <p className={styles.controlNote}>{actionModeNote}</p>}
          <Button
            label="All colour ramps"
            variant="tertiary"
            iconLeft="palette"
            onClick={onOpenAdvanced}
          />
        </div>

        <div className={styles.controlGroup}>
          <ToggleSwitch
            className={styles.tintTitleToggle}
            label="Tint neutrals"
            checked={tintOn}
            onChange={onTintOn}
          />
          {tintOn && (
            <>
              <ColorPicker
                value={tintSeed}
                onValueChange={onTintSeed}
                showText
                aria-label="Neutral tint seed colour"
              />
              <div className={styles.sliderRow}>
                <Slider
                  value={tintStrength}
                  min={0}
                  max={16}
                  step={1}
                  onValueChange={onTintStrength}
                  ariaLabel="Tint strength"
                />
                <span className={styles.sliderValue}>{tintStrength}%</span>
              </div>
            </>
          )}
        </div>

        <div className={styles.controlGroup}>
          <h4 className={styles.controlHeading}>Corner radius</h4>
          <div className={styles.sliderRow}>
            <Slider
              value={radiusScale}
              min={0}
              max={200}
              step={10}
              onValueChange={onRadiusScale}
              ariaLabel="Radius scale"
            />
            <span className={styles.sliderValue}>{radiusScale}%</span>
          </div>
          <ToggleSwitch label="Pill buttons" checked={pill} onChange={onPill} />
        </div>

        <div className={`${styles.controlGroup} ${styles.dropUp}`}>
          <Dropdown
            label="Typeface"
            value={fontLabel}
            options={FONT_OPTIONS.map((f) => ({ label: f.label, value: f.label }))}
            onValueChange={onFontLabel}
          />
        </div>

        <div className={styles.railFooter}>
          <Button
            label={copied ? "Copied" : "Copy CSS"}
            variant="primary"
            iconLeft={copied ? "check" : "content_copy"}
            state={isPristine ? "disabled" : "default"}
            onClick={copyCss}
          />
          <Button
            label="Reset everything"
            variant="secondary"
            iconLeft="restart_alt"
            state={isPristine ? "disabled" : "default"}
            onClick={onReset}
          />
        </div>
      </div>
    </aside>
  );
}
