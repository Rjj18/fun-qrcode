// QRCode generation utility using a free API service
class QRCodeGenerator {
    constructor() {
        this.currentTheme = 'classic';
        this.currentQRCode = null;
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        const form = document.getElementById('qrForm');
        const themeButtons = document.querySelectorAll('.theme-btn');
        const downloadBtn = document.getElementById('downloadBtn');
        const shareBtn = document.getElementById('shareBtn');

        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.generateQRCode();
        });

        // Theme selection
        themeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.selectTheme(btn);
            });
        });

        // Download functionality
        downloadBtn.addEventListener('click', () => {
            this.downloadQRCode();
        });

        // Share functionality
        shareBtn.addEventListener('click', () => {
            this.shareQRCode();
        });
    }

    selectTheme(selectedBtn) {
        // Remove active class from all buttons
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Add active class to selected button
        selectedBtn.classList.add('active');
        this.currentTheme = selectedBtn.dataset.theme;

        // If QR code exists, regenerate with new theme
        if (this.currentQRCode) {
            this.generateQRCode();
        }
    }

    async generateQRCode() {
        const urlInput = document.getElementById('urlInput');
        const url = urlInput.value.trim();

        if (!url) {
            this.showError('Please enter a valid URL');
            return;
        }

        if (!this.isValidURL(url)) {
            this.showError('Please enter a valid URL (include http:// or https://)');
            return;
        }

        try {
            this.showLoading();
            await this.createQRCode(url);
            this.showResult();
        } catch (error) {
            console.error('Error generating QR code:', error);
            this.showError('Failed to generate QR code. Please try again.');
        }
    }

    async createQRCode(url) {
        const qrContainer = document.getElementById('qrContainer');
        
        // Clear previous QR code
        qrContainer.innerHTML = '';

        // Create QR code using QR Server API (free service)
        const qrCodeURL = await this.getQRCodeImageURL(url);
        
        // Create image element
        const img = document.createElement('img');
        img.src = qrCodeURL;
        img.alt = 'QR Code';
        img.style.maxWidth = '250px';
        img.style.height = 'auto';
        
        // Apply theme styling
        this.applyThemeToQRCode(img);
        
        qrContainer.appendChild(img);
        this.currentQRCode = img;

        // Apply container theme class
        qrContainer.className = `qr-container ${this.currentTheme}`;
    }

    async getQRCodeImageURL(url) {
        const size = '250x250';
        const baseURL = 'https://api.qrserver.com/v1/create-qr-code/';
        const params = new URLSearchParams({
            size: size,
            data: url,
            format: 'png',
            margin: '10'
        });

        // Add theme-specific parameters
        switch (this.currentTheme) {
            case 'colorful':
                params.append('color', '000000');
                params.append('bgcolor', 'ffffff');
                break;
            case 'neon':
                params.append('color', '00ffff');
                params.append('bgcolor', '000000');
                break;
            case 'nature':
                params.append('color', '2d5016');
                params.append('bgcolor', 'f0f8e8');
                break;
            default: // classic
                params.append('color', '000000');
                params.append('bgcolor', 'ffffff');
        }

        return `${baseURL}?${params.toString()}`;
    }

    applyThemeToQRCode(img) {
        // Remove existing theme classes
        img.className = '';

        switch (this.currentTheme) {
            case 'colorful':
                img.style.filter = 'hue-rotate(45deg) saturate(1.2)';
                img.style.borderRadius = '15px';
                break;
            case 'neon':
                img.style.filter = 'drop-shadow(0 0 10px #00ffff)';
                img.style.borderRadius = '10px';
                break;
            case 'nature':
                img.style.filter = 'sepia(0.3) hue-rotate(90deg)';
                img.style.borderRadius = '20px';
                break;
            default: // classic
                img.style.filter = 'none';
                img.style.borderRadius = '8px';
        }
    }

    showLoading() {
        const qrContainer = document.getElementById('qrContainer');
        qrContainer.innerHTML = '<div class="loading">🔄 Generating QR Code...</div>';
        
        // Add loading styles
        const loadingDiv = qrContainer.querySelector('.loading');
        loadingDiv.style.cssText = `
            font-size: 1.2rem;
            padding: 2rem;
            color: var(--text-secondary);
            animation: pulse 1.5s ease-in-out infinite;
        `;
    }

    showResult() {
        const resultSection = document.getElementById('resultSection');
        resultSection.classList.add('show');
    }

    showError(message) {
        const qrContainer = document.getElementById('qrContainer');
        qrContainer.innerHTML = `<div class="error">❌ ${message}</div>`;
        
        // Add error styles
        const errorDiv = qrContainer.querySelector('.error');
        errorDiv.style.cssText = `
            color: var(--error-color);
            font-weight: 500;
            padding: 1rem;
            background: rgba(239, 68, 68, 0.1);
            border-radius: 8px;
        `;
    }

    isValidURL(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    async downloadQRCode() {
        if (!this.currentQRCode) return;

        try {
            // Create a canvas to combine the QR code with theme effects
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Set canvas size
            canvas.width = 300;
            canvas.height = 300;

            // Create a new image from the current QR code
            const img = new Image();
            img.crossOrigin = 'anonymous';
            
            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
                img.src = this.currentQRCode.src;
            });

            // Apply theme background
            this.applyThemeBackground(ctx, canvas.width, canvas.height);
            
            // Draw the QR code
            ctx.drawImage(img, 25, 25, 250, 250);

            // Create download link
            const link = document.createElement('a');
            link.download = `fun-qrcode-${this.currentTheme}-${Date.now()}.png`;
            link.href = canvas.toDataURL();
            
            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        } catch (error) {
            console.error('Download failed:', error);
            alert('Download failed. Please try right-clicking the QR code and selecting "Save image as..."');
        }
    }

    applyThemeBackground(ctx, width, height) {
        switch (this.currentTheme) {
            case 'colorful':
                const gradient = ctx.createLinearGradient(0, 0, width, height);
                gradient.addColorStop(0, '#ff6b6b');
                gradient.addColorStop(0.25, '#4ecdc4');
                gradient.addColorStop(0.5, '#45b7d1');
                gradient.addColorStop(1, '#96ceb4');
                ctx.fillStyle = gradient;
                break;
            case 'neon':
                ctx.fillStyle = '#0a0a0a';
                break;
            case 'nature':
                const natureGradient = ctx.createLinearGradient(0, 0, width, height);
                natureGradient.addColorStop(0, '#667eea');
                natureGradient.addColorStop(1, '#764ba2');
                ctx.fillStyle = natureGradient;
                break;
            default: // classic
                ctx.fillStyle = '#ffffff';
        }
        ctx.fillRect(0, 0, width, height);
    }

    async shareQRCode() {
        if (!this.currentQRCode) return;

        const urlInput = document.getElementById('urlInput');
        const url = urlInput.value.trim();

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Fun QRCode',
                    text: `Check out this QR code for: ${url}`,
                    url: window.location.href
                });
            } catch (error) {
                console.log('Share cancelled or failed:', error);
            }
        } else {
            // Fallback: copy to clipboard
            try {
                await navigator.clipboard.writeText(`Check out this QR code: ${window.location.href}`);
                this.showToast('Link copied to clipboard!');
            } catch (error) {
                this.showToast('Sharing not supported on this device');
            }
        }
    }

    showToast(message) {
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
}

// Add pulse animation for loading
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

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new QRCodeGenerator();
});

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
