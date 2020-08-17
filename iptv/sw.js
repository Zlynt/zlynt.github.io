var CACHE_NAME = 'leiptv-cache-v1.0.0 Alpha 1';

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll([
        '/iptv/',
        '/iptv/index.html',
        '/iptv/iptv.html',
        '/iptv/logo.png',
        '/iptv/logo_180.png',
        '/iptv/logo_512.png'
      ]);
    })
  )
});

self.addEventListener('fetch', event => {
  console.log('[Service Worker] Fetching something ....', event);
  // This fixes a weird bug in Chrome when you open the Developer Tools
  if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
    return;

  }
  event.respondWith(fetch(event.request));
});