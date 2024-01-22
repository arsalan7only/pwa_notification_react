const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';

//Resources always being precached on load.
const PRECACHE_URLS = [
	'/index.html',
	'/',
	'/barcode192.png',
	'/barcode256.png',
	'/barcode384.png',
	'/barcode512.png',
];

// Using install handler for precaching.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

// Cleaning old cache using activate handler.
self.addEventListener('activate', event => {
  // const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil( 
     caches.keys().then(function(names) {
          for (let name of names)   
          {  
              console.log("activate");
              caches.delete(name);             
          }
          })
  );
});

// Populating runtime cache with response if no network is found.
self.addEventListener('fetch', event => {
  // Skipping any made origin requests
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            // Put a copy of the response in the runtime cache.
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
});
