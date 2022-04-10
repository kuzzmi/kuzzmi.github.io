---
layout:      post
date:        2016-01-18T22:53:59Z
title:       "Towers of Hanoi"
lang:        en
tags:
    - technology
    - problems solving
    - javascript
description: >
    Decided to post my implementation of solving Towers of Hanoi problem
---
Decided to post my implementation of solving [Towers of Hanoi](https://en.wikipedia.org/wiki/Tower_of_Hanoi) problem in a "good, clean" way.

The description is taken from a nice book ["Cracking the Coding Interview"](http://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/098478280X) by Gayle Laakmann McDowell. I'll definitely refer to this book in the future.

> In the classic problem of the Towers of Hanoi, you have 3 towers and N disks of different sizes which can slide onto any tower. The puzzle starts with disks sorted in ascending order of size from top to bottom (i.e., each disk sits on top of an even larger one). You have the following constraints:
1. Only one disk can be moved at a time.
2. Each move consists of taking the upper disk from one of the stacks and placing it on top  of another stack i.e. a disk can only be moved if it is the uppermost disk on a stack.
3. No disk may be placed on top of a smaller disk.

The code is written at the time of brushing up data structures, so it relies on the implemented Stack data structure. For reference, you can check my [implementation of Stack](https://github.com/kuzzmi/problems/blob/master/dataStructures/stack.js) on GitHub.

```
var Stack = require('../dataStructures/stack');

// It could be a puzzle, but I prefer to call puzzles games...
function Game(n) {

    this.height = n;

    // Creating a set of towers
    this.towers = [
        new Stack(),
        new Stack(),
        new Stack()
    ];

    // And filling the first one with "disks"
    for (var i = n; i > 0; --i) {
        this.towers[0].push(i);
    }

}

// Checking whether or not we can make a move
Game.prototype.canMove = function(from, to) {
    var towerFrom = this.towers[from];
    var towerTo = this.towers[to];

    if (!towerTo.peek()) {
        return true;
    }

    return towerFrom.peek() < towerTo.peek();
};

// Making a move by popping a disk and pushing it to
// another tower
Game.prototype.makeMove = function(from, to) {
    if (this.isCompleted()) {
        return;
    }

    // Looking for a valid move between towers
    if (this.canMove(from, to)) {
        this.towers[to].push(this.towers[from].pop());
    } else {
        this.towers[from].push(this.towers[to].pop());
    }
};

// isTowerEmpty is just much more clear than "!this.towers[i].peek();"
Game.prototype.isTowerEmpty = function(i) {
    return !this.towers[i].peek();
};

// the same
Game.prototype.isCompleted = function() {
    return this.isTowerEmpty(0) && this.isTowerEmpty(1);
};

// Let the magic begin
Game.prototype.start = function() {
    if (n % 2 === 0) {
        while (!this.isCompleted()) {
            this.makeMove(0, 1);
            this.makeMove(0, 2);
            this.makeMove(1, 2);
        }
    } else {
        while (!this.isCompleted()) {
            this.makeMove(0, 2);
            this.makeMove(0, 1);
            this.makeMove(2, 1);
        }
    }
};

Game.prototype.toString = function() {
    var result = [];
    var str = '';

    for (var i = 0; i < this.height; i++) {
        str =
            ( this.towers[0].pop() || '|' ) + '     ' +
            ( this.towers[1].pop() || '|' ) + '     ' +
            ( this.towers[2].pop() || '|' );

        result.push(str);
    }
    return result.join('\n');
};

var n = 5;
var game = new Game(n);

game.start();

console.log(game.toString());
```

My solution is not supposed to be the best and the only valid and correct, so please let [me know][twitter] what do you think about it and whether you have a better solution.

[twitter]: http://twitter.com/kuzzmi
