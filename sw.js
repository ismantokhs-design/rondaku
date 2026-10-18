const CACHE_NAME = 'ronda-pwa-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './pages/home.html',
  './pages/jadwal.html',
  './pages/laporan.html',
  './pages/pos.html',
  './pages/koordinator.html',
  './assets/js/app.js',
  './assets/js/firebase-config.js',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache terbuka');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch Cache / Offline Support
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Kembalikan dari cache jika ada, jika tidak ambil dari jaringan
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Activate & Cleanup Old Caches
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