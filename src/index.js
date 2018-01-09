import React                from 'react'
import ReactDOM             from 'react-dom'
import thunkMiddleware      from 'redux-thunk'
import { createLogger }     from 'redux-logger'
import { createStore,
         applyMiddleware
       }                    from 'redux'

import Root                 from './components/structure/Root'
import rootReducer          from './redux/reducers/rootReducer'

const loggerMiddleware = createLogger()

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)

store.subscribe(() => console.log(store.getState()))

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
)
