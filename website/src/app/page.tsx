"use client";

import MegaNav from "../components/MegaNav/MegaNav";
import BlurBackground from "../components/BlurBackground/BlurBackground";
import Footer from "../components/Footer/Footer";
import { Button } from "@robr0/design-system/components/Button/Button";
import {
  FigmaIcon,
  GitHubIcon,
  StorybookIcon,
  SubstackIcon,
} from "../components/BrandIcons/BrandIcons";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <>

      <BlurBackground fullHeight />

      <MegaNav />

      <main className={styles.homeContainer} id="main-content">
        <div className={`${styles.homeHeading} animate-in animate-delay-1`}>
          <div className={styles.homeNameTitle}>
            <h1 className={styles.homeTitle}>Robert Ritacca</h1>
            <p className={styles.homeSubtitle}>
              Designing and building AI-native products, systems, and experiences.
            </p>
          </div>
          <div className={styles.homeDivider} />
          <div className={styles.homeLinks}>
            <Button
              label="Work"
              priority="tertiary"
              iconLeft="work"
              href="/work"
            />
            <Button
              label="Substack"
              priority="tertiary"
              iconLeft={<SubstackIcon />}
              iconRight="open_in_new"
              href="https://robertritacca1.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
            />
            <Button
              label="Figma"
              priority="tertiary"
              iconLeft={<FigmaIcon />}
              iconRight="open_in_new"
              href="https://www.figma.com/@robr0"
              target="_blank"
              rel="noopener noreferrer"
            />
            <Button
              label="Storybook"
              priority="tertiary"
              iconLeft={<StorybookIcon />}
              iconRight="open_in_new"
              href="https://design-system-iota-one.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
            />
            <Button
              label="GitHub"
              priority="tertiary"
              iconLeft={<GitHubIcon />}
              iconRight="open_in_new"
              href="https://github.com/robritacca-dotcom/design-system"
              target="_blank"
              rel="noopener noreferrer"
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
