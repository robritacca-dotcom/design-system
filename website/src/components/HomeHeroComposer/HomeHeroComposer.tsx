"use client";

import { Composer } from "@robr0/design-system/components/Composer/Composer";
import { useSiteChat } from "../SiteChat/ChatContext";
import styles from "./HomeHeroComposer.module.css";

/**
 * Experiment: the site chat's composer, planted in the home hero. It binds
 * the same shared draft as the panel's composer, so text typed here is
 * already waiting in the panel; a submit sends through the shared state
 * machine and opens the chat fullscreen, where the answer streams as usual.
 *
 * One room, many doors: while the chat is open in any form, this composer
 * is disabled — the chat surface's own composer is the only live input,
 * and the shared draft means anything half-typed here is already sitting
 * in it. The disabled shell also stops mirroring the draft, so the panel's
 * keystrokes never ghost-type into the hero. This is what makes the
 * "submit while the rail is open" case impossible.
 */
export function HomeHeroComposer({ className }: { className?: string }) {
  const { draft, setDraft, send, stop, streaming, setOpen, setView, open } = useSiteChat();

  const handleSubmit = (value: string) => {
    // send() reports acceptance; an ignored submit keeps the draft.
    if (send(value)) {
      setDraft("");
      /* A hero ask is the visitor's whole intent in that moment, so the
         answer takes the whole viewport rather than the docked rail. The
         chat's own collapse and Escape return to panel view as usual. */
      setView("full");
      setOpen(true);
    }
  };

  return (
    <div className={`${styles.shell} ${className ?? ""}`}>
      <Composer
        placeholder="Ask anything"
        sendLabel="Send"
        aria-label="Ask robr0 GPT about this site"
        aiGlow
        maxRows={4}
        disabled={open}
        value={open ? "" : draft}
        onValueChange={setDraft}
        onSubmit={handleSubmit}
        streaming={streaming}
        onStop={stop}
      />
    </div>
  );
}
