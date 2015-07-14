---
layout: post
title:  "Const & Immutable Objects"
categories: Blog
author: Ada Rose Edwards
---

ES6 introduces the `const` keyword. One issue I've seen raised a few times by people whom I are skilled but unfamiliar with ES6 is that when an object is defined using const it is not immutable.

The goal of this blog post is to go into detail about const and cover some ways es6 handles immutability.

One question I've been asked a few times recently is when given the following example:

{% highlight js %}
// This will be populated later
const myArray = [];
// this object will too:
const myObject = {};
{% endhighlight %}

> If myArray and myObject is const how can you populate them later?

## What is const how is it different from var?

The `const` keyword like it's mutable counterpart `let` is block scoped (e.g. will be scoped within an if or for statement). This prevents variables being [hoisted](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var#var_hoisting) outside of their block statement.

### Block scoping

{% highlight js %}
if (true) {
const myVar = 1;
const myFunc = function (a) { console.log(a) };
myFunc(myVar);
}
myFunc(2);
// 1
// ReferenceError: myFunc is not defined
myVar;
// ReferenceError: myVar is not defined
{% endhighlight %}

Compared to:

{% highlight js %}

myVar;
// undefined
// note: undefined not reference error since my var has been hoisted from the if block

myFunc();
// TypeError: undefined is not a function
// note: myFunc has been hoisted giving us a not very useful error here

if (true) {
  var myVar = 1;
  function myFunc(a) { console.log(a) };
  myFunc(myVar);
  // 1
}

myVar;
// 1
// this variable is still hanging around even though we should be done with it
myFunc(2);
// this function is also still around even though we should be done with it.
{% endhighlight %}

### Immutability

The property that we are interested in is that it is constant. What that means is that value assigned to it will not change if it is updated.

{% highlight js %}
const myVar = 2;
// undefined
myVar = 3;
// 3
myVar
// 2
{% endhighlight %}

#### But what about with Arrays and other Objects?

This raises an interesting point.
A well known subtlety of JavaScript in which when a new `Array`, `Object`, `Function` or another Object is initiated what is returned is not a literal but a pointer to the new array, object or function which is created.

So in the case of Arrays it is not the Array itself which cannot change but the pointer to the array.

{% highlight js %}
const myArray = [];
// undefined
myArray.push(3);
// 1
myArray
// [3]
myArray = [5, 6];
// [5, 6]
myArray
// [3]
{% endhighlight %}

This is good because it allows us to declare that this array should not be over ridden and will maintain the same memory space. This is a good property because we will not be creating new Arrays and Objects and using up lots of memory needlessly.

## What if I do want my object to be immutable?

The two new ES6 Object properties Seal and Freeze are for this purpose.

<span class="gallery-item" style="float: right;">![Pun Alert: Seal and Freeze!](https://upload.wikimedia.org/wikipedia/commons/5/5f/Pusa_hispida_pup.jpg)<br /> *Pun Alert: Seal and Freeze!*</span>

* `Object.seal` stops items being added to or deleted from the object, but you can update the existing properties.

* `Object.freeze` makes the object totally immutable. Like seal new properties cannot not be added or removed but also they cannot be changed. Important to remebmer that like earlier child Arrays and Objects are still just pointers to the array so they can still be modified. 

{% highlight js %}
const myObject = {a: {b: 1}, c: 2};

Object.freeze(myObject);
// note myObject is changed in place
// so the object is still frozen even though it is const

myObject.c = 2; // fails silently

myObject
// {a: {b: 1}, c: 2}

myObject.b.d = 2; // child object is not frozen

myObject
// {a: {b: 1, d: 2}, c: 2}
{% endhighlight %}
