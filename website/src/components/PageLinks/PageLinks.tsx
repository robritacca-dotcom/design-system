import React from "react";
import styles from "./PageLinks.module.css";

interface PageLinksProps {
  /** Figma file URL */
  figmaUrl: string;
  /** Storybook story path (e.g. "/?path=/docs/components-button--docs") — omit for index pages */
  storybookPath?: string;
}

const FigmaIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M9.058 21.748c1.795 0 3.25-1.455 3.25-3.25v-3.249H9.058a3.249 3.249 0 1 0 0 6.499Z" fill="#0ACF83"/>
    <path d="M5.809 12a3.249 3.249 0 0 1 3.25-3.249h3.249v6.499H9.058A3.249 3.249 0 0 1 5.81 12Z" fill="#A259FF"/>
    <path d="M5.809 5.502a3.249 3.249 0 0 1 3.25-3.25h3.249v6.499H9.058a3.249 3.249 0 0 1-3.25-3.249Z" fill="#F24E1E"/>
    <path d="M12.308 2.252h3.249a3.249 3.249 0 1 1 0 6.499h-3.25V2.252Z" fill="#FF7262"/>
    <path d="M18.806 12a3.249 3.249 0 1 1-6.498 0 3.249 3.249 0 0 1 6.498 0Z" fill="#1ABCFE"/>
  </svg>
);

const StorybookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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
 * Positioned inline with the page title.
 */
export default function PageLinks({ figmaUrl, storybookPath }: PageLinksProps) {
  return (
    <div className={styles.pageLinks}>
      <a
        className={styles.pageLink}
        href={figmaUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FigmaIcon />
        <span>Figma</span>
      </a>

      {storybookPath && (
        <a
          className={styles.pageLink}
          href={storybookPath}
          target="_blank"
          rel="noopener noreferrer"
        >
          <StorybookIcon />
          <span>Storybook</span>
        </a>
      )}
    </div>
  );
}
