---
layout:      post
date:        2016-03-07 14:16:31 +0200
title:       "Deferred Messaging Using localStorage"
lang:        en
tags:
    - technology
    - javascript
    - html
    - tips
description: >
    In this post I will describe the way how I have solved a tricky problem
    to broadcast deferred messages to unknown iframes from parent window on
    the same domain using localStorage.,
---
`iframe`. This word forces me to wake up at night in a cold sweat.

On my current project we're using iframes everywhere. This is changing, but you cannot change everything at once. We are using iframes for displaying standalone pages inside a "master" page.

## The Pain

The whole messaging between the master page (MP) and iframes is done by using `window.postMessage`. This is why when MP sends a message, it has to know the recipient. But once I had to implement a new *cool suppa-duppa feature*. This feature required MP to send messages to unknown recipients. After initial thinking about implementation, I realized that this is not going to work. Especially if the iframe that had to do something with a message is not yet available in context of MP.

> **7.2.3 Posting messages**
>
> ```
> window.postMessage(message, [ports,] targetOrigin)
> ```
> Posts a message, optionally with an array of ports, to the **given window**.
>
> -- **[www.w3.org](https://www.w3.org/TR/2009/WD-html5-20090423/comms.html)**

## The Dream

More and more often I'm trying to solve problems by dreaming about the best possible solution first. And then I go back from Z to A, from the solution to the problem. This is one of the principles of [TRIZ](https://en.wikipedia.org/wiki/TRIZ). In this case I was thinking about the next solution:

1. MP has to send a message and forget about it
2. Unknown recipient should know about the message regardless of being present in the context of MP at the time of sending.
3. After inserting recipient to the context, it has to react on old message and handle new ones.

## The Solution

Fortunately, I know that all recipients and MP will always be on the same domain. This knowledge helped me to find the end solution.

So, if we start from the end, we know that an iframe has to receive the old message even if it was inserted after the message had been sent. That means, that the data should be stored in the place which is accessible from MP and from iframes. And this place is a local storage. If we refer to specification:

> **4.3 The localStorage attribute**
>
> The localStorage object provides a Storage object for an **origin**.
>
> ...
>
> -- **[www.w3.org](https://www.w3.org/TR/webstorage/#dom-localstorage)**

This is perfect. This is absolutely perfect place for storing the old message, but how will we know that there is a new message? If we read the section 4.2 from [www.w3.org](https://www.w3.org/TR/webstorage/#the-sessionstorage-attribute):

> **4.2 The sessionStorage attribute**
>
> When the setItem(), removeItem(), and clear() methods are called on a **Storage object x** that is associated with a session storage area, ..., then for every Document object whose Window object's sessionStorage attribute's Storage object is associated with the same storage area, **other than x**, send a storage notification.
>
> -- **[www.w3.org](https://www.w3.org/TR/webstorage/#the-sessionstorage-attribute)**

...we'll find out that we can handle changes in children by attaching to the `storage` event:

```javascript
window.addEventListener('storage', handleEvent);
```

So now, if we write this inside iframes, all the iframes will be notified about changes in the localStorage, thus they can react on new events in the same way as on old messages.

So, let's say, that we need to broadcast `foobar` message which just fires some alert:

```javascript
// Master page
let storage = window.localStorage;

setInterval(() => {
    storage.setItem('$messages.foobar', 'true'); // let's use a namespace for messages
}, 1000);
```

Then in an iframe:

```javascript
// An iframe
const MESSAGE = '$messages.foobar';
let storage = window.localStorage;

function handleEvent() {
 let message = storage.getItem(MESSAGE);
    if (message) {
        alert('foobar');
        storage.removeItem(MESSAGE);
    }
}

handleEvent(); // reacts on old message
window.addEventListener('storage', handleEvent); // handles new messages
```

After that we can open the master page without any iframes, insert one with the code above and it will immediately alert "foobar" and then will do this every second.

That's it.

If you have any comments or suggestions, please let [me know][twitter].

[twitter]: http://twitter.com/kuzzmi
