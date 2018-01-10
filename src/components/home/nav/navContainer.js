import { connect }                from 'react-redux'

import Nav                        from './nav.js'

import { logoutUser }             from "../../../redux/actions/userActions"

const mapStateToProps = (state) => ({
  user: state.userData
})

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log(ownProps)
    return {
      logUserOut: () => {
        dispatch(logoutUser())
        localStorage.clear()
      }
  }
}

const Navbar = connect(mapStateToProps, mapDispatchToProps)(Nav)

export default Navbar
