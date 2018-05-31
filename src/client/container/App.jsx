//App.jsx by wangsen

import React from 'react'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter, HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { hot } from 'react-hot-loader'
import { composeWithDevTools } from 'redux-devtools-extension';

import 'antd-mobile/dist/antd-mobile.css'

import * as reducers from '../redux/reducer/index.reducer.js'

import Article from './Article'
import Record from './Record'
import User from './User'
import NavHeader from '../components/NavHeader'
import FooterTabs from '../components/FooterTabs'




const store = createStore(combineReducers(reducers), composeWithDevTools(applyMiddleware(thunk, logger)))

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <BrowserRouter>
            <div>
              <NavHeader />
              <Switch>
                <Route path='/' exact component={Article} />
                <Route path='/record' component={Record} />
                <Route path='/user' component={User} />
                <Redirect to="/" />
              </Switch>
              <FooterTabs />
            </div>
          </BrowserRouter>
        </div>

      </Provider>

    )
  }
}

export default hot(module)(App)
