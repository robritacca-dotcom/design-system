"use client";

import { useState } from "react";
import styles from "../page.module.css";
import { SectionTitle } from "@robr0/design-system/components/SectionTitle/SectionTitle";
import { Button } from "@robr0/design-system/components/Button/Button";
import { ButtonGroup } from "@robr0/design-system/components/ButtonGroup/ButtonGroup";
import { CircularButton } from "@robr0/design-system/components/CircularButton/CircularButton";
import { SegmentedControl } from "@robr0/design-system/components/SegmentedControl/SegmentedControl";
import { ToggleGroup } from "@robr0/design-system/components/ToggleGroup/ToggleGroup";

const VIEW_SEGMENTS = [
  { value: "grid", label: "Grid", icon: "grid_view" },
  { value: "list", label: "List", icon: "view_list" },
];

const FORMAT_ITEMS = [
  { value: "bold", label: "format_bold", icon: true },
  { value: "italic", label: "format_italic", icon: true },
  { value: "underline", label: "format_underlined", icon: true },
];

export default function ActionsSection() {
  const [view, setView] = useState("grid");
  const [formats, setFormats] = useState<string[]>(["bold"]);

  return (
    <section className={styles.demoSection} aria-label="Actions">
      <SectionTitle title="Actions" />
      <p className={styles.sectionNote}>
        Every action component draws from the brand ramp your colour pick rebuilds:
        solid fills, hover and pressed states, and focus rings all move together.
        The radius lever decides whether these stay pills.
      </p>

      <div className={styles.demoRow}>
        <Button label="Primary action" priority="primary" />
        <Button label="Secondary" priority="secondary" />
        <Button label="Tertiary" priority="tertiary" />
        <Button label="Primary" priority="primary" size="compact" iconRight="arrow_forward" />
      </div>

      <div className={styles.demoRow}>
        <ButtonGroup
          ariaLabel="Pager"
          buttons={[
            { label: "Back", priority: "secondary", iconLeft: "arrow_back" },
            { label: "Next", priority: "primary", iconRight: "arrow_forward" },
          ]}
        />
        <CircularButton icon="add" priority="primary" ariaLabel="Add item" />
        <CircularButton icon="edit" priority="secondary" ariaLabel="Edit item" />
        <CircularButton icon="favorite" priority="tertiary" ariaLabel="Favourite item" />
      </div>

      <div className={styles.demoRow}>
        <SegmentedControl
          segments={VIEW_SEGMENTS}
          activeSegment={view}
          onSegmentChange={setView}
        />
        <ToggleGroup
          aria-label="Text formatting"
          items={FORMAT_ITEMS}
          value={formats}
          multiple
          onValueChange={(v) => setFormats(Array.isArray(v) ? v : [v])}
        />
      </div>
    </section>
  );
}
