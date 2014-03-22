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

function close(noHistory) {
	if ($('.row').classList.contains('left') || $('.row').classList.contains('right')) {
		if (!noHistory) {
			history.pushState({sidebar: 'closed'}, '', '#main');
		}
		$('.row').classList.remove('right');
		$('.row').classList.remove('left');
	}
}

function openRight(noHistory) {
	if (!$('.row').classList.contains('left')) {
		close(true);
		if (!noHistory) {
			history.pushState({sidebar: 'right'}, '', '#right');
		}
		$('.row').classList.add('right');
	}
}

function openLeft(noHistory) {
	close(true);
	if (!$('.row').classList.contains('left')) {
		if (!noHistory) {
			history.pushState({sidebar: 'left'}, '', '#left');
		}
		$('.row').classList.add('left');
	}
}

function toggleRight(e) {
	e.preventDefault();
	if (!$('.row').classList.contains('right')) {
		openRight();
	} else {
		close();
	}
}

function toggleLeft(e) {
	e.preventDefault(e);
	if (!$('.row').classList.contains('left')) {
		openLeft();
	} else {
		close();
	}
}

window.addEventListener('popstate', function (event) {
	var sidebar = history.state ? history.state.sidebar : 'closed';
	if (sidebar === 'left') {
		openLeft(true);
	}
	if (sidebar === 'right') {
		openRight(true);
	}
	if (sidebar === 'closed') {
		close(true);
	}
});


$('#meButton').addEventListener('click', toggleLeft);
$('#commentButton').addEventListener('click', toggleRight);

hammer($('.left-box')).on('dragleft', function(event) {
	event.preventDefault();
    close();
});

hammer($('.right-box')).on('dragright', function(event) {
	event.preventDefault();
	close();
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