---
layout:      post
date:        2016-02-07T17:54:44Z
title:       "Web Fonts, WebFontLoader and Ember"
lang:        en
tags:
    - technology
    - javascript
    - tips
    - ember
    - fonts
    - web development
description: >
    In this post I describe why it can be a good idea to
    use Web Font Loader library and how to use it with
    Ember application.
---
In this blog I'm doing one not so tricky, though not trivial thing, when I want to set a navigational indicator styling based on the current "active" route.

While using the web fonts, font-based styling can become a challenge, especially if you need to do this on the page load.
The problem is that styling will be done based on the first rendered font before your custom fonts are loaded, so the end result will be wrong.

Of course, you might try using timeouts, but this will not work as the long term solution. Basically as always :) My very first attempt was simply delaying styling by using timeouts, but when the network was slow, nothing worked as supposed to, so I decided to go with more robust solution.

**Note**: This solution will work only if the fonts you're going to use are from [Google Fonts](https://www.google.com/fonts) or [Typekit](http://www.typekit.com/) and some others, but not so many things are needed to be changed to use other webfonts providers.

First of all you need to get [**Web Font Loader**](https://github.com/typekit/webfontloader) script, which is "co-developed by Google and [Typekit](http://www.typekit.com/)."

WFL (Web Font Loader) README file says:

> Web Font Loader gives you added control when using linked fonts via @font-face. It provides a common interface to loading fonts regardless of the source, then adds a standard set of events you may use to control the loading experience.

After obtaining the script, you need to include it to your Ember-cli-build configuration:

```javascript
// ember-cli-build.js
...
app.import('vendor/webfontloader.js');
...
```

Then we need to create a new initializer as we want this to happen only on the initial loading. So we can do this as usual: `ember generate initializer webfont-loader`.

Then we may define a list of fonts that we can use for our appilication:

```javascript
// app/initializers/webfont-loader.js

/* globals WebFont */
export function initialize() {
    WebFont.load({
        google: {
            // Here we can define our list of fonts.
            // To know how to use the WebFont loader please
            // check their documentation:
            // https://github.com/typekit/webfontloader
            families: ['Roboto Mono:400,500,700']
        }
    });
}

export default {
  name: 'webfont-loader',
  initialize
};
```

That is basically it. The result of doing this will be a few events that you can use to do what you need.

Unfortunatelly these events are just simple classes on your `<html>` element, but it's fairly enough to do what I needed: to set the width of the "navigational indicator".

I'm using one more initializer to reopen the `Ember.Route` class and add more things to its `didTransition` actions:

```javascript
import Ember from 'ember';

// this is not the best solution from design perspective,
// although is the easiest and the most comprehensive
var initialized = false;

export function initialize() {
    if (initialized) {
        return;
    }
    Ember.Route.reopen({
        actions: {
            didTransition() {
                let areFontsLoaded = false;
                let page = Ember.$('html');

                // Here I'm setting the styles of the indicator
                let setIndicator = () => {
                    let indicator = Ember.$('nav .active-indicator')[0];
                    let activeLink = Ember.$('nav li a.active')[0];
                    if (indicator && activeLink) {
                        indicator.style.left  = activeLink.offsetLeft + 'px';
                        indicator.style.width = activeLink.offsetWidth + 'px';
                    }
                };

                // And I'm doing this only when the fonts are loaded
                if (areFontsLoaded) {
                    setIndicator();
                } else {
                 // Otherwise we check our <html> tag for wf-active
                    // class which is set when the fonts are loaded
                    let checker = setInterval(() => {
                        if (page.hasClass('wf-active')) {
                            areFontsLoaded = true;
                            setIndicator();
                            clearInterval(checker);
                        }
                    }, 10);
                }

                return true;
            }
        }
    });
    initialized = true;
}

export default {
  name: 'nav-indicator',
  initialize
};
```

That was a small example of the usefulness of Web Font Loader library and how to put it inside Ember application.

Please let [me know][twitter] if you have any questions or you have solved this problem in a different way.

**UPDATE 20/02/2016**: As per discussions in comments and suggestions from Ken and Andrey, I've published [ember-cli-webfontloader](https://www.npmjs.com/package/ember-cli-webfontloader) addon to avoid all that headache. You may use it, but anyway, I believe that this post is not just about solving one problem, but for showing you, how to solve one-time problems like that.

[twitter]: http://twitter.com/kuzzmi
