"use client";

import Header from "../components/Header/Header";
import BlurBackground from "../components/BlurBackground/BlurBackground";
import Footer from "../components/Footer/Footer";
import styles from "./page.module.css";

const navLinks = [
  { href: "/", label: "Home", active: true },
  { href: "/about", label: "About" },
  { href: "/components", label: "Components" },
  { href: "/foundations", label: "Foundations" },
];

export default function HomePage() {
  return (
    <>

      <BlurBackground fullHeight />

      <Header navLinks={navLinks} />

      <main className={styles.homeContainer} id="main-content">
        <div className={`${styles.homeHeading} animate-in animate-delay-1`}>
          <h1 className={styles.homeTitle}>robr0 DS</h1>
          <p className={styles.homeSubtitle}>
            The design system for all of my upcoming personal projects
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
