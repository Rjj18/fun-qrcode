/**
 * UI utilities for user interface interactions
 */

export class UIUtils {
    /**
     * Show loading state in a container
     * @param {HTMLElement} container - The container element
     */
    static showLoading(container) {
        container.innerHTML = '<div class="loading">🔄 Generating QR Code...</div>';
        
        // Add loading styles
        const loadingDiv = container.querySelector('.loading');
        loadingDiv.style.cssText = `
            font-size: 1.2rem;
            padding: 2rem;
            color: var(--text-secondary);
            animation: pulse 1.5s ease-in-out infinite;
        `;
    }

    /**
     * Show error message in a container
     * @param {HTMLElement} container - The container element
     * @param {string} message - The error message
     */
    static showError(container, message) {
        container.innerHTML = `<div class="error">❌ ${message}</div>`;
        
        // Add error styles
        const errorDiv = container.querySelector('.error');
        errorDiv.style.cssText = `
            color: var(--error-color);
            font-weight: 500;
            padding: 1rem;
            background: rgba(239, 68, 68, 0.1);
            border-radius: 8px;
        `;
    }

    /**
     * Show toast notification
     * @param {string} message - The message to display
     */
    static showToast(message) {
        // Create toast notification
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--text-primary);
            color: white;
            padding: 12px 24px;
            border-radius: 25px;
            font-weight: 500;
            z-index: 1000;
            animation: fadeInUp 0.3s ease;
        `;

        document.body.appendChild(toast);

        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                if (toast.parentNode) {
                    document.body.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }

    /**
     * Show result section with animation
     * @param {HTMLElement} resultSection - The result section element
     */
    static showResult(resultSection) {
        resultSection.classList.add('show');
    }

    /**
     * Initialize required CSS animations
     */
    static initializeAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }
            
            @keyframes fadeOut {
                from { opacity: 1; transform: translateX(-50%) translateY(0); }
                to { opacity: 0; transform: translateX(-50%) translateY(10px); }
            }
        `;
        document.head.appendChild(style);
    }
}
