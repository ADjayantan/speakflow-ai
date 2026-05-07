self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("speakflow-static-v1").then((cache) =>
      cache.addAll([
        "/",
        "/dashboard",
        "/roadmap",
        "/manifest.webmanifest"
      ])
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request).then((response) => response || caches.match("/")))
  );
});
