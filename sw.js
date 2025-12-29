const CACHE_NAME = "number-quest-cache-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/style.css",
  "/dist/main.js",
  "/dist/core/game.js",
  "/dist/core/persistence.js",
  "/dist/core/types.js",
  "/dist/ui/uiManager.js",
  "/dist/worlds/worldRegistry.js",
  "/dist/worlds/fractionCompare.js",
  "/dist/worlds/probabilityGarden.js",
  "/dist/worlds/rationalRealm.js",
  "/dist/components/beadBag.js",
  "/dist/components/dice.js",
  "/dist/components/fractionBar.js",
  "/dist/components/numberLine.js",
  "/dist/components/spinner.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))),
    ),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          const clone = response.clone();
          caches
            .open(CACHE_NAME)
            .then((cache) => cache.put(event.request, clone))
            .catch(() => {
              // Ignore cache failures; stay responsive
            });
          return response;
        })
        .catch(() => cached);
    }),
  );
});
