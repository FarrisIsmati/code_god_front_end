import React                from 'react'
import ReactDOM             from 'react-dom'
import thunkMiddleware      from 'redux-thunk'
import { createLogger }     from 'redux-logger'
import { createStore,
         applyMiddleware
       }                    from 'redux'

import Root                 from './components/structure/Root'
import rootReducer          from './redux/reducers/rootReducer'

//import { fetchUserDataIfNeeded }        from "./redux/actions/userActions"

const loggerMiddleware = createLogger()

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)

store.subscribe(() => console.log(store.getState()))

//Log user in if needed (Once user is logged in have access to all their data)
// store.dispatch(fetchUserDataIfNeeded(``))

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
)
