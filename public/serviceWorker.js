const CACHE_NAME = 'version-1'
const urlsToChache = ['index.html', 'offline.html']

const self = this

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            console.log('opened cache');
            return cache.addAll(urlsToChache)
        })
    )
})
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(() => fetch(event.request))
            .catch(() => caches.match('offline.html'))
    )
})
self.addEventListener('activate', (event) => {
    const cachewhitelist = []
    cachewhitelist.push(CACHE_NAME)

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cachewhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    
})