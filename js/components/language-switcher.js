/**
 * Language switcher component for manual language selection
 */

import { I18n } from '../utils/i18n.js';

export class LanguageSwitcher {
    static languages = [
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'es', name: 'Español', flag: '🇪🇸' },
        { code: 'pt', name: 'Português', flag: '🇧🇷' },
        { code: 'fr', name: 'Français', flag: '🇫🇷' },
        { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
        { code: 'it', name: 'Italiano', flag: '🇮🇹' },
        { code: 'ja', name: '日本語', flag: '🇯🇵' }
    ];

    /**
     * Initialize the language switcher
     */
    static init() {
        this.createLanguageButton();
        this.bindEvents();
    }

    /**
     * Create the language switcher button and dropdown
     */
    static createLanguageButton() {
        const container = document.querySelector('.header');
        
        // Create language switcher container
        const langSwitcher = document.createElement('div');
        langSwitcher.className = 'language-switcher';
        langSwitcher.innerHTML = `
            <button class="lang-btn" id="langBtn" aria-label="Change language">
                <span class="lang-flag" id="langFlag">${this.getCurrentLanguageFlag()}</span>
                <span class="lang-code" id="langCode">${I18n.getCurrentLanguage().toUpperCase()}</span>
                <span class="lang-arrow">▼</span>
            </button>
            <div class="lang-dropdown" id="langDropdown">
                ${this.languages.map(lang => `
                    <button class="lang-option ${lang.code === I18n.getCurrentLanguage() ? 'active' : ''}" 
                            data-lang="${lang.code}"
                            aria-label="Switch to ${lang.name}">
                        <span class="lang-flag">${lang.flag}</span>
                        <span class="lang-name">${lang.name}</span>
                    </button>
                `).join('')}
            </div>
        `;

        // Add to header
        container.appendChild(langSwitcher);

        // Add CSS styles
        this.addLanguageSwitcherStyles();
    }

    /**
     * Get current language flag
     * @returns {string} Flag emoji
     */
    static getCurrentLanguageFlag() {
        const currentLang = I18n.getCurrentLanguage();
        const language = this.languages.find(lang => lang.code === currentLang);
        return language ? language.flag : '🇺🇸';
    }

    /**
     * Bind event listeners
     */
    static bindEvents() {
        const langBtn = document.getElementById('langBtn');
        const langDropdown = document.getElementById('langDropdown');

        // Toggle dropdown
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            langDropdown.classList.remove('show');
        });

        // Prevent dropdown from closing when clicking inside
        langDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Language selection
        langDropdown.addEventListener('click', (e) => {
            const langOption = e.target.closest('.lang-option');
            if (langOption) {
                const selectedLang = langOption.dataset.lang;
                this.changeLanguage(selectedLang);
                langDropdown.classList.remove('show');
            }
        });

        // Keyboard navigation
        langBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                langDropdown.classList.toggle('show');
            }
        });
    }

    /**
     * Change the application language
     * @param {string} langCode - Language code
     */
    static changeLanguage(langCode) {
        // Update I18n
        I18n.setLanguage(langCode);

        // Update button display
        const langFlag = document.getElementById('langFlag');
        const langCodeEl = document.getElementById('langCode');
        
        const language = this.languages.find(lang => lang.code === langCode);
        if (language) {
            langFlag.textContent = language.flag;
            langCodeEl.textContent = langCode.toUpperCase();
        }

        // Update active state in dropdown
        document.querySelectorAll('.lang-option').forEach(option => {
            option.classList.remove('active');
            if (option.dataset.lang === langCode) {
                option.classList.add('active');
            }
        });

        // Force retranslation of all elements
        I18n.applyTranslations();

        // Show success toast
        const languageName = language ? language.name : langCode;
        this.showLanguageChangeToast(languageName);
    }

    /**
     * Show toast notification for language change
     * @param {string} languageName - Name of the selected language
     */
    static showLanguageChangeToast(languageName) {
        const toast = document.createElement('div');
        toast.textContent = `Language changed to ${languageName}`;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--success-color);
            color: white;
            padding: 12px 24px;
            border-radius: 25px;
            font-weight: 500;
            z-index: 1000;
            animation: fadeInUp 0.3s ease;
            box-shadow: var(--shadow-md);
        `;

        document.body.appendChild(toast);

        // Remove toast after 2 seconds
        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                if (toast.parentNode) {
                    document.body.removeChild(toast);
                }
            }, 300);
        }, 2000);
    }

    /**
     * Add CSS styles for the language switcher
     */
    static addLanguageSwitcherStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .language-switcher {
                position: absolute;
                top: var(--spacing-lg);
                right: var(--spacing-lg);
                z-index: 100;
            }

            .lang-btn {
                display: flex;
                align-items: center;
                gap: var(--spacing-xs);
                padding: var(--spacing-sm) var(--spacing-md);
                background: rgba(255, 255, 255, 0.2);
                border: 1px solid rgba(255, 255, 255, 0.3);
                border-radius: var(--radius-md);
                color: white;
                font-size: 0.9rem;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease;
                backdrop-filter: blur(10px);
                min-width: 80px;
            }

            .lang-btn:hover {
                background: rgba(255, 255, 255, 0.3);
                transform: translateY(-1px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            }

            .lang-btn:focus {
                outline: 2px solid rgba(255, 255, 255, 0.5);
                outline-offset: 2px;
            }

            .lang-flag {
                font-size: 1.1em;
            }

            .lang-code {
                font-weight: 600;
                letter-spacing: 0.5px;
            }

            .lang-arrow {
                font-size: 0.8em;
                transition: transform 0.2s ease;
            }

            .lang-btn[aria-expanded="true"] .lang-arrow {
                transform: rotate(180deg);
            }

            .lang-dropdown {
                position: absolute;
                top: 100%;
                right: 0;
                margin-top: var(--spacing-xs);
                background: white;
                border-radius: var(--radius-md);
                box-shadow: var(--shadow-lg);
                min-width: 160px;
                opacity: 0;
                visibility: hidden;
                transform: translateY(-10px);
                transition: all 0.2s ease;
                border: 1px solid var(--border-color);
                overflow: hidden;
            }

            .lang-dropdown.show {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }

            .lang-option {
                display: flex;
                align-items: center;
                gap: var(--spacing-sm);
                width: 100%;
                padding: var(--spacing-sm) var(--spacing-md);
                background: none;
                border: none;
                font-size: 0.9rem;
                color: var(--text-primary);
                cursor: pointer;
                transition: background-color 0.2s ease;
                text-align: left;
            }

            .lang-option:hover {
                background: var(--bg-secondary);
            }

            .lang-option.active {
                background: var(--primary-color);
                color: white;
            }

            .lang-option.active:hover {
                background: var(--secondary-color);
            }

            .lang-name {
                font-weight: 500;
            }

            /* Mobile responsiveness */
            @media (max-width: 640px) {
                .language-switcher {
                    top: var(--spacing-sm);
                    right: var(--spacing-sm);
                }

                .lang-btn {
                    padding: var(--spacing-xs) var(--spacing-sm);
                    font-size: 0.8rem;
                    min-width: 70px;
                }

                .lang-dropdown {
                    min-width: 140px;
                }

                .lang-option {
                    padding: var(--spacing-xs) var(--spacing-sm);
                    font-size: 0.85rem;
                }
            }

            /* Animation for language change */
            @keyframes languageChange {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }

            .lang-btn.changing {
                animation: languageChange 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Update language switcher after language change
     */
    static updateDisplay() {
        const langFlag = document.getElementById('langFlag');
        const langCode = document.getElementById('langCode');
        
        if (langFlag && langCode) {
            const currentLang = I18n.getCurrentLanguage();
            const language = this.languages.find(lang => lang.code === currentLang);
            
            if (language) {
                langFlag.textContent = language.flag;
                langCode.textContent = currentLang.toUpperCase();
            }

            // Update active state
            document.querySelectorAll('.lang-option').forEach(option => {
                option.classList.remove('active');
                if (option.dataset.lang === currentLang) {
                    option.classList.add('active');
                }
            });
        }
    }
}
