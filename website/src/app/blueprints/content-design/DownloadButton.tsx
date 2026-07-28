"use client";

import { Button } from "@robr0/design-system/components/Button/Button";

export default function DownloadButton() {
  return (
    <a href="/content-design.md" download="content-design.md">
      <Button label="Download" priority="tertiary" size="compact" iconLeft="download" />
    </a>
  );
}
