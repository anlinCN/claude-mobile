const CACHE = 'claude-chat-v2';
const FILES = ['index.html', 'manifest.json', 'icon.svg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || e.request.url.includes('api.anthropic.com')) return;
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
