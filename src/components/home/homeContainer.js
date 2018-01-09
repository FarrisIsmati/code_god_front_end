import React, {Component}         from 'react'
import axios                      from 'axios'

import { connect }                from 'react-redux'

import { fetchUserDataIfNeeded }  from "../../redux/actions/userActions"

import Nav                        from './nav/nav.js'

class HomeContainer extends Component{
  componentDidMount(){
    const { user, history, getUserData } = this.props
    if (localStorage.userToken) {
      getUserData(localStorage.userToken)
    } else {
      console.log('No token given')
      history.push('/')
    }
  }

  render(){
    return(
      <div>
        <Navbar />
        <p>Welcome Everyone</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state
})

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      getUserData: (token) => {
        dispatch(fetchUserDataIfNeeded(token))
        .then(() => {
          console.log('Token Validated')
        })
        .catch(() => {
          console.log('Invalid Token')
          ownProps.history.push('/')
        })
      }
  }
}

const Navbar = connect(mapStateToProps)(Nav)

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
