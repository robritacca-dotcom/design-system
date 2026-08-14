import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import {
  TurboTaxClaudeCover,
  TurboTaxClaudeCoverMobile,
} from "../../components/covers/TurboTaxClaudeCover";
import styles from "./page.module.css";

export const metadata = {
  title: "Cover mocks",
  description: "Vector redraws of source frames, staged for review.",
  robots: { index: false, follow: false },
};

/**
 * A blank staging page for the vector cover mocks. No site chrome, no layout
 * opinions — each mock renders at its native frame size so it can be checked
 * against its Figma source, with the theme toggle floating over the top so
 * the light/dark cross-fade is one click away. More mocks land here as they
 * are drawn; where they end up is a later decision.
 */
export default function CoverMocksPage() {
  return (
    <main className={styles.page}>
      <div className={styles.toggle}>
        <ThemeToggle />
      </div>

      <section className={styles.mock}>
        <p className={styles.label}>TurboTax in Claude — desktop, 1440 × 972</p>
        <div style={{ width: 1440 }}>
          <TurboTaxClaudeCover />
        </div>
      </section>

      <section className={styles.mock}>
        <p className={styles.label}>TurboTax in Claude — mobile, 440 × 972</p>
        <div style={{ width: 440 }}>
          <TurboTaxClaudeCoverMobile />
        </div>
      </section>
    </main>
  );
}
