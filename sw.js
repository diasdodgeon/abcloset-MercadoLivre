const CACHE_NAME = 'meu-pwa-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/filmes.html',
  '/sw.js',
  '/manifest.json',
  '/android-512x512.png',
  '/android-192x192.png'
];

// Instalação do Service Worker e salvamento dos arquivos no cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Intercepta as requisições para responder via cache quando offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
