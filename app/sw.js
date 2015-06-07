/* global caches, fetch, Request, self */

var resources = [
	'/favicon.ico',
	'/img/pattern.svg',
	'/css/main.css',
	'/js/script.js',
	'https://fonts.googleapis.com/css?family=Open+Sans:300italic,400,300,600,800',

	'/',
	'/index.html'
];

var cacheSellByTime = 30 * 1000;

self.addEventListener('install', function(event) {
	console.log('Installing service worker');

	event.waitUntil(
		caches.open('resources-v1')
			.then(function(cache) {
				resources.forEach(function (item) {
					cache.add(new Request(item, item.match(/^https?:/) ? {mode: 'no-cors'} : {}));
				});
			})
	);
});

self.addEventListener('message', function(event) {
	if (event.data.action === "STORE_ALL") caches.open('resources-v1')
		.then(function(cache) {
			return JSON.parse(event.data.urls).map(function (url) {
				console.log('Caching: ' + url);
				return cache.add(new Request(url, url.match(/^https?:/) ? {mode: 'no-cors'} : {}));
			});
		})
		.then(function (urlPromises) {
			return Promise.all(urlPromises);
		})
		.then(function () {
			event.data.success = true;
		}, function (err) {
			console.log(err);
			event.data.success = false;
		})
		.then(function () {
			event.ports[0].postMessage(event.data);
		});
});

self.addEventListener('fetch', function(event) {
	var resp = caches.match(event.request)
		.then(function(r) {
			var age = Date.now() - (new Date(r.headers.get('Date')).getTime());

			// Update cached if it is more than 1 hour old and is not cors
			if (r.headers.get('Date') && age > cacheSellByTime) {
				caches.open('resources-v1')
					.then(function(cache) {
						console.log('Updating: ' + event.request.url);
						return cache.add(event.request, {mode: 'no-cors'});
					})
					.then(function () {
						return event.currentTarget.clients.matchAll({type: "window"});
					})
					.then(function (windows) {
						windows.forEach(function (w) {
							w.postMessage({
								action: "ASSET_REFRESHED",
								url: event.request.url
							});
						});
					});
			}
			return r;
		})
		.catch(function () {
			return fetch(event.request);
		})
		.then(function (fetchResponse) {
			caches.open('resources-v1').then(function(cache) {
				cache.put(event.request, fetchResponse);
			});
			return fetchResponse.clone();
		});
	event.respondWith(resp);
});