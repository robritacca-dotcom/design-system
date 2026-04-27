"use client";

import { Button } from "@design-system/components/Button/Button";

export default function DownloadButton() {
  return (
    <a href="/design.md" download="design.md">
      <Button label="Download design.md" priority="secondary" size="default" iconLeft="download" />
    </a>
  );
}
