var CACHE_NAME = 'leiptv-cache-v1.0.0';

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