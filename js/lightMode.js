// Force Light Mode Always - Remove All Dark Mode Effects
document.addEventListener('DOMContentLoaded', function() {
    // 1. Force light mode on body
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
    
    // 2. Set meta tags to force light mode
    function forceLightModeMetaTags() {
        // Remove any existing theme-color meta
        const existingThemeColor = document.querySelector('meta[name="theme-color"]');
        if (existingThemeColor) {
            existingThemeColor.remove();
        }
        
        // Remove any color-scheme meta
        const existingColorScheme = document.querySelector('meta[name="color-scheme"]');
        if (existingColorScheme) {
            existingColorScheme.remove();
        }
        
        // Remove supported-color-schemes meta
        const existingSupportedColors = document.querySelector('meta[name="supported-color-schemes"]');
        if (existingSupportedColors) {
            existingSupportedColors.remove();
        }
        
        // Add meta to force light mode
        const metaThemeColor = document.createElement('meta');
        metaThemeColor.name = 'theme-color';
        metaThemeColor.content = '#F3E8DD'; // Your light background color
        document.head.appendChild(metaThemeColor);
        
        // Force color-scheme to light only
        const metaColorScheme = document.createElement('meta');
        metaColorScheme.name = 'color-scheme';
        metaColorScheme.content = 'light only';
        document.head.appendChild(metaColorScheme);
        
        // Add meta to specify light mode only
        const metaSupportedColors = document.createElement('meta');
        metaSupportedColors.name = 'supported-color-schemes';
        metaSupportedColors.content = 'light';
        document.head.appendChild(metaSupportedColors);
    }
    
    // 3. Apply CSS to force light mode
    function forceLightModeCSS() {
        // Remove any dark mode styles
        const darkModeStyles = document.getElementById('dark-mode-styles');
        if (darkModeStyles) {
            darkModeStyles.remove();
        }
        
        // Add light mode enforcing styles
        const lightModeStyles = document.createElement('style');
        lightModeStyles.id = 'force-light-mode-styles';
        lightModeStyles.textContent = `
            /* Force light mode on all elements */
            :root, body, html, * {
                color-scheme: light !important;
                forced-color-adjust: none !important;
            }
            
            /* Override any system dark mode */
            @media (prefers-color-scheme: dark) {
                :root, body, html, * {
                    color-scheme: light !important;
                }
                
                /* Force light colors */
                body {
                    background: linear-gradient(135deg, #F8F2E9 0%, #F3E8DD 50%, #EFE0D2 100%) !important;
                    color: var(--ink) !important;
                }
                
                /* Ensure all text is visible */
                h1, h2, h3, h4, h5, h6, p, span, a, div, li {
                    color: var(--ink) !important;
                }
                
                /* Force card backgrounds */
                .hero-card, .feature-card, .program-card, .testimonial-card,
                .stat-card, .swiper-slider-container, .accreditation-section {
                    background: var(--card) !important;
                    border: 1px solid var(--stroke) !important;
                }
                
                /* Force navbar light */
                .navbar {
                    background: rgba(255, 255, 255, 0.98) !important;
                }
                
                /* Force footer light */
                .footer {
                    background: linear-gradient(135deg, #2B2320 0%, #3A302C 100%) !important;
                }
            }
            
            /* Remove any dark mode classes */
            .dark-mode, [data-theme="dark"], .theme-dark, .dark {
                display: none !important;
            }
            
            /* Force specific elements that might get dark from browser */
            input, textarea, select {
                background-color: white !important;
                color: #2B2320 !important;
                border-color: #E0E0E0 !important;
            }
            
            /* Remove any dark mode transitions */
            * {
                color-scheme: light only !important;
            }
        `;
        document.head.appendChild(lightModeStyles);
    }
    
    // 4. Remove any dark mode toggle buttons
    function removeDarkModeToggles() {
        // Remove dark mode toggle button
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        if (darkModeToggle) {
            darkModeToggle.remove();
        }
        
        // Remove any elements with dark mode classes
        document.querySelectorAll('.dark-mode-toggle, .theme-switcher, .mode-switch').forEach(el => {
            el.remove();
        });
    }
    
    // 5. Set CSS custom properties to light mode values
    function forceLightCustomProperties() {
        const root = document.documentElement;
        
        // Force light mode CSS variables
        root.style.setProperty('--bg', '#F3E8DD', 'important');
        root.style.setProperty('--ink', '#2B2320', 'important');
        root.style.setProperty('--muted', '#6A5B52', 'important');
        root.style.setProperty('--gold', '#B9924A', 'important');
        root.style.setProperty('--gold-light', '#E7D2A3', 'important');
        root.style.setProperty('--gold-dark', '#8B6A2B', 'important');
        root.style.setProperty('--stroke', 'rgba(120, 90, 60, .25)', 'important');
        root.style.setProperty('--card', 'rgba(255, 255, 255, .85)', 'important');
        root.style.setProperty('--shadow', '0 20px 40px rgba(0, 0, 0, .1)', 'important');
        root.style.setProperty('--shadow-hover', '0 30px 60px rgba(0, 0, 0, .15)', 'important');
    }
    
    // 6. Monitor for any attempts to change to dark mode
    function monitorDarkModeAttempts() {
        // Override matchMedia to always return light
        const originalMatchMedia = window.matchMedia;
        window.matchMedia = function(media) {
            if (media.includes('prefers-color-scheme')) {
                // Always return light mode
                const fakeMedia = {
                    matches: media.includes('light') ? true : false,
                    media: media,
                    addListener: () => {},
                    removeListener: () => {},
                    addEventListener: () => {},
                    removeEventListener: () => {},
                    dispatchEvent: () => true
                };
                return fakeMedia;
            }
            return originalMatchMedia.call(window, media);
        };
    }
    
    // 7. Remove dark mode from localStorage
    function clearDarkModeStorage() {
        localStorage.removeItem('darkMode');
        localStorage.removeItem('theme');
        localStorage.removeItem('color-theme');
        sessionStorage.removeItem('darkMode');
        sessionStorage.removeItem('theme');
    }
    
    // 8. Execute all functions
    forceLightModeMetaTags();
    forceLightModeCSS();
    removeDarkModeToggles();
    forceLightCustomProperties();
    monitorDarkModeAttempts();
    clearDarkModeStorage();
    
    // 9. Add a mutation observer to catch any dynamic changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                // Remove dark mode classes if added
                if (mutation.target.classList.contains('dark-mode') || 
                    mutation.target.classList.contains('dark') ||
                    mutation.target.classList.contains('theme-dark')) {
                    mutation.target.classList.remove('dark-mode', 'dark', 'theme-dark');
                    mutation.target.classList.add('light-mode');
                }
            }
            
            // Check for any dark mode style elements
            document.querySelectorAll('style, link[rel="stylesheet"]').forEach(el => {
                if (el.textContent.includes('dark-mode') || 
                    el.textContent.includes('@media (prefers-color-scheme: dark)') ||
                    el.href && el.href.includes('dark')) {
                    console.log('Removing dark mode styles');
                    el.remove();
                }
            });
        });
    });
    
    // Start observing
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
        childList: true,
        subtree: true
    });
    
    // 10. Periodic check to ensure light mode
    setInterval(() => {
        // Check and remove dark mode classes
        document.body.classList.remove('dark-mode', 'dark', 'theme-dark');
        document.body.classList.add('light-mode');
        
        // Ensure meta tags are correct
        forceLightModeMetaTags();
        
        // Force CSS variables
        forceLightCustomProperties();
    }, 5000); // Check every 5 seconds
    
    console.log('Website forced to always use light mode. Dark mode has been disabled.');
});

// Additional script to run on window load
window.addEventListener('load', function() {
    // Double-check everything is light mode
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
    
    // Set HTML attribute for light mode
    document.documentElement.setAttribute('data-theme', 'light');
    document.documentElement.setAttribute('color-scheme', 'light');
    
    // Force light scrollbars
    document.documentElement.style.scrollbarColor = '#B9924A #F3E8DD';
    
    // Remove any dark mode stylesheets
    document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
        if (link.href.includes('dark') || link.href.includes('night')) {
            link.remove();
        }
    });
});