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
          
          <div className={styles.description}>
            <h2>Design System Architecture</h2>
            <p>A complete design-to-deployment workflow built with modern tools and AI assistance.</p>
          </div>

          <div className={styles.architecture}>
            <div className={styles.flowContainer}>
              <div className={styles.flowStep}>
                <div className={styles.stepIcon}>
                  <span className="material-symbols-sharp">palette</span>
                </div>
                <h3>Figma Design</h3>
                <p>Design tokens, components, and typography system</p>
              </div>
              
              <div className={styles.flowArrow}>
                <span className="material-symbols-sharp">arrow_forward</span>
              </div>

              <div className={styles.flowStep}>
                <div className={styles.stepIcon}>
                  <span className="material-symbols-sharp">code</span>
                </div>
                <h3>Tokens & Components</h3>
                <p>CSS custom properties, React components, Material Symbols</p>
              </div>

              <div className={styles.flowArrow}>
                <span className="material-symbols-sharp">arrow_forward</span>
              </div>

              <div className={styles.flowStep}>
                <div className={styles.stepIcon}>
                  <span className="material-symbols-sharp">auto_awesome</span>
                </div>
                <h3>Claude AI</h3>
                <p>Component development with Claude Code & MCP</p>
              </div>

              <div className={styles.flowArrow}>
                <span className="material-symbols-sharp">arrow_forward</span>
              </div>

              <div className={styles.flowStep}>
                <div className={styles.stepIcon}>
                  <span className="material-symbols-sharp">book</span>
                </div>
                <h3>Storybook</h3>
                <p>Component documentation and testing</p>
              </div>

              <div className={styles.flowArrow}>
                <span className="material-symbols-sharp">arrow_forward</span>
              </div>

              <div className={styles.flowStep}>
                <div className={styles.stepIcon}>
                  <span className="material-symbols-sharp">language</span>
                </div>
                <h3>Next.js Site</h3>
                <p>Production website built with design system</p>
              </div>

              <div className={styles.flowArrow}>
                <span className="material-symbols-sharp">arrow_forward</span>
              </div>

              <div className={styles.flowStep}>
                <div className={styles.stepIcon}>
                  <span className="material-symbols-sharp">cloud_upload</span>
                </div>
                <h3>Git & Vercel</h3>
                <p>Version control and automated deployment</p>
              </div>
            </div>

            <div className={styles.techStack}>
              <h3>Technology Stack</h3>
              <div className={styles.techGrid}>
                <span className={styles.techBadge}>Figma</span>
                <span className={styles.techBadge}>TypeScript</span>
                <span className={styles.techBadge}>React 19</span>
                <span className={styles.techBadge}>Next.js 16</span>
                <span className={styles.techBadge}>CSS Custom Properties</span>
                <span className={styles.techBadge}>Material Symbols</span>
                <span className={styles.techBadge}>Storybook</span>
                <span className={styles.techBadge}>Claude AI</span>
                <span className={styles.techBadge}>MCP</span>
                <span className={styles.techBadge}>Git</span>
                <span className={styles.techBadge}>Vercel</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Built with custom design system • Design → Code → Deploy</p>
      </footer>
    </div>
  );
}
