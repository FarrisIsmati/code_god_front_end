import React           from 'react'

import '../../../stylesheets/flex.css'
import '../../../stylesheets/nav.css'

const Nav = ({user, logout}) => (
  <div className="flex nav-container">
    <h2>codeGod;</h2>
    <div className="flex">
      {
        user.activeUser ?
        <p>{user.username}</p>:
        null
      }
      <p onClick={logout}>log out</p>
    </div>
  </div>
)

export default Nav
