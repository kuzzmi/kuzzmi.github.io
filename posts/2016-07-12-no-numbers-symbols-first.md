---
layout:      post
date:        2016-07-12 16:59:43 +0200
title:       "No Numbers, Symbols First"
lang:        en
tags:
    - technology
    - experiment
    - vim
    - productivity
    - keyboards
description: >
    It's a time for a new experiment: I've decided to move all the numbers
    to the combination of Shift+[number] and symbols to just [number] key.
    Here I'll try to keep updated diary of my new experience.
---
How often you have a feeling that you could do something more efficiently? Regardless of what it is. It can be related to opening files, writing a function, typing or managing windows on the screen.

As a programmer I have this feeling all the time. [Here](https://kuzzmi.com/blog/code-completion-thank-you-but-no) I've tried to describe my experience with adopting a no-colors and no-code-completion feature.

Now it's a time for a new experiment: I've decided to move all the numbers to the combination of `Shift+[number]` and symbols to just `[number]`.

Generally speaking during development I should not use hardcoded numbers (however I need those in styling). So instead I should, for example declare them somewhere on the top and then reference them with a constant name. After realizing that I decided to make this experiment and now the first full working day is succesfully passed.

I'll try to keep this post updated with results of the experiment, but I have a strong feeling that it will work very nice in the long run.

This is how it looks like in `.vimrc`

```
" Remapping symbols to their pair number
inoremap ! 1
inoremap @ 2
inoremap # 3
inoremap $ 4
inoremap % 5
inoremap ^ 6
inoremap & 7
inoremap * 8
inoremap ( 9
inoremap ) 0
inoremap [ {
inoremap ] }
" ...and numbers to their pair symbols
inoremap 1 !
inoremap 2 @
inoremap 3 #
inoremap 4 $
inoremap 5 %
inoremap 6 ^
inoremap 7 &
inoremap 8 *
inoremap 9 (
inoremap 0 )
inoremap { [
inoremap } ]
```

### Day 1

A bit hard to get used to a new layout, but in the end of the day I could easily forget about the changes. The most useful thing is remapping `9` to `(` and `0` to `)`. Overall have a good feeling and big hopes.

### Day 3

Oh, I love it. For JavaScript remapping brackets `[` to `{` and vice versa was another great decision. I suppose we all type something like this quite often:

```javascript
const fn = (a, b) => {
 if (a && b) return a * b;
}
```

Without remapping to type this we need 58 keystrokes, with = 41. So far so good!

### Day 6

Still make mistakes, but much less. Started working more on styling stuff this days, thus I need to type more numbers, so I will probably switch this off for some style-specific file types like CSS, SASS, Less etc. Another observation: after switching to this layout, I subconsciously press `;` when I need `:`, may be it's a good idea to try this out as well.

### Day 10

Reversed `;` and `:` keys. It's so sweet now, I can type faster and with less keystrokes! I'll definitely stick to this mapping for a lo-o-ong time, that's for sure.

### Day 20

Very rare mistakes. I'll never come back to the old layout. A few things still need to be tested e.g. I need to type `5` and `6` more often than `%` and `^`, may be a bit of customization here will work, but I'm worried about consistency.

### Day 30

Started prototyping my own keyboard layout, so I can build exactly what I need and I'll take the mapping I tested to my layout :3 Here is a photo of my prototype:

![](https://pbs.twimg.com/media/CoZFgcSWcAECyiq.jpg:large)
