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
// This Array will be populated later
const myArray = [];

// this Object too:
const myObject = {};
{% endhighlight %}

> If myArray and myObject are const how can you populate them later?

## What is const, how is it different from var?

The `const` keyword decalares an constant variable like it's mutable counterpart `let` it is block scoped (e.g. will have its scope constrained within a block statement, `if`, `for`, `while` etc). This prevents variables being [hoisted](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var#var_hoisting) outside of their block statement. <a href="#block-scoping">Block scoping is covered at the bottom of this article</a>.

## The Immutability of Const,

The property of const that differentiates it from `let` is that it is constant. What that means is that value assigned to it will not change if it is updated.

{% highlight js %}
const myVar = 2;
// undefined
myVar = 3;
// 3
myVar
// 2
{% endhighlight %}

Note that it does not throw an error, it just leaves the variable unchanged.
This could potentially lead to a hard to identify bug so watch out.

#### But what about with Arrays and other Objects?

A well known subtlety of JavaScript is that, much like other c based languages, when a new `Array`, `Object`, `Function` or another object is initiated what is returned is not the value itself but a reference to what we just created.

So in the case of Arrays it is not the Array itself which cannot change but the reference to the array.

{% highlight js %}
const myArray = [];
// undefined

// Array can be modified in place
myArray.push(3);
// 1
myArray
// [3]

// Array cannot be overwritten
myArray = [5, 6];
// [5, 6]
myArray
// [3]
{% endhighlight %}

This is good because it allows us to declare that this array should not be overridden and will maintain the same memory space. This is a good property because we will not be creating new Arrays and Objects and using up lots of memory needlessly.

<p class="notebene">
Unlike many other languages strings in JavaScript are not objects and are immutable if const.
{% highlight js %}
const myString = "Hello World";
// undefined
myString[0] = "'";
// "'"
myString
// "Hello World"
{% endhighlight %}
</p>

## What do I do if I want my object to be immutable?

The two new ES6 Object properties Seal and Freeze are for this purpose.

<span class="gallery-item" style="float: right;">![Pun Alert: Seal and Freeze!](https://upload.wikimedia.org/wikipedia/commons/5/5f/Pusa_hispida_pup.jpg)<br /> *Pun Alert: Seal and Freeze!*</span>

* `Object.seal` stops items being added to or deleted from the object, but you can update the existing properties.

* `Object.freeze` makes the object totally immutable. Like seal new properties cannot not be added or removed but also they cannot be changed. Important to remebmer that like earlier child Arrays and Objects are still just references to the array so they can still be modified. 

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

<h2 id="block-scoping">Block scoping of let and const</h2>

The two new variable declarations introduced in ES6, `let` and `const`, are both block scoped. Meaning that they only have scope in their block (between {}). This is great because it allows variables to be declared closer to where they are used. Also allow for more explicit code as one can infer how a variable will.

{% highlight js %}
if (true) {
  const myVar = 1;
  const myFunc = function (a) { console.log(a) };
  myFunc(myVar);
  // 1
}
myFunc(2);
// ReferenceError: myFunc is not defined

myVar;
// ReferenceError: myVar is not defined
{% endhighlight %}

Compared to the ES5 version which by just declaring functions and vars leaves the scope (and memory) cluttered with functions we are no longer interested in. The hoisted variables have the value `undefined` before they are initialized and linger after they are used.

If you wanted to scope a var in ES5 you would use an Immediately-Invoked Function Expression (IIFE) and to make the scope more clear you should declare your vars and functions at the top of their scope rather than as soon as they are required. Const, by limiting the scope the variables can be declared much closer to where they are used.

{% highlight js %}

myVar;
// undefined
// note: undefined not reference error because
// myVar has been hoisted from the if block

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
// 2
// this function is also still around even though we should be done with it.

// To restrict scope in ES5 one would use an IIFE
// (Immediately-Invoked Function Expression)

(function () {
	var scopedVar = 2;
	scopedVar;
	// 2
})();

scopedVar;
// ReferenceError: scopedVar is not defined

{% endhighlight %}
