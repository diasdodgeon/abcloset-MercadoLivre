const CACHE_NAME = 'meu-pwa-v1';

// Substitua './' por './filmes.html'
const ASSETS_TO_CACHE = [
  './filmes.html',
  './manifest.json',
  './android-192x192.png',
  './android-512x512.png'
  // Adicione aqui outros arquivos CSS/JS caso existam (ex: './styles.css')
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        ASSETS_TO_CACHE.map((url) => {
          return cache.add(url).catch((err) => {
            console.error('Falha ao adicionar ao cache o arquivo:', url, err);
          });
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
