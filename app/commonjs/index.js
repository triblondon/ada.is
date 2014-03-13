console.log('Starting Scripts');
window.$ = function (str) {
	return document.querySelector(str);
};

$('#meButton').addEventListener('click', function () {
	if (!$('.row').classList.contains('left')) {
		$('.row').classList.add('left');
		$('.row').classList.remove('right');
	} else {
		$('.row').classList.remove('left');
	}
});

$('#commentButton').addEventListener('click', function () {
	if (!$('.row').classList.contains('right')) {
		$('.row').classList.add('right');
		$('.row').classList.remove('left');
	} else {
		$('.row').classList.remove('right');
	}
});