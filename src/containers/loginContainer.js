//GENERAL
import React, {Component}         from 'react'
import { connect }                from 'react-redux'
import axios                      from 'axios'

//REDUX
import { fetchUserDataIfNeeded }  from "../redux/actions/userActions"

//COMPONENTS
import LoginPage                  from '../components/login/loginPage.js'

class LoginContainer extends Component{
  constructor(props) {
    super(props)
    const { getUserData } = this.props

    this.getUserData = getUserData.bind(this)
    this.responseGoogle = this.responseGoogle.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  //Create a user after login then get user data in the store
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

  //Get Login response and store google's JWT in local storage
  responseGoogle(res) {
    console.log(res)
    axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=` + res.tokenId)
    .then((response) => {
      localStorage.setItem('userToken', res.tokenId)
      this.updateUser(response.data.sub, response.data.email)
    })
    .catch((err) => {console.log(err)})
  }

  //Upon mounting if a token exists try and retreive user data
  componentDidMount(){
    if (localStorage.userToken){
      this.getUserData(localStorage.userToken)
    }
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
          //Upon getting user data in store reroute to /home
          ownProps.history.push('/main')
        })
        .catch((err) => {
          console.log(err)
        })
      }
  }
}

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginPage)
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
