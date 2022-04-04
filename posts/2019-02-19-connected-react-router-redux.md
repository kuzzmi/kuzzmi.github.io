---
layout:      post
date:        2019-02-19 05:00:00 +0200
title:       "React Router + Connected Component"
tags:
    - technology
    - react
    - redux
    - javascript
lang:        en
description: >
    A tip on how to fix issue when using connected React Router v4 and Redux in React
---
I just found an issue that I had hard times solving until I saw a
comment somewhere on the Internet (can't find it, sorry).

In a nutshell, after wrapping the first child of `ConnectedRouter` with `connect`, weird stuff started happening with my routes.

Consider having this situation:

```
// index.js
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import AppContainer from './containers/app'
import { history, store } from './store'

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppContainer />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
```

```
// WRONG
// containers/app.js
import React from 'react'
import { connect } from 'react-redux';

const AppContainer = ({ foo }) => (
  <div>{ foo }</div>
)

export default connect(() => ({ foo: 'bar' }))(AppContainer);
```

What you need to do in this case is to wrap your "connected" component with `withRouter` provided by `react-router`:

```
// RIGHT
// containers/app.js
import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const AppContainer = ({ foo }) => (
  <div>{ foo }</div>
)

export default withRouter(
  connect(() => ({ foo: 'bar' }))(AppContainer)
)
```

Here you go.

I hope this helps!
