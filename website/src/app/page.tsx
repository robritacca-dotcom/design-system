'use client';

import { Button } from '@design-system/components/Button/Button';
import { ButtonGroup } from '@design-system/components/ButtonGroup/ButtonGroup';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Apply dark mode by default
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <ButtonGroup
            orientation="horizontal"
            buttons={[
              { label: 'Home', priority: 'secondary', iconLeft: 'home', iconRight: undefined },
              { label: 'About', priority: 'secondary', iconRight: undefined },
              { label: 'Work', priority: 'secondary', iconRight: undefined },
              { label: 'Contact', priority: 'secondary', iconRight: undefined },
            ]}
          />
          <button 
            className={styles.themeToggle}
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle theme"
          >
            <span className="material-symbols-sharp">
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
        </nav>
      </header>

      <main className={styles.main}>
        <div className={styles.hero}>
          <Image 
            src="/rr.svg" 
            alt="RR Logo" 
            width={120} 
            height={120}
            className={styles.logo}
            priority
          />
          <h1>Rob Ritacca</h1>
          <p className={styles.subtitle}>Building with purpose and precision</p>

          <div className={styles.ctas}>
            <Button
              label="View Work"
              priority="primary"
              iconRight={undefined}
              onClick={() => console.log('View Work clicked')}
            />
            <Button
              label="Get in Touch"
              priority="secondary"
              iconLeft="mail"
              iconRight={undefined}
              onClick={() => console.log('Contact clicked')}
            />
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Built with custom design system</p>
      </footer>
    </div>
  );
}
