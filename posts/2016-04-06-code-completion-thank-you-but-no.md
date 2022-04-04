---
layout:      post
date:        2016-04-06 19:50:32 +0200
title:       "Code completion? Thank you, but no."
tags:
    - technology
    - javascript
    - web development
    - development
    - vim
lang:        en
description: >
    How working without code completion, bright syntax highlighting and other
    "incredibly needed" utilities can make you more productive, flexible and
    better front-end developer.
---
It's been almost a year since I completely uninstalled Sublime Text, Atom and other shiny text editors. Almost year of no fancy-schmancy stuff. Almost a year of no code completion and a year of reducing syntax highlighting. Almost a year of close to no snippets.

And after almost a year I can tell that was a good strategy to boost my skills and flexibility, what eventually led me to become a better developer.

You may find these arguments controversial, but I hope you will find something useful here. This is what helped me and may help you.

**NOTE:** This is mostly related to frontend development languages. Code complition in compilable languages is still ok.

## No Code Completion

![](/uploads/cce11433e3e2636005ae9e3a8df9452c)

When you use Vanilla JavaScript it's not that easy to have a good code completion. You can say that there are IDEs that are doing this more or less well, like [WebStorm](https://www.jetbrains.com/webstorm/). Or even [Visual Studio](https://www.visualstudio.com/) can do some kind of IntelliSense code completion, but it's not that good.

But come on, **JavaScript is just a text file**. You may say "Evolution, ma-a-an!", but it doesn't change anything, it's still a text and it will be processed as a text. Current solutions of code completion for JavaScript are not _THAT_ good. However, [Tern.js](http://ternjs.net/) is doing great job. To be honest, I could never set it up properly. And no one of who I know. May be I have bad hands and too little patience, but anyway, this only tells about the complexity of setting up what you actually don't need.

_TypeScript, for example, is completely different story and it's much easier to set everything up, but the advantages of not having code completion here are the same._

## 1. You learn what you use

Working without code completion at all is a bit challenging. But this challenge forces you to better understand products you're using.

Can you write some code for your project on paper? No? I'm not surprised. Knowing things about the architecture, modules, functions, and types by heart will allow you to think about the project without having a computer next to you. You can develop new stuff or debug old stuff MUCH faster.

When you use code completion, you learn 3-4 first letters of the function you need to call. If you don't, you try to learn by heart its full name. You learn the project.

## 2. You learn to type faster

When you use code completion, you spend `X` seconds to type 4 letters of the function you need and find what you need. If you don't, you learn to type all the 16 characters in `X` seconds. You learn to type faster and you don't spend time on reading suggestions.

Of course you physically can not remember every single character in the project, but at least you can remember more.

## Less syntax highlighting

I suppose that you've already heard about some weird guys turning off their syntax highlighting. May be you even have tried that, but that didn't work for you.

I think you should try one more time.

I've found recently a blog post of [@robertmeta](https://twitter.com/robertmeta), who is dropping syntax highlighting. You can [take a look here](https://www.robertmelton.com/2016/03/21/syntax-highlighting-off/).

He'll tell you a bit more about advantages of going this way.

Here is a list of a few key points from Robert's experiment and my experience:

1. **Less distractions**. You focus on what is important - code.
2. **Context jumping**. You can switch languages, files, projects etc. And you will never spend a second on switching to a new context.
3. **Flexibility**. If you remove syntax highlighting completely, you will be able to say, what you need. For example, you may be familiar with situation when you stare on the "=" when "==" is needed, or on "==" when "===" is needed. Usually (I think almost every) color theme marks this items with the same color. But with __custom__ highlighting you'll be able to define what you need.
4. **Portability**. You will understand what's been written anywhere any time.

The point here is not to make life harder, but easier. So it is definitely recommended to use just 2 colors. The first color is for the code, the second one is for comments. So go and try to turn everything off and build your own highlighting theme.

**Note:** You still can use text styling like italics or underlined text, but only like an exception.

## Instead of P.S.

Almost a year ago I moved completely to [Vim][1]. I think at some point every and each developer gets to know about Vim. I've discovered it a long time ago, but I couldn't afford switching to such a radically different editor. I knew that this text editor was a Text Editor with a capital letter, so it took me at least 4 attempts to switch to it. And the forth attempt was successful. As expected my performance dropped down, but at the time of switch I could afford to do all the experiments safely.

This is how it looks like now:

![](/uploads/2121d1222784cdd551cd363e534d1e22)

## Your thoughts?

I’d be interested to hear what your thoughts on the subject are. So please use the comments section below and tell about your experiments and experience.

[1]: http://www.vim.org/
