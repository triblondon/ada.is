Array.prototype.slice.call(document.body.getElementsByTagName('video')).forEach(function (item) {
	video.preload = 'none';
	video.autoplay = false;
	video.src = video.dataset.src;
});