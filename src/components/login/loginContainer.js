import React, {Component}         from 'react'

import { connect }                from 'react-redux'
import axios                      from 'axios'

import { fetchUserDataIfNeeded }             from "../../redux/actions/userActions"

import LoginPage                  from './loginPage.js'

class LoginContainer extends Component{
  constructor(props) {
    super(props)
    const { getUserData } = this.props

    this.getUserData = getUserData.bind(this)
    this.responseGoogle = this.responseGoogle.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount(){
    if (localStorage.userToken){
      this.getUserData(localStorage.userToken)
    }
  }

  updateUser(googleId, email) {
    axios.post(`http://localhost:3001/auth/google`, {
      googleId: googleId,
      username: email
    })
    .then((response) => {
      this.getUserData(localStorage.userToken)
    })
    .catch((err) => {console.log(err)})
  }

  responseGoogle(res) {
    axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=` + res.tokenId)
    .then((response) => {
      localStorage.setItem('userToken', res.tokenId)
      this.updateUser(response.data.sub, response.data.email)
    })
    .catch((err) => {console.log(err)})
  }

  render(){
    return(
      <Login response={(res) => {this.responseGoogle(res)}}/>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.userData,
})

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      getUserData: (token) => {
        dispatch(fetchUserDataIfNeeded(token))
        .then(() => {
          ownProps.history.push('/home')
        })
        .catch((err) => {console.log(err)})
      }
  }
}

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginPage)
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
