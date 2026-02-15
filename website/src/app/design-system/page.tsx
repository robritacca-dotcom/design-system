'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import './design-system.css';

export default function DesignSystem() {
  useEffect(() => {
    // Theme toggle functionality
    function updateAllThemeLabels(themeName: string) {
      document.querySelectorAll('.theme-toggle-label').forEach((label) => {
        label.textContent = themeName === 'light' ? 'Light Mode' : 'Dark Mode';
      });
    }

    function toggleTheme() {
      const currentTheme = document.documentElement.getAttribute('data-theme');

      if (currentTheme === 'light') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
        updateAllThemeLabels('dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        updateAllThemeLabels('light');
      }
    }

    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';

    // Apply saved theme on load
    if (savedTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      updateAllThemeLabels('light');
    } else {
      updateAllThemeLabels('dark');
    }

    // Mark page as ready
    document.documentElement.classList.add('theme-ready');
    document.documentElement.classList.add('labels-ready');

    // Attach click handlers to all theme toggles
    document.querySelectorAll('.theme-toggle').forEach((toggle) => {
      toggle.addEventListener('click', toggleTheme);
    });

    // Sticky header functionality
    const stickyHeader = document.getElementById('stickyHeader');
    const nav = document.querySelector('.nav');

    if (stickyHeader && nav) {
      function checkStickyVisibility() {
        const navBottom = nav.getBoundingClientRect().bottom;

        if (navBottom <= 0) {
          stickyHeader.classList.add('visible');
        } else {
          stickyHeader.classList.remove('visible');
        }
      }

      checkStickyVisibility();

      let ticking = false;
      const handleScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            checkStickyVisibility();
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener('scroll', handleScroll);

      return () => window.removeEventListener('scroll', handleScroll);
    }

    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

    if (mobileMenuBtn && mobileMenuOverlay) {
      function toggleMobileMenu() {
        if (mobileMenuOverlay.classList.contains('open')) {
          mobileMenuOverlay.classList.remove('open');
          document.body.classList.remove('mobile-menu-open');
          document.body.style.overflow = '';
        } else {
          mobileMenuOverlay.classList.add('open');
          document.body.classList.add('mobile-menu-open');
          document.body.style.overflow = 'hidden';
        }
      }

      mobileMenuBtn.addEventListener('click', toggleMobileMenu);

      // Close mobile menu when clicking links
      const mobileLinks = mobileMenuOverlay.querySelectorAll('a');
      mobileLinks.forEach((link) => {
        link.addEventListener('click', () => {
          mobileMenuOverlay.classList.remove('open');
          document.body.classList.remove('mobile-menu-open');
          document.body.style.overflow = '';
        });
      });
    }
  }, []);

  return (
    <>
      {/* Skip link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Sticky Header */}
      <header className="sticky-header" id="stickyHeader">
        <div className="nav-container">
          <a href="/" className="nav-logo">
            <Image src="/rr.svg" alt="robr0" width={24} height={24} className="nav-logo-icon" />
            <span className="nav-logo-text">robr0</span>
          </a>
          <div className="nav-right">
            <div className="nav-menu">
              <a href="/" className="nav-link">
                Home
              </a>
              <a href="/about" className="nav-link">
                About
              </a>
              <a href="#" className="nav-link disabled">
                Work
              </a>
              <a href="/design-system" className="nav-link active">
                robr0 DS
              </a>
            </div>
            <button className="theme-toggle" aria-label="Toggle dark/light mode">
              <div className="toggle-switch">
                <div className="toggle-switch-track"></div>
                <div className="toggle-switch-thumb">
                  <span className="material-symbols-outlined" style={{ fontSize: '14px', color: 'var(--action-bg-default)' }}>
                    check
                  </span>
                </div>
              </div>
              <span className="theme-toggle-label">Dark Mode</span>
            </button>
          </div>
        </div>
      </header>

      {/* Blur Background */}
      <div className="blur-container">
        <div className="blur-ellipse blur-yellow"></div>
        <div className="blur-ellipse blur-green"></div>
        <div className="blur-ellipse blur-purple"></div>
        <div className="blur-ellipse blur-neutral"></div>
        <div className="blur-ellipse blur-blue"></div>
        <div className="blur-ellipse blur-red"></div>
        <div className="blur-ellipse blur-orange"></div>
        <div className="blur-ellipse blur-teal"></div>
      </div>

      {/* Main Navigation */}
      <nav className="nav">
        <div className="nav-container">
          <a href="/" className="nav-logo">
            <Image src="/rr.svg" alt="robr0" width={24} height={24} className="nav-logo-icon" />
            <span className="nav-logo-text">robr0</span>
          </a>

          <div className="nav-right">
            <div className="nav-menu">
              <a href="/" className="nav-link">
                Home
              </a>
              <a href="/about" className="nav-link">
                About
              </a>
              <a href="#" className="nav-link disabled">
                Work
              </a>
              <a href="/design-system" className="nav-link active">
                robr0 DS
              </a>
            </div>

            <button className="theme-toggle" aria-label="Toggle dark/light mode">
              <div className="toggle-switch">
                <div className="toggle-switch-track"></div>
                <div className="toggle-switch-thumb">
                  <span className="material-symbols-outlined" style={{ fontSize: '14px', color: 'var(--action-bg-default)' }}>
                    check
                  </span>
                </div>
              </div>
              <span className="theme-toggle-label">Dark Mode</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <button className="mobile-menu-btn" id="mobileMenuBtn" aria-label="Toggle menu">
        <span className="material-symbols-outlined menu-icon">menu</span>
        <span className="material-symbols-outlined close-icon">close</span>
      </button>

      {/* Mobile Menu Overlay */}
      <div className="mobile-menu-overlay" id="mobileMenuOverlay">
        <div className="mobile-menu">
          <div className="mobile-menu-links">
            <a href="/" className="mobile-menu-link">
              Home
            </a>
            <a href="/about" className="mobile-menu-link">
              About
            </a>
            <a href="#" className="mobile-menu-link disabled">
              Work
            </a>
            <a href="/design-system" className="mobile-menu-link active">
              robr0 DS
            </a>
            <div className="mobile-subnav">
              <a href="/design-system" className="mobile-subnav-link active">
                About
              </a>
              <a href="#" className="mobile-subnav-link">
                Buttons
              </a>
              <a href="#" className="mobile-subnav-link">
                Icons
              </a>
              <a href="#" className="mobile-subnav-link">
                Logos
              </a>
              <a href="#" className="mobile-subnav-link">
                Navigation
              </a>
              <a href="#" className="mobile-subnav-link">
                Primitive Colours
              </a>
              <a href="#" className="mobile-subnav-link">
                Semantic Colours
              </a>
              <a href="#" className="mobile-subnav-link">
                Semantic Spacing
              </a>
              <a href="#" className="mobile-subnav-link">
                Typography
              </a>
            </div>
          </div>
          <button className="theme-toggle mobile-theme-toggle" aria-label="Toggle dark/light mode">
            <div className="toggle-switch">
              <div className="toggle-switch-track"></div>
              <div className="toggle-switch-thumb">
                <span className="material-symbols-outlined" style={{ fontSize: '14px', color: 'var(--action-bg-default)' }}>
                  check
                </span>
              </div>
            </div>
            <span className="theme-toggle-label">Dark Mode</span>
          </button>
        </div>
      </div>

      {/* DS Layout */}
      <div className="ds-layout">
        {/* Sidebar */}
        <aside className="ds-sidebar">
          <a href="/design-system" className="ds-sidebar-link active">
            About
          </a>
          <a href="#" className="ds-sidebar-link">
            Buttons
          </a>
          <a href="#" className="ds-sidebar-link">
            Icons
          </a>
          <a href="#" className="ds-sidebar-link">
            Logos
          </a>
          <a href="#" className="ds-sidebar-link">
            Navigation
          </a>
          <a href="#" className="ds-sidebar-link">
            Primitive Colours
          </a>
          <a href="#" className="ds-sidebar-link">
            Semantic Colours
          </a>
          <a href="#" className="ds-sidebar-link">
            Semantic Spacing
          </a>
          <a href="#" className="ds-sidebar-link">
            Typography
          </a>
        </aside>

        {/* Main Content */}
        <main className="ds-content" id="main-content">
          {/* Page Title */}
          <h1 className="page-title animate-in">robr0DS</h1>

          {/* Page Description */}
          <p className="type-sub-display animate-in animate-delay-1">
            This site is rendered directly from its own design system, exposing the tokens and structure used to build the UI itself.
          </p>

          {/* Tokens Section */}
          <section className="section animate-in animate-delay-2">
            <div className="section-header">
              <h2 className="section-title">Tokens</h2>
            </div>
            <p className="section-description">
              Tokens are the underlying values the site runs on. They are used everywhere layout, color, and type appear. Instead of styling elements directly, everything references these shared variables so changes propagate consistently. The same token structure exists in Figma and in code, allowing updates to flow through without reinterpreting intent.
            </p>

            <div className="toc-grid toc-grid-4">
              <a href="#" className="toc-card">
                <div className="toc-card-preview">
                  <div className="colour-wheel colour-wheel-mode"></div>
                </div>
                <h3 className="toc-card-title">Semantic Colours</h3>
              </a>

              <a href="#" className="toc-card">
                <div className="toc-card-preview">
                  <div className="colour-wheel"></div>
                </div>
                <h3 className="toc-card-title">Primitive Colours</h3>
              </a>

              <a href="#" className="toc-card">
                <div className="toc-card-preview">
                  <div className="toc-circle-preview toc-circle-green">
                    <div style={{ width: '60px', height: '50px', borderLeft: '1px solid var(--status-positive-border)', borderRight: '1px solid var(--status-positive-border)', borderRadius: '2px' }}></div>
                    <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>XXL</span>
                    <span style={{ fontSize: '16px', fontWeight: 400, color: 'var(--text-tertiary)' }}>60px</span>
                  </div>
                </div>
                <h3 className="toc-card-title">Semantic Spacing</h3>
              </a>

              <a href="#" className="toc-card">
                <div className="toc-card-preview">
                  <div className="toc-circle-preview toc-circle-blue">
                    <span style={{ fontSize: '64px', fontWeight: 300, color: 'var(--text-primary)', letterSpacing: '0.96px' }}>A</span>
                    <span style={{ fontSize: '96px', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '1.92px' }}>A</span>
                  </div>
                </div>
                <h3 className="toc-card-title">Typography</h3>
              </a>
            </div>
          </section>

          {/* Components Section */}
          <section className="section animate-in animate-delay-3">
            <div className="section-header">
              <h2 className="section-title">Components</h2>
            </div>
            <p className="section-description">
              Components are assembled from tokens and shared layout structures. When a pattern appears more than once, it becomes a reusable component instead of a custom layout. Each component reflects how it is actually implemented, including structure, constraints, and states. Layout primitives handle structure, while components handle interaction and composition.
            </p>

            <div className="toc-grid toc-grid-4">
              <a href="#" className="toc-card">
                <div className="toc-card-preview">
                  <div className="toc-circle-preview toc-circle-dashed" style={{ flexDirection: 'column', gap: '10px' }}>
                    <span className="btn btn-primary" style={{ fontSize: '16px', padding: '8px 16px', border: '2px solid var(--ui-secondary)' }}>Button</span>
                    <span className="btn btn-primary" style={{ fontSize: '16px', padding: '8px 16px', background: 'var(--action-bg-hover)', border: '1px solid var(--ui-secondary)' }}>Button</span>
                    <span className="btn btn-primary" style={{ fontSize: '16px', padding: '8px 16px', border: '2px solid var(--ui-secondary)', opacity: 0.4 }}>Button</span>
                  </div>
                </div>
                <h3 className="toc-card-title">Buttons</h3>
              </a>

              <a href="#" className="toc-card">
                <div className="toc-card-preview">
                  <div className="toc-circle-preview toc-circle-dashed" style={{ gap: '20px' }}>
                    <Image src="/rr.svg" alt="robr0" width={24} height={24} />
                    <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.16px' }}>robr0</span>
                  </div>
                </div>
                <h3 className="toc-card-title">Navigation</h3>
              </a>

              <a href="#" className="toc-card">
                <div className="toc-card-preview">
                  <div className="toc-circle-preview toc-circle-dashed" style={{ gap: '10px' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--text-secondary)' }}>home</span>
                    <span className="material-symbols-outlined icon-filled" style={{ fontSize: '48px', color: 'var(--text-secondary)' }}>home</span>
                  </div>
                </div>
                <h3 className="toc-card-title">Icons</h3>
              </a>

              <a href="#" className="toc-card">
                <div className="toc-card-preview">
                  <div className="toc-circle-preview toc-circle-dashed" style={{ gap: '10px' }}>
                    <Image src="/rr.svg" alt="robr0 Logo" width={48} height={48} />
                    <Image src="/rr.svg" alt="robr0 Logo" width={72} height={72} />
                  </div>
                </div>
                <h3 className="toc-card-title">Logos</h3>
              </a>
            </div>
          </section>

          {/* Story Section */}
          <section className="section animate-in animate-delay-4">
            <div className="ds-story-layout">
              {/* Story Content */}
              <div className="ds-story-content">
                <div className="content-section">
                  <div className="content-section-header">
                    <h3 className="content-section-title">Design to Code Workflow</h3>
                  </div>
                  <div className="content-section-body">
                    <p>
                      Design work flows directly into implementation. Layout structure, spacing, and variables are read from the design source and used to construct the UI without reinterpretation. Tokens become CSS custom properties. Components map to shared class structures. Layout behavior follows the same hierarchy defined in design. This keeps the rendered site aligned with the system it documents.
                    </p>
                  </div>
                </div>

                <div className="content-section">
                  <div className="content-section-header">
                    <h3 className="content-section-title">Outcome</h3>
                  </div>
                  <div className="content-section-body">
                    <p>This system is both the subject and the output. The site is built using the same tokens, components, and structures it documents, so the implementation reflects the decisions being described.</p>
                    <p>What this shows is how I approach system design in practice: defining clear layers, separating intent from implementation, and using constraints to make change predictable. Rather than treating design artifacts as static documentation, I treat them as inputs to a working system.</p>
                    <p>The goal is not polish or completeness, but clarity. To make the structure visible. To show how decisions connect across design and code. And to demonstrate how a small, well defined set of primitives can support real interfaces without becoming rigid or over abstracted.</p>
                  </div>
                </div>
              </div>

              {/* Tools Sidebar */}
              <div className="ds-story-sidebar">
                <h3 className="sidebar-title">Tools used</h3>
                <div className="tools-list">
                  <div className="tool-item">
                    <Image src="/logos/Figma.svg" alt="Figma" width={28} height={28} className="tool-logo" />
                    <div className="tool-details">
                      <span className="tool-name">Figma</span>
                      <span className="tool-desc">Design source of truth, MCP server and tokens (variable collections)</span>
                    </div>
                  </div>
                  <div className="tool-item">
                    <Image src="/logos/cursor.svg" alt="Cursor" width={28} height={28} className="tool-logo" />
                    <div className="tool-details">
                      <span className="tool-name">Cursor</span>
                      <span className="tool-desc">AI Agent and core development tool</span>
                    </div>
                  </div>
                  <div className="tool-item">
                    <Image src="/logos/ChatGPT.svg" alt="ChatGPT" width={28} height={28} className="tool-logo" />
                    <div className="tool-details">
                      <span className="tool-name">ChatGPT</span>
                      <span className="tool-desc">Content writing</span>
                    </div>
                  </div>
                  <div className="tool-item">
                    <Image src="/logos/Claude.svg" alt="Claude" width={28} height={28} className="tool-logo" />
                    <div className="tool-details">
                      <span className="tool-name">Claude Opus 4.5</span>
                      <span className="tool-desc">AI Model powering Cursor</span>
                    </div>
                  </div>
                  <div className="tool-item">
                    <Image src="/logos/Git.svg" alt="Git" width={28} height={28} className="tool-logo" />
                    <div className="tool-details">
                      <span className="tool-name">GitHub</span>
                      <span className="tool-desc">Version control and repository</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <p className="footer-text">© 2026 Robert Ritacca.</p>
        </div>
      </footer>
    </>
  );
}
