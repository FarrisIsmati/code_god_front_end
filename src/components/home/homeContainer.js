import React, {Component}         from 'react'

import { connect }                from 'react-redux'

import { fetchUserDataIfNeeded,
         logoutUser }             from "../../redux/actions/userActions"
import Nav                        from './nav/nav.js'
import DomainContainer            from './domain/domainContainer.js'

import '../../stylesheets/home.css'
import '../../stylesheets/flex.css'

class HomeContainer extends Component{
  constructor(props){
    super(props)
    const { logUserOut } =  this.props

    this.logUserOut = logUserOut.bind(this)
  }

  componentDidMount(){
    const { history, getUserData } = this.props
    if (localStorage.userToken) {
      getUserData(localStorage.userToken)
    } else {
      console.log('No token given')
      history.push('/')
    }
  }

  render(){
    return(
      <div className="grid-home">
        <Navbar logout={this.logUserOut}/>
        <Domain />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.userData
})

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      getUserData: (token) => {
        dispatch(fetchUserDataIfNeeded(token))
        .then(() => {
          console.log('Token Validated')
        })
        .catch(() => {
          localStorage.clear()
          console.log('Invalid Token')
          ownProps.history.push('/')
        })
      },
      logUserOut: () => {
        dispatch(logoutUser())
        localStorage.clear()
        ownProps.history.push('/')
      }
  }
}

const Navbar = connect(mapStateToProps, mapDispatchToProps)(Nav)
const Domain = connect(mapStateToProps, mapDispatchToProps)(DomainContainer)

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
