---
layout:      post
date:        2016-01-22 09:28:06 +0200
title:       "Heartbeat and Polling"
lang:        en
tags:
    - technology
    - javascript
    - tips
    - web development
    - patterns
description: >
    Sometimes in your applications you want to track when the user's PC went
    to sleep mode, so you can do some routine, such as reestablish the session,
    or connection. Or your user just opened your app and is doing nothing,
    but you need to keep the session opened. So what can we do?
---
Sometimes in your applications you want to track when the user's PC went to sleep mode, so you can do some routine, such as reestablish the session, or connection. Or your user just opened your app and is doing nothing, but you need to keep the session opened, track connection issues and somehow react on that. So what can we do?

Answers are pretty simple, but sometimes it takes time to find it.

Heartbeat and polling are actually almost the same patterns, but I specifically separate them, because it's useful to use appropriate wording.

## Polling

This design pattern allows you to let server know that the browser is still opened, and to let your application know that there are no issues with the connection to the server. You can also use this to measure your connection, to track users' network performance and so on.

For example, you have an application, which has a server that ends inactive sessions *(this sounds obviously, but, yes, sometimes they may not do this...)*. Say that user wants to perform an action that requires him to be authenticated, but his session is invalidated already. In this case user will have errors, or another "please login" window, it depends on how you handle this kind of things.

But we're handling the problem instead of solving it, right? Although sometimes it's enough, but when it comes to the questions of UX, you can find that it's easier to fix it.

So we need to let server know that "hey, we're still here", and let user know that "hey, Houston, we have a problem" and let application solve the issue.

So the simpliest polling can be as easy as this code:

```
var pollInterval = 60000;
function poll() {
    setInterval(function() {
        // We need to make a request
        // I assume that you know how to make GET requests in JavaScript :)
        makeRequest('http://example.com/api/poll')
            // and properly handle the issues
            .error(handlePollError);
    }, pollInterval);
}
```

That's it. Pretty straightforward, isn't it? The intersting part has to be done in `handlePollError` function. But it's very specific to each case. I usually suggest to display a message about connection issues, increase the interval timeout and to try to reconnect, until we're connected again.

## Hearbeat

Heartbeat pattern is a similar to polling pattern and is used to understand whether the application is alive. In web applications it can be used to detect whether or not a user was in sleep mode and react accordingly. For example, you want to refresh the page if the user's machine was in the sleep mode.

To do that we may check when was the last time of calling a heartbeat function and if it exceeds the threshold, do what you need to do.

```
var intervalTime = 1000;
var now = function() {
 return (new Date()).getTime();
};

var lastInterval = now();

var intervalHeartbeat = function() {
    var now = now();
    var diff = now - lastInterval;
    var offset = diff - intervalTime;
    lastInterval = now;

    // here I check if the difference is more than
    // twenty minutes
    if (offset > 20 * 60 * 1000) {
        window.location.reload(true);
    }
};

setInterval(intervalHeartbeat, intervalTime);
```

That is it.

This may or may not be the best solutions, but they are used and they help you to fix a bunch of possible issues.

For curiosity's sake, how do you solve this problems?
