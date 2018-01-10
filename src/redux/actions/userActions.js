import fetch               from 'cross-fetch'
import {
  REQUEST_USER,
  RECEIVE_USER,
  LOGOUT_USER
}                          from "../constants/constants"

export function logoutUser() {
  return {
    type: LOGOUT_USER,
    payload: {
      activeUser: false,
      googleId: '',
      username: '',
      loggedOutAt: Date.now(),
      isFetching: false
    }
  }
}

function requestUser(token) {
  return {
    type: REQUEST_USER,
    token
  }
}

function receiveUser(json) {
  return {
    type: RECEIVE_USER,
    payload: {
      activeUser: true,
      user: json,
      receivedAt: Date.now()
    }
  }
}

function fetchUserData(token) {
  return function (dispatch) {
    dispatch(requestUser(token))
    return fetch(`http://localhost:3001/data/user/` + token)
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json =>
        dispatch(receiveUser(json))
      )
  }
}

function shouldFetchUserData(state) {
  const user = state.userData.activeUser
  if (!user) {
    return true
  } else if (user.isFetching) {
    return false
  } else {
    return user.didInvalidate
  }
}

export function fetchUserDataIfNeeded(token) {
  return (dispatch, getState) => {
    if (shouldFetchUserData(getState())) {
      return dispatch(fetchUserData(token))
    } else {
      return Promise.resolve()
    }
  }
}
