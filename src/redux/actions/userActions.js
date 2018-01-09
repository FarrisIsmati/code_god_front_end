import fetch               from 'cross-fetch'
import {
  REQUEST_USER,
  RECEIVE_USER,
  INVALIDATE_USER,
  LOGOUT_USER
}                          from "../constants/constants"

export function invalidateUser(token) {
  return {
    type: INVALIDATE_USER,
    token
  }
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
    payload: {
      activeUser: false,
      user: {},
      loggedOutAt: Date.now(),
      isFetching: false,
      didInvalidate: false
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
    console.log(localStorage)
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
