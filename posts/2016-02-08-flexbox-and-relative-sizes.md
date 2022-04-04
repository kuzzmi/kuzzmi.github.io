---
layout:      post
date:        2016-02-08 11:15:51 +0200
title:       "Flexbox and Relative Sizes"
tags:
    - technology
    - html
    - css
    - web development
    - tips
lang:        en
description: >
    How to implement the layout that utilizes both flexbox and relative
    sizing. Incredibly useful for displaying a cascade grid within a
    flexbox element.
---
After dropping the support of IE9, I finally managed to properly refactor views and styles of one of my applications, and I thought that it could be interesting for someone else, as I simply couldn't find any information about combining the relative sizes and flexbox.

The layout is pretty common, but some of the application's features required me to move away from straighforward implementation and due to "we need this now!" I had to use a lot of `/* TODO: refactor later */` techniques. The layout can be presented as shown below:

![](/uploads/5905058ebfc07ffd9de78983afb80911)

Initially I used a combination of "absolute fullscreen" styles with very messy nesting and something else that I would delete as soon as I have a chance to do that.

The layout, of course, has to be responsive and flexible enough to add more heavy UI-focused features. All the `block` elements inside the right container have to be sized relatively to the visible space on the screen as well as to be able to stack to the left. So my choice fell on `display: flexbox`, as it's purely what I need and it's supported in all the browsers I need to support.

I made this choice because of several requirements, e.g. this right column has to be properly resized if something appears on the top of it, and/or the left panel is visible. So it has to take all the time the maximum space on the screen as possible, while we can add or remove different parts of the UI. Think customization.

The problem is that `flexbox` doesn't work when it comes to relativeness, you cannot use `height: 50%` inside the flexible box. So I had to find a way of how this can be done.

As we may know, relative sizes work only with some absolute values. If you take 50% of 0 you'll receive 0, right? So the main problem here is to find a way how and where we can put this absolute values.

So I came up with an idea to make one block flexible, but with `position: relative` and without absolute sizes. Then put a wrapper inside it with `position: absolute` and make it "fullscreen" (`top: 0; left: 0; right: 0; bottom: 0`). Then we can put relatively sized items inside the wrapper. That simple.

It can be represented by this piece of HTML:

```html
<div class="container">
  <div class="menu">

  </div>
  <div class="blocks">
    <div class="container">
      <div class="wrapper">
        <div class="child child1">
          <p> </p>
        </div>
        <div class="child child2">
          <p> </p>
        </div>
        <div class="child child4">
          <p> </p>
        </div>
        <div class="child child4">
          <p> </p>
        </div>
        <div class="child child4">
          <p> </p>
        </div>
        <div class="child child4">
          <p> </p>
        </div>
      </div>
    </div>
  </div>
</div>
```

Let's start from body. It has to be fullscreen:

```scss
body {
  width: 100%;
  height: 100%;
  background-color: #000;
  overflow: hidden;
}
```

Next thing is our application container:

```scss
.container {
  /* This guy will contain left and right columns */
  display: flex;
  flex-direction: row;

  /* But in order to take all the available space we need
     to use this */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-color: #eee;
  overflow: auto;
}
```

Our next step is to add left and right columns.

```scss
// left-column
.menu {
  /* Let's say that it needs to take just 1/6 of the
     screen */
  width: 16.66666667%;
  background-color: #dfdfdf;
}

// right-column
.blocks {
  /* And this will make the content of the block flexible
     and column-oriented */
  display: flex;
  flex-direction: column;

  /* And this will stretch the column to take all available
     space on the right from the left column */
  flex: 1;

  background-color: #cacaca;
}
```

Next we need to put another container in the right-column, that will take all available space, in case (for me that was the case) we want to put more elements on the top of our `block` elements. Like some kind of a menu, or anything else.

```scss
.blocks .container {
  /* This will make this container relative to its parent
     container */
  position: relative;
  /* And this will stretch it */
  flex: 1;
}

.wrapper {
  /* Finally, our wrapper will introduce absolute values inside,
     so we can use relative sizes */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
```

And now _finally_ we can make our children sized relatively. So the sizing will be done according to the size of their parent, which will take all the available space on the screen.
So:

```scss
.child {
  padding: 8px;

  /* Not a big surprise, this will push all blocks to the left */
  float: left;

  /* Instead of <p> you can put any content you need */
  p {
    background-color: #ffffff;
    height: 100%;
    width: 100%;
    margin: 0;
  }

  &.child1 {
    width: 50%;
    height: 100%;
  }

  &.child2,
  &.child3 {
    width: 50%;
    height: 50%;
  }

  &.child4 {
    width: 25%;
    height: 25%;
  }
}
```

The final result of the stylesheet:

```scss
* {
  box-sizing: border-box;
}

body {
  width: 100%;
  height: 100%;
  background-color: #000;
  overflow: hidden;

  .container { // main container
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: row;
    background-color: #eee;
    overflow: auto;

    .menu { // left-column
      width: 16.66666667%;
      background-color: #dfdfdf;
    }

    .blocks { // right-column
      padding: 0;
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      flex: 1;
      background-color: #cacaca;

      .container {
        position: relative;
        flex: 1;

        .wrapper {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;

          .child {
            padding: 8px;
            float: left;

            p {
              background-color: #ffffff;
              height: 100%;
              width: 100%;
              margin: 0;
            }

            &.child1 {
              width: 50%;
              height: 100%;
            }

            &.child2,
            &.child3 {
              width: 50%;
              height: 50%;
            }

            &.child4 {
              width: 25%;
              height: 25%;
            }
          }
        }
      }
    }
  }
}
```

You can find working example on the [JSFiddle](https://jsfiddle.net/kuzzmi/rp3hrm78/2/).

I doubt that this is the only way of doing that, although that was the only way that worked for me.
