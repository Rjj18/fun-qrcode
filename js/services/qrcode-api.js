/**
 * QR Code API service for generating QR codes
 */

export class QRCodeAPI {
    static BASE_URL = 'https://api.qrserver.com/v1/create-qr-code/';
    static DEFAULT_SIZE = '250x250';

    /**
     * Generate QR code URL with theme-specific parameters
     * @param {string} url - The URL to encode
     * @param {string} theme - The theme to apply
     * @returns {string} - The QR code image URL
     */
    static async getQRCodeImageURL(url, theme = 'classic') {
        const params = new URLSearchParams({
            size: this.DEFAULT_SIZE,
            data: url,
            format: 'png',
            margin: '10'
        });

        // Add theme-specific parameters
        const themeConfig = this.getThemeConfig(theme);
        params.append('color', themeConfig.color);
        params.append('bgcolor', themeConfig.bgcolor);

        return `${this.BASE_URL}?${params.toString()}`;
    }

    /**
     * Get theme configuration for QR code colors
     * @param {string} theme - The theme name
     * @returns {object} - Theme configuration object
     */
    static getThemeConfig(theme) {
        const themes = {
            colorful: {
                color: '000000',
                bgcolor: 'ffffff'
            },
            neon: {
                color: '00ffff',
                bgcolor: '000000'
            },
            nature: {
                color: '2d5016',
                bgcolor: 'f0f8e8'
            },
            classic: {
                color: '000000',
                bgcolor: 'ffffff'
            }
        };

        return themes[theme] || themes.classic;
    }

    /**
     * Create QR code image element
     * @param {string} url - The URL to encode
     * @param {string} theme - The theme to apply
     * @returns {Promise<HTMLImageElement>} - The QR code image element
     */
    static async createQRCodeImage(url, theme) {
        const qrCodeURL = await this.getQRCodeImageURL(url, theme);
        
        const img = document.createElement('img');
        img.src = qrCodeURL;
        img.alt = 'QR Code';
        img.style.maxWidth = '250px';
        img.style.height = 'auto';

        return img;
    }
}
