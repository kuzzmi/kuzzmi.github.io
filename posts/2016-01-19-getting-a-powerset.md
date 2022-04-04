---
layout:      post
date:        2016-01-19 00:38:39 +0200
title:       "Getting a Powerset"
tags:        [ problems solving, javascript ]
comments:    true
description: >
    How to get a powerset of a set? With ease.
---
I found this problem as a technical interview question. So why not to solve it? More stuff solved = even more similar stuff can be solved. Right?

According to [Wikipedia](https://en.wikipedia.org/wiki/Power_set):

> In mathematics, **the power set** (or powerset) of any set S, written P(S), ℘(S), ℙ(S) or 2S, is the set of all subsets of S, including the empty set and S itself.

If we try to solve that by creating base cases to find a pattern, we might find some rules.

So, `P([x,y,z])` has to be `[[], [x], [y], [z], [x, y], [x, z], [y, z], [x, y, z]]`.

If we find `P([x])`, the result will be `[[], [x]]`. Which is a reflection of "including the empty set and S itself".

If we add `y` here, so need to find `P([x, y])`, the result will be `[[], [x], [y], [x, y]]`. Which is a union `P([x]) U P([y])`.

If we add `z`, so `P([x, y, z])`, than it will become a union `P([x, y]) U P([x, z]) U P([y, z])`.

So to find a powerset of S we need to find all its subsets. In order to do this we need to find all subsets of its subset and so on. So we're dealing with recursion, aren't we?

Let's go and do it!

```
function getPowerset(S) {
    // cloning S, so we don't change old S
    S = S.slice();

    var P = [];

    if (S.length === 0) {
        // f([]) should return [ [] ]
        P.push([]);
    } else {
        // Store the first element from S
        // and remove it from S
        var e = S.shift();

        // Get the powerset of S without first element
        var p = getPowerset(S);

        // For each set in powerset without the first element
        // we add a set and a set with the first element
        // to the current powerset storage
        p.forEach(function(s) {
            P.push(s);
            P.push(s.concat([ e ]));
        });
    }

    return P;
}
```

Yep, that's it. If you know the better way of solving that, please let me know.
