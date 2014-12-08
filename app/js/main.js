function activateVideo(item) {
	if (!item.src && item.dataset.src) {
		item.src = item.dataset.src;
	}
}

Array.prototype.slice.call(document.body.getElementsByTagName('video')).forEach(function (item) {
	item.addEventListener('click', function (e) {
		activateVideo(e.target);
	});
});