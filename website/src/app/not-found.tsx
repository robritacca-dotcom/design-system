"use client";

import Header from "../components/Header/Header";
import BlurBackground from "../components/BlurBackground/BlurBackground";
import Footer from "../components/Footer/Footer";
import { Button } from "@design-system/components/Button/Button";
import { getNavLinks } from "@/config/navigation";
import styles from "./not-found.module.css";

const navLinks = getNavLinks("");

export default function NotFound() {
  return (
    <>

      <BlurBackground fullHeight />

      <Header navLinks={navLinks} />

      <main className={styles.container} id="main-content">
        <div className={`${styles.content} animate-in`}>
          <span className={styles.errorCode}>404</span>
          <h1 className={styles.title}>Page not found</h1>
          <p className={styles.description}>
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button
            label="Back to home"
            priority="secondary"
            iconLeft="arrow_back"
            href="/"
          />
        </div>
      </main>

      <Footer />
    </>
  );
}
