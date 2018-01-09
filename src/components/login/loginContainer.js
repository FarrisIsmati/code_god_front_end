import { connect }                from 'react-redux'
import axios                      from 'axios'

import { fetchUserDataIfNeeded }  from "../../redux/actions/userActions"

import LoginPage                  from './loginPage.js'

const updateUser = (googleId, email, dispatch) => {
  axios.post(`http://localhost:3001/auth/google`, {
    googleId: googleId,
    username: email
  })
  .then((response) => {
    dispatch(fetchUserDataIfNeeded(localStorage.userToken))
  })
  .catch((err) => console.log(err))
}

const responseGoogle = (res) => {
  axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=` + res.tokenId)
  .then((response) => {
    localStorage.clear()
    localStorage.setItem('userToken', res.tokenId)
    updateUser(response.data.sub, response.data.email)
  })
  .catch((err) => console.log(err))
}

const mapStateToProps = () => ({
  response: responseGoogle
})

const LoginContainer = connect(mapStateToProps)(LoginPage)

export default LoginContainer
