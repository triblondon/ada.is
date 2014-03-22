var hammer = require('hammerjs');
var optimizedResize = require('./optimizedresize');
var $ = function (str) {
	return document.querySelector(str);
};

var writeHeights = function () {
	$('.btn.btn-left').style.height = window.innerHeight + 'px';
	$('.btn.btn-right').style.height = window.innerHeight + 'px';
	$('.right-box').style.height = window.innerHeight + 'px';
	$('.left-box').style.height = window.innerHeight + 'px';
};
writeHeights();
optimizedResize.init(writeHeights);

function closeRight() {
	history.replaceState({sidebar: 'closed'});
	$('.row').classList.remove('right');
}

function closeLeft() {
	history.replaceState({sidebar: 'closed'});
	$('.row').classList.remove('left');
}

function openRight() {
	closeLeft();
	history.replaceState({sidebar: 'right'});
	$('.row').classList.add('right');
}

function openLeft() {
	closeRight();
	history.replaceState({sidebar: 'left'});
	$('.row').classList.add('left');
}

function toggleRight(e) {
	e.preventDefault();
	if (!$('.row').classList.contains('right')) {
		openRight();
	} else {
		closeRight();
	}
}

function toggleLeft(e) {
	e.preventDefault(e);
	if (!$('.row').classList.contains('left')) {
		openLeft();
	} else {
		closeLeft();
	}
}

$('#meButton').addEventListener('click', toggleLeft);
$('#commentButton').addEventListener('click', toggleRight);
window.addEventListener('popstate', function (event) {
	var sidebar = history.state ? history.state.sidebar : 'closed';
	if (sidebar === 'left') {
		openLeft();
	}
	if (sidebar === 'right') {
		openRight();
	}
	if (sidebar === 'closed') {
		closeLeft();
		closeRight();
	}
});

hammer($('.left-box')).on('dragleft', function(event) {
	event.preventDefault();
    closeLeft();
});

hammer($('.right-box')).on('dragright', function(event) {
	event.preventDefault();
	closeRight();
});

hammer($('.btn.btn-left')).on('dragright', function(event) {
	event.preventDefault();
	event.stopPropagation();
    openLeft();
});

hammer($('.btn.btn-right')).on('dragleft', function(event) {
	event.preventDefault();
	event.stopPropagation();
    openRight();
});