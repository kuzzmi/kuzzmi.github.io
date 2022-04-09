---
layout:      post
date:        2016-04-22 23:49:13 +0200
title:       "How To: Autocomplete Inputs in Ember"
lang:        en
tags:
    - technology
    - ember
    - web development
    - javascript
description: >
    In this tutorial we will go through several basic things
    about Ember and create a reusable autocomplete input for
    your Ember project
---
A form is still one the most frequently used layers between user’s and company’s goals. Almost every time when we need some input from user, we need to show him a form. And users hate forms, they don’t want to fill all these boring fields and to think a lot about what to put where and so on.

But we are front-end developers, aren’t we? We can help our valuable users!

In this Ember.js tutorial I will cover a few steps how we can help a user to fill one type of fields: the autocomplete text input field.

We will create an input field that will autocomplete tags for a blog post by providing a part of the name.

Think about this field as an input for selecting tags for your post in your blog application, or an input where a user has to select recipients of his message.

Hopefully now you understand what I mean. If so, let’s have some fun a learn how to do this!

# Getting started

I hope, you’re already a bit familiar with Ember CLI. If not, you can check their official documentation [here](http://ember-cli.com/user-guide/).

First things first, we need a new app for our experiments:

```javascript
ember new autocomplete-inputs
cd autocomplete-inputs
```

# Model and Data

*If you're not familiar with models in Ember.js you can take a look a brief introduction to model [**here**](https://guides.emberjs.com/v2.5.0/models/).*

Now we need to prepare our model and have some data for it, so we can work with something.

Let’s create a `Tag` model (we will start with tags):

```javascript
ember g model tag
```

Tag model will have only one property: name, so the model should look like this:

```javascript

// app/models/tag.js
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string')
});

```

Our next step will be to create http-mock (a mocked version of API endpoint) for development purposes.

```javascript

ember g http-mock tags

```

Modify the created endpoint to include some dummy data. Open `server/mocks/tags.js` file and find the first line that starts with tagsRouter.get and change this block to following:

```javascript

// server/mocks/tags.js
...
tagsRouter.get('/', function(req, res) {
  var tags = [{
    id: 1,
    name: 'emberjs'
  }, {
    id: 2,
    name: 'webdev'
  }, {
    id: 3,
    name: 'javascript'
  }];

  res.send({
    'tags': tags
  });
});
...

```

Next step is to generate a default adapter and change the default namespace of API.

```javascript

// application adapter
ember g adapter application

```

```javascript

// app/adapters/application.js
import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  namespace: 'api'
});

```

Finally we can check if we set up everything correctly. In order to do that, let’s output the list of tags we receive from our API. For that we need to generate an application route and retrieve tags as model there:

```

// Generating main route
ember g route application

```

Define a model for the new route as follows:

```javascript

// app/routes/application.js
import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('tag');
  }
});

```

And update a template to see if everything is working fine:

```javascript

// app/templates/application.hbs
...
<ul>
  {{#each model as |tag|}}
  <li>
    <span>{{tag.name}}</span>
  </li>
  {{/each}}
</ul>

```

That was a long way, but after we run a command `ember serve` and after navigating to `http://localhost:4200`, we’ll see the list of our tags.

Finally, we are ready and can start developing our awesome component!

# Developing a component

Let’s move on and start developing our awesome component, you’re here because of this, right?


The idea is to create a reusable component that will look in a template file like this: `{{autocomplete-input items=post.tags key="name" model="tag"}}`, where `items` will contains already selected items, `key` attribute will define a property that we’re looking for and finally `model` attribute will determine, what kind of a model we’re looking for.


So let’s generate a component:

```bash

ember g component autocomplete-input

```

Awesome, let’s add the component to a main template file, so we can livereload and see our changes:

```javascript

// app/templates/application.hbs
...
{{autocomplete-input items=model.tags key="name" model="tag"}}

```

And change our route so it contains only a new property which is a container of selected tags:

```javascript

// app/routes/application.js
import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return { tags: [] };
  }
});

```

Great, then we should move to the component and outline a template for it. First let’s define what we need:

* It has to display items already added to container
* It has to display a text input field
* It has to display found results for autocompletion

Basic version will look like this:

```javascript

// app/templates/components/autocomplete-input.js
<div class="autocomplete-input">
  {{#each items as |item|}}
  <span class="selected-item">{{item}}</span>
  {{/each}}

  {{input type="text"}}

  {{#each foundItems as |item|}}
  <span class="found-item">{{item}}</span>
  {{/each}}
</div>

```

What we need next? We need a search, of course, so we look for tags based on the value we typed into the input field. The search will be very basic in purpose of the tutorial.

Let’s add a key-up listener to the input in a template:

```bash

{{input type="text" key-up="keyUp"}}

```

Now we need to outline our component javascript file and definitely add a function `keyUp()`:

```javascript

// app/components/autocomplete-input.js
import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(), // we will use Ember.store for search
  foundItems: [], // we need to store found items

  findItem(value) {
    // here we will send a request to API
    // to return us some items based on
    // passed value
  },

  actions: {
    keyUp(value) {
      this.findItem(value);
    }
  }
});

```

Let’s focus now on `findItem()` function:

```javascript

// app/components/autocomplete-input.js
...
  findItem(value) {
    // we get `store` service to search
    // we get `model` to know which model to query
    //    and `key` to narrow down a search to one attribute
    const { store, model, key } = this.getProperties('store', 'model', 'key');

    const query = {};
    query[key] = value;

    // we query the data and set the results as ‘foundItems’
    store.query(model, query).then((items) => {
        this.set('foundItems', items);
    });
  }
...

```

At the moment our mocked API endpoint doesn’t understand what we’re trying to do with this search. To fix that we need to add a basic filtering there:

```javascript

// server/mocks/tags.js
  tagsRouter.get('/', function(req, res) {
    var query = req.query || null;
    var tags = [{
      id: 1,
      name: 'emberjs'
    }, {
      id: 2,
      name: 'codeschool'
    }, {
      id: 3,
      name: 'javascript'
    }];

    var filter = function(tag) {
      if (!query) { return true; }
      return tag.name.indexOf(query.name) !== -1;
    };

    res.send({
      'tags': tags.filter(filter)
    });
  });

```


We can try again and see, that Ember outputs everything but tag names. This is happening because we’re trying to show an internal Ember model, instead of a value. But because our key is dynamic we need to create a custom helper, very basic one, just to return a value of a passed object by a key. So in our case we need something like `{{output-value item key}}`:


```bash
// generate a helper
ember g helper output-value
```

```javascript

// app/helpers/output-value.js
import Ember from 'ember';

export function outputValue(params) {
  let object = params[0],
      key = params[1];

  // just to be sure, that our helper will work as expected
  if (typeof object === 'object' && typeof key === 'string') {
    if (object.get) { // we check whether the object is Ember object
      return object.get(key);
    } else {
      return object[key];
    }
  } else {
    throw new TypeError('output-value helper signature is output-value(Object, String)');
  }
}

export default Ember.Helper.helper(outputValue);

```

Now let’s use this helper in our component’s template:

```javascript

// app/templates/components/autocomplete-input.hbs
<div class="autocomplete-input">
  {{#each items as |item|}}
  <span class="selected-item">{{output-value item key}}</span>
  {{/each}}

  {{input type="text"}}

  {{#each foundItems as |item|}}
  <span class="found-item">{{output-value item key}}</span>
  {{/each}}
</div>

```

Now if we go and check our app. Congratulations!


Next step is to add `add()` and `remove()` functions, so we can add our tags to the container. We may start from a template and add `{{ action ... }}` helper there first:


```javascript

// app/templates/components/autocomplete-input.js
<div class="autocomplete-input">
  {{#each items as |item|}}
  <span class="selected-item" {{action "remove" item}}>{{output-value item key}}</span>
  {{/each}}

  {{input type="text" key-up="keyUp"}}

  {{#each foundItems as |item|}}
  <span class="found-item" {{action "add" item}}>{{output-value item key}}</span>
  {{/each}}
</div>

```

```javascript

// app/components/autocomplete-input.js
...
  // If we have a container, we just add an item to it
  addItem(item) {
    if (this.get('items')) {
      this.get('items').addObject(item);
    }
    // after adding an item, it’s a good idea to clear results
    this.set('foundItems', []);
  },
  // If we have a container, we remove a passed item from it
  removeItem(item) {
    if (this.get('items')) {
      this.get('items').removeObject(item);
    }
  },

  actions: {
    // Remove item from the list of items
    remove(item) {
      this.removeItem(item);
    },

    // Add item to the list of items
    add(item) {
      this.addItem(item);
    },

    keyUp(value) {
    ...
    }
  }
...

```

# Congratulations!

Voila! We have now a reusable autocomplete input, which you can use in your blog app, you finances app, any other application, that has some sort of an undefined set of defined values which we need to enter.

Just add a bit of your imagination, some CSS and you will see something like this (trust me, this is absolutely the same component):

# Conclusion

Of course this is just a beginning, you’ll need to add some logic to the `keyUp` method to prevent an empty search, you might want to add a normal `add` function, that will be able to add either a model, or create a model from value and add it, and so on. The list is very long if not endless. But you’ve done a huge and great job, if you’re reading these words, so let me congratulate you one more time.

