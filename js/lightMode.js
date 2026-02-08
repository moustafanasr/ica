// Force Light Mode Always - Extreme Version
(function() {
    'use strict';
    
    // Create and inject CSS immediately
    const lightModeCSS = `
        /* FORCE LIGHT MODE - NO DARK MODE ALLOWED */
        html {
            color-scheme: light only !important;
            forced-color-adjust: none !important;
        }
        
        body {
            color-scheme: light only !important;
            background: linear-gradient(135deg, #F8F2E9 0%, #F3E8DD 50%, #EFE0D2 100%) !important;
            color: #2B2320 !important;
        }
        
        /* Override ALL dark mode system preferences */
        @media (prefers-color-scheme: dark) {
            html {
                color-scheme: light only !important;
            }
            
            body {
                background: linear-gradient(135deg, #F8F2E9 0%, #F3E8DD 50%, #EFE0D2 100%) !important;
                color: #2B2320 !important;
            }
            
            * {
                background-color: transparent !important;
                color: inherit !important;
            }
            
            .navbar {
                background: rgba(255, 255, 255, 0.98) !important;
                backdrop-filter: blur(10px) !important;
            }
            
            .hero-card, .feature-card, .program-card, 
            .testimonial-card, .stat-card, 
            .accreditation-section, .swiper-slider-container {
                background: rgba(255, 255, 255, 0.85) !important;
                border: 1px solid rgba(120, 90, 60, .25) !important;
            }
            
            .footer {
                background: linear-gradient(135deg, #2B2320 0%, #3A302C 100%) !important;
            }
        }
        
        /* Direct style overrides for elements */
        h1, h2, h3, h4, h5, h6 {
            color: #2B2320 !important;
        }
        
        p, span, a, li, div {
            color: #2B2320 !important;
        }
        
        /* Remove any dark mode visual effects */
        .dark-mode, [data-theme="dark"], .theme-dark, .dark,
        [class*="dark"], [class*="night"], [class*="black"] {
            background-color: transparent !important;
            color: inherit !important;
        }
        
        /* Force specific element colors */
        input, textarea, select, button {
            background-color: white !important;
            color: #2B2320 !important;
            border-color: #E0E0E0 !important;
        }
    `;
    
    // Inject CSS immediately
    const style = document.createElement('style');
    style.id = 'force-light-mode-forever';
    style.textContent = lightModeCSS;
    document.head.appendChild(style);
    
    // Set meta tags immediately
    function setMetaTags() {
        // Remove existing meta tags
        document.querySelectorAll('meta[name="theme-color"], meta[name="color-scheme"], meta[name="supported-color-schemes"]').forEach(meta => meta.remove());
        
        // Create new meta tags
        const themeColor = document.createElement('meta');
        themeColor.name = 'theme-color';
        themeColor.content = '#F3E8DD';
        document.head.appendChild(themeColor);
        
        const colorScheme = document.createElement('meta');
        colorScheme.name = 'color-scheme';
        colorScheme.content = 'light';
        document.head.appendChild(colorScheme);
        
        const supportedColors = document.createElement('meta');
        supportedColors.name = 'supported-color-schemes';
        supportedColors.content = 'light';
        document.head.appendChild(supportedColors);
    }
    
    // Set HTML attributes
    function setHTMLAttributes() {
        document.documentElement.setAttribute('data-theme', 'light');
        document.documentElement.setAttribute('color-scheme', 'light');
        document.documentElement.removeAttribute('data-darkreader-scheme');
        document.documentElement.removeAttribute('data-darkreader-mode');
    }
    
    // Override CSS variables
    function overrideCSSVariables() {
        const root = document.documentElement;
        
        // Force original light mode variables
        const lightVars = {
            '--bg': '#F3E8DD',
            '--ink': '#2B2320',
            '--muted': '#6A5B52',
            '--gold': '#B9924A',
            '--gold-light': '#E7D2A3',
            '--gold-dark': '#8B6A2B',
            '--stroke': 'rgba(120, 90, 60, .25)',
            '--card': 'rgba(255, 255, 255, .85)',
            '--shadow': '0 20px 40px rgba(0, 0, 0, .1)',
            '--shadow-hover': '0 30px 60px rgba(0, 0, 0, .15)'
        };
        
        Object.entries(lightVars).forEach(([key, value]) => {
            root.style.setProperty(key, value, 'important');
        });
    }
    
    // Remove dark mode classes
    function removeDarkClasses() {
        // From document elements
        document.documentElement.classList.remove('dark', 'dark-mode', 'theme-dark');
        document.body.classList.remove('dark', 'dark-mode', 'theme-dark');
        
        // From all elements
        document.querySelectorAll('*').forEach(el => {
            if (el.classList.contains('dark') || 
                el.classList.contains('dark-mode') || 
                el.classList.contains('theme-dark')) {
                el.classList.remove('dark', 'dark-mode', 'theme-dark');
                el.classList.add('light-mode');
            }
        });
    }
    
    // Initialize everything immediately
    function initForceLightMode() {
        setMetaTags();
        setHTMLAttributes();
        overrideCSSVariables();
        removeDarkClasses();
        
        // Force background colors
        document.body.style.backgroundColor = '#F3E8DD';
        document.body.style.color = '#2B2320';
        
        // Remove any dark reader attributes
        document.querySelectorAll('[data-darkreader-inline-bgcolor], [data-darkreader-inline-color]').forEach(el => {
            el.removeAttribute('data-darkreader-inline-bgcolor');
            el.removeAttribute('data-darkreader-inline-color');
            el.removeAttribute('data-darkreader-inline-border');
            el.removeAttribute('data-darkreader-inline-outline');
        });
        
        console.log('Light mode forced - No dark mode allowed');
    }
    
    // Run immediately
    initForceLightMode();
    
    // Run on DOMContentLoaded
    document.addEventListener('DOMContentLoaded', initForceLightMode);
    
    // Run on load
    window.addEventListener('load', initForceLightMode);
    
    // Run after a short delay to catch late changes
    setTimeout(initForceLightMode, 100);
    setTimeout(initForceLightMode, 500);
    setTimeout(initForceLightMode, 1000);
    setTimeout(initForceLightMode, 3000);
    
    // Continuous monitoring
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            // Check for attribute changes
            if (mutation.type === 'attributes') {
                const target = mutation.target;
                if (target.hasAttribute('data-theme') && target.getAttribute('data-theme') === 'dark') {
                    target.setAttribute('data-theme', 'light');
                }
                if (target.hasAttribute('class') && 
                    (target.classList.contains('dark') || 
                     target.classList.contains('dark-mode') || 
                     target.classList.contains('theme-dark'))) {
                    target.classList.remove('dark', 'dark-mode', 'theme-dark');
                    target.classList.add('light-mode');
                }
            }
            
            // Check for added nodes with dark classes
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) { // Element node
                        if (node.classList && 
                            (node.classList.contains('dark') || 
                             node.classList.contains('dark-mode') || 
                             node.classList.contains('theme-dark'))) {
                            node.classList.remove('dark', 'dark-mode', 'theme-dark');
                            node.classList.add('light-mode');
                        }
                        
                        // Check children
                        node.querySelectorAll('.dark, .dark-mode, .theme-dark').forEach(child => {
                            child.classList.remove('dark', 'dark-mode', 'theme-dark');
                            child.classList.add('light-mode');
                        });
                    }
                });
            }
        });
        
        // Re-apply forced light mode
        initForceLightMode();
    });
    
    // Start observing
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class', 'data-theme', 'style', 'data-darkreader-*'],
        childList: true,
        subtree: true
    });
    
    // Periodic enforcement
    setInterval(initForceLightMode, 10000);
    
    // Intercept and block dark mode extensions
    Object.defineProperty(document.documentElement, 'style', {
        get: function() {
            return this._style || CSSStyleDeclaration.prototype;
        },
        set: function(value) {
            // Prevent dark mode styles
            if (value && typeof value === 'string' && value.includes('dark')) {
                return;
            }
            this._style = value;
        }
    });
    
    // Block dark reader extension
    if (window.DarkReader) {
        window.DarkReader.disable();
    }
    
    // Add global function to disable any dark mode
    window.forceLightMode = initForceLightMode;
    
})();

// Add this to your existing CSS to reinforce light mode
const additionalCSS = `
/* Add this to your existing style tag or CSS file */
html:not([data-theme="light"]) {
    data-theme: light !important;
}

body:not([style*="background-color: #F3E8DD"]) {
    background-color: #F3E8DD !important;
    background: linear-gradient(135deg, #F8F2E9 0%, #F3E8DD 50%, #EFE0D2 100%) !important;
}

/* Direct element targeting for common dark mode issues */
[style*="background-color: rgb(18, 18, 18)"],
[style*="background-color: #121212"],
[style*="background-color: rgba(18, 18, 18"],
[style*="color: rgb(224, 224, 224)"],
[style*="color: #E0E0E0"] {
    background-color: #F3E8DD !important;
    color: #2B2320 !important;
}

/* Override browser's auto dark mode */
@media (prefers-color-scheme: dark) {
    :root {
        --light-bg: #F3E8DD !important;
        --light-text: #2B2320 !important;
    }
    
    body, div, section, article, header, footer, nav, main, aside {
        background-color: var(--light-bg) !important;
        color: var(--light-text) !important;
    }
    
    /* Force all text colors */
    h1, h2, h3, h4, h5, h6, p, span, a, li, td, th, label, caption {
        color: var(--light-text) !important;
    }
    
    /* Force all backgrounds */
    .container, .card, .box, .panel, .modal, .dialog, .popup {
        background-color: white !important;
    }
}

/* Kill dark mode transitions */
* {
    transition: none !important;
}
`;

// Add the CSS to the document
document.addEventListener('DOMContentLoaded', function() {
    const extraStyle = document.createElement('style');
    extraStyle.id = 'kill-dark-mode-css';
    extraStyle.textContent = additionalCSS;
    document.head.appendChild(extraStyle);
});

// Run immediately and multiple times to ensure it works
(function runImmediately() {
    // Force immediate execution
    document.documentElement.style.colorScheme = 'light';
    document.body.style.colorScheme = 'light';
    document.body.classList.remove('dark-mode', 'dark');
    document.body.classList.add('light-mode');
    
    // Repeat to ensure execution
    setTimeout(runImmediately, 50);
    setTimeout(runImmediately, 200);
})();