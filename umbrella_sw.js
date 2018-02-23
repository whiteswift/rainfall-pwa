// v1.8

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('rainfall').then(cache => {
      return cache.addAll([
        '',
        'manifest.json',
        'index.html',
        'assets/scripts/main.js',
        'assets/styles/main.css',
        'assets/images/rain.svg',
        'assets/fonts/gotham-medium.woff2',
        'assets/images/rainfall_144.png',
        'assets/images/rainfall_256.png',
        'assets/images/rainfall_512.png',
        'assets/media/rain.mp3'
      ])
      .then(() => self.skipWaiting());
    })
  )
});

self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});
