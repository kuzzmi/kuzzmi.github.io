---
layout:      post
date:        2017-07-14 13:27:17 +0200
title:       "React-Router v4: Activity indicator"
lang:        en
tags:
    - technology
    - react
    - react-native
    - javascrip
description: >
    A simple example of how to create a react-router link with indication of being active
---
[![](https://camo.githubusercontent.com/f63754b8412368e820601967af6dea84312b925b/68747470733a2f2f7265616374747261696e696e672e636f6d2f72656163742d726f757465722f616e64726f69642d6368726f6d652d313434783134342e706e67)][0]

After a while of not using [react-router][0] I had to get back and, although I was following the development, I struggled a bit in the beginning when wanted to configure it and set everything up.

The first problem I had was the separation of the concepts into `core`, `dom` and `native`, which definitelly makes sense, but was not that clear after using pre-v4 `react-router`.

The second one, and I must admit it made me worried a bit, was the simple activity indication. After digging through the docs I found an [example][1], that does what I need, but what I had to figure out after just staring at the source code for about a half an hour.

__Activity indication is freaking important enough in routing library to be missed as a separate \"LOOK HOW IT'S DONE\" example.__

Couldn't stress this enough... Anyway.

## Activity indicator

The key is that the routing now is fully declarative, meaning that it allows us to make it so if there are several routes that match the needed path, all of them will be rendered. But instead of rendering a specific page component, you can render out a `Link` as a child, and use `match` argument of the `Route` rendering property.

The following example needs to be tweaked just a bit to work in web, but here's the React Native version:

```javascript
{% raw %}
import { Route, Link } from 'react-router-native';
function LinkWithIndicator({ to, label }) {
    return (
        <Route path={ to } children={({ match }) => (
            <Link
                to={ to }>
                <Text style={{
                    color: match ? '#A060E5' : 'black',
                }}>{ label }</Text>
            </Link>
        )}/>
    );
}

/*
 * Usage:

 <BrowserRouter>
    <LinkWithIndicator to="/example1" label="Example 1" />
    <LinkWithIndicator to="/example2" label="Example 2" />
 </BrowserRouter>

 */
{% endraw %}
```

[1]: https://reacttraining.com/react-router/native/example/custom-link
[0]: https://reacttraining.com/react-router/
