// Reto 3: Nombre de caché actualizado a v2
const CACHE_NAME = 'gamestore-cache-v2';

// Recursos de la Tienda de Videojuegos a precargar
const ASSETS = [
  './',
  './index.html',
  './offline.html', // Reto 2: Archivo de reserva
  './css/styles.css',
  './js/main.js',
  './icon-192.png',
  './icon-512.png',
  './banner.jpg',
  './forza5.webp',
  './gears 4k..jpg',
  './gowr.webp',
  './Halo infinite.webp', 
  './marioOd.png',
  './Spiderman.webp',
  './uncharted.jpg',
  './wonder.jpg',
  './zelda.webp'
];

// Evento Install - Almacenamiento en caché de los recursos iniciales
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Precargando assets en la caché...');
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Evento Activate - Limpieza de cachés antiguas (v1 a v2)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Eliminando caché obsoleta:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Reto 1: Estrategia Red Primero (Network First) con caída segura
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // Si hay red, actualiza la copia en caché y devuelve la respuesta
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      })
      .catch(() => {
        // Si no hay red, busca en el almacenamiento de caché local
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // Reto 2: Si es una navegación y no hay nada, muestra offline.html
          if (event.request.mode === 'navigate') {
            return caches.match('./offline.html');
          }
        });
      })
  );
});