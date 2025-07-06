/**
 * Main QR Code Generator class
 * Orchestrates all the modules to provide QR code generation functionality
 */

import { ValidationUtils } from './utils/validation.js';
import { QRCodeAPI } from './services/qrcode-api.js';
import { ThemeManager } from './theme/theme-manager.js';
import { UIUtils } from './utils/ui-utils.js';
import { ShareManager } from './features/share-manager.js';

export class QRCodeGenerator {
    constructor() {
        this.currentTheme = 'classic';
        this.currentQRCode = null;
        this.currentURL = '';
        this.init();
    }

    /**
     * Initialize the QR code generator
     */
    init() {
        UIUtils.initializeAnimations();
        this.bindEvents();
    }

    /**
     * Bind event listeners to DOM elements
     */
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

    /**
     * Handle theme selection
     * @param {HTMLButtonElement} selectedBtn - The selected theme button
     */
    selectTheme(selectedBtn) {
        // Remove active class from all buttons
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Add active class to selected button
        selectedBtn.classList.add('active');
        this.currentTheme = selectedBtn.dataset.theme;

        // If QR code exists, regenerate with new theme
        if (this.currentQRCode && this.currentURL) {
            this.generateQRCode();
        }
    }

    /**
     * Generate QR code from URL input
     */
    async generateQRCode() {
        const urlInput = document.getElementById('urlInput');
        const validation = ValidationUtils.validateURL(urlInput.value);

        if (!validation.isValid) {
            this.showError(validation.error);
            return;
        }

        try {
            this.currentURL = validation.url;
            this.showLoading();
            await this.createQRCode(validation.url);
            this.showResult();
        } catch (error) {
            console.error('Error generating QR code:', error);
            this.showError('Failed to generate QR code. Please try again.');
        }
    }

    /**
     * Create QR code image and display it
     * @param {string} url - The URL to encode
     */
    async createQRCode(url) {
        const qrContainer = document.getElementById('qrContainer');
        
        // Clear previous QR code
        qrContainer.innerHTML = '';

        // Create QR code image
        const img = await QRCodeAPI.createQRCodeImage(url, this.currentTheme);
        
        // Apply theme styling
        ThemeManager.applyThemeToQRCode(img, this.currentTheme);
        
        qrContainer.appendChild(img);
        this.currentQRCode = img;

        // Apply container theme class
        qrContainer.className = `qr-container ${this.currentTheme}`;
    }

    /**
     * Show loading state
     */
    showLoading() {
        const qrContainer = document.getElementById('qrContainer');
        UIUtils.showLoading(qrContainer);
    }

    /**
     * Show result section
     */
    showResult() {
        const resultSection = document.getElementById('resultSection');
        UIUtils.showResult(resultSection);
    }

    /**
     * Show error message
     * @param {string} message - The error message
     */
    showError(message) {
        const qrContainer = document.getElementById('qrContainer');
        UIUtils.showError(qrContainer, message);
    }

    /**
     * Download current QR code
     */
    async downloadQRCode() {
        await ShareManager.downloadQRCode(this.currentQRCode, this.currentTheme);
    }

    /**
     * Share current QR code
     */
    async shareQRCode() {
        await ShareManager.shareQRCode(this.currentURL);
    }
}
