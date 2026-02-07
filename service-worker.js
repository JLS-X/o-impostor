self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("impostor-v1").then(cache => {
      return cache.addAll([
        "./",
        "./jogo.html",
        "./style.css",
        "./script.js",
        "./manifest.json"
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
