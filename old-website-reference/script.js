/**
 * robr0DS v2 - Theme Toggle & Sticky Header Script
 * Handles dark/light mode switching, persistence, and sticky header visibility
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ============================================
    // COLOUR SWATCH AUTO-CONTRAST (colour.html only)
    // ============================================
    
    /**
     * Calculate relative luminance of a color
     * @param {number} r - Red (0-255)
     * @param {number} g - Green (0-255)
     * @param {number} b - Blue (0-255)
     * @returns {number} Relative luminance (0-1)
     */
    function getLuminance(r, g, b) {
        const [rs, gs, bs] = [r, g, b].map(function(c) {
            c = c / 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    }
    
    /**
     * Parse RGB/RGBA color string to components
     * @param {string} colorStr - CSS color string (rgb/rgba format)
     * @returns {object|null} {r, g, b} or null if unparseable
     */
    function parseRGB(colorStr) {
        const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (match) {
            return {
                r: parseInt(match[1], 10),
                g: parseInt(match[2], 10),
                b: parseInt(match[3], 10)
            };
        }
        return null;
    }
    
    /**
     * Update swatch title colors for maximum contrast
     * Runs on page load and theme change
     */
    function updateSwatchContrast() {
        const swatches = document.querySelectorAll('.colour-swatch');
        if (swatches.length === 0) return; // Not on colour.html
        
        swatches.forEach(function(swatch) {
            const title = swatch.querySelector('.swatch-title');
            if (!title) return;
            
            // Get computed background color (resolves CSS variables)
            const bgColor = window.getComputedStyle(swatch).backgroundColor;
            const rgb = parseRGB(bgColor);
            
            if (rgb) {
                const luminance = getLuminance(rgb.r, rgb.g, rgb.b);
                // Use white text on dark backgrounds, dark text on light backgrounds
                // Threshold of 0.179 is based on WCAG contrast ratio calculations
                title.style.color = luminance > 0.179 ? '#050505' : '#ffffff';
            }
        });
    }
    
    // Run on page load (after a tiny delay to ensure CSS variables are computed)
    setTimeout(updateSwatchContrast, 10);

    // ============================================
    // DYNAMIC SWATCH VALUES (colour-mode.html)
    // ============================================
    
    /**
     * Update swatch values based on current theme
     * Swaps between dark/light values stored in data attributes
     */
    function updateSwatchValues() {
        const swatchValues = document.querySelectorAll('.swatch-value[data-dark]');
        if (swatchValues.length === 0) return; // Not on colour-mode.html
        
        const isLightMode = document.documentElement.getAttribute('data-theme') === 'light';
        
        swatchValues.forEach(function(valueEl) {
            const darkValue = valueEl.getAttribute('data-dark');
            const lightValue = valueEl.getAttribute('data-light');
            
            // Use appropriate value based on theme, fallback to dark if no light value
            valueEl.textContent = isLightMode ? (lightValue || darkValue) : darkValue;
        });
    }
    
    // Run on page load
    setTimeout(updateSwatchValues, 10);

    // ============================================
    // THEME TOGGLE FUNCTIONALITY
    // ============================================
    
    function updateAllThemeLabels(themeName) {
        document.querySelectorAll('.theme-toggle-label').forEach(function(label) {
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
        
        // Re-calculate swatch contrast and values after theme change
        setTimeout(updateSwatchContrast, 10);
        setTimeout(updateSwatchValues, 10);
    }
    
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply saved theme on load
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        updateAllThemeLabels('light');
    }
    
    // Attach click handlers to all theme toggles
    document.querySelectorAll('.theme-toggle').forEach(function(toggle) {
        toggle.addEventListener('click', toggleTheme);
    });

    // ============================================
    // STICKY HEADER FUNCTIONALITY
    // ============================================
    
    const stickyHeader = document.getElementById('stickyHeader');
    const nav = document.querySelector('.nav');
    
    if (stickyHeader && nav) {
        function checkStickyVisibility() {
            // Get the nav's position relative to the viewport
            const navBottom = nav.getBoundingClientRect().bottom;
            
            // Show sticky header when the main nav is scrolled off screen
            if (navBottom <= 0) {
                stickyHeader.classList.add('visible');
            } else {
                stickyHeader.classList.remove('visible');
            }
        }
        
        // Check initial scroll position
        checkStickyVisibility();
        
        // Throttle scroll events for better performance
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    checkStickyVisibility();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // ============================================
    // MOBILE MENU FUNCTIONALITY
    // ============================================
    
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    
    if (mobileMenuBtn && mobileMenuOverlay) {
        function openMobileMenu() {
            mobileMenuOverlay.classList.add('open');
            document.body.classList.add('mobile-menu-open');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
        
        function closeMobileMenu() {
            mobileMenuOverlay.classList.remove('open');
            document.body.classList.remove('mobile-menu-open');
            document.body.style.overflow = ''; // Restore scrolling
        }
        
        function toggleMobileMenu() {
            if (mobileMenuOverlay.classList.contains('open')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        }
        
        // Toggle mobile menu via hamburger/X button
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        
        // Close mobile menu via overlay click (outside the menu)
        mobileMenuOverlay.addEventListener('click', function(e) {
            // Only close if clicking directly on overlay, not on menu content
            if (e.target === mobileMenuOverlay) {
                closeMobileMenu();
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('open')) {
                closeMobileMenu();
            }
        });
    }
});

