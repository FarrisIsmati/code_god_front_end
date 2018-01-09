import React           from 'react'
import {
  Route,
  Switch,
  withRouter
}                      from "react-router-dom"

import loginContainer  from "../login/loginContainer"
import homeContainer  from "../home/homeContainer"

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={loginContainer} />
      <Route path="/home" component={homeContainer} />
    </Switch>
  </div>
)

export default withRouter(App)
