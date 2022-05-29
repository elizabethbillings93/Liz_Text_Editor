const {warmStrategyCache } = require('workbox-recipes');
const { CacheFirst,StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
registerRoute(
  ({request})=> ['style','script','worker'].includes(request.destination),
  // Stale While Revalidate helps developers balance between immediacy—loading cached content right away—and freshness—ensuring updates to the cached content are used in the future. 
  new StaleWhileRevalidate({
    casheName: 'cashe',
    plugins:[
      // This class allows you to set up rules determining what status codes and/or headers need to be present in order for a Response to be considered cacheable.
      new CacheableResponsePlugin({
        // status codes
        statuses: [0,200]
      }),
    ],
  })
);
