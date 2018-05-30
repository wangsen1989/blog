//App.jsx by wangsen

import React from 'react'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter, HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { hot } from 'react-hot-loader'

import Article from './Article'
import Record from './Record'
import User from './User'

import style from './app.less'

import { demoReducer } from '../redux/reducer/index.reducer.js'



const store = createStore(combineReducers({ demoReducer }), applyMiddleware(thunk, logger))

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={Article} />
            <Route path='/record' component={Record} />
            <Route path='/user' component={User} />
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      </Provider>

    )
  }
}

export default hot(module)(App)
