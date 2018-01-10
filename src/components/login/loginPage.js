import React           from 'react'
import GoogleLogin     from 'react-google-login'

import PropTypes       from 'prop-types'

const LoginPage = ({user, response, getUserData }) => (
  <div>
    <div className="title-holder">
      <h1>codeGod;</h1>
      <h2>be the master of your domain</h2>
      <div className="oauth-holder">
        <GoogleLogin
          clientId="185479231839-jon0c9p5seej5qd2jfsc2aal6idobsi1.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={response}
          onFailure={response}
        />
      </div>
    </div>
  </div>
)

LoginPage.propTypes = {
  response: PropTypes.func
}

export default LoginPage
