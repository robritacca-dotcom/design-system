'use client';

import { Button } from '@design-system/components/Button/Button';
import { ButtonGroup } from '@design-system/components/ButtonGroup/ButtonGroup';
import styles from './page.module.css';

export default function Home() {
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
        </nav>
      </header>

      <main className={styles.main}>
        <div className={styles.hero}>
          <h1>Rob Ritacca</h1>
          <p className={styles.subtitle}>Building with purpose and precision</p>

          <div className={styles.ctas}>
            <Button
              label="View Work"
              priority="primary"
              iconRight="arrow_forward"
              onClick={() => console.log('View Work clicked')}
            />
            <Button
              label="Get in Touch"
              priority="secondary"
              iconLeft="mail"
              iconRight="arrow_forward"
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
