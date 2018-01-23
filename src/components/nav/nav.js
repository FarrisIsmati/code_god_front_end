//GENERAL
import React           from 'react'

import '../../stylesheets/flex.css'
import '../../stylesheets/nav.css'

const Nav = ({user, logout}) => (
  <div className="flex nav-container">
    <h1>Study.js</h1>
    <div className="flex nav-container-right">
      {
        user.activeUser ?
        <h1 id="logout-btn" onClick={logout}>logOut(<span id="username">{user.username}</span>)</h1>:
        <h1 id="logout-btn" onClick={logout}>{"logOut"}</h1>
      }
    </div>
  </div>
)

export default Nav
