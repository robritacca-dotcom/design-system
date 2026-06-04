"use client";

import { Button } from "@design-system/components/Button/Button";

export default function DownloadButton() {
  return (
    <a href="/CLAUDE.md" download="CLAUDE.md">
      <Button label="Download" priority="tertiary" size="compact" iconLeft="download" />
    </a>
  );
}
