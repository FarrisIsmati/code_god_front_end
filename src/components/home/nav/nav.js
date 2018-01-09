import React           from 'react'

const Nav = ({user}) => (
  <div>
    <p onClick={()=>{console.log(user)}} >Navbar</p>
  </div>
)

export default Nav
