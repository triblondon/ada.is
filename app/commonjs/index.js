console.log('Starting Scripts');

var $ = function (str) {
	return document.querySelector(str);
};

var hammer = require('hammerjs');

function toggleRight(e) {
	e.preventDefault();
	if (!$('.row').classList.contains('right')) {
		$('.row').classList.add('right');
		$('.row').classList.remove('left');
	} else {
		$('.row').classList.remove('right');
	}
}

function toggleLeft(e) {
	e.preventDefault(e);
	if (!$('.row').classList.contains('left')) {
		$('.row').classList.add('left');
		$('.row').classList.remove('right');
	} else {
		$('.row').classList.remove('left');
	}
}

$('#meButton').addEventListener('click', toggleLeft);

$('#commentButton').addEventListener('click', toggleRight);

hammer($('.left-box')).on('swipeleft', function(event) {
    $('.row').classList.remove('left');
});

hammer($('.right-box')).on('swiperight', function(event) {
    $('.row').classList.remove('right');
});