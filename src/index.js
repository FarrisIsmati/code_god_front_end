import React            from 'react'
import ReactDOM         from 'react-dom'
import { createStore }  from 'redux'

import Root             from './components/structure/Root'
import codegodApp         from './redux/reducers/reducers'

import { getTopics }      from "./redux/actions/actions"

let store = createStore(codegodApp)

console.log(store.getState())
store.subscribe(() => console.log(store.getState()))

store.dispatch(getTopics(['NodeJS','MVC','Object Oriented Programming']))

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
)
