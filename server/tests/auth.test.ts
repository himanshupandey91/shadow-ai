self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open('shadow-ai-v1').then((cache) => cache.addAll(['/', '/index.html', '/app.css', '/app.js', '/manifest.webmanifest'])));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request).then((response) => response || new Response('Offline mode', { status: 503 })))
  );
});
