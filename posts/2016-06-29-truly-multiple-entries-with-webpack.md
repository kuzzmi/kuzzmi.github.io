---
layout:      post
date:        2016-06-29 15:16:15 +0200
title:       "Truly Multiple Entries with Webpack"
tags:        [ react, javascript, web development, webpack, tips ]
comments:    true
description: >
    In this post, I will try to explain how to handle
    situations when you need to use Webpack with a lot
    of small apps that share one codebase.
---
In this post, I will try to explain how to handle situations when you need to use [Webpack](https://webpack.js.org/) with a lot of small apps that share one codebase.

If you want to jump straight to the code, check out my [repository](https://github.com/kuzzmi/webpack-multiple-entries) on GitHub.

**NOTE:** Despite the fact that this happened to me already five times, I still consider this as a not typical case. Perhaps I was just _lucky_.

This is what we'll try to do:

![](/uploads/b54e37034d7de6913a4830a9b3e75fc1)

[Link to the image](/uploads/b54e37034d7de6913a4830a9b3e75fc1)

## Webpack is your bro

After using [Grunt](http://gruntjs.com/) and [Gulp](http://gulpjs.com/) for building JavaScript apps for quite a while, I find them a little bit meh. If you ask me "why?" I won't be able to answer, though. Probably I don't have that good experience with them. Or I do...

I can talk a lot about how awesome Webpack is, but to do this I need a whole new post, so let's focus on it and its configuration.

Imagine that you have two main folders: `core` and `apps`; the `apps` folder contains 50 micro SAPs. To make things easier, we'll call them widgets. Each widget is grouped by domain, thus one more level of nesting.

The folder structure may look like this, but it can be completely different:

{% highlight text %}
{% raw %}
~ src/
  + core/                          < where all reusable things are
  ~ apps/                          < microapps folder
    ~ weather/
      ~ temperature/
          index.html
          index.js                 < entry point
          App.js
          App.scss
          ListComponent.js
          ListComponent.scss
          ListComponent.spec.js
      + humidity/
      + sunrise/
    ~ news/
      + feed/
      + sport/
{% endraw %}
{% endhighlight %}

And that is what we want to get:
{% highlight text %}
{% raw %}
~ dist/
  ~ weather/
    ~ temperature/
        index.html
        bundle.js
        bundle.css
    + humidity/
    + sunrise/
  + news/
    vendor.js
    vendor.css
    core.js
    core.css
{% endraw %}
{% endhighlight %}

## Bundling bundle

The very first thing we need for bundling is to get a list of entry points. You can find _some_ documentation about multiple entry points in Webpack [here](https://webpack.github.io/docs/multiple-entry-points.html).

In our case entry points are these multiple `index.js` files, from which your application starts functioning. Webpack's multiple entry points object follows:

{% highlight text %}
{% raw %}
{
 entry: {
     %path_to_result_file_name%: %path_to_entry_point%,
        // or
     %path_to_result_file_name%: [ %path_to_entry_point_1%, %path_to_entry_point_2% ]
    }
}
{% endraw %}
{% endhighlight %}

Where `path_to_result_file_name` is a _path to the file_ we want to get as a result of bundling and `path_to_entry_point` is a path to the file OR a module name which we want to bundle.

For example, assume we have the following configuration:

{% highlight javascript %}
{% raw %}
{
 ...
    entry: {
     './one/cool/stuff/bundle.js': './src/another/nested/folder/index.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
    },
    ...
}
{% endraw %}
{% endhighlight %}

The result of the `webpack` will be:

{% highlight javascript %}
{% raw %}
./
~ dist
  ~ one
    ~ cool
      ~ stuff
          bundle.js          < bundled index.js and App.js
~ src
  ~ another
    ~ nested
      ~ folder
          index.js
          App.js             < this file is requested from index.js
webpack.config.js
{% endraw %}
{% endhighlight %}

If you have a wtf-face, that's fine.

In our case `[name]` was resolved as a `./one/cool/stuff/bundle.js`, the path relative to `path.join(__dirname, 'dist')`. So webpack has written a file to `path.join(__dirname, 'dist') + './one/cool/stuff/bundle.js'`, what will result in `/dist/./one/cool/stuff/bundle.js`.

So, if we take our initial folder structure, then we can easily create the following entries:

{% highlight javascript %}
{% raw %}
{
 ...
 entry: {
     './apps/weather/temperature/bundle.js': './src/apps/weather/temperature/index.js'
        ...
    },
    ...
}
{% endraw %}
{% endhighlight %}

Looks good and we already know what will be the result of running this.

The bad part is that in this case, all the shared stuff from `core` and all the modules will be duplicated in each `bundle.js`. To solve this problem and leave these bundles as slim as possible, we should add one more entry point and utilize one plugin:

{% highlight javascript %}
{% raw %}
{
 ...
 entry: {
     './apps/weather/temperature/bundle.js': './src/apps/weather/temperature/index.js'
        ...,
        'vendor': [ 'react', 'moment', ... ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    ]
    ...
}
{% endraw %}
{% endhighlight %}

If we want to extract our `core`, we can write another entry point with name `core` and use CommonsChunkPlugin one more time. If you want to know more about this plugin, you can check [here](https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin).

Now we're done with bundling things, but there is always "one more thing".

## Hot Module Replacement and React Hot Loader

I will not cover the whole Webpack Dev Server, [HMR](https://webpack.github.io/docs/hot-module-replacement.html), and [React Hot Loader](https://gaearon.github.io/react-hot-loader/) thing.

The only thing I'd like to tell here is what you need to do to get all that cool functionality working with a webpack config as we have made earlier.

To start listening to the HMR plugin you have two options: use `--inline --hot`, kind of Live Reload thing, or add two more items to each entry point:

{% highlight javascript %}
{% raw %}
 './apps/weather/temperature/bundle.js': [
  './src/apps/weather/temperature/index.js'
       'webpack/hot/only-dev-server',
       'webpack-dev-server/client?http://localhost:8080'
   ]
{% endraw %}
{% endhighlight %}

Doing so enables HMR on each entry. But there is still one more thing to do. If you run Webpack Dev Server and try to change a file, you'll see, that HMR expects the changes chunk to be available from the current folder, e.g. `http://localhost:8080/apps/weather/temperature/[hash].hot-update.json`, what will result in 404 error because by [default](https://github.com/webpack/webpack/blob/6b0c20a53ad7b04d4282a8a5c334ea0982fd364c/lib/WebpackOptionsDefaulter.js#L55) Webpack does this:

{% highlight javascript %}
{% raw %}
 this.set("output.hotUpdateChunkFilename", "[id].[hash].hot-update.js");
 this.set("output.hotUpdateMainFilename", "[hash].hot-update.json");
{% endraw %}
{% endhighlight %}

So the needed chunk is available from root path, not from the current directory. The default values are fine when you're developing one app. But while we're dealing with multiple apps, we need to override these settings by understanding where this chunk is:

{% highlight javascript %}
{% raw %}
{
 ...
    output: {
     ...,
        hotUpdateMainFilename: '../../../[hash].hot-update.json',
        hotUpdateChunkFilename: '../../../[id].[hash].hot-update.js'
    }
    ...
}
{% endraw %}
{% endhighlight %}

You can check all default values [here](https://github.com/webpack/webpack/blob/6b0c20a53ad7b04d4282a8a5c334ea0982fd364c/lib/WebpackOptionsDefaulter.js).

## Conclusion

Don't forget to extract CSS.

Instead of a conclusion, I'd like to say a few good words about Webpack.

"Just a tool" is great when it does dull and predictable things well. "The Tool" is great when you can use it in uncommon cases.

The JavaScript tooling was always kind of "just a tool" for me, but somehow Webpack managed to become my "The Tool" in a quite short period.

Although the documentation is _meh_, I __really__ encourage you to read the sources, so you'll get the whole picture of how it works and probably find more tricks.

If you know better ways of handling such cases, I'd love to see them in the comments. And don't hesitate to share the post if you find it useful.

----------

### P.S.

Why when it comes to more or less complex cases, each and every tutorial/boilerplate/template project is focused on just simple things?

One may say it's up to a developer to find out what to do with his own complicated case. I agree, but I find the fact, that you have close to none information about dealing with this kind of stuff, really disappointing.

I doubt that single page applications are the only thing that people do with JavaScript.

Argh...

## Update

I made an example project [on GitHub](https://github.com/kuzzmi/webpack-multiple-entries). Let me know in the comments' section if it's still unclear how to make things work.
