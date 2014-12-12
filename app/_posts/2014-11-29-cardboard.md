---
layout: post
title:  "Audio visualisation in WebGL"
categories: Blog
author: Ada Rose Edwards
---

[[Glitch Bunny]](https://1am.club/~ada/cardboard/) is an audio visualisation. It uses input from the microphone via webaudio and maps it onto a bunny.

<p>[WebM video size 6.5mb click to load.]</p>
<video class="gallery-item" data-src="/post_resources/BunnyBunny.webm" poster="/post_resources/BunnyBunnyPreview.jpeg" preload="none" autoplay="false" loop="true" controls="controls">
	Sorry it appears video is not supported in your browser.
</video>

Later support for google cardboard and better lighting was added. The source code is [[Here]](https://github.com/AdaRoseEdwards/SoundThing)

## Why?

I wanted to do some interesting data visualistation. I had a half finished guitar tuner I was writing (never did finish) and that inspired me to hook it up to that. The challenges were mostly in getting and maintainging 30-60fps on mobile whilst fourier transforming audio and mapping it to a 3d object. 

## How?

The Algorithm is nice and simple. (/js/processVerts.js) I take the Audio data which has been fourier transformed into 16 buckets. I then remove the highest 50% of the frequency bins because they weren't that interesting and were quite noisy. I wanted it to be best for music.

The algo:


{% highlight javascript %} 


function updateAudioData(d) {
	var l = d.length;
	for (var i = 0; i < l; i += 1) {
		currentAudioData[i] = parseFloat(d[i]);
		previousAudioData[i] = (previousAudioData[i] || 0) + currentAudioData[i];
		sumOfSquareDeviations[i] = (sumOfSquareDeviations[i] || 0) + Math.pow(currentAudioData[i] - averageAudioChannel(i), 2);
	}
	count++;
}

function standardDeviation(i) {
	if (count > 2) {
		return Math.sqrt(sumOfSquareDeviations[i]/(count -1));
	} else {
		return 0;
	}
}

function scaleSphere(p, t, array) {
	var scale = 0;
	var l = array.length;
	for (var i = 0; i < l; i++) {
		var amplitude = (array[i] - averageAudioChannel(i)) / standardDeviation(i);
		scale += amplitude/(l * Math.log(i + 2)) * (Math.sin(i * i * Math.PI * p / l) + Math.cos(i * i * Math.PI * t / l));
	}
	return 1 + scale;
}

// Map the x,y,z to phi, theta, r (radius) spherical coordinates.
function convertCartesianToSpherical(cartesian) {

	var r = Math.sqrt(cartesian.x * cartesian.x + cartesian.y * cartesian.y + cartesian.z * cartesian.z);
	var lat = Math.asin(cartesian.z / r);
	var lon = Math.atan2(cartesian.y, cartesian.x);
	return {
		p: lat,
		t: lon,
		r: r
	};
}

{% endhighlight %}

`scaleSphere` maps different frequencies to different points on the sphere. Higher frequencies have more spikes and lower frequencies have fewer the video below shows what happens if we turn on only one frequency bin at a time:

<p>[WebM video size 1.6mb click to load.]</p>
<video class="gallery-item" data-src="/post_resources/bunny_debug.webm" poster="/post_resources/bunny_debugPreview.jpeg" preload="none" autoplay="false" loop="true" controls="controls">
	Sorry it appears video is not supported in your browser.
</video>

As you can see as we turn on higher frequencies the rabbit gets spikier.

    amplitude/(l * Math.log(i + 2)) * (Math.sin(i * i * Math.PI * p / l) + Math.cos(i * i * Math.PI * t / l));

Is the very simple formulae, the amplitude of the frequency spike is `amplitude/(l * Math.log(i + 2))` which makes higher frequencies have greater affect so the motion is not driven so much by the loud bass. `Math.sin(i * i * Math.PI * p / l) + Math.cos(i * i * Math.PI * t / l)` is a standing wave with i<sup>2</sup> nodes map to the 2D surface of the model. 

## Performance

The bunny has 1569 vertices which are updated on every requestAnimationFrame with a fair amount of Maths, so the vertices are not cached which I can imagine makes it more difficult for the shadow mapping algorithm in three.js. 

I run the bulk of the calculations for the vertices in a service worker then pass them back to the main app to update the mesh. This allows the 3d render to stay in 60fps and the mesh gets updated when the new vertices are calculated.

It runs very fast on my Nexus 5 which is nice although it kills my 1st gen Moto X.

## Cardboard

After seeing some Virtual Reality demoes in the borwser I used the three.js cardboard demoes to add cardboard support it works really well and required no calibration. VR in the browser is super easy and a fun weekend project.

## Future Work?

 * Algorithm improvements to make the effect look better.
 * Add a sky box so you can tell you are turning in VR.
 * Probably can squeeze out some more performance.
 * Add occulus rift support.