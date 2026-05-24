"use client";

import BlurBackground from "../../components/BlurBackground/BlurBackground";
import MegaNav from "./MegaNav";
import styles from "./page.module.css";

export default function NavProtoPage() {
  return (
    <div className={styles.page}>
      <BlurBackground fullHeight />
      <MegaNav />
      <main className={styles.main}>
        <div className={styles.hint}>
          <h1 className={styles.hintTitle}>Nav prototype</h1>
          <p className={styles.hintText}>
            Hover or click <strong>Design system</strong> to open the mega menu.
          </p>
          <p className={styles.hintSmall}>
            The mega panel uses a translucent background with backdrop blur — the gradient ambience reads through softly.
          </p>
        </div>
      </main>
    </div>
  );
}
