import React           from 'react'
import {
  Route,
  Switch,
  withRouter
}                      from "react-router-dom"

import loginContainer  from "../login/loginContainer"

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={loginContainer} />
    </Switch>
  </div>
)

export default withRouter(App)
