const CACHE_NAME = 'ronda-pwa-v4';
const urlsToCache = [
  './',
  './index.html',
  './login.html',
  './manifest.json',
  './assets/js/app.js',
  './assets/js/firebase-config.js'
];

// Install Service Worker & Cache File Utama
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache PWA Ronda-Ku terbuka');
        // Menggunakan addAll dengan aman
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Fetch Cache / Offline Support dengan Strategi Stale-While-Revalidate / Network Fallback
self.addEventListener('fetch', event => {
  // Lewati request yang bukan GET (misal: Firestore / API eksternal)
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Kembalikan dari cache jika ada
        if (cachedResponse) {
          return cachedResponse;
        }
        // Jika tidak ada di cache, ambil dari jaringan
        return fetch(event.request).then(networkResponse => {
          // Opsional: Simpan dinamis file yang baru diakses ke cache
          return networkResponse;
        }).catch(() => {
          // Fallback jika offline total dan halaman tidak ditemukan
          if (event.request.headers.get('accept').includes('text/html')) {
            return caches.match('./index.html');
          }
        });
      })
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
            console.log('Menghapus cache lama:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});