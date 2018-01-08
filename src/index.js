import React                from 'react'
import ReactDOM             from 'react-dom'
import thunkMiddleware      from 'redux-thunk'
import { createLogger }     from 'redux-logger'
import { createStore,
         applyMiddleware
       }                    from 'redux'

import Root                 from './components/structure/Root'
import rootReducer          from './redux/reducers/reducers'

import { fetchUserDataIfNeeded }        from "./redux/actions/actions"

const loggerMiddleware = createLogger()

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
)

console.log(store.getState())
store.subscribe(() => console.log(store.getState()))

store.dispatch(fetchUserDataIfNeeded('K12321slx'))

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
)
