/**
 * Download and share functionality
 */

import { ThemeManager } from '../theme/theme-manager.js';
import { UIUtils } from '../utils/ui-utils.js';
import { I18n } from '../utils/i18n.js';

export class ShareManager {
    /**
     * Download QR code as PNG with theme background
     * @param {HTMLImageElement} qrCodeImage - The QR code image
     * @param {string} theme - The current theme
     */
    static async downloadQRCode(qrCodeImage, theme) {
        if (!qrCodeImage) return;

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
                img.src = qrCodeImage.src;
            });

            // Apply theme background
            ThemeManager.applyThemeBackground(ctx, canvas.width, canvas.height, theme);
            
            // Draw the QR code
            ctx.drawImage(img, 25, 25, 250, 250);

            // Create download link
            const link = document.createElement('a');
            link.download = `fun-qrcode-${theme}-${Date.now()}.png`;
            link.href = canvas.toDataURL();
            
            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        } catch (error) {
            console.error('Download failed:', error);
            alert(I18n.t('error.download'));
        }
    }

    /**
     * Share QR code using Web Share API or clipboard
     * @param {string} url - The original URL that was encoded
     */
    static async shareQRCode(url) {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: I18n.t('share.title'),
                    text: I18n.t('share.text', { url }),
                    url: window.location.href
                });
            } catch (error) {
                console.log('Share cancelled or failed:', error);
            }
        } else {
            // Fallback: copy to clipboard
            try {
                const shareText = `${I18n.t('share.title')}: ${window.location.href}`;
                await navigator.clipboard.writeText(shareText);
                UIUtils.showToast(I18n.t('success.copied'));
            } catch (error) {
                UIUtils.showToast(I18n.t('error.shareNotSupported'));
            }
        }
    }
}
