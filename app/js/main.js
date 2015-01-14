Array.prototype.slice.call(document.body.getElementsByTagName('video')).forEach(function (video) {
	video.preload = 'none';
	video.autoplay = false;
	video.src = video.dataset.src;
});