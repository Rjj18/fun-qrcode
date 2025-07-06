/**
 * Main application entry point
 * Initializes the Fun QRCode application
 */

import { QRCodeGenerator } from './js/qrcode-generator.js';

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new QRCodeGenerator();
});

// Also try immediate initialization if DOM is already ready
if (document.readyState !== 'loading') {
    new QRCodeGenerator();
}

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Use relative path for GitHub Pages compatibility
        const swPath = './sw.js';
        navigator.serviceWorker.register(swPath)
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
