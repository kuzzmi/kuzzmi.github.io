---
layout:      post
date:        2017-01-17 20:15:42 +0200
title:       "Searching for a Symmetric Node"
lang:        en
tags:
    - technology
    - problems solving
    - html
    - javascript
description: >
    After a while decided to post some more problem solutions. The first
    problem this year is about looking for a node in a DOM tree: given two
    identical DOM tree structures, A and B, and a node from A, find the
    corresponding node in B.
---
This type of tasks is usually a good thing to do when doing some interview preparation as it's pretty short, doesn't require a ton of questions and checks several basic skills at the same time.

> Given two identical DOM tree structures, A and B, and a node from A, find the corresponding node in B.

So, let's say we have a following DOM:

```html
  <div id="root1">
    <div>
      <div></div>
    </div>
    <div>
      <div id="node1"></div>
      <div></div>
    </div>
  </div>

  <div id="root2">
    <div>
      <div></div>
    </div>
    <div>
      <div id="node2"></div>
      <div></div>
    </div>
  </div>
```

![](/uploads/fe25ac3980c8fd4c3876d266b8e91cf0)

And we're given the node with id `node1` we need to be able to have just `#root1`, `#root2` and `#node1` to point to the node with id `node2`.

Few things you can show off doing a task: understanding of prototyping, knowledge of basic Node properties, such as `parentNode` and `childNodes` and array methods.

My first idea was to go from top to bottom to find a needed node, collecting a list of indices as I dive deeper in the tree, but then I remembered about `parentNode`.

So the second idea is to go from a given node to the root node while collecting indices of the current node among its parent's children. After reaching the top, we can use the resulting path to go through the second root node and find a symmetrical node.

![](/uploads/3b1a759b128fd0d0d665849e50cdf819)

```javascript
// This function returns a real array of Nodes, so we can use methonds like "indexOf"
function getChildren(node) {
    // or you can use Array.from(node.childNodes);
    return Array.prototype.slice.call(node.childNodes);
}

// This function returns an array of indices from given node to the root
function getPath(root, node) {
    const path = [];
    let curElement = node;

    // This is important as if a node is null or doesn't have a parent
    // there is no need of searching further
    while(curElement !== root && curElement && curElement.parentNode) {
     const index = getChildren(curElement.parentNode).indexOf(curElement);
     path.push(index);
        curElement = curElement.parentNode;
    }

    return path;
}

// Popping all values from the array of indices we go to the symmetrical node
function getNodeByPath(root, originalPath) {
    const path = [].concat(originalPath);
    let element = root;
    while (path.length) {
       element = getChildren(element)[path.pop()];
    }
    return element;
}

// For convenience
function getSymmetricNode(root1, root2, node) {
 const path = getPath(root1, node);
 return getNodeByPath(root2, path);
}

const root1 = document.getElementById('root1');
const root2 = document.getElementById('root2');
const node1 = document.getElementById('node1');
const node2 = document.getElementById('node2');

const nodeX = getSymmetricNode(root1, root2, node1);

console.log(nodeX === node2); // true
```

If you have a better solution, or any feedback, leave a comment below.
