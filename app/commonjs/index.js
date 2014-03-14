console.log('Starting Scripts');
var $ = function (str) {
	return document.querySelector(str);
};

function openLeft(e) {
	e.preventDefault();
	if (!$('.row').classList.contains('right')) {
		$('.row').classList.add('right');
		$('.row').classList.remove('left');
	} else {
		$('.row').classList.remove('right');
	}
}

function openRight(e) {
	e.preventDefault(e);
	if (!$('.row').classList.contains('left')) {
		$('.row').classList.add('left');
		$('.row').classList.remove('right');
	} else {
		$('.row').classList.remove('left');
	}
}

$('#meButton').addEventListener('click', openLeft);

$('#commentButton').addEventListener('click', openRight);