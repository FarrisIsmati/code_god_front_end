//GENERAL
import React, {Component}         from 'react'
import { connect }                from 'react-redux'

//REDUX
import {
         fetchUserDataIfNeeded,
         logoutUser
       }                          from "../redux/actions/userActions"

//COMPONENTS
import Nav                        from '../components/nav/nav.js'
import TopicContainer             from './topicContainer.js'

import '../stylesheets/home.css'
import '../stylesheets/flex.css'

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

  //*Future* Hold a router for switching between your topics and everyone elses public topics
  render(){
    return(
      <div className="grid-home">
        <Navbar logout={this.logUserOut}/>
        <TopicContainer />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.userData
})

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      //When on this page check if you have a valid token otherwise reroute
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
