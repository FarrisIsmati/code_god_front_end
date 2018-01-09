import React           from 'react'
import {
  Route,
  Switch,
  withRouter
}                      from "react-router-dom"

import loginContainer  from "../login/loginContainer"

const App = () => (
  <Switch>
    <Route exact path="/" component={loginContainer} />
  </Switch>
)

export default withRouter(App)
