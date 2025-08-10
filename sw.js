const CACHE_NAME = 'guitar-tuner-cache-v1';
const FILES_TO_CACHE = [
  '.',
  'index.html',
  'manifest.json',
  'sw.js',
  // You’ll want to add your icon files here, e.g. 'icons/icon-192.png', 'icons/icon-512.png'
];

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cachedResponse => {
      return cachedResponse || fetch(evt.request);
    })
  );
});