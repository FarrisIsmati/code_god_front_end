import { connect }                from 'react-redux'
import axios                      from 'axios'

import { fetchUserDataIfNeeded, logoutUser }             from "../../redux/actions/userActions"

import LoginPage                  from './loginPage.js'

const updateUser = (googleId, email, dispatch) => {
  axios.post(`http://localhost:3001/auth/google`, {
    googleId: googleId,
    username: email
  })
  .then((response) => {
    dispatch(localStorage.userToken)
  })
  .catch((err) => console.log(err))
}

const responseGoogle = (res, dispatch) => {
  axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=` + res.tokenId)
  .then((response) => {
    localStorage.setItem('userToken', res.tokenId)
    updateUser(response.data.sub, response.data.email, dispatch)
  })
  .catch((err) => console.log(err))
}

const mapStateToProps = () => ({
  response: responseGoogle
})

const mapDispatchToProps = (dispatch) => {
    return {
      getUserData: token => {
        dispatch(fetchUserDataIfNeeded(token))
      },
      logUserOut: () => {
        dispatch(logoutUser())
      }
  }
}

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(LoginPage)

export default LoginContainer
