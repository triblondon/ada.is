---
layout: post
title:  "Why I stopped using requirejs and commonjs modules for small client side webapps."
categories: Blog
author: Ada Rose Edwards
---

Warning opinion piece ahead,

### Preface
I've recently been trying to step away from server side precompilation of my code. 
My main reason is to avoid needing to have a build step call it nostalgia but I miss
being able to ship code as is.
Call down code as it's required rather than in one giant lump at the start.
I don't like deploying the compiled code.
I've been liking static sites more and more and this goes hand in hand.
A well progressively enhanced site should use the JS to add functionality as it
loads. A fully functional site should be presented as soon as possible and should
still work if a user navigates before the js has finished.

### Why you should not follow my example,
Performance some sites need all their script up-front so this should be provided allows for
minification and less http overhead.

### Why not also stop using css preprocessors?
CSS imports all happen before first render so are heavy.

### Disclaimer
I will still use commonjs if shipping a site with a node back end since the technical
overhead of compiling then caching that for future requests is tiny.
