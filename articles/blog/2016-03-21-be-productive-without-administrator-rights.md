---
layout:      post
date:        2016-03-21T15:44:51Z
title:       "Be Productive without Administrator Rights"
lang:        en
tags:
    - technology
    - productivity
    - development
    - tips
    - windows
description: >
    You cannot install anything? You cannot even install your favorite font
    for IDE? Your admins have disabled task scheduling management for you?
    Not a problem. Here you can find a few tricks I do, when I need to
    workaround some limitation for my daily work.
---
Try to answer on the next questions without a sad face:

1. Do you have enough rights and space for making your work at your best?
2. Had you that feeling of being treated as someone, who cannot deal with your laptop or PC?
3. How much control over your work PC you have?

Have you managed to do that? Then close this page, you, lucky bastard.

Anyway, there are cases, when these issues are the only issues you have and they are a bad reason to switch jobs.

## Intro

So, you are a developer. You're the person who is supposed to fix stuff, create new stuff, automate stuff and do this in the most effecient way.

The company hires you to help them with developing a new shiny system for them, to make them earn more money than they do now, than they invest in the project. You're ready for new challenges, you're so enthusiastic to do something great, to make something useful, what you can put on the list "I'm proud of ...", but then...

Then they give you a laptop, or a PC.

You think you'll start working hard as soon as possible. You open it, wait for the initial loading, if it's a new installation or the first logon. Now it's the sweet time to set up the working environment.

You try to install the tools you're used to use before, but then you quickly realize that you cannot do this. And you cannot do that. And that.

Then you take the laptop, shake it, rotate, lick it, but nothing helps. Then you start suspecting, that your work will look most likely like this:

![](https://media.giphy.com/media/fml0xetKPK1Ec/giphy.gif)

## What you can do?

Here I'll try to write a list of workarounds I use, when I need to setup a new environment and have some restrictions.

The list is actual and useful for Windows users only at the moment. Mostly because... You know. Windows still sucks for non-Visual-Studio-and-co development and so on, but most of the time people have to use it because it's still the most used OS in the corporate segment.

Just take a look at this graph from [Wikipedia](https://en.wikipedia.org/wiki/Usage_share_of_operating_systems):

![IMAGE FOR OS USAGE IN THE ENTERPRISE](https://upload.wikimedia.org/wikipedia/commons/8/81/Operatingsystem_market_share.svg)

Ah, right, enough talking, let me give you something useful.

## The list

### 1. Installing Software

Depending on the software you need to use, there are a few options. If your software has to be licensed specifically if used in companies, you have no choice, you have to request the license.

Otherwise, if it is free to use for commercial usage, but you cannot install that, then meet your new friend:

[**Universal Extractor**](http://legroom.net/software/uniextract) is a solution to most of the problems when it comes to installing something.

**UniExtract** will try to do everything possible to unpack the installation packages if what you need is distributed *only* with `.msi` or `.exe` package.

Here is an example list of what I managed to install with it:

1. Node.js
2. Ruby
3. Java JDK
4. Fiddler
5. EventGhost
6. etc

Here is a small instruction how to install Node.js without "admin rights". If you have it already installed or not really interested in installing it, the procedure is the same for everything I install.

0. Download Node.js from [here](https://nodejs.org/en/download/stable/)
1. Download UniExtract from [here](http://legroom.net/scripts/download.php?file=uniextract161_noinst)
2. Extract it to a local folder. E.g. `C: ools\\uniextract`.
3. Run UniExtract from this folder.
4. Select Node.js `.msi` file and extract it to a local folder with UniExtract. E.g. `C: emp
odejs_unpacked`.
5. Copy contents of `nodejs` folder from folder where you extracted Node.js .MSI file to a local folder. E.g. `C:\\environment
odejs`
6. Configure PATH variable. Add `C:\\environment
odejs` to PATH.
7. Run `cmd.exe` and check if everything went well:
```
node -v && npm -v
```
8. Create a file in you home folder called `.npmrc`. Your home folder is a folder `C:\\Users\\%USERNAME%`, e.g. `C:\\Users\\kuzzmi`, directory. Put in `.npmrc` the following:
```
prefix = %PATH_TO_NODEJS%
proxy = http://%PROXY_SERVER_ADDRESS%
https-proxy = http://%PROXY_SERVER_ADDRESS%
```

Voilà! Now you have a portable version of Node.js installed.

**NOTE:** I know that there are tools like "PortableApps" where you can often get stuff that is already portable. I do not do this in purpose, PortableApps is a separate application and I don't like this. Though if you have no preferences you can go this way.

### 2. Task Scheduler

I always have tough times working in environments where you cannot do any task scheduling. A lot of stuff can be automated, right?

Have you ever tried to work on Linux machine without being able to use the power of all-mighty `cron`?

I can't even imagine such a torture, yet it's pretty common in Windows environments to have Task Scheduler Service being disabled.

This is why I developed a small Node.js package called [runn](https://www.npmjs.com/package/runnjs). After installing it, you can make a file with the following cron-like content:

```
00 00,30 * * * * powershell C:\\Users\\kuzzmi\\script.ps1
```

And [runn](https://www.npmjs.com/package/runnjs) will run this script every half an hour.

**NOTE:** This package is still in WIP mode, though already can do basic stuff.

### 3. Installing Fonts

You have installed everything you want, but to make your workspace ideal you need your favorite font for IDE.

Here is the solution: [RegisterFont](https://github.com/dcpurton/regfont)

Quoting the repository README.md:

> `regfont` is a simple application to temporarily register or unregister fonts
> under Microsoft® Windows® 2000 and above.
>
> It depends only on standard libraries, and can be run by an unprivileged user.

I created a batch script with the following two lines, that are executed each time the system was turned on after shutdown:

```
forfiles /s /m *.ttf /c "cmd /c regfont add @path"
forfiles /s /m *.otf /c "cmd /c regfont add @path"
```

This installs all the fonts in subfolders of a current directory.

### 4. Making hard/symlinks:

[**FAR Manager**](http://www.farmanager.com/) is the best file manager I've ever used. It has almost unlimited possibilities and is easily extended by different plugins. But the most amazing thing is **FAR Manager** somehow allows you to create hardlinks and symlinks, regardless of having rights to do so.

I'm still scratching my head, how do they do this, although it's working as expected.

### 5. Semi-ideal solution: Portable VirtualBox

You can think about [**Portable VirtualBox**](http://www.vbox.me/) as the best possible answer, but frankly it's not true. Unfortunately there are a lot of ways, how your PC can be protected, how the PC identification works in your environment, or who can connect to the network etc.

However, [**Portable VirtualBox**](http://www.vbox.me/) can be used as a development environment, while your main machine can be used for testing/building/running the software you're working on.

You can check their website for more information and instructions.

For me it worked fine, but it has to be installed from the machine where you have admin access, but afterwards it can be used directly from the flashdrive.

## Instead of the Conclusion

That was my small list of main tricks, which you can use to improve your productivity if you have too much limitations.

Still there are a lot of workarounds needed for different situations, like different network tricks, but they are not really generic, so I won't cover any of them here.

So now you have almost all cards in your hand, now you can make this world a bit better.

![](http://i.imgur.com/P2Fptsu.gif)

This post is written mostly because I can forget these things as I do them pretty rarely (mostly when I switch laptops, or jobs), so I won't forget anything. But I could not write this just in my OneNote, this should be shared I think. This is why the list will be updated as soon as I have something to add/change.

If you have any thoughts about all that stuff, or you think that I do something bad here, you can [ping me on Twitter][twitter].

[twitter]: http://twitter.com/kuzzmi
