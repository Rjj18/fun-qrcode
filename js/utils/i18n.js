/**
 * Internationalization (i18n) module for Fun QRCode
 * Supports multiple languages with automatic system language detection
 */

export class I18n {
    static DEFAULT_LANGUAGE = 'en';
    static SUPPORTED_LANGUAGES = ['en', 'es', 'pt', 'fr', 'de', 'it', 'ja', 'zh'];

    static translations = {
        en: {
            // Header
            title: '🎨 Fun QRCode',
            subtitle: 'Transform your links into stylish QR codes',
            
            // Form
            urlLabel: 'Enter your URL:',
            urlPlaceholder: 'https://example.com',
            themeLabel: 'Choose a theme:',
            generateBtn: 'Generate QR Code ✨',
            
            // Themes
            'theme.classic': '🔲 Classic',
            'theme.colorful': '🌈 Colorful',
            'theme.neon': '⚡ Neon',
            'theme.nature': '🌿 Nature',
            
            // Actions
            downloadBtn: '📥 Download',
            shareBtn: '📤 Share',
            
            // Messages
            loading: '🔄 Generating QR Code...',
            'error.emptyUrl': 'Please enter a valid URL',
            'error.invalidUrl': 'Please enter a valid URL (include http:// or https://)',
            'error.generation': 'Failed to generate QR code. Please try again.',
            'error.download': 'Download failed. Please try right-clicking the QR code and selecting "Save image as..."',
            'success.copied': 'Link copied to clipboard!',
            'error.shareNotSupported': 'Sharing not supported on this device',
            
            // Share
            'share.title': 'Fun QRCode',
            'share.text': 'Check out this QR code for: {url}',
            
            // Footer
            footer: '© 2025 Fun QRCode - Made with ❤️'
        },

        es: {
            // Header
            title: '🎨 QR Divertido',
            subtitle: 'Transforma tus enlaces en códigos QR con estilo',
            
            // Form
            urlLabel: 'Introduce tu URL:',
            urlPlaceholder: 'https://ejemplo.com',
            themeLabel: 'Elige un tema:',
            generateBtn: 'Generar Código QR ✨',
            
            // Themes
            'theme.classic': '🔲 Clásico',
            'theme.colorful': '🌈 Colorido',
            'theme.neon': '⚡ Neón',
            'theme.nature': '🌿 Naturaleza',
            
            // Actions
            downloadBtn: '📥 Descargar',
            shareBtn: '📤 Compartir',
            
            // Messages
            loading: '🔄 Generando Código QR...',
            'error.emptyUrl': 'Por favor introduce una URL válida',
            'error.invalidUrl': 'Por favor introduce una URL válida (incluye http:// o https://)',
            'error.generation': 'Error al generar el código QR. Inténtalo de nuevo.',
            'error.download': 'Error en la descarga. Haz clic derecho en el código QR y selecciona "Guardar imagen como..."',
            'success.copied': '¡Enlace copiado al portapapeles!',
            'error.shareNotSupported': 'Compartir no compatible en este dispositivo',
            
            // Share
            'share.title': 'QR Divertido',
            'share.text': 'Mira este código QR para: {url}',
            
            // Footer
            footer: '© 2025 QR Divertido - Hecho con ❤️'
        },

        pt: {
            // Header
            title: '🎨 QR Divertido',
            subtitle: 'Transforme seus links em códigos QR estilosos',
            
            // Form
            urlLabel: 'Digite sua URL:',
            urlPlaceholder: 'https://exemplo.com',
            themeLabel: 'Escolha um tema:',
            generateBtn: 'Gerar Código QR ✨',
            
            // Themes
            'theme.classic': '🔲 Clássico',
            'theme.colorful': '🌈 Colorido',
            'theme.neon': '⚡ Neon',
            'theme.nature': '🌿 Natureza',
            
            // Actions
            downloadBtn: '📥 Baixar',
            shareBtn: '📤 Compartilhar',
            
            // Messages
            loading: '🔄 Gerando Código QR...',
            'error.emptyUrl': 'Por favor digite uma URL válida',
            'error.invalidUrl': 'Por favor digite uma URL válida (inclua http:// ou https://)',
            'error.generation': 'Falha ao gerar código QR. Tente novamente.',
            'error.download': 'Falha no download. Clique com o botão direito no código QR e selecione "Salvar imagem como..."',
            'success.copied': 'Link copiado para a área de transferência!',
            'error.shareNotSupported': 'Compartilhamento não suportado neste dispositivo',
            
            // Share
            'share.title': 'QR Divertido',
            'share.text': 'Confira este código QR para: {url}',
            
            // Footer
            footer: '© 2025 QR Divertido - Feito com ❤️'
        },

        fr: {
            // Header
            title: '🎨 QR Amusant',
            subtitle: 'Transformez vos liens en codes QR stylés',
            
            // Form
            urlLabel: 'Entrez votre URL:',
            urlPlaceholder: 'https://exemple.com',
            themeLabel: 'Choisissez un thème:',
            generateBtn: 'Générer le Code QR ✨',
            
            // Themes
            'theme.classic': '🔲 Classique',
            'theme.colorful': '🌈 Coloré',
            'theme.neon': '⚡ Néon',
            'theme.nature': '🌿 Nature',
            
            // Actions
            downloadBtn: '📥 Télécharger',
            shareBtn: '📤 Partager',
            
            // Messages
            loading: '🔄 Génération du Code QR...',
            'error.emptyUrl': 'Veuillez entrer une URL valide',
            'error.invalidUrl': 'Veuillez entrer une URL valide (incluez http:// ou https://)',
            'error.generation': 'Échec de la génération du code QR. Veuillez réessayer.',
            'error.download': 'Échec du téléchargement. Cliquez droit sur le code QR et sélectionnez "Enregistrer l\'image sous..."',
            'success.copied': 'Lien copié dans le presse-papiers!',
            'error.shareNotSupported': 'Partage non pris en charge sur cet appareil',
            
            // Share
            'share.title': 'QR Amusant',
            'share.text': 'Découvrez ce code QR pour: {url}',
            
            // Footer
            footer: '© 2025 QR Amusant - Fait avec ❤️'
        },

        de: {
            // Header
            title: '🎨 Spaß QR-Code',
            subtitle: 'Verwandeln Sie Ihre Links in stilvolle QR-Codes',
            
            // Form
            urlLabel: 'Geben Sie Ihre URL ein:',
            urlPlaceholder: 'https://beispiel.com',
            themeLabel: 'Wählen Sie ein Theme:',
            generateBtn: 'QR-Code Generieren ✨',
            
            // Themes
            'theme.classic': '🔲 Klassisch',
            'theme.colorful': '🌈 Farbenfroh',
            'theme.neon': '⚡ Neon',
            'theme.nature': '🌿 Natur',
            
            // Actions
            downloadBtn: '📥 Herunterladen',
            shareBtn: '📤 Teilen',
            
            // Messages
            loading: '🔄 QR-Code wird generiert...',
            'error.emptyUrl': 'Bitte geben Sie eine gültige URL ein',
            'error.invalidUrl': 'Bitte geben Sie eine gültige URL ein (mit http:// oder https://)',
            'error.generation': 'QR-Code-Generierung fehlgeschlagen. Bitte versuchen Sie es erneut.',
            'error.download': 'Download fehlgeschlagen. Klicken Sie mit der rechten Maustaste auf den QR-Code und wählen Sie "Bild speichern unter..."',
            'success.copied': 'Link in die Zwischenablage kopiert!',
            'error.shareNotSupported': 'Teilen auf diesem Gerät nicht unterstützt',
            
            // Share
            'share.title': 'Spaß QR-Code',
            'share.text': 'Schauen Sie sich diesen QR-Code an für: {url}',
            
            // Footer
            footer: '© 2025 Spaß QR-Code - Mit ❤️ gemacht'
        }
    };

    static currentLanguage = null;

    /**
     * Initialize i18n with automatic language detection
     */
    static init() {
        this.currentLanguage = this.detectLanguage();
        this.applyTranslations();
        this.updatePageMetadata();
    }

    /**
     * Detect user's preferred language
     * @returns {string} Language code
     */
    static detectLanguage() {
        // Check URL parameter first
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get('lang');
        if (langParam && this.SUPPORTED_LANGUAGES.includes(langParam)) {
            return langParam;
        }

        // Check localStorage
        const savedLang = localStorage.getItem('fun-qrcode-language');
        if (savedLang && this.SUPPORTED_LANGUAGES.includes(savedLang)) {
            return savedLang;
        }

        // Check browser language
        const browserLang = navigator.language.split('-')[0];
        if (this.SUPPORTED_LANGUAGES.includes(browserLang)) {
            return browserLang;
        }

        // Fallback to default
        return this.DEFAULT_LANGUAGE;
    }

    /**
     * Get translated text for a key
     * @param {string} key - Translation key
     * @param {object} params - Parameters for string interpolation
     * @returns {string} Translated text
     */
    static t(key, params = {}) {
        const translations = this.translations[this.currentLanguage] || this.translations[this.DEFAULT_LANGUAGE];
        let text = translations[key] || key;

        // Simple string interpolation
        Object.keys(params).forEach(param => {
            text = text.replace(`{${param}}`, params[param]);
        });

        return text;
    }

    /**
     * Apply translations to the DOM
     */
    static applyTranslations() {
        // Update elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            element.textContent = this.t(key);
        });

        // Update elements with data-i18n-placeholder attribute
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = this.t(key);
        });

        // Update page title
        document.title = this.t('title') + ' - Transform Links with Style';
    }

    /**
     * Update page metadata for SEO
     */
    static updatePageMetadata() {
        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.content = this.t('subtitle');
        }

        // Update Open Graph tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            ogTitle.content = this.t('title') + ' - Transform Links with Style';
        }

        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription) {
            ogDescription.content = this.t('subtitle');
        }

        // Update Twitter Card tags
        const twitterTitle = document.querySelector('meta[name="twitter:title"]');
        if (twitterTitle) {
            twitterTitle.content = this.t('title') + ' - Transform Links with Style';
        }

        const twitterDescription = document.querySelector('meta[name="twitter:description"]');
        if (twitterDescription) {
            twitterDescription.content = this.t('subtitle');
        }
    }

    /**
     * Change language manually
     * @param {string} language - Language code
     */
    static setLanguage(language) {
        if (this.SUPPORTED_LANGUAGES.includes(language)) {
            this.currentLanguage = language;
            localStorage.setItem('fun-qrcode-language', language);
            this.applyTranslations();
            this.updatePageMetadata();
        }
    }

    /**
     * Get current language
     * @returns {string} Current language code
     */
    static getCurrentLanguage() {
        return this.currentLanguage;
    }

    /**
     * Get all supported languages
     * @returns {Array} Array of supported language codes
     */
    static getSupportedLanguages() {
        return this.SUPPORTED_LANGUAGES;
    }
}
