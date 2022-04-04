---
layout:      post
date:        2018-07-28 22:53:59 +0200
title:       "Use Elm as a Reducer in Redux"
tags:
    - technology
    - react
    - redux
    - web development
    - javascript
    - elm
lang:        en
description: >
    Want to use Elm in your project, but a bit hesitant going cold turkey? In
    this blog post I'll try to show how you can use the best from both worlds
    bulletproof Elm logic and ridiculously rich React components library.
---

If you've ever used [Elm], you might already know that it makes your code free
(*almost*) of runtime errors, which are quite common in JavaScript
applications.

If you haven't, then go check it out, it's awesome and there is no way back.
Once you felt this taste of functional programming language that's tailored to
fix all issues we've ever had with JavaScript, you won't be able to unsee it.

## Motivation

After creating a bunch of applications with Elm, you start missing some
incredibly awesome features like pattern matching, strict type checking,
somewhat complete functional programming experience.

Some principles from [The Elm Architecture] were taken as a basis for one of
the most popular libraries for JavaScript, an awesome state managing library,
[Redux]. And when you have any Elm experience, you start missing error messages
that you haven't implemented some message in an `update` function, or that you
forgot to update a handful of functions after some refactoring.

When I started working on a new project a year ago, I made a decision to use
Elm in combination with [React], [React Native] and [Redux]. The main reason
was that React components were easily reused for web and mobile, and Elm
could protect the application from runtime exceptions and from potential
painful refactorings, that are inevitable in every startup.

So the basic idea is that you can write Redux reducer in Elm and use all nifty
libraries and components available for React and React Native.

When I was looking for my options I found a [library] called
**redux-elm-middleware**. The original repo was abandoned and after some time I
just forked it, fixed a bunch of bugs, added a couple of nice features and a
year later would like to give you a brief intro to how to make your life
awesome.

## How It Works

Elm supports basic interoperability with JavaScript using
[ports][elm-interop-js]. The basic idea behind ports is that you can define
senders and listeners that will create a "bridge" between JS and Elm. These
ports are available through `Elm.ports` object in JavaScript.

Senders, ports that send data from Elm, have `subscribe` method in JavaScript,
and listeners, ports that receive data in Elm, have `send` method in
JavaScript.

**redux-elm-middleware** looks for available ports and depending on which port
is triggered, or which Redux action is dispatched, passes it further to other
reducers, or to Elm Reducer, accordingly.

## Example

Setting up **redux-elm-middleware** is fairly easy procedure:

```js
// createStore.js
// or anywhere where you define your store
import { createStore, applyMiddleware, combineReducers } from 'redux';

import createElmMiddleware, { reducer as elmReducer } from '@cureous/redux-elm-middleware';
import Elm from './elm/Reducer.elm';

const elmWorker = Elm.Reducer.worker();
const { run as runElmWorker, elmMiddleware } = createElmMiddleware(elmWorker);

const reducer = combineReducers({
    elm: elmReducer,
});

const store = createStore(
    reducer,
    {},
    applyMiddleware(elmMiddleware),
);

runElmWorker(store);
```

Then you need to create `./elm/Reducer.elm` file with the `Redux.program` as an
entry point:

```elm
-- ./elm/Reducer.elm
port module Reducer exposing (..)


import Json.Encode as Json
import Redux


-- This is a listener port
port increment : ({} -> msg) -> Sub msg


subscriptions : State -> Sub Msg
subscriptions _ =
    Sub.batch
        [ increment <| always Increment
        ]

-- State definition
type alias State =
    { counter : Int }


-- Initial state
initState : State
initState =
    { counter = 0 }


-- This encoder will be used to send your state to Redux
encode : State -> Json.Value
encode state =
    Json.object
        [ ( "counter", Json.int state.counter )
        ]


-- Messages that we need to handle in update function
type Msg
    = Increment


-- That is essentially a reducer
update : Msg -> State -> ( State, Cmd Msg )
update action state =
    case action of
        Increment ->
            ( { state | counter = state.counter + 1 }
            , Cmd.none
            )

main =
    Redux.program
        { init = ( initState, Cmd.none )
        , update = update
        , encode = encode
        , subscriptions = subscriptions
        }
```

The latest version, v6.0.0, allows to send data back from Elm to Redux, what
makes it easy to write simple middlewares that can wire together different
libraries with Elm, like `react-router`. I will include an example of using
this middleware and `react-router` in the upcoming post.

[React]: https://reactjs.org/
[React Native]: https://facebook.github.io/react-native/
[Elm]: https://elm-lang.org/
[elm-interop-js]: https://guide.elm-lang.org/interop/javascript.html
[The Elm Architecture]: https://guide.elm-lang.org/architecture/
[Redux]: https://redux.js.org/
[library]: https://github.com/cureous/redux-elm-middleware
