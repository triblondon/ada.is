
(function () {
	function sendSWMessage(message) {

		// This wraps the message posting/response in a promise, which will resolve if the response doesn't
		// contain an error, and reject with the error if it does. If you'd prefer, it's possible to call
		// controller.postMessage() and set up the onmessage handler independently of a promise, but this is
		// a convenient wrapper.
		return new Promise(function(resolve, reject) {
			var messageChannel = new MessageChannel();
			messageChannel.port1.onmessage = function(event) {
				if (event.data.error) {
					reject(event.data.error);
				} else {
					resolve(event.data);
				}
			};

			// This sends the message data as well as transferring messageChannel.port2 to the service worker.
			// The service worker can then use the transferred port to reply via postMessage(), which
			// will in turn trigger the onmessage handler on messageChannel.port1.
			// See https://html.spec.whatwg.org/multipage/workers.html#dom-worker-postmessage
			navigator.serviceWorker.controller.postMessage(message, [messageChannel.port2]);
		});
	}

	function storeStaticResources(staticResources) {

		var action = "STORE_ALL";
		var id = action + "_" + Date.now();

		return sendSWMessage({
				action: action,
				urls: JSON.stringify(staticResources),
				id: id
			});
	}

	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('/sw.js', { scope: '/' })
			.then(function(reg) {
				console.log('sw registered', reg);
			}).catch(function(error) {
				console.log('sw registration failed with ' + error);
			});

		window.addEventListener('message', function (e) {
			if( e.data.action === "ASSET_REFRESHED") {
				if (e.data.url === location.toString()) {
					location.reload();
				}
			}
		});

		if (navigator.serviceWorker.controller && window.optionalStaticFilesToCache) {
			window.storeStaticResources = storeStaticResources;
		}
	}

	Array.prototype.slice.call(document.body.getElementsByTagName('video')).forEach(function (video) {
		video.preload = 'none';
		video.autoplay = false;
		video.src = video.dataset.src;
	});

})();