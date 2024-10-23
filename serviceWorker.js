const CACHE_NAME = 'divisas-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/compraVenta.css',
    '/views/perfil/perfil.css',
    '/img/noImage.jpg',
    '/js/compraVenta.js',
    '/img/icon-192x192.png',
    '/img/icon-512x512.png'
];

// Instalar el Service Worker y almacenar archivos en cache
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

// Activar el Service Worker
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Interceptar solicitudes para servir contenido desde el cache
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});
