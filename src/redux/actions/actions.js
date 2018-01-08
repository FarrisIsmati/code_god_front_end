import { combineReducers } from 'redux'
import fetch               from 'cross-fetch'
import {
  REQUEST_USER,
  RECEIVE_USER,
  INVALIDATE_USER
}                          from "../constants/constants"

export function invalidateUser(userId) {
  return {
    type: INVALIDATE_USER,
    userId
  }
}

function requestUser(userId) {
  return {
    type: REQUEST_USER,
    userId
  }
}

function receiveUser(json) {
  console.log(json)
  return {
    type: RECEIVE_USER,
    payload: {
      user: json,
      receivedAt: Date.now()
    }
  }
}

function fetchUserData(userId) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/data/user/` + userId)
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
  const user = state.userData.googleId
  if (!user) {
    return true
  } else if (user.isFetching) {
    return false
  } else {
    return user.didInvalidate
  }
}

export function fetchUserDataIfNeeded(userId) {
  return (dispatch, getState) => {
    if (shouldFetchUserData(getState())) {
      return dispatch(fetchUserData(userId))
    } else {
      return Promise.resolve()
    }
  }
}
