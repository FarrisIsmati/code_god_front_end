import { connect }                from 'react-redux'
import axios                      from 'axios'

import { fetchUserDataIfNeeded }             from "../../redux/actions/userActions"

import LoginPage                  from './loginPage.js'

const updateUser = (googleId, email, dispatch, changeRoute) => {
  axios.post(`http://localhost:3001/auth/google`, {
    googleId: googleId,
    username: email
  })
  .then((response) => {
    dispatch(localStorage.userToken)
  })
  .catch((err) => console.log(err))
}

const responseGoogle = (res, dispatch, changeRoute) => {
  axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=` + res.tokenId)
  .then((response) => {
    localStorage.setItem('userToken', res.tokenId)
    updateUser(response.data.sub, response.data.email, dispatch, changeRoute)
  })
  .catch((err) => console.log(err))
}

const mapStateToProps = () => ({
  response: responseGoogle
})

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      getUserData: (token) => {
        dispatch(fetchUserDataIfNeeded(token))
        .then(() => {
          ownProps.history.push('/home')
        })
      }
  }
}

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(LoginPage)

export default LoginContainer
