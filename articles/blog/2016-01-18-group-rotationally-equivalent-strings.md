---
layout:      post
date:        2016-01-18T21:09:43Z
title:       "Group rotationally equivalent strings"
lang:        en
tags:
    - technology
    - problems solving
    - javascript
description: >
    Found a problem about grouping together rotationally
    equivalent words from a given array of words
---
Recently I have found a problem about grouping together rotationally equivalent words from a given array of words. Originally author said that it was given by Google, but who knows for sure... Anyways, at the moment I'm solving these type of things every evening, so why just not to solve this one.

Quoting the anonymous author:

> Definition: we say that two words are rotationally equivalent if there exists an integer such that adding this integer to every character of the first word gives the second word. Example : "a" and "b" are rotationally equivalent (adding 1 to "a" gives b "abcd" and "cdef" are rotationally equivalent (adding 2 to each character gives "cdef")
Question : given a list of strings, group them by if they are rotationally equivalent. Example : ["a", "b", "cdef", "wtf", "abcd"] -> [["a", "b"], ["wtf"], ["cdef", "abcd"]]

The first solution that came to my mind was pretty straightforward:

1. We iterationally take the first word and iterate through the rest of the array.
2. We take the first "rotationally equivalent".
3. Group first pair with another array and push them to result.
4. We need to take them away from the original array, because we care about only one pair (probably I'm wrong, but that's a bit ambiguous here)
5. We decrement the first iterator as we just took away current word and repeat the steps 1-4 until we end up with a list of non rotationally equivalent items.
6. We wrap every item with another array and append them to the resulting array.
7. Voila!

```
// We will reuse this often, so why not to extract to a function?
function rotateChar(c, n) {
    return String.fromCharCode(c.charCodeAt(0) + n);
}

// Basically bruteforce checking
function isRotEq(str1, str2) {
    var diff = str2.charCodeAt(0) - str1.charCodeAt(0),
        i = 0;

    if (diff < 0) {
        return isRotEq(str2, str1);
    }

    if (diff > 0 && str1.length === str2.length) {
        while (i < str1.length) {
            if (str2[i] !== rotateChar(str1[i], diff)) {
                return false;
            }
            i++;
        }
    } else {
        return false;
    }

    return true;
}

// And grouping
function group(arr) {
    var result = [];

    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (isRotEq(arr[i], arr[j])) {
                result.push([arr[i], arr[j]]);
                // To not look for used pair
                arr.splice(j, 1);
                arr.splice(i, 1);
                // Going one step back as the current [i] is removed now
                i--;
                break;
            }
        }
    }

    arr.forEach(function(a) {
        result.push([a]);
    });

    return result;
}

group(["a", "b", "cdef", "wtf", "abcd"]);
```

This will return us `[ ["a", "b"], ["cdef", "abcd"], [ "wtf" ] ]`. Done.
