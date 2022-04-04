---
layout: sotm
date:   2017-12-29 14:22:58 +0200
title:  "SotM: pet - Awesome Command-line Snippet Manager"
name:   "pet"
logo:   "https://github.com/knqyf263/pet/blob/master/doc/logo.png"
link:   "https://github.com/knqyf263/pet"
tags:   technology, productivity, snippets, cli, software of the month
comments:    true
description: >
    `pet` is a simple command-line snippet manager. It allows you to write
    and store snippets for the command-line, so you don't need to remember
    all the commands you frequently use in you terminal. It can sync your
    snippets to the GitHub Gist, so you can always take your snippets with
    you.
screenshots:
    - https://github.com/knqyf263/pet/raw/master/doc/pet04.gif
scores:
    - type: practicality
      score: 5
      comment: >
          Much less unnecessary work for your hands and brain. What else you
          need to earn 5 out of 5?

    - type: usability
      score: 4
      comment: >
          Getting used to it takes a bit of time. The workflow could be
          improved a bit, but you get advantage of using it almost
          immediately

    - type: customization
      score: 4
      comment: >
          You don't need a lot of settings with a snippet manager. You can
          configure your editor, path to snippets' file and GitHub Gist
          access for syncing

    - type: ui
      score: 4
      comment: >
          Nothing special in this department here. There are a few TUI
          elements for compliting some fields in the snippet, if there are
          any

    - type: coolfactor
      score: 4
      comment: >
          CLI tools usually have hard times to produce a wow-effect, but
          this one does this even with people who are not using command-line
          at all (tested a few times)

    - type: easeofuse
      score: 5
      comment: >
          `pet` is a very powerful yet simple tool and doesn't require a
          lot of learning upfront, so one might require a few minutes of
          reading `--help` and immediately gain advantage of it.

    - type: portability
      score: 5
      comment:
          All snippets are stored in TOML file, so you can edit it and do
          whatever is needed just with any text editor. In addition GitHub
          sync feature gives you an option of storing your snippets
          available online
---
My friend once recommended to take a look at `pet`. As I'm working with
command-line all the time a snippet manager in this workflow is a
low-hanging fruit. It immediately reduced amount of time I spend on some
tasks that do not deserve to be written in a separate script, but at the
same time are cumbersome to remember.

Use cases for it are some complex one-liners, like `awk`, `sed`, or even
`ssh`.

In order to create a new snippet, you need to run:

```
pet new
```

`pet` will ask you to enter the actual command and its description. For
example I often use a command to delete merged git branches from my local
repositories:

```
git checkout master && git fetch -p && git branch --merged | egrep -v "master" | xargs git branch -d
```

However I often want to preserve some branches without deletion, and in
this case `pet` allows you to have some patterns, that you can fill before
executing a command. It's done using the following format:

```
<DESCRIPTION=DEFAULT_VALUE>
```

So in my case it would be like this:

```
git checkout master && git fetch -p && git branch --merged | egrep -v "(<branches=master>)" | xargs git branch -d
```

After adding this snippet, before it's executed I'll need to provide a value
for `branches` instead of using `master`.

Generally `pet` is quite powerful, easy to use and very portable, what makes
it a good piece of software that I'd recommend anyone to take a look at.

[1]: {{ page.link }}
