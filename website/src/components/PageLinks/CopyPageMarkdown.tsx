"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@robr0/design-system/components/Button/Button";
import { MOTION_FEEDBACK_RESET_MS } from "@robr0/design-system/tokens/motion";

/**
 * The "copy for agents" action on component docs pages. Every public
 * component has a generated markdown page at /components/<slug>.md (see
 * scripts/generate-component-md.mjs); this button copies it to the
 * clipboard so a visitor can hand their agent the prop contract. Rendered
 * unconditionally by PageLinks and self-gated: it only appears on
 * /components/<slug> routes, where the file is guaranteed to exist.
 */
export default function CopyPageMarkdown() {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  const match = pathname?.match(/^\/components\/([a-z0-9-]+)$/);
  if (!match) return null;
  const markdownUrl = `/components/${match[1]}.md`;

  const copy = async () => {
    try {
      const response = await fetch(markdownUrl);
      if (!response.ok) throw new Error(`fetch failed: ${response.status}`);
      await navigator.clipboard.writeText(await response.text());
      setCopied(true);
      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopied(false), MOTION_FEEDBACK_RESET_MS);
    } catch {
      // No clipboard (or a failed fetch): show the file instead.
      window.open(markdownUrl, "_blank", "noopener");
    }
  };

  return (
    <Button
      label={copied ? "Copied" : "Copy for agents"}
      variant="tertiary"
      size="compact"
      iconLeft={copied ? "check" : "content_copy"}
      onClick={copy}
    />
  );
}
