console.log('Starting Scripts');


var hammer = require('hammerjs');
var optimizedResize = require('./optimizedresize');
var $ = function (str) {
	return document.querySelector(str);
};

var writeHeights = function () {
	$('.btn.btn-left').style.height = window.innerHeight + 'px';
	$('.btn.btn-right').style.height = window.innerHeight + 'px';
};
writeHeights();
optimizedResize.init(writeHeights);

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

hammer($('.left-box')).on('dragleft', function(event) {
	event.preventDefault();
    $('.row').classList.remove('left');
});

hammer($('.right-box')).on('dragright', function(event) {
	event.preventDefault();
    $('.row').classList.remove('right');
});

hammer($('.btn.btn-left')).on('dragright', function(event) {
	event.preventDefault();
	event.stopPropagation();
    $('.row').classList.add('left');
    $('.row').classList.remove('right');
});

hammer($('.btn.btn-right')).on('dragleft', function(event) {
	event.preventDefault();
	event.stopPropagation();
    $('.row').classList.add('right');
    $('.row').classList.remove('left');
});