'use client';

import { Button } from '@design-system/components/Button/Button';
import { ButtonGroup } from '@design-system/components/ButtonGroup/ButtonGroup';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './template.module.css';

export default function Template() {
  const [isDark, setIsDark] = useState(true);
  const [stickyVisible, setStickyVisible] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky header after scrolling down 100px
      setStickyVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.page}>
      {/* Gradient Background with Blurred Circles */}
      <div className={styles.blurContainer}>
        <div className={`${styles.blurEllipse} ${styles.blurYellow}`} />
        <div className={`${styles.blurEllipse} ${styles.blurGreen}`} />
        <div className={`${styles.blurEllipse} ${styles.blurPurple}`} />
        <div className={`${styles.blurEllipse} ${styles.blurBlue}`} />
        <div className={`${styles.blurEllipse} ${styles.blurRed}`} />
        <div className={`${styles.blurEllipse} ${styles.blurOrange}`} />
        <div className={`${styles.blurEllipse} ${styles.blurTeal}`} />
        <div className={`${styles.blurEllipse} ${styles.blurNeutral}`} />
      </div>

      {/* Sticky Header - appears on scroll */}
      <header className={`${styles.stickyHeader} ${stickyVisible ? styles.visible : ''}`}>
        <nav className={styles.navContainer}>
          <div className={styles.logo}>
            <Image src="/rr.svg" alt="RR" width={24} height={24} />
            <span className={styles.logoText}>robr0</span>
          </div>

          <div className={styles.navRight}>
            <div className={styles.navMenu}>
              <ButtonGroup
                orientation="horizontal"
                buttons={[
                  { label: 'Home', priority: 'secondary' },
                  { label: 'About', priority: 'secondary' },
                  { label: 'Work', priority: 'secondary', state: 'disabled' },
                  { label: 'robr0 DS', priority: 'secondary', state: 'active' },
                ]}
              />
            </div>

            <button
              className={styles.themeToggle}
              onClick={() => setIsDark(!isDark)}
            >
              <div className={styles.toggleSwitch}>
                <div className={styles.toggleSocket}>
                  <span className="material-symbols-sharp">check</span>
                </div>
              </div>
              <span className={styles.toggleLabel}>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
            </button>
          </div>
        </nav>
      </header>

      {/* Main Navigation */}
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <Image src="/rr.svg" alt="RR" width={24} height={24} />
            <span className={styles.logoText}>robr0</span>
          </div>

          <div className={styles.navRight}>
            <div className={styles.navMenu}>
              <ButtonGroup
                orientation="horizontal"
                buttons={[
                  { label: 'Home', priority: 'secondary' },
                  { label: 'About', priority: 'secondary' },
                  { label: 'Work', priority: 'secondary', state: 'disabled' },
                  { label: 'robr0 DS', priority: 'secondary', state: 'active' },
                ]}
              />
            </div>

            <button
              className={styles.themeToggle}
              onClick={() => setIsDark(!isDark)}
            >
              <div className={styles.toggleSwitch}>
                <div className={styles.toggleSocket}>
                  <span className="material-symbols-sharp">check</span>
                </div>
              </div>
              <span className={styles.toggleLabel}>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
            </button>
          </div>
        </nav>
      </header>

      {/* DS Layout - Main Content */}
      <div className={styles.dsLayout}>
        {/* Sidebar Navigation */}
        <aside className={styles.dsSidebar}>
          <ButtonGroup
            orientation="vertical"
            buttons={[
              { label: 'Active nav item', priority: 'secondary', state: 'active' },
              { label: 'Inactive nav item', priority: 'secondary' },
              { label: 'Another button', priority: 'secondary' },
              { label: 'Last button', priority: 'secondary' },
            ]}
          />
        </aside>

        {/* Content Area */}
        <main className={styles.dsContent}>
          <h1 className={styles.title}>Title</h1>
          <p className={styles.subtitle}>Subtitle</p>

          {/* Section 1 */}
          <section className={styles.section}>
            <div className={styles.divider}>
              <h2>Divider page title</h2>
            </div>
            <p className={styles.paragraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas euismod elit orci, vitae efficitur ex fringilla et. Quisque tempor lectus a ultrices dictum. Sed sapien ligula, commodo eu lectus sed, varius placerat ex.
            </p>
            <div className={styles.cards}>
              <div className={styles.card}>
                <h3>Box</h3>
              </div>
              <div className={styles.card}>
                <h3>Box</h3>
              </div>
              <div className={styles.card}>
                <h3>Box</h3>
              </div>
              <div className={styles.card}>
                <h3>Box</h3>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className={styles.section}>
            <div className={styles.divider}>
              <h2>Divider page title</h2>
            </div>
            <p className={styles.paragraph}>
              Nullam eu lectus cursus, fringilla orci id, aliquam orci. Curabitur quis erat egestas, posuere dolor quis, luctus ipsum.
            </p>
            <div className={styles.cards}>
              <div className={styles.card}>
                <h3>Box</h3>
              </div>
              <div className={styles.card}>
                <h3>Box</h3>
              </div>
              <div className={styles.card}>
                <h3>Box</h3>
              </div>
              <div className={styles.card}>
                <h3>Box</h3>
              </div>
            </div>
          </section>

          {/* Story Section with Right Rail */}
          <div className={styles.storyLayout}>
            <div className={styles.storyContent}>
              <div className={styles.storyPart}>
                <div className={styles.divider}>
                  <h2>Divider page title</h2>
                </div>
                <div className={styles.multiParagraph}>
                  <p>Content goes here. Multiple paragraphs of text describing the story and process.</p>
                  <p>Second paragraph with more details about the implementation and decisions made.</p>
                </div>
              </div>
            </div>

            {/* Right Rail - Tools */}
            <aside className={styles.rightRail}>
              <div className={styles.divider}>
                <h2>Tools</h2>
              </div>
              <div className={styles.toolsList}>
                <div className={styles.tool}>
                  <Image src="/logos/Figma.svg" alt="Figma" width={28} height={28} />
                  <div className={styles.toolText}>
                    <h4>Figma</h4>
                    <p>Design source of truth</p>
                  </div>
                </div>
                <div className={styles.tool}>
                  <Image src="/logos/Claude.svg" alt="Claude" width={28} height={28} />
                  <div className={styles.toolText}>
                    <h4>Claude Code</h4>
                    <p>Main dev agent</p>
                  </div>
                </div>
                <div className={styles.tool}>
                  <Image src="/logos/Git.svg" alt="GitHub" width={28} height={28} />
                  <div className={styles.toolText}>
                    <h4>GitHub</h4>
                    <p>Repo</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2026 Robert Ritacca.</p>
      </footer>
    </div>
  );
}
