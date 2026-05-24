import React from "react";
import { Button } from "@design-system/components/Button/Button";
import styles from "./PageLinks.module.css";

const STORYBOOK_BASE = "https://design-system-iota-one.vercel.app";

interface PageLinksProps {
  /** Figma file URL — omit to hide the Figma button */
  figmaUrl?: string;
  /** Storybook story path (e.g. "/?path=/docs/components-button--docs") — omit to hide the Storybook button */
  storybookPath?: string;
  /** Full GitHub URL (repo, file, etc.) — omit to hide the GitHub button */
  githubUrl?: string;
}

const FigmaIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M9.058 21.748c1.795 0 3.25-1.455 3.25-3.25v-3.249H9.058a3.249 3.249 0 1 0 0 6.499Z" fill="#0ACF83"/>
    <path d="M5.809 12a3.249 3.249 0 0 1 3.25-3.249h3.249v6.499H9.058A3.249 3.249 0 0 1 5.81 12Z" fill="#A259FF"/>
    <path d="M5.809 5.502a3.249 3.249 0 0 1 3.25-3.25h3.249v6.499H9.058a3.249 3.249 0 0 1-3.25-3.249Z" fill="#F24E1E"/>
    <path d="M12.308 2.252h3.249a3.249 3.249 0 1 1 0 6.499h-3.25V2.252Z" fill="#FF7262"/>
    <path d="M18.806 12a3.249 3.249 0 1 1-6.498 0 3.249 3.249 0 0 1 6.498 0Z" fill="#1ABCFE"/>
  </svg>
);

const GitHubIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12.01 0C5.369 0 0 5.5 0 12.304c0 5.44 3.44 10.043 8.212 11.673.597.122.815-.265.815-.59 0-.286-.02-1.264-.02-2.283-3.34.734-4.036-1.466-4.036-1.466-.537-1.426-1.332-1.793-1.332-1.793-1.094-.754.08-.754.08-.754 1.212.082 1.849 1.263 1.849 1.263 1.073 1.874 2.803 1.345 3.5 1.019.098-.795.417-1.345.755-1.65-2.665-.285-5.468-1.345-5.468-6.07 0-1.345.477-2.445 1.232-3.3-.119-.306-.537-1.57.12-3.26 0 0 1.014-.326 3.3 1.263.98-.27 1.989-.407 3.003-.408 1.014 0 2.048.143 3.002.408 2.287-1.59 3.301-1.263 3.301-1.263.657 1.69.239 2.954.12 3.26.775.855 1.232 1.955 1.232 3.3 0 4.725-2.803 5.764-5.488 6.07.438.387.815 1.12.815 2.281 0 1.65-.02 2.975-.02 3.382 0 .326.22.713.816.59C20.56 22.347 24 17.744 24 12.305 24.02 5.5 18.63 0 12.01 0" fill="currentColor"/>
  </svg>
);

const StorybookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M3.202 24.115 2.335 4.305c-.029-.654.557-1.21 1.319-1.25L23.312 2.002c.776-.041 1.445.465 1.493 1.13l.002.074V24.793c0 .667-.63 1.207-1.408 1.207h-.063L4.546 25.275c-.732-.028-1.316-.532-1.344-1.16Z" fill="#FF4785"/>
    <mask id="sb" style={{maskType: "luminance"}} maskUnits="userSpaceOnUse" x="2" y="2" width="23" height="24">
      <path d="M3.202 24.115 2.335 4.305c-.029-.654.557-1.21 1.319-1.25L23.312 2.002c.776-.041 1.445.465 1.493 1.13l.002.074V24.793c0 .667-.63 1.207-1.408 1.207h-.063L4.546 25.275c-.732-.028-1.316-.532-1.344-1.16Z" fill="white"/>
    </mask>
    <g mask="url(#sb)">
      <path d="M18.929 4.95l.134-2.768L21.763 2l.116 2.855c.004.1-.087.183-.203.187a.278.278 0 0 1-.137-.039l-1.041-.703-1.233.802a.196.196 0 0 1-.294-.08.197.197 0 0 1-.042-.072Zm-3.453 6.096c0 .47 3.69.244 4.185-.085 0-3.197-2.001-4.877-5.666-4.877s-5.718 1.706-5.718 4.265c0 4.457 7.018 4.542 7.018 6.974 0 .682-.39 1.088-1.248 1.088-1.117 0-1.56-.49-1.507-2.153 0-.36-4.262-.473-4.392 0-.331 4.03 2.599 5.193 5.952 5.193 3.249 0 5.796-1.484 5.796-4.171 0-4.777-7.122-4.65-7.122-7.016 0-.96.832-1.088 1.326-1.088.52 0 1.456.079 1.377 1.87Z" fill="white"/>
    </g>
  </svg>
);

/**
 * PageLinks — Figma + Storybook external link buttons
 * Uses the DS Button component (secondary, compact) with custom SVG icons.
 * Positioned inline with the page title.
 */
export default function PageLinks({ figmaUrl, storybookPath, githubUrl }: PageLinksProps) {
  return (
    <div className={styles.pageLinks}>
      {figmaUrl && (
        <Button
          label="Figma"
          priority="tertiary"
          size="compact"
          iconLeft={<FigmaIcon />}
          iconRight="open_in_new"
          href={figmaUrl}
          target="_blank"
          rel="noopener noreferrer"
        />
      )}

      {storybookPath && (
        <Button
          label="Storybook"
          priority="tertiary"
          size="compact"
          iconLeft={<StorybookIcon />}
          iconRight="open_in_new"
          href={`${STORYBOOK_BASE}${storybookPath}`}
          target="_blank"
          rel="noopener noreferrer"
        />
      )}

      {githubUrl && (
        <Button
          label="GitHub"
          priority="tertiary"
          size="compact"
          iconLeft={<GitHubIcon />}
          iconRight="open_in_new"
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
        />
      )}
    </div>
  );
}
