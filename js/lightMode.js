// Anti-Dark Mode Extension - Optimized to prevent page reloads
(function() {
    'use strict';
    
    // Track if we're currently processing to prevent loops
    let isProcessing = false;
    
    // =============================================
    // PART 1: LIGHT MODE ENFORCING CSS
    // =============================================
    
    // Inject CSS once - don't re-inject
    if (!document.getElementById('force-light-mode-css')) {
        const lightModeCSS = `
            /* BLOCK ALL DARK MODE EXTENSIONS - ONE TIME INJECTION */
            html, body, :root {
                color-scheme: light only !important;
                forced-color-adjust: none !important;
            }
            
            /* Remove dark reader effects */
            [data-darkreader-inline-bgcolor] { background-color: revert !important; }
            [data-darkreader-inline-bgimage] { background-image: revert !important; }
            [data-darkreader-inline-border] { border-color: revert !important; }
            [data-darkreader-inline-color] { color: revert !important; }
            [data-darkreader-inline-fill] { fill: revert !important; }
            [data-darkreader-inline-stroke] { stroke: revert !important; }
            [data-darkreader-inline-outline] { outline-color: revert !important; }
            [data-darkreader-inline-boxshadow] { box-shadow: revert !important; }
            [data-darkreader-inline-invert] { filter: none !important; }
            
            /* Hide dark reader style elements */
            .darkreader,
            .darkreader--inline,
            .darkreader--override,
            .darkreader--sync,
            .darkreader--text,
            .darkreader--user-agent,
            .darkreader--fallback {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
            }
            
            /* Force your original colors */
            body {
                background: linear-gradient(135deg, #F8F2E9 0%, #F3E8DD 50%, #EFE0D2 100%) !important;
                color: #2B2320 !important;
            }
            
            .navbar {
                background: rgba(255, 255, 255, 0.98) !important;
            }
            
            .hero-card, .feature-card, .program-card, 
            .testimonial-card, .stat-card, 
            .accreditation-section, .swiper-slider-container {
                background: rgba(255, 255, 255, 0.85) !important;
                border: 1px solid rgba(120, 90, 60, .25) !important;
            }
            
            /* Ensure text colors stay light */
            h1, h2, h3, h4, h5, h6,
            p, span, a, li, div, section, article {
                color: #2B2320 !important;
            }
        `;
        
        const style = document.createElement('style');
        style.id = 'force-light-mode-css';
        style.textContent = lightModeCSS;
        document.head.appendChild(style);
    }
    
    // =============================================
    // PART 2: SAFE ATTRIBUTE REMOVAL
    // =============================================
    
    function safeRemoveDarkAttributes() {
        if (isProcessing) return;
        isProcessing = true;
        
        try {
            // Remove dark attributes from HTML
            const html = document.documentElement;
            const attrsToRemove = [
                'data-darkreader-scheme',
                'data-darkreader-mode', 
                'data-darkreader-proxy-injected',
                'data-theme'
            ];
            
            attrsToRemove.forEach(attr => {
                if (html.hasAttribute(attr)) {
                    html.removeAttribute(attr);
                }
            });
            
            // Set light theme
            html.setAttribute('data-theme', 'light');
            html.setAttribute('color-scheme', 'light');
            
            // Remove dark classes from body
            document.body.classList.remove('dark', 'dark-mode', 'theme-dark');
            
            // Remove darkreader inline attributes (limited scope for performance)
            const elementsToClean = document.querySelectorAll(`
                [data-darkreader-inline-bgcolor],
                [data-darkreader-inline-color],
                [data-darkreader-inline-border],
                .darkreader
            `);
            
            // Process in small batches to prevent hangs
            const batchSize = 50;
            for (let i = 0; i < elementsToClean.length; i += batchSize) {
                const batch = Array.from(elementsToClean).slice(i, i + batchSize);
                batch.forEach(el => {
                    // Remove darkreader attributes
                    Array.from(el.attributes).forEach(attr => {
                        if (attr.name.includes('darkreader')) {
                            el.removeAttribute(attr.name);
                        }
                    });
                    
                    // Remove darkreader classes
                    if (el.classList) {
                        el.classList.remove('darkreader', 'darkreader--inline', 
                                          'darkreader--override', 'darkreader--sync');
                    }
                });
            }
            
            // Remove darkreader style elements
            document.querySelectorAll('style.darkreader, link[rel="stylesheet"].darkreader').forEach(el => {
                try { el.remove(); } catch(e) {}
            });
            
        } catch (error) {
            console.error('Error in dark mode cleanup:', error);
        } finally {
            isProcessing = false;
        }
    }
    
    // =============================================
    // PART 3: SAFE MUTATION OBSERVER
    // =============================================
    
    let observer;
    let observerTimeout;
    
    function initSafeObserver() {
        if (observer) observer.disconnect();
        
        observer = new MutationObserver(function(mutations) {
            // Debounce observer calls
            clearTimeout(observerTimeout);
            observerTimeout = setTimeout(() => {
                let needsCleanup = false;
                
                // Quick check if darkreader elements were added
                for (let mutation of mutations) {
                    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                        for (let node of mutation.addedNodes) {
                            if (node.nodeType === 1) {
                                if (node.classList && node.classList.contains('darkreader') ||
                                    node.tagName === 'STYLE' && node.textContent.includes('darkreader') ||
                                    node.hasAttribute && node.hasAttribute('data-darkreader-inline-')) {
                                    needsCleanup = true;
                                    break;
                                }
                            }
                        }
                    }
                    
                    if (mutation.type === 'attributes') {
                        const attrName = mutation.attributeName;
                        if (attrName && attrName.includes('darkreader')) {
                            needsCleanup = true;
                        }
                    }
                    
                    if (needsCleanup) break;
                }
                
                if (needsCleanup && !isProcessing) {
                    safeRemoveDarkAttributes();
                }
            }, 100); // 100ms debounce
        });
        
        // Observe only specific parts to reduce performance impact
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class', 'data-theme', 'data-darkreader-*'],
            childList: true,
            subtree: false // Don't observe entire subtree
        });
        
        observer.observe(document.head, {
            childList: true,
            subtree: false
        });
    }
    
    // =============================================
    // PART 4: INITIALIZATION WITH DEBOUNCE
    // =============================================
    
    function initializeLightMode() {
        // Run once immediately
        safeRemoveDarkAttributes();
        
        // Initialize observer after a delay
        setTimeout(initSafeObserver, 1000);
        
        // Periodic cleanup with longer intervals
        setInterval(() => {
            if (!isProcessing) {
                safeRemoveDarkAttributes();
            }
        }, 5000); // Every 5 seconds
        
        console.log('Light mode enforcer initialized');
    }
    
    // =============================================
    // PART 5: SAFE EVENT HANDLERS
    // =============================================
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(initializeLightMode, 100);
        });
    } else {
        setTimeout(initializeLightMode, 100);
    }
    
    // Also run on window load
    window.addEventListener('load', () => {
        setTimeout(safeRemoveDarkAttributes, 500);
    });
    
})();

// Minimal additional protection without causing reloads
(function minimalProtection() {
    'use strict';
    
    // Just set meta tags and basic attributes once
    function setLightMetaTags() {
        // Set theme color to light
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.content = '#F3E8DD';
        } else {
            const meta = document.createElement('meta');
            meta.name = 'theme-color';
            meta.content = '#F3E8DD';
            document.head.appendChild(meta);
        }
        
        // Set color scheme
        const metaColorScheme = document.querySelector('meta[name="color-scheme"]');
        if (metaColorScheme) {
            metaColorScheme.content = 'light';
        } else {
            const meta = document.createElement('meta');
            meta.name = 'color-scheme';
            meta.content = 'light';
            document.head.appendChild(meta);
        }
        
        // Set HTML attributes
        document.documentElement.setAttribute('data-theme', 'light');
        document.documentElement.setAttribute('color-scheme', 'light');
    }
    
    // Run once with delay
    setTimeout(setLightMetaTags, 50);
    
    // Also run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setLightMetaTags);
    }
})();