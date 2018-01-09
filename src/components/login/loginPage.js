import React           from 'react'
import axios           from 'axios'
import GoogleLogin     from 'react-google-login'

const updateUser = (googleId, email) => {
  axios.post(`http://localhost:3001/auth/google`, {
    googleId: googleId,
    username: email
  })
  .then((response) => {
    console.log(response)
  })
  .catch((err) => console.log(err))
}

const responseGoogle = (res) => {
  axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=` + res.tokenId)
  .then((response) => {
      updateUser(response.data.sub, response.data.email)
    })
  .catch((err) => console.log(err))
}

const LoginPage = () => (
  <div>
    <div className="title-holder">
      <h1>codeGod;</h1>
      <h2>be the master of your domain</h2>
      <div className="oauth-holder">
        <GoogleLogin
          clientId="185479231839-jon0c9p5seej5qd2jfsc2aal6idobsi1.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
      </div>
    </div>
  </div>
)

export default LoginPage
