// Fun QRCode Service Worker
// Simple service worker for basic caching

const CACHE_NAME = 'fun-qrcode-v1';
const urlsToCache = [
    './',
    './index.html',
    './styles.css',
    './main.js',
    './js/qrcode-generator.js',
    './js/utils/validation.js',
    './js/utils/ui-utils.js',
    './js/services/qrcode-api.js',
    './js/theme/theme-manager.js',
    './js/features/share-manager.js'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return cached version or fetch from network
                return response || fetch(event.request);
            }
        )
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
