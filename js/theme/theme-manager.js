/**
 * Theme manager for handling QR code visual themes
 */

export class ThemeManager {
    static THEMES = {
        classic: {
            name: 'Classic',
            emoji: '🔲'
        },
        colorful: {
            name: 'Colorful',
            emoji: '🌈'
        },
        neon: {
            name: 'Neon',
            emoji: '⚡'
        },
        nature: {
            name: 'Nature',
            emoji: '🌿'
        }
    };

    /**
     * Apply theme styling to QR code image
     * @param {HTMLImageElement} img - The QR code image element
     * @param {string} theme - The theme to apply
     */
    static applyThemeToQRCode(img, theme) {
        // Remove existing theme classes
        img.className = '';

        switch (theme) {
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

    /**
     * Apply theme background to canvas context
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {number} width - Canvas width
     * @param {number} height - Canvas height
     * @param {string} theme - The theme to apply
     */
    static applyThemeBackground(ctx, width, height, theme) {
        switch (theme) {
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

    /**
     * Get theme information
     * @param {string} theme - The theme name
     * @returns {object} - Theme information
     */
    static getThemeInfo(theme) {
        return this.THEMES[theme] || this.THEMES.classic;
    }

    /**
     * Get all available themes
     * @returns {object} - All themes
     */
    static getAllThemes() {
        return this.THEMES;
    }
}
