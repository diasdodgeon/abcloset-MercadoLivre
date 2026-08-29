const CACHE_NAME = 'meu-pwa-v1';

const ASSETS_TO_CACHE = [
  './',
  './filmes.html',
  './manifest.json',
  './android-192x192.png',
  './android-512x512.png'
  // Certifique-se de listar APENAS arquivos que realmente existem na pasta
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Adiciona um por um para capturar qual item específico falha
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
