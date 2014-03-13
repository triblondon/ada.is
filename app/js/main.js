(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}]},{},[1])