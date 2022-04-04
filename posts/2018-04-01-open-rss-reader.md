---
layout:      post
date:        2018-04-01 10:40:37 +0300
title:       "Open RSS Reader"
tags:        technology, products, project, rss, software, open source
lang:        en
description: >
    I'm starting a new open-source project "Open RSS Reader" that will be
    modular app so if you don't like the existing clients, you'll be able to
    quickly build your own. It's gonna be both open source and free to use.
---
A few weeks ago I thought about starting out a new pet project that would be
useful, relatively simple, and fun to build.

I came up with a list of simple apps I either use or used to use and realized
that all RSS and Atom feed readers either suck, or proprietary as hell, so I
decided to pick it as my next project.

What will make a difference is the following list of features:

- Option to run a backend daemon for only local clients
- Option to run a backend daemon for outer world for syncing between devices
- RESTful API to support side clients
- Make all of the above as simple as possible without compromises

I did a few DuckDuckGo searches and found absolutely nothing similar, so I'll
give it a go.

So the idea is to have 2 applications: daemon and one client.

## Technical stuff

Daemon will be written in Go, as it allows to compile a binary that can be
distributed easily.

Database will depend on the daemon mode. May be I'll change my decisions around
that, but for now I think of:

- **Single-user mode** - uses SQLite for better portability and smaller
requirements footprint.
- **Multi-user mode** - will use full-blown SQL DB for better performance.

The first client will be for web, written in Elm (_because I love Elm_).
Nothing super special in this department.

## Timelines

I've no idea about how much time it will take me to finish the first version.
Daemon is fairly simple in the beginning, so I guess the **single-user** mode
will be the only mode I'll produce rather quickly.
