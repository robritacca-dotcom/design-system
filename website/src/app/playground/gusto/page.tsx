"use client";

import { useMemo, useState } from "react";
import { SegmentedControl } from "@robr0/design-system/components/SegmentedControl/SegmentedControl";
import { SiteChatProvider } from "@/components/SiteChat/ChatContext";
import { createSimTransport } from "@/lib/chat-sim";
import { STORY_CONTENT } from "../ChatDirector";
import ChatView, { type StageSize } from "../views/ChatView";
import styles from "./page.module.css";

/**
 * The Gusto branding test alone on a bare stage: the themed widget, a
 * desktop/mobile switcher, and nothing else — no site chrome, no theme
 * rail, no director. The widget itself is the same ChatView the
 * playground stages, so the two pages can never drift apart; this page
 * exists to look at the test without the tooling around it.
 */
export default function GustoDemoPage() {
  const transport = useMemo(() => createSimTransport(STORY_CONTENT), []);
  const [size, setSize] = useState<StageSize>("desktop");
  const [manual, setManual] = useState<{ w?: number; h?: number }>({});

  return (
    <SiteChatProvider transport={transport}>
      <div className={styles.stage}>
        <div className={styles.switcher}>
          <SegmentedControl
            size="compact"
            ariaLabel="Stage size"
            segments={[
              { value: "desktop", label: "Desktop" },
              { value: "mobile", label: "Mobile" },
            ]}
            activeSegment={size}
            onSegmentChange={(value) => setSize(value as StageSize)}
          />
        </div>
        <ChatView
          title="Assistant"
          size={size}
          placeholder=""
          showStarters
          manual={manual}
          onManual={(next) => setManual((m) => ({ ...m, ...next }))}
          allowFullscreen={false}
          simControls
        />
      </div>
    </SiteChatProvider>
  );
}
