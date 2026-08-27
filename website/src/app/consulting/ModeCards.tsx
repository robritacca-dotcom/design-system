import { Button } from "@robr0/design-system/components/Button/Button";
import { Badge } from "@robr0/design-system/components/Badge/Badge";
import { EssayCover } from "@/components/covers/EssayCover";
import type { ConsultingMode } from "./consulting-data";
import styles from "./page.module.css";

/**
 * The offer rows both audience pages render: text beside an illustration,
 * alternating sides row by row. The art is a /writing cover standing in
 * (see `coverSlug` in consulting-data), rendered decorative — the offer text
 * beside it says everything the row says.
 */
export default function ModeCards({ modes }: { modes: ConsultingMode[] }) {
  return (
    <div className={styles.offerRows}>
      {modes.map((m) => (
        <section key={m.title} className={styles.offerRow}>
          <div className={styles.offerText}>
            <div className={styles.modeHeader}>
              <span className={styles.modeKind}>{m.kind}</span>
              {m.starter && <Badge variant="info" label="Start here" />}
            </div>
            <h3 className={styles.modeTitle}>{m.title}</h3>
            <p className={styles.modeBody}>{m.body}</p>
            <div className={styles.modeFooter}>
              <span className={styles.modeTerms}>{m.terms}</span>
              <Button
                variant={m.action.primary ? "primary" : "secondary"}
                size="compact"
                label={m.action.label}
                href={m.action.href}
                {...(m.action.external ? { target: "_blank", rel: "noreferrer" } : {})}
              />
            </div>
          </div>
          <div className={styles.offerArt}>
            <span className={styles.offerArtFrame}>
              <EssayCover slug={m.coverSlug} alt="" />
            </span>
          </div>
        </section>
      ))}
    </div>
  );
}
