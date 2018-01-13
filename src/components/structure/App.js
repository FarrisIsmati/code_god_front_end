import React           from 'react'

import {
  Route,
  Switch,
  withRouter
}                      from "react-router-dom"

import loginContainer  from "../../containers/loginContainer"
import homeContainer  from "../../containers/mainContainer"

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={loginContainer} />
      <Route exact path="/main" component={homeContainer} />
    </Switch>
  </div>
)

export default withRouter(App)
