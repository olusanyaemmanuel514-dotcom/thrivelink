const CACHE_NAME = 'thrivelink-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/app.html',
  '/app.css',
  '/app.js',
  '/styles.css',
  '/script.js',
  '/about.html',
  '/services.html',
  '/contact.html',
  '/install.html',
  '/chatbot.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) return response;
      return fetch(event.request).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('/app.html');
        }
      });
    })
  );
});
