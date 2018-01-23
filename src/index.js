import React                from 'react'
import ReactDOM             from 'react-dom'
import thunkMiddleware      from 'redux-thunk'
import { createLogger }     from 'redux-logger'
import {
         createStore,
         applyMiddleware
       }                    from 'redux'

import Root                 from './components/structure/Root'
import rootReducer          from './redux/reducers/rootReducer'

//Import global SCSS File
import './stylesheets/index.css'
import './stylesheets/highlightjs.css'

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware
  )
)

ReactDOM.render(
  <Root className="full-height" store={store} />,
  document.getElementById('root')
)
