---
layout:      post
date:        2016-02-15 16:50:36 +0200
title:       "Creating Ember CLI Addon with External Library. Part 1"
lang:        en
tags:
    - technology
    - ember
    - tutorial
    - javascript
description: >
    In this post I'll try to describe a step-by-step
    creation of Ember CLI addon for wrapping an external
    library, covering just basics that will allow you to
    wrap your favorite libraries and reuse them in Ember.
---
In the comments section to my previous [post][post] Ken Snyder suggested to wrap the [WebFontLoader][wfl] library in [Ember CLI][ecli] addon. That is definitely a good idea because using [WebFontLoader][wfl] is a wise solution when it comes to loading web fonts and detecting whether the font is loaded or not.

So let's try to make this addon together.

First things first, let's create an outline of what our addon has to do:
1. It has to load fonts
2. It has to allow using WebFontLoader events system

**Note**: This tutorial will teach you only the basics that you need to wrap your favorite library in ember addon. So in this part I will cover only the first item from the list.

## Preparation

To start developing our addon we need to generate a basic addon structure, to do that we need to execute:

```
ember addon ember-cli-webfontloader
```

After a few moments ember-cli will create a folder structure with all necessary files and initiate `bower install` and `npm install`. After that you'll have a basic \"do nothing\" addon sources.

As you may know, [Ember][e] follows the “convention over configuration”, the same does Ember CLI, this is why you may find the generated structure pretty familiar:

```
|~ember-cli-webfontloader/
| |+.git/
| |+addon/
| |+app/
| |+bower_components/
| |+config/
| |+node_modules/
| |+tests/
| |+tmp/
| |+vendor/
| |-.bowerrc
| |-.editorconfig
| |-.ember-cli
| |-.gitignore
| |-.jshintrc
| |-.npmignore
| |-.travis.yml
| |-.watchmanconfig
| |-bower.json
| |-ember-cli-build.js
| |-index.js
| |-LICENSE.md
| |-package.json
| |-README.md
| `-testem.json
```

**Note**: Unfortunately, at the time of writing this post, the latest version of [Ember][e] (2.3.1) has a bug, related to the new version of [jQuery][jq] (1.12). Ember is not able to handle the new version of jQuery and `ember test` and `ember server` are not working because of that. See StackOverflow topic related to that issue: [link](http://stackoverflow.com/questions/34702284/getting-uncaught-error-assertion-failed-ember-views-require-jquery-between-1). The solution from SO answer:
> For now you can change the following line in your `bower.json` file. Then run `bower install` and it should work.
`\"jquery\": \"^1.11.3\"`, to `\"jquery\": \"1.11.3\"`

After we installed all our dependencies we need to check if everything is working. In order to do this, run:

```
ember t
```

`ember t` is a shortcut for `ember test`.

If everything is fine, you'll see the result of successfuly passed tests.

Ok, so we're ready to move forward. We need to obtain the third party library. Usually, this can be done by using the power of [Bower][b], but at the moment of writing, [WebFontLoader][wfl] is still **not** using [Bower][b], according to their [issue tracker](https://github.com/typekit/webfontloader/issues/302), so we need to download the library from their release page, or via a [direct link](https://github.com/typekit/webfontloader/raw/master/webfontloader.js) and put it to `/vendor/` folder.

The steps for adding a bower dependency are not yet covered here, but they will be as soon as WebFontLoader team releases it there.

## Configuring Addon

Next step is to tell what should be included into Ember app, after the addon is installed. To do this, we need to use our `/index.js` file which is an entrance point of our addon.

```javascript
// ember-cli-webfontloader/index.js
'use strict';

module.exports = {
    name: 'ember-cli-webfontloader',

    included(app) {
        this._super.included(app);
        this.app.import('vendor/webfontloader.js', {
            type: 'vendor'
        });
    }

};
```

As our library is external and it is using one single global variable, JSHint will either complain about using unassigned variable or we need to write in all our files `/* globals WebFont: true */`. To avoid both cases we need somehow make this variable exportable by using module system from ES6. To do this we need create a shim file, let's say, in `/vendor/webfontloader.shim.js` with the following structure:

```javascript
// vendor/webfontloader.shim.js
/* globals WebFont */

'use strict';

define('webfontloader', [], function() {
    return { 'default': WebFont };
});
```

After doing that we have to update `/index.js` and include our shim file and mark it as exporable:

```javascript
// ember-cli-webfontloader/index.js
...
  this._super.included(app);
        this.app.import('vendor/webfontloader.js');
        this.app.import('vendor/webfontloader.shim.js', {
         type: 'vendor',
   exports: { 'webfontloader': ['default'] }
        }
...
```

Alright, now we can start with implementing features we outlined earlier.

Usually, we need to load fonts only once and to do so in the first place, after an application is loaded. Therefore we're probably gonna use `initializer`, Ember's framework part, that allows you to do stuff as your app boots. If you're not familiar with them, please check [Ember's guide](https://guides.emberjs.com/v2.1.0/applications/initializers/).

So, let's create an initializer by running:

```
ember g initializer ember-cli-webfontloader
```

This will create 3 files: initializer file, test file, and one for being inserted as an initializer to the actual app. We need only the first one, where we should keep all our logic.

Here's how the initializer will look like:

```javascript
// app/initializers/ember-cli-webfontloader.js
// Let's keep our configuration in the main configuration file
import Ember from 'ember';
import ENV from '../config/environment';
import WebFont from 'webfontloader';

export function initialize() {
 // Checking configuration for webFontConfig
    if (!Ember.get(ENV, 'webFontConfig')) {
        return;
    }

 // Getting all font families that should be loaded from
    // configuration
    let config = Ember.get(ENV, 'webFontConfig');

 // If there are families, we need to load them
    if (Object.keys(config).length) {
        WebFont.load(config);
    }
}

export default {
    name: 'ember-cli-webfontloader',
    initialize
};
```

That's all we need here to do. We check config, get font-families that we want to load, and load them. Now we can mark our first bullet as done.

### Installing and Sanity Checking

So now we need to install our addon to check how it's working:

```
ember install ember-cli-webfontloader
```

In order to check if our addon is working with a real app, Ember CLI creates a folder called `dummy` which is created specifically for that and is served, when we use `ember server` command. So running `install` command will install our addon to the dummy application.

After we configure our dummy app to use some font-families:

```javascript
// config/environment.js
'use strict';

module.exports = function() {
    return {
        webFontConfig: {
            google: {
                families: ['Roboto Mono']
            }
        }
    };
};
```

Also we need to update the css file:

```css
/* ember-cli-webfontloader/tests/dummy/app/styles/app.css */

html {
    font-family: 'Roboto Mono'
}
```

Now we can start our app and see if it works:

```
ember serve
```

If we navigate to `localhost:4200`, you will see, that it displays `Welcome to Ember` written with Roboto Mono font.

So now you have already working addon, which can do something useful. In the next part, I will try to cover by solving problem #2 (working with events) how we can inject services, some other techniques of how we can improve structure and independence of our current version.

## Links
* [WebFontLoader - GitHub][wfl]
* [Ember CLI - Developing addons and blueprints](http://ember-cli.com/extending/#developing-addons-and-blueprints)
* [Converting libraries to Ember CLI addons](https://gist.github.com/kristianmandrup/ae3174217f68a6a51ed5#file-converting-libraries-to-ember-cli-addons-md)
* [Creating an Ember.js Addon With the Ember CLI](http://johnotander.com/ember/2014/12/14/creating-an-emberjs-addon-with-the-ember-cli/)

[jq]: http://jquery.com
[post]: https://kuzzmi.com/blog/web-fonts-webfontloader-and-ember \"Web Fonts, WebFontLoader and Ember | Blog | Igor Kuzmenko\"
[wfl]: https://github.com/typekit/webfontloader \"WebFontLoader - GitHub\"
[ecli]: http://ember-cli.com \"Ember CLI\"
[e]: http://emberjs.org
[b]: http://bower.io/
