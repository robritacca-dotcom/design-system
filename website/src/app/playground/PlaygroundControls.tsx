"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import { Button } from "@robr0/design-system/components/Button/Button";
import { Dropdown } from "@robr0/design-system/components/Dropdown/Dropdown";
import { Input } from "@robr0/design-system/components/Input/Input";
import { Slider } from "@robr0/design-system/components/Slider/Slider";
import { ToggleSwitch } from "@robr0/design-system/components/ToggleSwitch/ToggleSwitch";
import { ACTION_COLOR_PRESETS, FONT_OPTIONS } from "./theme-overrides";
import { PRESET_OPTIONS } from "./presets";

export interface PlaygroundControlsProps {
  preset: string;
  /** The action colour being previewed (theme-resolved). */
  brand: string;
  tintOn: boolean;
  tintSeed: string;
  tintStrength: number;
  radiusScale: number;
  pill: boolean;
  fontLabel: string;
  productName: string;
  isPristine: boolean;
  cssSnippet: string;
  onPreset: (value: string) => void;
  onBrand: (value: string) => void;
  onTintOn: (value: boolean) => void;
  onTintSeed: (value: string) => void;
  onTintStrength: (value: number) => void;
  onRadiusScale: (value: number) => void;
  onPill: (value: boolean) => void;
  onFontLabel: (value: string) => void;
  onProductName: (value: string) => void;
  onReset: () => void;
}

/** The sticky theme-control rail — presentational; all state lives in the page. */
export default function PlaygroundControls({
  preset,
  brand,
  tintOn,
  tintSeed,
  tintStrength,
  radiusScale,
  pill,
  fontLabel,
  productName,
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
}: PlaygroundControlsProps) {
  const isCustomBrand = !ACTION_COLOR_PRESETS.some(
    (p) => p.hex === brand.toUpperCase()
  );

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
    <aside className={`${styles.controlRail} animate-in`} aria-label="Theme controls">
      <h3 className={styles.railTitle}>Theme controls</h3>

      <div className={styles.controlGroup}>
        <h4 className={styles.controlHeading}>Theme preset</h4>
        <p className={styles.controlNote}>
          Start from a saved look — any lever you touch turns it back into Custom.
        </p>
        <Dropdown
          aria-label="Theme preset"
          value={preset}
          options={PRESET_OPTIONS}
          onValueChange={onPreset}
        />
      </div>

      <div className={styles.controlGroup}>
        <h4 className={styles.controlHeading}>Product name</h4>
        <p className={styles.controlNote}>
          Renames this page&apos;s title as you type.
        </p>
        <Input
          aria-label="Product name"
          placeholder="Playground"
          value={productName}
          onValueChange={onProductName}
        />
      </div>

      <div className={styles.controlGroup}>
        <h4 className={styles.controlHeading}>Action colour</h4>
        <p className={styles.controlNote}>
          Rebuilds the whole teal ramp around your pick — hover and pressed states
          included.
        </p>
        <div className={styles.swatchGrid}>
          {ACTION_COLOR_PRESETS.map(({ label, hex }) => (
            <button
              key={hex}
              type="button"
              className={styles.swatch}
              style={{ background: hex }}
              aria-label={label}
              aria-pressed={brand.toUpperCase() === hex}
              onClick={() => onBrand(hex)}
            />
          ))}
        </div>
        <label
          className={styles.customColorRow}
          data-active={isCustomBrand || undefined}
        >
          <input
            type="color"
            className={styles.colorInput}
            value={brand}
            onChange={(e) => onBrand(e.target.value.toUpperCase())}
            aria-label="Custom brand colour"
          />
          <span className={styles.customColorLabel}>Custom</span>
          <code className={styles.colorValue}>{brand.toUpperCase()}</code>
        </label>
      </div>

      <div className={styles.controlGroup}>
        <h4 className={styles.controlHeading}>Neutral tint</h4>
        <p className={styles.controlNote}>
          Washes the neutral scale — page, containers, text — toward a seed colour.
        </p>
        <ToggleSwitch label="Tint neutrals" checked={tintOn} onChange={onTintOn} />
        {tintOn && (
          <>
            <label className={styles.colorRow}>
              <input
                type="color"
                className={styles.colorInput}
                value={tintSeed}
                onChange={(e) => onTintSeed(e.target.value.toUpperCase())}
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
        <p className={styles.controlNote}>
          Scales the radius scale; pills can become rectangles.
        </p>
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
        <h4 className={styles.controlHeading}>Typeface</h4>
        <p className={styles.controlNote}>
          One token drives the entire type scale. Fonts load from Google Fonts on
          demand.
        </p>
        <Dropdown
          aria-label="Typeface"
          value={fontLabel}
          options={FONT_OPTIONS.map((f) => ({ label: f.label, value: f.label }))}
          onValueChange={onFontLabel}
        />
      </div>

      <div className={styles.railFooter}>
        <Button
          label={copied ? "Copied" : "Copy CSS"}
          priority="primary"
          iconLeft={copied ? "check" : "content_copy"}
          state={isPristine ? "disabled" : "default"}
          onClick={copyCss}
        />
        <Button
          label="Reset everything"
          priority="secondary"
          iconLeft="restart_alt"
          state={isPristine ? "disabled" : "default"}
          onClick={onReset}
        />
      </div>
    </aside>
  );
}
