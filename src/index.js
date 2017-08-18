import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
// Route is all the power. BrowswerRouter just checks the location
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import promise from 'redux-promise'

import registerServiceWorker from './registerServiceWorker'
import './index.css'

import reducers from './reducers'
import PostsIndex from './containers/posts_index'
import PostsNew from './containers/posts_new'
import PostsShow from './containers/posts_show'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore)

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <nav>
        <Switch>
          <Route path='/posts/new' component={PostsNew} />
          {/* id gets passed as a .mathch.params.id prop to PostsShow */}
          <Route path='/posts/:id' component={PostsShow} />
          <Route path='/' component={PostsIndex} />
        </Switch>
      </nav>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'))
registerServiceWorker()
