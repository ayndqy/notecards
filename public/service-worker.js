self.addEventListener('install', (event) => {
	event.waitUntil(async function() {
		const cache = await caches.open('notecards');
		await cache.addAll([
			'./index.html',
			'./global.css',
			'./build/bundle.js',
			'./build/bundle.css'
		]);
	}());
});

self.addEventListener('fetch', (event) => {
	event.respondWith(async function() {
		const cache = await caches.open('notecards');
		const cachedResponse = await cache.match(event.request);
		const networkResponsePromise = fetch(event.request);

		event.waitUntil(async function() {
			const networkResponse = await networkResponsePromise;
			await cache.put(event.request, networkResponse.clone());
		}());
		return cachedResponse || networkResponsePromise;
	}());
})
