const CACHE_NAME = 'story-point-estimator-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js',
  'https://code.jquery.com/jquery-3.6.0.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
      caches.open(CACHE_NAME)
          .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
      caches.match(event.request)
          .then(response => {
              if (response) {
                  return response;
              }
              return fetch(event.request);
          })
  );
});

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