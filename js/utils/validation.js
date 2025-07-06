/**
 * Utility functions for validation
 */

import { I18n } from './i18n.js';

export class ValidationUtils {
    /**
     * Check if a string is a valid URL
     * @param {string} string - The string to validate
     * @returns {boolean} - True if valid URL, false otherwise
     */
    static isValidURL(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    /**
     * Validate and sanitize URL input
     * @param {string} url - The URL to validate
     * @returns {object} - { isValid: boolean, url: string, error?: string }
     */
    static validateURL(url) {
        const trimmedUrl = url.trim();
        
        if (!trimmedUrl) {
            return {
                isValid: false,
                url: trimmedUrl,
                error: I18n.t('error.emptyUrl')
            };
        }

        if (!this.isValidURL(trimmedUrl)) {
            return {
                isValid: false,
                url: trimmedUrl,
                error: I18n.t('error.invalidUrl')
            };
        }

        return {
            isValid: true,
            url: trimmedUrl
        };
    }
}
