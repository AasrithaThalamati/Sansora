/* ========================================
   SANSORA DARK MODE THEME SCRIPT
   Save this as: theme.js
   ======================================== */

(function() {
    'use strict';

    // Get DOM elements
    const html = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');

    // Load saved theme from localStorage or default to light
    const savedTheme = localStorage.getItem('sansora-theme') || 'light';
    
    // Apply theme on page load
    setTheme(savedTheme, false);

    // Add click event listener to toggle button
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    /**
     * Toggle between light and dark themes
     */
    function toggleTheme() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme, true);
        
        // Save preference to localStorage
        localStorage.setItem('sansora-theme', newTheme);
        
        // Optional: Send analytics event
        trackThemeChange(newTheme);
    }

    /**
     * Set the theme
     * @param {string} theme - 'light' or 'dark'
     * @param {boolean} animate - whether to animate the transition
     */
    function setTheme(theme, animate = true) {
        if (theme === 'dark') {
            html.setAttribute('data-theme', 'dark');
            updateThemeIcon('☀️', 'Switch to light mode');
        } else {
            html.removeAttribute('data-theme');
            updateThemeIcon('🌙', 'Switch to dark mode');
        }

        // Add a class for animation if needed
        if (animate) {
            html.classList.add('theme-transitioning');
            setTimeout(() => {
                html.classList.remove('theme-transitioning');
            }, 300);
        }
    }

    /**
     * Update the theme toggle icon
     * @param {string} icon - emoji or text for icon
     * @param {string} ariaLabel - accessibility label
     */
    function updateThemeIcon(icon, ariaLabel) {
        if (themeIcon) {
            themeIcon.textContent = icon;
        }
        if (themeToggle) {
            themeToggle.setAttribute('aria-label', ariaLabel);
            themeToggle.setAttribute('title', ariaLabel);
        }
    }

    /**
     * Get current theme
     * @returns {string} 'light' or 'dark'
     */
    function getCurrentTheme() {
        return html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    }

    /**
     * Track theme changes (optional analytics)
     * @param {string} theme - the new theme
     */
    function trackThemeChange(theme) {
        // You can add your analytics tracking here
        // Example: Google Analytics
        // if (typeof gtag !== 'undefined') {
        //     gtag('event', 'theme_change', {
        //         'theme': theme
        //     });
        // }
        
        console.log('Theme changed to:', theme);
    }

    /**
     * Detect system preference (optional feature)
     */
    function detectSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    /**
     * Listen for system theme changes (optional feature)
     */
    function watchSystemTheme() {
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            // Modern browsers
            if (mediaQuery.addEventListener) {
                mediaQuery.addEventListener('change', (e) => {
                    // Only auto-switch if user hasn't set a preference
                    if (!localStorage.getItem('sansora-theme')) {
                        setTheme(e.matches ? 'dark' : 'light', true);
                    }
                });
            }
            // Older browsers
            else if (mediaQuery.addListener) {
                mediaQuery.addListener((e) => {
                    if (!localStorage.getItem('sansora-theme')) {
                        setTheme(e.matches ? 'dark' : 'light', true);
                    }
                });
            }
        }
    }

    // Optional: Automatically detect and apply system theme if no preference saved
    if (!localStorage.getItem('sansora-theme')) {
        const systemTheme = detectSystemTheme();
        setTheme(systemTheme, false);
    }

    // Optional: Watch for system theme changes
    // Uncomment the line below to enable automatic theme switching based on system preference
    // watchSystemTheme();

    // Expose API for programmatic theme control (optional)
    window.SansoraTheme = {
        get: getCurrentTheme,
        set: setTheme,
        toggle: toggleTheme
    };

    // Keyboard shortcut (optional): Ctrl+Shift+T to toggle theme
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'T') {
            e.preventDefault();
            toggleTheme();
        }
    });

})();