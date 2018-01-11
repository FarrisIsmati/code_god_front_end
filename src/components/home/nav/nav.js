import React           from 'react'

import '../../../stylesheets/flex.css'
import '../../../stylesheets/nav.css'

const Nav = ({user, logout}) => (
  <div className="flex nav-container">
    <h1>codeGod</h1>
    <div className="flex nav-container-right">
      {
        user.activeUser ?
        <h2 id="username-display">{user.username}</h2>:
        null
      }
      <h2 id="logout-btn" onClick={logout}>logOut</h2>
    </div>
  </div>
)

export default Nav
