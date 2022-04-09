---
layout:      post
date:        2016-02-20 13:58:16 +0200
title:       "Creating Ember CLI Addon with External Library. Part 2"
lang:        en
tags:
    - technology
    - ember
    - javascript
    - tutorial
description: >
    In this post we will finish development of ember-cli-webfontloader
    addon and I will describe some issues you might experience during
    addon development, so you can gain some experience of solving those
    by reading.
---
In my [previous post][p] I covered basics about how to wrap the third-party library in [Ember CLI][ecli] addon, so it can be reusable, and used in Ember-way.

**Note**: This article will cover only a few issues that you might face during addon development, so I wouldn't say that it's a tutorial.

In this part I will try to finish the [ember-cli-webfontloader][ecw] addon by doing following:
* trying to find a nice solution of managing weird WebFontLoader's event system logic
* restructuring the addon to isolate it a bit more

## Problem

After reading the [WebFontLoader][wfl] docs, I found that they are using probably the strangest event system you can find out there. The problem is that you need to use either a global variable or you need to pass configuration directly to `.load()` function which we use to load fonts.

In our case, we want the configuration to contain only the fonts we want to load, so we need to find a way of having something more flexible.

My first idea was to create a service that will attach its generic functions to configuration object, which will call our "real" event callbacks on event. But unfortunately this idea failed after a few atempts as I couldn't find a way of injecting a service to initializer, so I decided to go a bit lame way, I decided to extend `WebFont` object.

We need to track somehow the state of WebFontLoader, add event handlers and if the event is already active (such as `active`, `loading` etc.) we need to be able to run the callback immediately. I will implement two functions: `on(string event, function callback, boolean runIfActive)` and `off(string event, function callback)`.

Idea is such that `on()` function will add callbacks to the list and when an event is fired, the main event handler will execute all callbacks from the appropriate list.

The full list of events is:

* loading
* active
* inactive
* fontloading
* fontactive
* fontinactive

Here I will focus on covering the first three events: loading, active, inactive.

## Solution

Let's outline the extension to the library:

```javascript

// ember-cli-webfontloader/app/initializers/ember-cli-webfontloader.js
export function initialize(...) {
  ...
  let events = {
      // current state of WebFontLoader
      state: null,

      // Collection of callback functions to be called
      // when the appropriate event is fired
      eventHandlers: {
          active: [],
          inactive: [],
          loading: [],
      },

      // Real `active` callback
      onActive() {  events.state = 'active'; },

      // Real `inactive` callback
      onInactive() {  events.state = 'inactive'; },

      // Real `loading` callback
      onLoading() {  events.state = 'loading'; }
  };
  ...
}
```

To extend the plugin in a good manner, we need to have some sort of an isolated container. Let's call ours `__events__`:

```javascript
// ember-cli-webfontloader/app/initializers/ember-cli-webfontloader.js
export function initialize(...) {
  ...
  // Extending WebFont
  WebFont.__events__ = events;
  ...
}
```

And let's define our `on()` function directly on the `WebFont` object so in can be accessable from outer world:

```javascript
// ember-cli-webfontloader/app/initializers/ember-cli-webfontloader.js
export function initialize(...) {
  ...
  // Adds a callback to the eventHandlers[event] list and
  // if "toRun" is true and the current state is event name,
  // we need to run callback function after we add it to the list
  WebFont.on = (event, callback, toRun) => {
    // Adding new handler to the list
    WebFont.__events__.eventHandlers[event].push(callback);

    // Checking if we should run it now
    if (toRun && event === WebFont.__events__.state) {
        callback();
    }
  };
  ...
}
```

Cool, looks promising. Now we need to attach these `onActive`, `onInactive` and `onLoading` functions to the WebFontLoader configuration object.

```javascript
// ember-cli-webfontloader/app/initializers/ember-cli-webfontloader.js
export function initialize(...) {
    ...
 // Getting all font families that should be loaded from
    // configuration
    let config = Ember.get(ENV, 'webFontConfig') || {};

    config.loading = events.onLoading;
    config.active = events.onActive;
    config.inactive = events.onInactive;

    WebFont.load(config);
    ...
}
```

After these steps we can inject the `WebFont` object to the component/route/whatever and do the following:

```javascript
// ember-cli-webfontloader/tests/dummy/app/routes/application.js
import Ember from 'ember';
import { WebFont } from 'webfontloader';

export default Ember.Route.extend({
    actions: {
        didTransition() {
            WebFont.on('inactive', () => {
                console.log('inactive!');
            }, true);
            WebFont.on('loading', () => {
                console.log('loading!');
            }, true);
            WebFont.on('active', () => {
                console.log('active!');
            }, true);
        }
    }
});
```

By doing this we will create event handlers that will be executed on each of three events we covered here: loading, active, inactive.

## Good Practice

As some of you could notice, we're injecting our initializer directly to the application namespace, which is not a good idea, let's keep our application namespace for an application.

We'll create a new file `addon/initializers/ember-cli-webfontloader.js` and copy the contents of the according file from `app/` folder and switch from exporting an initializer to export a function that will accept a configuration file, to which we have access only from `app` namespace:

```javascript
// addon/initializers/ember-cli-webfontloader.js
import { WebFont } from 'webfontloader';

export default function setupWebFont(config) {
    // Extending WebFont
    let events = {
        ...
    };

    // Setting up our functions
    config.loading      = events.onLoading;
    config.active       = events.onActive;
    config.inactive     = events.onInactive;
    config.fontloading  = events.onFontloading;
    config.fontactive   = events.onFontactive;
    config.fontinactive = events.onFontinactive;

    // Load with an updated configuration
    WebFont.load(config);
}
```

After doing that we still need to export an initializer to `app` namespace, but we'll do this more gently:

```
// app/initializers/ember-cli-webfontloader.js
import Ember from 'ember';
import ENV from '../config/environment';
import setupWebFont from 'ember-cli-webfontloader/initializers/ember-cli-webfontloader';
export default {
    name: 'ember-cli-webfontloader',
    initialize() {
        const config = Ember.get(ENV, 'webFontConfig') || {};
        setupWebFont(config);
    }
};
```

Ok, that's it, we keep our _actual_ initializer in `addon/` folder and here we just pass environment configuration.

Done.

If you have any comments and/or found some lame mistakes here, please let [me know][twitter].

## Links
* [ember-cli-webfontloader - GitHub][ecw] (here you can find sources of the plugin)
* [WebFontLoader - GitHub][wfl]

[p]: /blog/creating-ember-cli-addon-with-external-library-part-2
[wfl]: https://github.com/typekit/webfontloader
[ecw]: https://github.com/kuzzmi/ember-cli-webfontloader
[ecli]: http://www.ember-cli.com
[twitter]: http://twitter.com/kuzzmi
