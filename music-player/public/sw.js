self.addEventListener('install', (event) => {
  console.log('Service worker installed');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service worker activated');
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Simple: let network handle it
});
